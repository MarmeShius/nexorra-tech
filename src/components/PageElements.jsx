import { ArrowUpRight } from 'lucide-react';
import { Button } from './SiteLayout.jsx';
export function Heading({
  eyebrow,
  title,
  body
}) {
  return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{body && <p>{body}</p>}</div>;
}
export function PageHero({
  eyebrow,
  title,
  body,
  children
}) {
  return <section className="page-hero"><div className="container"><span className="eyebrow"><span className="eyebrow-line" />{eyebrow}</span><h1>{title}</h1>{body && <p>{body}</p>}{children}</div></section>;
}
export function ContactBanner() {
  return <section className="contact-banner"><div className="container banner-inner"><div><span className="eyebrow eyebrow-light">YOUR NEXT CHAPTER STARTS HERE</span><h2>Let’s build something<br /><em>that moves you forward.</em></h2></div><Button to="/contact" light>Tell us what you’re thinking</Button></div></section>;
}
