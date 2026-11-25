import { industries } from '../data.js';
import { ContactBanner, PageHero } from '../components/PageElements.jsx';
export default function IndustriesPage() {
  return <><PageHero eyebrow="INDUSTRIES" title={<>Deep context.<br /><em>Useful change.</em></>} body="Great technology takes the realities of your industry seriously. We get close to the challenges, then make the complex feel simpler." /><section className="section muted"><div className="container"><div className="industry-detail-grid">{industries.map(({
            icon: Icon,
            title
          }, i) => <article key={title}><Icon /><span className="service-num">0{i + 1}</span><h2>{title}</h2><p>{['Digital experiences that put trust, clarity and control in every financial decision.', 'Connected health tools that make better care easier to access and coordinate.', 'Learning platforms that open new pathways to knowledge and opportunity.', 'Commerce experiences that make discovery, purchase and fulfilment feel effortless.', 'Smarter operations that connect teams, shipments and the people waiting for them.', 'Secure, scalable systems that help ambitious organisations evolve with confidence.'][i]}</p></article>)}</div></div></section><ContactBanner /></>;
}
