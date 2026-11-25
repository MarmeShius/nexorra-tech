import { useLocation, Route, Routes } from 'react-router-dom';
import { Footer, Header } from './components/SiteLayout.jsx';
import ChatAssistant from './components/ChatAssistant.jsx';
import About from './pages/About.jsx';
import Careers from './pages/Careers.jsx';
import CaseDetail from './pages/CaseDetail.jsx';
import Contact from './pages/Contact.jsx';
import Home from './pages/Home.jsx';
import Industries from './pages/Industries.jsx';
import NotFound from './pages/NotFound.jsx';
import Services from './pages/Services.jsx';
import Work from './pages/Work.jsx';
export default function App() {
  const location = useLocation();
  return <>
      <Header />
      <main key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:id" element={<CaseDetail />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <ChatAssistant />
    </>;
}
