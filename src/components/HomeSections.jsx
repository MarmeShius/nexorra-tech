import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, ChevronRight, Handshake, Lightbulb, Target } from 'lucide-react';
import { industries, projects, services } from '../data.js';
import { images } from '../assets/images.js';
import { Heading } from './PageElements.jsx';
import { Button } from './SiteLayout.jsx';
export function Hero() {
  return <section className="hero"><div className="hero-image" /><div className="container hero-content"><div className="hero-copy"><div className="eyebrow eyebrow-light"><span className="eyebrow-line" /> NEXORA TECHNOLOGIES · PAKISTAN</div><h1>Engineering<br />what’s <em>next.</em></h1><p>We turn ambitious ideas into thoughtful digital products and software that move businesses forward.</p><div className="hero-actions"><Button to="/contact">Start a conversation</Button><Link className="text-link light-link" to="/work">Explore our work <ArrowRight size={17} /></Link></div></div><div className="hero-index"><span>01 — 04</span><span>BUILDING WHAT MATTERS</span></div></div><div className="hero-scroll"><ArrowDown size={17} /><span>SCROLL TO EXPLORE</span></div></section>;
}
export function ServicesPreview() {
  return <section className="section services-section"><div className="container"><div className="section-top"><Heading eyebrow="WHAT WE DO" title={<>Technology with<br />a <em>point of view.</em></>} body="From first sketch to lasting scale, we bring the people, craft and engineering to make your next move count." /><Button to="/services">Explore our services</Button></div><div className="service-grid">{services.slice(0, 6).map(({
          icon: Icon,
          title,
          text
        }, i) => <Link to="/services" className="service-item" key={title}><span className="service-num">0{i + 1}</span><Icon size={25} strokeWidth={1.5} /><h3>{title}</h3><p>{text}</p><ArrowUpRight className="service-arrow" size={18} /></Link>)}</div></div></section>;
}
export function WorkPreview() {
  return <section className="section work-section"><div className="container"><div className="section-top"><Heading eyebrow="SELECTED THINKING" title={<>Good work starts<br />with <em>good questions.</em></>} body="A glimpse at the kinds of challenges we love to solve. These are illustrative concept projects, created to show how we think." /><Button to="/work">View all projects</Button></div><div className="project-grid">{projects.map(p => <ProjectCard key={p.n} p={p} />)}</div></div></section>;
}
export function ProjectCard({
  p
}) {
  return <Link to={`/work/${p.n}`} className="project-card"><div className="project-image" style={{
      backgroundImage: `url(${p.image})`
    }}><span className="project-count">{p.n}</span><span className="project-open"><ArrowUpRight /></span></div><div className="project-meta">{p.industry}</div><h3>{p.title}</h3><p>{p.desc}</p><div className="tag-row">{p.tags.map(t => <span key={t}>{t}</span>)}</div></Link>;
}
export function Industries() {
  return <section className="section industries-section"><div className="container industry-wrap"><div><Heading eyebrow="WHERE WE WORK" title={<>Built around<br /><em>your world.</em></>} body="We bring a considered, curious approach to the industries that shape everyday life and commerce." /><Link className="text-link" to="/industries">Explore our industries <ArrowRight size={17} /></Link></div><div className="industry-grid">{industries.map(({
          icon: Icon,
          title
        }) => <div className="industry-item" key={title}><Icon size={23} /><span>{title}</span><ChevronRight size={16} /></div>)}</div></div></section>;
}
export function WhyUs() {
  return <section className="section why-section"><div className="container why-grid"><div className="why-image" style={{
        backgroundImage: `url(${images.teamCollaboration})`
      }}><div className="image-note"><span>OUR APPROACH</span><strong>People first.<br />Progress always.</strong></div></div><div className="why-copy"><Heading eyebrow="WHY NEXORA" title={<>Good people.<br /><em>Clear purpose.</em></>} body="The best technology starts with understanding people. We pair deep engineering with open collaboration to create work that makes a difference." /><div className="values-list">{[[Lightbulb, 'Curiosity in every conversation'], [Target, 'Clarity from day one'], [Handshake, 'Partnership that lasts']].map(([Icon, t]) => <div key={t}><Icon size={19} /><span>{t}</span><Check size={16} /></div>)}</div><Button to="/about">Get to know us</Button></div></div></section>;
}
