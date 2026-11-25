import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ArrowUpRight, Menu, X } from 'lucide-react';
export function Logo({
  light = false
}) {
  return <Link className={`brand ${light ? 'brand-light' : ''}`} to="/" aria-label="Nexora Technologies home"><span className="brand-mark"><svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><path d="M7 31V9l18 22V9" stroke="currentColor" strokeWidth="3.5" strokeLinecap="square" strokeLinejoin="miter" /><path d="M19 9h15M26.5 9v22" stroke="#4b91ff" strokeWidth="3.5" strokeLinecap="square" /></svg></span><span className="brand-name">nexora<span>technologies</span></span></Link>;
}
export function Button({
  to,
  children,
  light = false
}) {
  return <Link className={`button ${light ? 'button-light' : ''}`} to={to}>{children}<ArrowUpRight size={16} /></Link>;
}
export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="header"><div className="container nav"><Logo /><button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button><nav className={open ? 'nav-links nav-open' : 'nav-links'}>{[['About', '/about'], ['Services', '/services'], ['Industries', '/industries'], ['Our work', '/work'], ['Careers', '/careers']].map(([n, p]) => <NavLink onClick={() => setOpen(false)} className={({
          isActive
        }) => isActive ? 'active' : ''} key={p} to={p}>{n}</NavLink>)}<Button to="/contact">Let’s talk</Button></nav></div></header>;
}
export function Footer() {
  return <footer className="footer"><div className="container"><div className="footer-top"><div><Logo light /><p>Thoughtful technology.<br />Meaningful progress.</p></div><div className="footer-cta"><span>HAVE A CHALLENGE IN MIND?</span><Link to="/contact">Let’s make it happen <ArrowUpRight /></Link></div></div><div className="footer-bottom"><span>© 2025 Nexora Technologies. All rights reserved.</span><span>Designed for what’s next · Pakistan</span><div><Link to="/careers">Careers</Link><Link to="/contact">Contact</Link></div></div></div></footer>;
}
