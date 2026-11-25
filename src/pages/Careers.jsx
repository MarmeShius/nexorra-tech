import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { jobs } from '../data.js';
import { images } from '../assets/images.js';
import { ContactBanner, Heading, PageHero } from '../components/PageElements.jsx';
export default function Careers() {
  const [selected, setSelected] = useState(jobs[0].title);
  const [sent, setSent] = useState(false);
  return <><PageHero eyebrow="CAREERS AT NEXORA" title={<>Make good work.<br /><em>With good people.</em></>} body="Bring your perspective, your questions and your ambition. We’re building a team that takes the work seriously and enjoys making it together." /><section className="section"><div className="container careers-top"><div><Heading eyebrow="LIFE AT NEXORA" title={<>Room to do<br /><em>your best work.</em></>} /><p>Good work takes trust, a bit of courage and the space to keep learning. We make room for all three.</p><div className="perks"><span><Check />Work that matters</span><span><Check />People who share</span><span><Check />Space to grow</span><span><Check />Flexible ways of working</span></div></div><div className="career-image" style={{
          backgroundImage: `url(${images.teamCollaboration})`
        }} /></div></section><section className="section muted"><div className="container"><Heading eyebrow="OPEN POSITIONS" title="Find your place." /><div className="job-layout"><div className="job-list">{jobs.map(j => <button className={selected === j.title ? 'job-row selected' : 'job-row'} key={j.title} onClick={() => setSelected(j.title)}><span><strong>{j.title}</strong><small>{j.type} · {j.place}</small></span><ArrowUpRight /></button>)}</div><div className="job-detail"><span className="eyebrow">NOW HIRING</span><h3>{selected}</h3><p>{jobs.find(j => j.title === selected)?.text}</p><p>We value thoughtful work, open communication and a willingness to keep learning. Bring your experience and a point of view; we’ll bring a supportive team and meaningful challenges.</p><button className="button" onClick={() => {
              document.getElementById('application').scrollIntoView({
                behavior: 'smooth'
              });
              setSent(false);
            }}>Apply for this role <ArrowUpRight size={16} /></button></div></div></div></section><section id="application" className="section"><div className="container form-layout"><div><Heading eyebrow="YOUR NEXT STEP" title={<>Say <em>hello.</em></>} body="Share a little about yourself and the role you’re interested in." /><p className="demo-note">Demo application form: submissions are not sent to or stored by Nexora Technologies.</p></div>{sent ? <div className="success"><Check /><h3>Thanks for reaching out.</h3><p>Your demo application has been submitted in this session. It has not been stored or sent.</p><button className="text-link" onClick={() => setSent(false)}>Submit another <ArrowRight size={16} /></button></div> : <form className="form-grid" onSubmit={e => {
          e.preventDefault();
          setSent(true);
        }}><label>Full name<input required placeholder="Your name" /></label><label>Email address<input required type="email" placeholder="you@example.com" /></label><label>Phone number<input required type="tel" placeholder="+92 300 0000000" /></label><label>Position<select value={selected} onChange={e => setSelected(e.target.value)}>{jobs.map(j => <option key={j.title}>{j.title}</option>)}</select></label><label className="wide">Cover letter<textarea required rows="4" placeholder="Tell us a little about yourself…" /></label><label className="wide">Resume (PDF)<input required type="file" accept="application/pdf,.pdf" /></label><button className="button" type="submit">Submit demo application <ArrowUpRight size={16} /></button></form>}</div></section></>;
}
