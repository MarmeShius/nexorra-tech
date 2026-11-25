import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { projects } from '../data.js';
import { ContactBanner, PageHero } from '../components/PageElements.jsx';
export default function CaseDetail() {
  const {
    id
  } = useParams();
  const project = projects.find(p => p.n === id);
  if (!project) return <NotFound />;
  const i = projects.indexOf(project);
  return <><PageHero eyebrow={`${project.industry} · CONCEPT ${project.n}`} title={project.title} body={project.desc} /><section className="section"><div className="container case-layout"><div className="case-image" style={{
          backgroundImage: `url(${project.image})`
        }} /><div className="case-copy"><span className="eyebrow">FICTIONAL PORTFOLIO CONCEPT</span><h2>The opportunity</h2><p>{['People need a clearer view of their finances, but everyday tools often scatter information across disconnected experiences.', 'Care teams need to keep people and appointments connected, while coordinating work across busy schedules.', 'Operations teams need to spot delivery changes early, but information can be spread across multiple systems.'][i]}</p><h2>Our approach</h2><p>{['We imagined a calm, responsive banking experience that brings balances, useful insights and everyday actions into one coherent product.', 'We shaped a connected care platform concept that puts appointments, patient context and team coordination into a clear shared workflow.', 'We designed an operations dashboard concept that makes shipment status, key milestones and exceptions easy to scan and act on.'][i]}</p><h2>Technology direction</h2><div className="tag-row">{project.tags.map(t => <span key={t}>{t}</span>)}</div></div></div></section><div className="container case-back"><Link className="text-link" to="/work"><ArrowRight className="back-arrow" size={17} /> Back to all projects</Link></div><ContactBanner /></>;
}
