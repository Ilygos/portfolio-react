// ReactJS
import React, { useState, useEffect, setGlobal, useGlobal} from 'reactn';

// Bootstrap
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image'

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

// CONSTS
const PROJECT_STATE = 'project';
const HOME_STATE = 'home';
const ABOUT_STATE = 'about';

const FRENCH_KEY = 'fr_FR';
const ENGLISH_KEY = 'en_EN';
const JAPANESE_KEY = 'ja_JP';

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
  return (
    <div>
      <NavbarFunction />
      <BodyGenerator />
    </div>
  );
}



function BodyGenerator() {
  const [ state, setState ] = useGlobal('state');
  var ret;
  if (state === PROJECT_STATE) {
    ret = <ProjectBody />;
  }
  else {
    ret = <HomeBody />;
  }
  return (ret);
}

function ProjectBody() {
  const [ projectID, setProjectID ] = useGlobal('projectID');
  const [ localization, setLocalization ] = useGlobal('localization');
  const keyPrefix = "project_"+projectID;
  return(
    <>
    <h1 className="project-title">{localization.project[keyPrefix+"_name"]}</h1>
    <Image src={projectVisuals[projectID]} fluid />
    <p className="project-desc">{localization.project[keyPrefix+"_desc"]}</p>
    </>
  );
}

function HomeBody() {
  var prevInput =  <h1> Je suis l'home. </h1>;
  return (
    prevInput
  );
}

function NavbarFunction() {
  const [ state, setState ] = useGlobal('state');

  return (
  <Navbar expand="lg">
    <Navbar.Brand href="#home" onClick={(e) => {setState(HOME_STATE)}}>BEAUMONT MAXENCE</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="#about" onClick={(e) => {setState(ABOUT_STATE)}} >About Me</Nav.Link>
        <NavDropdown title="Projects" id="basic-nav-dropdown">
          <ProjectsDropdown />
        </NavDropdown>
        <NavDropdown title="Language" id="basic-nav-dropdown">
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
