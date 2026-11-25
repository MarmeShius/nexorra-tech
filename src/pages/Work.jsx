import { projects } from '../data.js';
import { ContactBanner, PageHero } from '../components/PageElements.jsx';
import { ProjectCard } from '../components/HomeSections.jsx';
export default function Work() {
  return <><PageHero eyebrow="SELECTED WORK" title={<>Ideas made<br /><em>tangible.</em></>} body="A collection of fictional product concepts that show how we approach meaningful digital challenges. Each project is an illustrative portfolio example, not a real client engagement." /><section className="section muted"><div className="container"><div className="project-grid project-grid-page">{projects.map(p => <ProjectCard key={p.n} p={p} />)}</div></div></section><ContactBanner /></>;
}
