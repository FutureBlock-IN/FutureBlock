#!/usr/bin/env node
/**
 * Generates standardized hero HTML for service pages.
 * Usage: node scripts/service-hero-snippet.js advisory
 */
const heroes = {
  advisory: {
    eyebrow: 'Advisory',
    l1: 'Advise',
    bold: 'Now',
    l3: 'Guide Your Digital Strategy',
    sub: 'Strategic Guidance for Digital Transformation',
    desc: 'Our advisory services focus on an in-depth evaluation of your current technological landscape. We provide actionable insights tailored to your unique challenges, ensuring you are empowered to make informed, strategic decisions.'
  },
  automation: {
    eyebrow: 'Automation',
    l1: 'Automate',
    bold: 'Now',
    l3: 'Transform Your Workflow',
    sub: 'Unleash the Power of Digital Workforce',
    desc: 'Streamline your operations with cutting-edge automation solutions. Reduce manual tasks, enhance efficiency, and drive innovation across your organization.'
  },
  integrations: {
    eyebrow: 'Integrations',
    l1: 'Modernize',
    bold: 'Now',
    l3: 'Transform Your Technology',
    sub: "Future-Ready Solutions for Today's Challenges",
    desc: 'Upgrade your technology infrastructure with our comprehensive modernization services. We help you embrace the future while maximizing your current investments.'
  },
  analytics: {
    eyebrow: 'Business Analytics',
    l1: 'Expert',
    bold: 'Squad',
    l3: 'At Your Service',
    sub: 'Your Trusted Technology Partners',
    desc: 'Access our team of skilled professionals ready to tackle your most complex technology challenges. We bring expertise, innovation, and dedication to every project.'
  },
  cloud: {
    eyebrow: 'Cloud',
    l1: 'Scale',
    bold: 'Now',
    l3: 'Transform Your Infrastructure',
    sub: 'Cloud-First Solutions for Modern Business',
    desc: 'Harness the power of cloud technology with scalable, secure infrastructure designed to accelerate your digital transformation and reduce operational complexity.'
  },
  innovation: {
    eyebrow: 'Innovation Nodes',
    l1: 'Innovate',
    bold: 'Now',
    l3: 'Shape the Future',
    sub: 'Disrupt or Get Disrupted',
    desc: 'Embrace the future with our cutting-edge innovation solutions. We help you stay ahead of the curve with transformative technologies and forward-thinking strategies.'
  }
};

const key = process.argv[2];
const h = heroes[key];
if (!h) {
  console.error('Unknown page:', key);
  process.exit(1);
}

console.log(`<section id="Home" class="p-0 fb-hero fb-hero--service">
  <div class="fb-hero__section fv2--hero-section-2">
    <div class="fb-hero__bg" aria-hidden="true">
      <div class="fb-hero__mesh"></div>
      <div class="fb-hero__blueprint"></div>
      <div class="fb-hero__bloom fb-hero__bloom--1"></div>
      <div class="fb-hero__bloom fb-hero__bloom--2"></div>
    </div>
    <div class="fb-hero__scrim" aria-hidden="true"></div>
    <div class="container fb-hero__container">
      <div class="fb-hero__copy">
        <span class="fb-hero__eyebrow">${h.eyebrow}</span>
        <h1 class="fb-hero__headline">
          <span class="fb-hero__line fb-hero__line--regular">${h.l1}</span>
          <span class="fb-hero__line fb-hero__line--bold">${h.bold}</span>
          <span class="fb-hero__line fb-hero__line--regular">${h.l3}</span>
        </h1>
        <p class="fb-hero__subheading">${h.sub}</p>
        <p class="fb-hero__description">${h.desc}</p>
      </div>
    </div>
  </div>
</section>`);
