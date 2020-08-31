import React, { useState } from "react";
import {
  Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron,
  Button, Modal, ModalHeader, ModalBody,
  Form, FormGroup, Input, Label, Spinner
} from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { useFormFields } from "../libs/hooksLib";

// import { Loading } from './LoadingComponent';

function Header(props) {
  
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isModalOpen, setIModalOpen] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    username: "",
    password: "",
  });
  //  this.toggleModal = this.toggleModal.bind(this);
  //  this.handleLogin = this.handleLogin.bind(this);
  
  function toggleNav() {
    setIsNavOpen(!isNavOpen);
  }

  function toggleModal() {
    setIModalOpen(!isModalOpen);
  }

  function Login({ users }) {
    if (users.isLoading) return <Spinner size="sm" color="primary" />;
    else if (users.user.name)
      return (
        <NavItem>
          <b style={{ color: "white" }}>Welcome, {users.user.name} </b>
          <Button outline onClick={handleLogout}>
            <span className="fa fa-sign-out fa-lg"></span>
            Logout
          </Button>
        </NavItem>
      );
    else
      return (
        <NavItem>
          <Button outline onClick={toggleModal}>
            <span className="fa fa-sign-in fa-lg"></span> Login
          </Button>
        </NavItem>
      );
  }

  function handleLogin(event) {
    console.log(fields);
    
    toggleModal();
    event.preventDefault();
    props.authUser(fields.username, fields.password);
  }
  
   async function handleLogout() {
     props.logoutUser();
   }
  
    return (
      <div>
        <Navbar dark expand="md">
          <div className="container">
            <NavbarToggler onClick={toggleNav} />
            <NavbarBrand className="mr-auto" href="/">
              <img
                src="assets/images/logo.png"
                height="30"
                width="41"
                alt="Ristorante Con Fusion"
              />
            </NavbarBrand>
            <Collapse isOpen={isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink className="nav-link" to="/home">
                    <span className="fa fa-home fa-lg"></span> Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/aboutus">
                    <span className="fa fa-info fa-lg"></span> About Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/menu">
                    <span className="fa fa-list fa-lg"></span> Menu
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/contactus">
                    <span className="fa fa-address-card fa-lg"></span> Contact
                    Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/vote">
                    <span className="fa fa-thumbs-o-up fa-lg"></span> Vote
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/poll">
                    <span className="fa fa-bar-chart-o fa-lg"></span> Poll
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/createpoll">
                    <span className="fa fa-wrench fa-lg"></span> Create Poll
                  </NavLink>
                </NavItem>
              </Nav>
              <Nav className="ml-auto" navbar>
                <Login users={props.users} />
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        <Jumbotron>
          <div className="container">
            <div className="row row-header">
              <div className="col-12 col-sm-6">
                <h1>Ristorante con Fusion</h1>
                <p>
                  We take inspiration from the World's best cuisines, and create
                  a unique fusion experience. Our lipsmacking creations will
                  tickle your culinary senses!
                </p>
              </div>
            </div>
          </div>
        </Jumbotron>
        <Modal isOpen={isModalOpen} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  onChange={handleFieldChange}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  onChange={handleFieldChange}
                />
              </FormGroup>
              <Button type="submit" value="submit" color="primary">
                Login
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }

export default Header;
