import { useEffect, useState } from 'react';
import { BookOpen, Loader2, MessageSquare, Send, Sparkles, X } from 'lucide-react';
import { parseChatText } from '../utils/formatChatText.js';
import './chat-assistant.css';

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/$/, '');

function renderChatSegments(segments) {
  return segments.map((segment, index) => {
    const key = `${segment.text}-${index}`;
    if (segment.format === 'strong') return <strong key={key}>{segment.text}</strong>;
    if (segment.format === 'email') return <strong key={key}>📧 {segment.text}</strong>;
    if (segment.format === 'phone') return <strong key={key}>📞 {segment.text}</strong>;
    if (segment.format === 'em') return <em key={key}>{segment.text}</em>;
    if (segment.format === 'code') return <code key={key}>{segment.text}</code>;
    return <span key={key}>{segment.text}</span>;
  });
}

async function apiRequest(path, options = {}) {
  const token = localStorage.getItem('syncbot_token');
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || 'Something went wrong.');
    error.status = response.status;
    throw error;
  }
  return data;
}

const welcome = {
  role: 'assistant',
  text: 'Hello! How can we help you? I’m SyncBot, your Nexora virtual assistant. Ask me anything about our services or support.',
  sources: [],
};
const suggestedQuestions = [
  'What services does Nexora offer?',
  'Tell me about your web development services.',
  'How can I get technical support?',
];

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('chat');
  const [messages, setMessages] = useState([welcome]);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('syncbot_user') || 'null'); } catch { return null; }
  });
  const [authMode, setAuthMode] = useState('login');
  const [authRequired, setAuthRequired] = useState(false);
  const [authBusy, setAuthBusy] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('syncbot_token')) return;
    apiRequest('/users/me').then(({ user: currentUser }) => {
      if (currentUser?.role === 'customer') {
        setUser(currentUser);
        localStorage.setItem('syncbot_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('syncbot_token');
        localStorage.removeItem('syncbot_user');
        setUser(null);
      }
    }).catch(() => {
      localStorage.removeItem('syncbot_token');
      localStorage.removeItem('syncbot_user');
      setUser(null);
    });
  }, []);

  async function authenticate(event) {
    event.preventDefault();
    setError('');
    setAuthBusy(true);
    const form = new FormData(event.currentTarget);
    const registering = authMode === 'register';
    const password = String(form.get('password') || '');
    if (registering && password !== form.get('confirmPassword')) {
      setError('Passwords do not match.');
      setAuthBusy(false);
      return;
    }
    try {
      const result = await apiRequest(registering ? '/auth/register' : '/auth/login', {
        method: 'POST',
        body: JSON.stringify(registering ? {
          name: form.get('name'), username: form.get('username'), email: form.get('email'), password,
        } : { identifier: form.get('identifier'), password }),
      });
      if (result.user?.role !== 'customer' || !result.token) {
        throw new Error('Please use a customer account to manage support tickets.');
      }
      localStorage.setItem('syncbot_token', result.token);
      localStorage.setItem('syncbot_user', JSON.stringify(result.user));
      setUser(result.user);
      setAuthRequired(false);
      setError('');
    } catch (authError) {
      setError(authError.message || 'Unable to sign in.');
    } finally {
      setAuthBusy(false);
    }
  }

  async function send(textOverride) {
    const text = (textOverride ?? message).trim();
    if (!text || busy) return;
    if (mode === 'ticket' && !user) {
      setAuthRequired(true);
      return;
    }

    const conversation = [...messages, { role: 'user', text, sources: [] }];
    setMessages(conversation);
    setMessage('');
    setBusy(true);
    setError('');
    try {
      const result = await apiRequest(mode === 'ticket' ? '/ai/ticket-intake' : '/ai/guest-chat', {
        method: 'POST',
        body: JSON.stringify(mode === 'ticket'
          ? { messages: conversation.slice(-12).map(({ role, text: content }) => ({ role, content })) }
          : { message: text }),
      });
      setMessages((current) => [...current, { role: 'assistant', text: result.reply, sources: result.sources || [] }]);
      if (mode === 'ticket' && result.ready && result.draft) {
        try {
          const created = await apiRequest('/tickets', {
            method: 'POST',
            body: JSON.stringify({ ...result.draft, contact: user.email, attachments: [] }),
          });
          setMessages((current) => [...current, {
            role: 'assistant', text: `Your ticket ${created.ticket.id} has been created. Our team will follow up with you.`, sources: [],
          }]);
        } catch (ticketError) {
          if (ticketError.status === 401 || ticketError.status === 403) {
            localStorage.removeItem('syncbot_token');
            localStorage.removeItem('syncbot_user');
            setUser(null);
            setAuthRequired(true);
            setError('Please sign in with a customer account to finish creating your ticket. Your conversation is saved here.');
          } else {
            setError(ticketError.message || 'Ticket creation failed.');
          }
        }
      }
    } catch (sendError) {
      if (mode === 'ticket' && (sendError.status === 401 || sendError.status === 403)) {
        setAuthRequired(true);
        setError('Please sign in with a customer account to continue. Your conversation is saved here.');
      } else {
        setMessages((current) => [...current, { role: 'assistant', text: sendError.message || 'Failed to get a response.', sources: [] }]);
      }
    } finally {
      setBusy(false);
    }
  }

  function startTicket() {
    setMode('ticket');
    setError('');
    setMessages([{ role: 'assistant', text: 'Tell me what happened and how it affects you. I’ll ask for any important details, then create a support ticket for you.', sources: [] }]);
    if (!user) setAuthRequired(true);
  }

  function continueAsGuest() {
    setAuthRequired(false);
    setMode('chat');
    setError('');
  }

  return <div className="nexora-chat-root">
    {open && <section className="nexora-chat-panel" aria-label="SyncBot Copilot">
      <header className="nexora-chat-header">
        <span className="nexora-chat-avatar"><Sparkles size={19}/></span>
        <span className="nexora-chat-heading"><strong>SyncBot Copilot</strong><small>Nexora Technologies support</small></span>
        <button className="nexora-chat-icon" onClick={() => setOpen(false)} aria-label="Close assistant"><X size={20}/></button>
      </header>

      {authRequired ? <div className="nexora-chat-auth">
        <span className="nexora-chat-eyebrow">PROTECTED SUPPORT ACTION</span>
        <h2>{authMode === 'login' ? 'Sign in to continue' : 'Create a customer account'}</h2>
        <p>Ticket creation and account-specific support require a customer account. Sign in to continue; your conversation will be kept.</p>
        <form onSubmit={authenticate} className="nexora-chat-auth-form">
          {authMode === 'register' ? <>
            <input name="name" placeholder="Full name" autoComplete="name" required />
            <input name="username" placeholder="Username" autoComplete="username" required />
            <input name="email" placeholder="Email address" type="email" autoComplete="email" required />
          </> : <input name="identifier" placeholder="Username or email" autoComplete="username" required />}
          <input name="password" placeholder="Password" type="password" autoComplete={authMode === 'login' ? 'current-password' : 'new-password'} minLength="6" required />
          {authMode === 'register' && <input name="confirmPassword" placeholder="Confirm password" type="password" autoComplete="new-password" minLength="6" required />}
          {error && <p className="nexora-chat-error" role="alert">{error}</p>}
          <button className="nexora-chat-auth-submit" disabled={authBusy}>{authBusy ? 'Please wait…' : authMode === 'login' ? 'Sign in' : 'Create account'}</button>
        </form>
        <button className="nexora-chat-switch" onClick={() => { setAuthMode(authMode === 'login' ? 'register' : 'login'); setError(''); }}>
          {authMode === 'login' ? 'New to SyncBot? Create an account' : 'Already have an account? Sign in'}
        </button>
        <button className="nexora-chat-switch nexora-chat-guest-return" onClick={continueAsGuest}>Continue with general questions</button>
      </div> : <>
        <div className="nexora-chat-messages" aria-live="polite">
          {messages.map((item, index) => <div key={`${item.role}-${index}`} className={`nexora-chat-row ${item.role}`}>
            <div className="nexora-chat-bubble">{item.role === 'assistant'
              ? parseChatText(item.text).map((block, blockIndex) => {
                if (block.type === 'list') {
                  return <ul className="nexora-chat-list" key={`list-${blockIndex}`}>
                    {block.items.map((segments, itemIndex) => <li key={`item-${itemIndex}`}>{renderChatSegments(segments)}</li>)}
                  </ul>;
                }
                return <p className={block.type === 'heading' ? 'nexora-chat-section-title' : 'nexora-chat-text-block'} key={`block-${blockIndex}`}>{renderChatSegments(block.segments)}</p>;
              })
              : <p>{item.text}</p>}
              {item.sources?.length > 0 && <div className="nexora-chat-sources"><BookOpen size={13}/><span>{item.sources.map((source) => source.title).join(' · ')}</span></div>}
            </div>
          </div>)}
          {busy && <div className="nexora-chat-loading"><Loader2 size={15}/> {mode === 'ticket' ? 'Reviewing your issue…' : 'Copilot is thinking…'}</div>}
        </div>
        <div className="nexora-chat-controls">
          {error && <p className="nexora-chat-error" role="alert">{error}</p>}
          {mode === 'chat' ? <>
            <div className="nexora-chat-prompts">{suggestedQuestions.map((prompt) => <button key={prompt} onClick={() => send(prompt)} disabled={busy}>{prompt}</button>)}</div>
            <p className="nexora-chat-note">For account-specific support and ticket management, sign in to your account.</p>
          </> : <div className="nexora-chat-modes"><span className="nexora-chat-signed-in">Signed in as {user?.name || user?.email}</span><button onClick={continueAsGuest}>General questions</button></div>}
          <form className="nexora-chat-compose" onSubmit={(event) => { event.preventDefault(); send(); }}>
            <input value={message} onChange={(event) => setMessage(event.target.value)} placeholder={mode === 'ticket' ? 'Describe the issue…' : 'Ask us anything…'} aria-label="Message" />
            <button aria-label="Send message" disabled={busy || !message.trim()}><Send size={18}/></button>
          </form>
          {mode === 'chat' && <button className="nexora-chat-ticket-link" onClick={startTicket}>Create a support ticket <span aria-hidden="true">→</span></button>}
        </div>
      </>}
    </section>}
    {!open && <button className="nexora-chat-launcher" onClick={() => setOpen(true)} aria-label="Open SyncBot Copilot"><MessageSquare size={23}/><span>Chat with us</span></button>}
  </div>;
}
