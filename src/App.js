// ReactJS
import React, {setGlobal, useGlobal} from 'reactn';

// Libraries
import detectBrowserLanguage from 'detect-browser-language';

// Bootstrap
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

// CSS
import './App.css';

// Localizations
import { enLocalization } from './Localization/en_EN';
import { frLocalization } from './Localization/fr_FR';
import { jpLocalization } from './Localization/ja_JP';

//Project Images
import beetle from './img/beetle.png';
import flump from './img/flump.png';
import kaihora from './img/kaihora.jpg';
import pacman from './img/pacman.jpg';
import peachar from './img/peachar.png';
import writenslash from './img/writenslash.png'

//About Image
import aboutImg from './img/synthgif.gif';
import linkedin from './img/LinkedIn.png';
import gmail from './img/gmail.png';
import me from './img/me.jpg'

// CONSTS
const PROJECT_STATE = 'project';
const HOME_STATE = 'home';
const ABOUT_STATE = 'about';

const FRENCH_KEY = 'fr';
const ENGLISH_KEY = 'en';
const JAPANESE_KEY = 'ja';

var firstTime = false;

const languages = [
    {
      languageName: "English",
      languageKey: ENGLISH_KEY
    },
    {
      languageName: "Francais",
      languageKey: FRENCH_KEY
    },
    {
      languageName: "日本語",
      languageKey: JAPANESE_KEY
    }
]

const projects = [
  {
    id: 0,
    value: 'Kahiora',
  },
  {
    id: 1,
    value: 'PAC-MAN: Party Royal',
  },
  {
    id: 2,
    value: 'Write\'n slash',
  },
  {
    id: 3,
    value: 'Flump vs Humanity',
  },
  {
    id: 4,
    value: 'Beetlefield',
  },
  {
    id: 5,
    value: 'PeachAR',
  },
]

const projectVisuals = [
  kaihora,
  pacman,
  writenslash,
  flump,
  beetle,
  peachar
]

// GLOBALS
setGlobal({
  localization: enLocalization
});


setGlobal({
  state: 'home'
});

setGlobal({
  projectID: -1
});



// APP
function App() {
  const [ localization, setLocalization ] = useGlobal('localization');
  if (!firstTime)
  {
    firstTime = true;
    const lang = detectBrowserLanguage().substring(0,2);
    if (lang === JAPANESE_KEY)
      setLocalization(jpLocalization);
    else if (lang === FRENCH_KEY)
      setLocalization(frLocalization);
    else 
      setLocalization(enLocalization);
  }
  return (
    <div>
      <NavbarFunction />
      <BodyGenerator />
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
  return(
    <>
    <h1 className="project-title">{localization.project[keyPrefix+"_name"]}</h1>
    <img src={projectVisuals[projectID]} className="project-visual" alt=""/>
    <div className="paragraph-container">
      <p className="project-desc">{localization.project[keyPrefix+"_desc"]}</p>
    </div>
    </>
  );
}

function AboutBody() {
  const [ localization ] = useGlobal('localization');
  return (
    <>
      <img className="me-image" src={me} alt=""/>
      <div className="paragraph-container">
        <p className="about-txt">{localization.about["line1"]}</p>
        <p className="about-txt">{localization.about["line2"]}</p>
        <p className="about-txt">{localization.about["line3"]}</p>
        <p className="about-txt">{localization.about["line4"]}</p>
        <div className="img-row">
          <a href="https://www.linkedin.com/in/maxencebeaumont/" ><img src={linkedin} className="rounded-rect-button" alt="LinkedIn profile" /></a>
          <a href="mailto:contact.maxencebeaumont@gmail.com" ><img src={gmail} className="rounded-rect-button" alt="LinkedIn profile" /></a>
        </div>
      </div>
    </>
  );
}

function HomeBody() {
  const [ localization ] = useGlobal('localization');
  var prevInput =  <h1 className="home-text"> Welcome to my website. It is still a work in progress, but please have a look around! :) </h1>;
  return (
    <>
      <img className="about-image" src={aboutImg} alt=""/>
      <div className="paragraph-container">
        <p className="home-txt">{localization.home["text"]}</p>
        <div className="img-row">
          <a href="https://www.linkedin.com/in/maxencebeaumont/" ><img src={linkedin} className="rounded-rect-button" alt="LinkedIn profile" /></a>
          <a href="mailto:contact.maxencebeaumont@gmail.com" ><img src={gmail} className="rounded-rect-button" alt="LinkedIn profile" /></a>
        </div>
      </div>
    </>
  );
}

function NavbarFunction() {
  const [ state, setState ] = useGlobal('state');
  const [ localization ] = useGlobal('localization');

  return (
  <Navbar expand="lg" className="sticky-nav">
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
  const [ localization, setLocalization ] = useGlobal('localization');
  function localize(lang)
  {
    console.log(lang);
    if (lang === FRENCH_KEY)
      setLocalization(frLocalization);
    else if (lang === JAPANESE_KEY)
      setLocalization(jpLocalization);
    else 
      setLocalization(enLocalization);
  }
  
  return (
    languages.map((language) =>
      <NavDropdown.Item onClick={(e) => {
        localize(language.languageKey);
      }
      }>{language.languageName}</NavDropdown.Item>
    )
  );
}

function ProjectsDropdown() {
  const [ projectID, setProjectID ] = useGlobal('projectID');
  const [ state, setState ] = useGlobal('state');
   return (
    projects.map((project) =>
      <NavDropdown.Item onClick={(e) => {
        setState(PROJECT_STATE);
        setProjectID(project.id);
        console.log(projectID);
      }
      }  href={'#project' + project.id}>{project.value}</NavDropdown.Item>
    )
  );
}


export default App;
