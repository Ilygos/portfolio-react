// TO DEPLOY THE PORTFOLIO ON GH-PAGES RUN THIS IN CMD:
// npm run deploy 


// ReactJS
import React, { useEffect } from 'react';
import { setGlobal, useGlobal } from 'reactn';

// Libraries
import detectBrowserLanguage from 'detect-browser-language';

// Bootstrap
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

// Localizations
import { enLocalization } from './Localization/en_EN';
import { frLocalization } from './Localization/fr_FR';
import { jpLocalization } from './Localization/ja_JP';
import { koLocalization } from './Localization/ko_KR';

// CONSTS
const PROJECT_STATE = 'project';
const HOME_STATE = 'home';
const ABOUT_STATE = 'about';

const FRENCH_KEY = 'fr';
const ENGLISH_KEY = 'en';
const JAPANESE_KEY = 'ja';
const KOREAN_KEY = 'ko';

const projectVisuals = [
  '/img/frag.jpg',
  '/img/sup.png',
  '/img/kaihora.jpg',
  '/img/pacman.jpg',
  '/img/writenslash.png',
  '/img/flump.png',
  '/img/beetle.png',
  '/img/peachar.png',
  null,
];

const youtubeIcon = '/img/youtube.png';
const downloadIcon = '/img/download.png';
const aboutImage = '/img/synthgif.gif';
const linkedinIcon = '/img/LinkedIn.png';
const gmailIcon = '/img/gmail.png';
const meImage = '/img/me.jpg';

const languages = [
    {
      id: 'lang-en',
      languageName: "English",
      languageKey: ENGLISH_KEY
    },
    {
      id: 'lang-fr',
      languageName: "Français",
      languageKey: FRENCH_KEY
    },
    {
      id: 'lang-ja',
      languageName: "日本語",
      languageKey: JAPANESE_KEY
    },
    {
      id: 'lang-ko',
      languageName: "한국어",
      languageKey: KOREAN_KEY
    }
]

const projects = [
  {
    id: 8,
    value: 'Ensapia Engineering',
  },
  {
    id: 0,
    value: 'Frag Pro Shooter',
  },
  {
    id: 1,
    value: 'SUP: Multiplayer Racing Games',
  },
  {
    id: 2,
    value: 'Kahiora'
  },
  {
    id: 3,
    value: 'PAC-MAN: Party Royal',
  },
  {
    id: 4,
    value: 'Write\'n slash',
  },
  {
    id: 5,
    value: 'Flump vs Humanity',
  },
  {
    id: 6,
    value: 'Beetlefield',
  },
  {
    id: 7,
    value: 'PeachAR',
  },
]

// GLOBALS
setGlobal({
  localization: frLocalization
});


setGlobal({
  state: 'home'
});

setGlobal({
  projectID: -1
});



// APP
function App() {
  const [ , setLocalization ] = useGlobal('localization');
  useEffect(() => {
    const lang = detectBrowserLanguage().substring(0,2);
    if (lang === JAPANESE_KEY)
      setLocalization(jpLocalization);
    else if (lang === KOREAN_KEY)
      setLocalization(koLocalization);
    else if (lang === FRENCH_KEY)
      setLocalization(frLocalization);
    else 
      setLocalization(frLocalization);
  }, [setLocalization]);
  return (
    <div className="app-shell">
      <NavbarFunction />
      <main className="page-shell">
        <BodyGenerator />
      </main>
    </div>
  );
}



function BodyGenerator() {
  const [ state ] = useGlobal('state');
  var ret;
  if (state === PROJECT_STATE) {
    ret = <ProjectBody />;
  }
  else if (state === ABOUT_STATE)
  {
    ret = <AboutBody />;
  }
  else {
    ret = <HomeBody />;
  }
  return (ret);
}

function ProjectBody() {
  const [ projectID ] = useGlobal('projectID');
  const [ localization ] = useGlobal('localization');
  const keyPrefix = "project_"+projectID;
  var trailerBtn = localization.project[keyPrefix+"_trailer"] === "" ? <div></div> : <a href={localization.project[keyPrefix+"_trailer"]} ><img src={youtubeIcon} className="rounded-rect-button" alt="Trailer" /></a>;
  var downloadBtn = localization.project[keyPrefix+"_download"] === "" ? <div></div> : <a href={localization.project[keyPrefix+"_download"]} ><img src={downloadIcon} className="rounded-rect-button" alt="Download" /></a>;
  var buttons = 
  <div className="img-row">
        {trailerBtn}
        {downloadBtn}
  </div>;
  return(
    <section className="content-panel project-panel">
      <p className="eyebrow">Project spotlight</p>
      <h1 className="project-title">{localization.project[keyPrefix+"_name"]}</h1>
      {projectVisuals[projectID] ? <img src={projectVisuals[projectID]} className="project-visual" alt=""/> : null}
      <div className="paragraph-container">
        <p className="project-desc">{localization.project[keyPrefix+"_desc"]}</p>
        <p className='project-platform'>{localization.project[keyPrefix+"_platform"]}</p>
        {buttons}
      </div>
    </section>
  );
}

function AboutBody() {
  const [ localization ] = useGlobal('localization');
  return (
    <section className="content-panel profile-panel">
      <p className="eyebrow">About me</p>
      <img className="me-image" src={meImage} alt=""/>
      <div className="paragraph-container">
        <p className="about-txt">{localization.about["line1"]}</p>
        <p className="about-txt">{localization.about["line2"]}</p>
        <p className="about-txt">{localization.about["line3"]}</p>
        <p className="about-txt">{localization.about["line4"]}</p>
        <div className="img-row">
          <a href="https://www.linkedin.com/in/maxencebeaumont/" ><img src={linkedinIcon} className="rounded-rect-button" alt="LinkedIn profile" /></a>
          <a href="mailto:contact.maxencebeaumont@gmail.com" ><img src={gmailIcon} className="rounded-rect-button" alt="Send Mail" /></a>
        </div>
      </div>
    </section>
  );
}

function HomeBody() {
  const [ localization ] = useGlobal('localization');
  return (
    <section className="content-panel home-panel">
      <p className="eyebrow">Portfolio</p>
      <img className="about-image" src={aboutImage} alt=""/>
      <div className="paragraph-container">
        <p className="home-txt">{localization.home["text"]}</p>
        <div className="img-row">
          <a href="https://www.linkedin.com/in/maxencebeaumont/" ><img src={linkedinIcon} className="rounded-rect-button" alt="LinkedIn profile" /></a>
          <a href="mailto:contact.maxencebeaumont@gmail.com" ><img src={gmailIcon} className="rounded-rect-button" alt="Send Mail" /></a>
        </div>
      </div>
    </section>
  );
}

function NavbarFunction() {
  const [ state, setState ] = useGlobal('state');
  const [ localization ] = useGlobal('localization');

  return (
  <Navbar expand="lg" className="sticky-nav navbar-shell">
    <Navbar.Brand href={"#"+state} onClick={(e) => {setState(HOME_STATE)}}>{localization.navbar["brand"]}</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href={"#"+state} onClick={(e) => {setState(ABOUT_STATE)}} >{localization.navbar["about"]}</Nav.Link>
        <NavDropdown title={localization.navbar["projects"]} id="basic-nav-dropdown">
          <ProjectsDropdown />
        </NavDropdown>
        <NavDropdown title={localization.navbar["languages"]} id="basic-nav-dropdown">
          <LanguageDropdown />
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  );
}

function LanguageDropdown() {
  const [ , setLocalization ] = useGlobal('localization');
  function localize(lang)
  {
    if (lang === FRENCH_KEY)
      setLocalization(frLocalization);
    else if (lang === JAPANESE_KEY)
      setLocalization(jpLocalization);
    else if (lang === KOREAN_KEY)
      setLocalization(koLocalization);
    else 
      setLocalization(enLocalization);
  }
  
  return (
    languages.map((language) =>
      <NavDropdown.Item key={language.id} onClick={(e) => {
        localize(language.languageKey);
      }
      }>{language.languageName}</NavDropdown.Item>
    )
  );
}

function ProjectsDropdown() {
  const [ projectID, setProjectID ] = useGlobal('projectID');
  const [ , setState ] = useGlobal('state');
   return (
    projects.map((project) =>
      <NavDropdown.Item key={project.id} onClick={(e) => {
        setState(PROJECT_STATE);
        setProjectID(project.id);
      }
      }  href={'#project' + project.id}>{project.value}</NavDropdown.Item>
    )
  );
}


export default App;
