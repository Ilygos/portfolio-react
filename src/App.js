import React, { useEffect, useMemo, useState } from 'react';
import detectBrowserLanguage from 'detect-browser-language';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Button } from '@heroui/react';

import { enLocalization } from './Localization/en_EN';
import { frLocalization } from './Localization/fr_FR';
import { jpLocalization } from './Localization/ja_JP';
import { koLocalization } from './Localization/ko_KR';

const FRENCH_KEY = 'fr';
const ENGLISH_KEY = 'en';
const JAPANESE_KEY = 'ja';
const KOREAN_KEY = 'ko';

const SECTION_HOME = 'home';
const SECTION_WORK = 'work';
const SECTION_ABOUT = 'about';
const SECTION_CONTACT = 'contact';

function assetPath(path) {
  return `.${path}`;
}

const projectVisuals = {
  0: assetPath('/img/frag.jpg'),
  1: assetPath('/img/sup.png'),
  2: assetPath('/img/kaihora.jpg'),
  3: assetPath('/img/pacman.jpg'),
  4: assetPath('/img/writenslash.png'),
  5: assetPath('/img/flump.png'),
  6: assetPath('/img/beetle.png'),
  7: assetPath('/img/peachar.png'),
  8: null,
};

const youtubeIcon = assetPath('/img/youtube.png');
const downloadIcon = assetPath('/img/download.png');
const aboutImage = assetPath('/img/synthgif.gif');
const linkedinIcon = assetPath('/img/LinkedIn.png');
const gmailIcon = assetPath('/img/gmail.png');
const meImage = assetPath('/img/me.jpg');

const localizationsByLanguage = {
  [ENGLISH_KEY]: enLocalization,
  [FRENCH_KEY]: frLocalization,
  [JAPANESE_KEY]: jpLocalization,
  [KOREAN_KEY]: koLocalization,
};

const languages = [
  { id: 'lang-en', languageName: 'English', languageKey: ENGLISH_KEY },
  { id: 'lang-fr', languageName: 'Français', languageKey: FRENCH_KEY },
  { id: 'lang-ja', languageName: '日本語', languageKey: JAPANESE_KEY },
  { id: 'lang-ko', languageName: '한국어', languageKey: KOREAN_KEY },
];

const projects = [
  { id: 8, value: 'Ensapia Engineering' },
  { id: 0, value: 'Frag Pro Shooter' },
  { id: 1, value: 'SUP: Multiplayer Racing Games' },
  { id: 2, value: 'Kahiora' },
  { id: 3, value: 'PAC-MAN: Party Royal' },
  { id: 4, value: "Write'n slash" },
  { id: 5, value: 'Flump vs Humanity' },
  { id: 6, value: 'Beetlefield' },
  { id: 7, value: 'PeachAR' },
];

const sectionReveal = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.64, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 14 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
};

function getDefaultLanguage() {
  const browserLanguage = detectBrowserLanguage();
  const shortLanguage = browserLanguage ? browserLanguage.substring(0, 2) : ENGLISH_KEY;

  if (shortLanguage === FRENCH_KEY || shortLanguage === JAPANESE_KEY || shortLanguage === KOREAN_KEY) {
    return shortLanguage;
  }

  return ENGLISH_KEY;
}

function App() {
  const prefersReducedMotion = useReducedMotion();
  const [language, setLanguage] = useState(ENGLISH_KEY);
  const [activeSection, setActiveSection] = useState(SECTION_HOME);
  const [selectedProjectID, setSelectedProjectID] = useState(8);
  const [isClientMounted, setIsClientMounted] = useState(false);
  const localization = useMemo(() => localizationsByLanguage[language] || enLocalization, [language]);

  useEffect(() => {
    const fontDefinitions = [
      { family: 'Sephora', url: './Fonts/Sephora.ttf' },
      { family: 'Kosugi', url: './Fonts/KosugiMaru-Regular.ttf' },
      { family: 'VCR', url: './Fonts/VCR.ttf' },
    ];

    if (typeof document !== 'undefined' && document.fonts) {
      Promise.all(
        fontDefinitions.map(async ({ family, url }) => {
          const loadedFont = await new FontFace(family, `url(${url})`).load();
          document.fonts.add(loadedFont);
          document.documentElement.style.setProperty(`--font-${family.toLowerCase()}`, `"${family}"`);
          return loadedFont;
        })
      ).catch(() => {});
    }

    document.documentElement.style.setProperty('--portfolio-bg-image', `url("${assetPath('/img/SYNTH_BG.jpg')}")`);
    setLanguage(getDefaultLanguage());
    setIsClientMounted(true);
  }, []);

  useEffect(() => {
    const sectionIds = [SECTION_HOME, SECTION_WORK, SECTION_ABOUT, SECTION_CONTACT];
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target?.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: [0.25, 0.5, 0.75],
      }
    );

    sectionIds.forEach((id) => {
      const sectionElement = document.getElementById(id);
      if (sectionElement) {
        observer.observe(sectionElement);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const selectedProject = projects.find((project) => project.id === selectedProjectID) || projects[0];
  const selectedKeyPrefix = `project_${selectedProject.id}`;
  const selectedProjectName = localization.project[`${selectedKeyPrefix}_name`] || selectedProject.value;
  const selectedProjectDescription = localization.project[`${selectedKeyPrefix}_desc`] || '';
  const selectedProjectPlatform = localization.project[`${selectedKeyPrefix}_platform`] || '';
  const selectedProjectTrailer = localization.project[`${selectedKeyPrefix}_trailer`] || '';
  const selectedProjectDownload = localization.project[`${selectedKeyPrefix}_download`] || '';

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);

    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${sectionId}`);
    }
  };

  const revealInitial = prefersReducedMotion ? undefined : 'hidden';
  const revealWhileInView = prefersReducedMotion ? undefined : 'show';

  return (
    <div className="app-shell">
      <motion.header
        className="site-header sticky-nav"
        initial={prefersReducedMotion ? false : { opacity: 0, y: -14 }}
        animate={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav className="navbar-shell" aria-label="Primary">
          <a className="brand" href={`#${SECTION_HOME}`}>{localization.navbar.brand}</a>

          <div className="nav-links" role="list">
            <a className={activeSection === SECTION_HOME ? 'nav-link active' : 'nav-link'} href={`#${SECTION_HOME}`}>Home</a>
            <a className={activeSection === SECTION_WORK ? 'nav-link active' : 'nav-link'} href={`#${SECTION_WORK}`}>{localization.navbar.projects}</a>
            <a className={activeSection === SECTION_ABOUT ? 'nav-link active' : 'nav-link'} href={`#${SECTION_ABOUT}`}>{localization.navbar.about}</a>
            <a className={activeSection === SECTION_CONTACT ? 'nav-link active' : 'nav-link'} href={`#${SECTION_CONTACT}`}>Contact</a>
          </div>

          <label className="lang-switch" htmlFor="language-switcher">
            <span className="lang-label">{localization.navbar.languages}</span>
            <select
              id="language-switcher"
              value={language}
              onChange={(event) => {
                setLanguage(event.target.value);
              }}
              aria-label="Select language"
            >
              {languages.map((item) => (
                <option key={item.id} value={item.languageKey}>
                  {item.languageName}
                </option>
              ))}
            </select>
          </label>
        </nav>
      </motion.header>

      <main className="page-shell" id="top">
        <motion.section
          id={SECTION_HOME}
          className="content-panel home-panel"
          aria-labelledby="home-title"
          variants={sectionReveal}
          initial={revealInitial}
          whileInView={revealWhileInView}
          viewport={{ once: true, amount: 0.26 }}
        >
          <div className="home-hero">
            <motion.div className="home-copy" variants={staggerContainer} initial={revealInitial} whileInView={revealWhileInView} viewport={{ once: true, amount: 0.3 }}>
              <motion.p className="eyebrow" variants={staggerItem}>Portfolio</motion.p>
              <motion.h1 id="home-title" className="home-title" variants={staggerItem}>{localization.home.headline}</motion.h1>
              <motion.p className="home-txt" variants={staggerItem}>{localization.home.text}</motion.p>

              <motion.div className="cta-row" variants={staggerItem}>
                {isClientMounted ? (
                  <>
                    <Button
                      className="cta-button cta-primary"
                      onPress={() => scrollToSection(SECTION_WORK)}
                      variant="solid"
                    >
                      View projects
                    </Button>
                    <Button
                      className="cta-button cta-secondary"
                      onPress={() => scrollToSection(SECTION_CONTACT)}
                      variant="bordered"
                    >
                      Get in touch
                    </Button>
                  </>
                ) : (
                  <>
                    <button type="button" className="cta-button cta-primary" onClick={() => scrollToSection(SECTION_WORK)}>
                      View projects
                    </button>
                    <button type="button" className="cta-button cta-secondary" onClick={() => scrollToSection(SECTION_CONTACT)}>
                      Get in touch
                    </button>
                  </>
                )}
              </motion.div>

              <motion.div className="img-row" variants={staggerItem}>
                <a href="https://www.linkedin.com/in/maxencebeaumont/" target="_blank" rel="noreferrer" aria-label="Open LinkedIn profile">
                  <img src={linkedinIcon} className="rounded-rect-button" alt="LinkedIn" />
                </a>
                <a href="mailto:contact.maxencebeaumont@gmail.com" aria-label="Send an email">
                  <img src={gmailIcon} className="rounded-rect-button" alt="Email" />
                </a>
              </motion.div>
            </motion.div>

            <motion.img
              className="about-image home-image"
              src={aboutImage}
              alt="Animated visual atmosphere for the portfolio"
              initial={prefersReducedMotion ? false : { opacity: 0, x: 22, scale: 0.98 }}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.28 }}
            />
          </div>

          <div className="paragraph-container home-panel-note">
            <p className="home-txt">{localization.home.subtext}</p>
            <div className="img-row">
              <span className="home-pill">Game tools</span>
              <span className="home-pill">AI workflows</span>
              <span className="home-pill">Technical leadership</span>
            </div>
          </div>
        </motion.section>

        <motion.section
          id={SECTION_WORK}
          className="content-panel work-panel"
          aria-labelledby="work-title"
          variants={sectionReveal}
          initial={revealInitial}
          whileInView={revealWhileInView}
          viewport={{ once: true, amount: 0.18 }}
        >
          <p className="eyebrow">Selected work</p>
          <h2 id="work-title" className="section-title">Projects</h2>

          <motion.div
            className="project-grid"
            role="list"
            variants={staggerContainer}
            initial={revealInitial}
            whileInView={revealWhileInView}
            viewport={{ once: true, amount: 0.24 }}
          >
            {projects.map((project) => {
              const keyPrefix = `project_${project.id}`;
              const title = localization.project[`${keyPrefix}_name`] || project.value;
              const platform = localization.project[`${keyPrefix}_platform`] || '';
              const isSelected = project.id === selectedProjectID;

              return (
                <motion.button
                  key={project.id}
                  type="button"
                  className={isSelected ? 'project-card selected' : 'project-card'}
                  onClick={() => setSelectedProjectID(project.id)}
                  aria-pressed={isSelected}
                  variants={staggerItem}
                  whileHover={prefersReducedMotion ? {} : { y: -4, scale: 1.01 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.985 }}
                >
                  <span className="project-card-title">{title}</span>
                  <span className="project-card-meta">{platform}</span>
                </motion.button>
              );
            })}
          </motion.div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.article
              key={selectedProject.id}
              className="project-detail"
              aria-live="polite"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18, filter: 'blur(6px)' }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -12, filter: 'blur(6px)' }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="project-title">{selectedProjectName}</h3>
              {projectVisuals[selectedProject.id] ? (
                <img
                  src={projectVisuals[selectedProject.id]}
                  className="project-visual"
                  alt={`${selectedProjectName} visual preview`}
                  loading="lazy"
                />
              ) : null}

              <div className="paragraph-container">
                <p className="project-desc">{selectedProjectDescription}</p>
                <p className="project-platform">{selectedProjectPlatform}</p>

                <div className="img-row">
                  {selectedProjectTrailer ? (
                    <a href={selectedProjectTrailer} target="_blank" rel="noreferrer" aria-label="Watch trailer">
                      <img src={youtubeIcon} className="rounded-rect-button" alt="Trailer" />
                    </a>
                  ) : null}

                  {selectedProjectDownload ? (
                    <a href={selectedProjectDownload} target="_blank" rel="noreferrer" aria-label="Open project link">
                      <img src={downloadIcon} className="rounded-rect-button" alt="Project link" />
                    </a>
                  ) : null}
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </motion.section>

        <motion.section
          id={SECTION_ABOUT}
          className="content-panel profile-panel"
          aria-labelledby="about-title"
          variants={sectionReveal}
          initial={revealInitial}
          whileInView={revealWhileInView}
          viewport={{ once: true, amount: 0.2 }}
        >
          <p className="eyebrow">Profile</p>
          <h2 id="about-title" className="section-title">{localization.navbar.about}</h2>

          <img className="me-image" src={meImage} alt="Portrait of Maxence Beaumont" loading="lazy" />

          <div className="paragraph-container">
            <p className="about-txt">{localization.about.line1}</p>
            <p className="about-txt">{localization.about.line2}</p>
            <p className="about-txt">{localization.about.line3}</p>
            <p className="about-txt">{localization.about.line4}</p>
          </div>
        </motion.section>

        <motion.section
          id={SECTION_CONTACT}
          className="content-panel contact-panel"
          aria-labelledby="contact-title"
          variants={sectionReveal}
          initial={revealInitial}
          whileInView={revealWhileInView}
          viewport={{ once: true, amount: 0.24 }}
        >
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title" className="section-title">Let's build something impactful.</h2>
          <p className="home-txt contact-copy">Available for tool programming, gameplay systems, and AI-assisted engineering workflows.</p>
          <div className="img-row">
            <a href="https://www.linkedin.com/in/maxencebeaumont/" target="_blank" rel="noreferrer" aria-label="Open LinkedIn profile">
              <img src={linkedinIcon} className="rounded-rect-button" alt="LinkedIn" />
            </a>
            <a href="mailto:contact.maxencebeaumont@gmail.com" aria-label="Send an email">
              <img src={gmailIcon} className="rounded-rect-button" alt="Email" />
            </a>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

export default App;
