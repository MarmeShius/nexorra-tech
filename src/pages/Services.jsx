import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { services } from '../data.js';
import { ContactBanner, PageHero } from '../components/PageElements.jsx';
export default function Services() {
  return <><PageHero eyebrow="OUR CAPABILITIES" title={<>The right skills<br />for what’s <em>next.</em></>} body="From a sharper digital product to a stronger technology foundation, we bring the experience to move your business forward." /><section className="section"><div className="container"><div className="full-service-grid">{services.map(({
            icon: Icon,
            title,
            text
          }, i) => <article key={title}><span className="service-num">0{i + 1}</span><Icon size={29} /><h2>{title}</h2><p>{text}</p><Link className="text-link" to="/contact">Talk to our team <ArrowRight size={16} /></Link></article>)}</div></div></section><ContactBanner /></>;
}
