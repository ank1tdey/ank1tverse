// ─────────────────────────────────────────────────────────────
// Every word, link, image and video on the site lives in this file.
// Media goes in /public/media/. Write paths without a leading slash,
// for example 'media/reel-1.mp4'. Leave a path empty ('') to keep the
// placeholder box showing.
// ─────────────────────────────────────────────────────────────

export const site = {
  name: 'Ankit Dey',
  tagline: 'Designer & Storyteller',
  subtitle: 'I design brands, build websites and tell stories.',
  location: 'Kolkata, India',
  timeZone: 'Asia/Kolkata',
  timeZoneLabel: 'IST',
  email: 'ankitdeypersonal@gmail.com',
  // Country code + number, digits only.
  whatsapp: '918617646356',
  whatsappGreeting: "Hi Ankit, I'd like to talk about a project.",
};

// Hero photo. `image` is the full photo (shown in black and white behind the
// name). `cutout` is optional: the same photo with the background removed, so
// you stand in front of your name.
export const hero = {
  image: '',
  cutout: '',
};

export const nav = [
  { label: 'Projects', href: '#projects' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export const intro = {
  text: 'I turn curiosity into concepts, and concepts into things people can experience: brand identities, websites, campaigns and content for small businesses, startups and anyone with an idea worth showing.',
  primary: 'Start a project',
  primaryHref: '#contact',
  secondary: 'See projects',
  secondaryHref: '#projects',
};

// The boxes that fly in under the intro. `ratio` is width / height:
// '9/16' for reels, '16/9' for wide video, '1/1' for square.
// `type` is 'video' or 'image'; `poster` is an optional still for a video.
export const showreel = [
  { type: 'video', src: '', poster: '', ratio: '9/16', label: 'Reel' },
  { type: 'video', src: '', poster: '', ratio: '16/9', label: 'Wide video' },
  { type: 'image', src: '', ratio: '1/1', label: 'Square image' },
  { type: 'video', src: '', poster: '', ratio: '9/16', label: 'Reel' },
  { type: 'video', src: '', poster: '', ratio: '16/9', label: 'Wide video' },
];

// Project or product slots. Add a title, a line about it, and an image or a
// video. `link` is optional.
export const projects = [
  { title: '', summary: '', image: '', video: '', link: null },
  { title: '', summary: '', image: '', video: '', link: null },
  { title: '', summary: '', image: '', video: '', link: null },
  { title: '', summary: '', image: '', video: '', link: null },
  { title: '', summary: '', image: '', video: '', link: null },
  { title: '', summary: '', image: '', video: '', link: null },
];

export const services = [
  {
    title: 'Brand identity',
    text: 'Logos, colours, type and the rules that keep your brand looking like itself everywhere.',
  },
  {
    title: 'Websites',
    text: 'Designed and coded by me, built to load fast and read well on any phone.',
  },
  {
    title: 'Graphic design',
    text: 'Posters, social posts, campaigns and print, each built around one clear idea.',
  },
  {
    title: 'Content Creation & Storytelling',
    text: 'Visual stories, captions and scripts that sound like you, not like a template.',
  },
];

export const approach = {
  statement: 'Understand first. Design second. Build third.',
  steps: [
    { title: 'Understand', text: 'I learn your business, your audience and what the work has to do before drawing anything.' },
    { title: 'Design', text: 'The idea becomes a look and a system you can see, react to and shape with me.' },
    { title: 'Build', text: 'I turn the approved design into the finished thing: files, a website or a full campaign.' },
  ],
};

export const about = {
  paragraphs: [
    "I'm Ankit Dey, a designer from Kolkata who also builds what he designs. I trained in game and interactive media design at Arena Animation, and it taught me to think in experiences: how something moves, how it feels to use, and what people remember after they leave.",
    'Today I run WebToU, a digital creative agency for small businesses, startups and individuals. I shape the brand, write the story and code the website, so the idea stays whole from the first sketch to launch day.',
    "I'm also studying business, so every project starts with the same question: what does this need to achieve? Once that's clear, I make it look and feel right.",
  ],
  // A photo (or short video) next to the text.
  photo: { image: '', video: '' },
  credits: [
    { role: 'Founder & CTO', detail: 'WebToU' },
    { role: 'BA, Game & Interactive Media Design', detail: 'Arena Animation', when: '2022–2024' },
    { role: 'BBA', detail: 'Amity University Online', when: '2026–2029, in progress' },
    { role: 'Languages', detail: 'English, Bengali, Hindi' },
  ],
};

export const contact = {
  title: "Let's talk",
  text: 'Tell me about your brand, your launch or the website you have in mind. I reply on WhatsApp or email.',
  whatsappLabel: 'Chat on WhatsApp',
  emailLabel: 'Copy email',
  emailCopied: 'Email copied',
  formTitle: 'Or write it here and send it through WhatsApp',
  formButton: 'Send on WhatsApp',
};

export const socials = [
  { label: 'Behance', href: 'https://www.behance.net/anki1tdey' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ank1tdey/' },
  { label: 'Instagram', href: 'https://www.instagram.com/ank1tcore/' },
  { label: 'GitHub', href: 'https://github.com/ank1tdey' },
];
