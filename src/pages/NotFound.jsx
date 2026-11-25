import { Button } from '../components/SiteLayout.jsx';
import { PageHero } from '../components/PageElements.jsx';
export default function NotFound() {
  return <PageHero eyebrow="404 · PAGE NOT FOUND" title={<>A wrong turn.<br /><em>Easy fix.</em></>} body="The page you’re looking for may have moved. Let’s get you back on track."><Button to="/">Back to home</Button></PageHero>;
}
