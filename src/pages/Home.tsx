import { lazy } from 'react';
import PageMeta from '../components/PageMeta';

const Hero = lazy(() => import('./hero'));
const About = lazy(() => import('./about'));
const Features = lazy(() => import('./features'));
const Story = lazy(() => import('./story'));
const Contact = lazy(() => import('./contact'));

const Home = () => {
  return (
    <>
      <PageMeta
        title="TulSip Media | Website Development for Businesses Ready to Grow"
        description="TulSip Media designs and develops custom business websites, e-commerce storefronts, landing pages, and web applications built for clarity, credibility, and growth."
        canonicalPath="/"
      />
      <Hero />
      <About />
      <Features />
      <Story />
      <Contact />
    </>
  );
};

export default Home;
