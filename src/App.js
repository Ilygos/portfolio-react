import React, { useState, useEffect, useRef} from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import './App.css';


const projects = [
  {
    id: 1,
    value: 'Sprite Editor Demo',
  },
  {
    id: 2,
    value: 'Maxence\'s Sandbox',
  },
  {
    id: 3,
    value: 'Kahiora',
  },
  {
    id: 4,
    value: 'PAC-MAN: Party Royal',
  },
  {
    id: 5,
    value: 'Write\'n slash',
  },
  {
    id: 6,
    value: 'Flump vs Humanity',
  },
  {
    id: 7,
    value: 'Beetlefield',
  },
  {
    id: 8,
    value: 'PeachAR',
  },
]

var state = "home";
var projectID = -1;

function App() {
  return (
    <div>
      <NavbarFunction />
      <BodyGenerator />
    </div>
  );
}

function BodyGenerator() {
  var ret;
  if (state === "project") {
    ret = <ProjectBody />;
  }
  else {
    ret = <HomeBody />;
  }

  return (ret);
}

function ProjectBody() {

}

function HomeBody() {
  return (
  <h1> Je suis l'home. {projectID} </h1>
  );
}

function NavbarFunction() {
  return (
  <Navbar expand="lg">
    <Navbar.Brand href="#home">BEAUMONT MAXENCE</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="#about"a>About Me</Nav.Link>
        <NavDropdown title="Projects" id="basic-nav-dropdown">
          <ProjectsDropdown />
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
  );
}

function ProjectsDropdown() {
  return (
    projects.map((project) =>
      <NavDropdown.Item onClick={projectID = project.value} href={'#project' + project.id}>{project.value}</NavDropdown.Item>
    )
  );
}
export default App;
