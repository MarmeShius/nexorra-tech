import { Code2, PanelsTopLeft, Smartphone, DraftingCompass, Cloud, ShieldCheck, BriefcaseBusiness, Landmark, HeartPulse, GraduationCap, ShoppingBag, Truck, Building2 } from 'lucide-react';
import { images } from './assets/images.js';
export const services = [{
  icon: Code2,
  title: 'Custom software',
  text: 'Purpose-built platforms that fit the way your business works—and where it is going.'
}, {
  icon: PanelsTopLeft,
  title: 'Web applications',
  text: 'Fast, accessible web products that turn complex workflows into clear experiences.'
}, {
  icon: Smartphone,
  title: 'Mobile development',
  text: 'Useful, refined iOS and Android apps that keep customers close to your business.'
}, {
  icon: DraftingCompass,
  title: 'Product & UX design',
  text: 'Research-led design that makes every interaction feel considered and intuitive.'
}, {
  icon: Cloud,
  title: 'Cloud & DevOps',
  text: 'Reliable cloud foundations, automated delivery and room to scale with confidence.'
}, {
  icon: ShieldCheck,
  title: 'Quality engineering',
  text: 'Proactive testing and assurance built into every stage of the delivery lifecycle.'
}, {
  icon: BriefcaseBusiness,
  title: 'Technology consulting',
  text: 'Practical guidance to make sharper technology decisions and modernise with purpose.'
}];
export const industries = [{
  icon: Landmark,
  title: 'Financial services'
}, {
  icon: HeartPulse,
  title: 'Healthcare'
}, {
  icon: GraduationCap,
  title: 'Education'
}, {
  icon: ShoppingBag,
  title: 'Commerce'
}, {
  icon: Truck,
  title: 'Logistics'
}, {
  icon: Building2,
  title: 'Enterprise'
}];
export const projects = [{
  n: '01',
  industry: 'FINANCIAL SERVICES',
  title: 'A clearer way to manage money',
  desc: 'A concept banking experience that brings everyday finances, insight and action into one calm, connected platform.',
  tags: ['FinTech', 'Product design', 'React'],
  image: images.projectFinance
}, {
  n: '02',
  industry: 'HEALTHCARE',
  title: 'Better care, connected',
  desc: 'A fictional digital health platform concept helping care teams coordinate appointments and patient journeys.',
  tags: ['HealthTech', 'Web platform', 'Cloud'],
  image: images.projectHealthcare
}, {
  n: '03',
  industry: 'LOGISTICS',
  title: 'From warehouse to doorstep',
  desc: 'A connected operations dashboard concept that gives teams a live view of movement, milestones and exceptions.',
  tags: ['Logistics', 'Dashboard', 'Data'],
  image: images.projectLogistics
}];
export const jobs = [{
  title: 'Junior Frontend Developer',
  type: 'Full-time',
  place: 'Faisalabad · Hybrid',
  text: 'Help craft accessible, responsive interfaces alongside a thoughtful product team.'
}, {
  title: 'MERN Stack Developer',
  type: 'Full-time',
  place: 'Faisalabad · Hybrid',
  text: 'Build reliable end-to-end product experiences with modern JavaScript technologies.'
}, {
  title: 'UI/UX Designer',
  type: 'Full-time',
  place: 'Remote · Pakistan',
  text: 'Shape digital products through research, prototyping and careful visual craft.'
}];
