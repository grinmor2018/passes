import React from "react";
//import "./App.css";
import { Button, Jumbotron, Image } from "react-bootstrap";

import BuscarDatos from "./components/BuscarDatos";
import AddDatos from "./components/AddDatos";
import BorrarDatos from "./components/BorrarDatos";
import EditDatos from "./components/EditDatos";
import Navigation from "./components/Navigation";
import Todos from "./components/Todos";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import firebase from "firebase";
import db from "./FirestoreConfig";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usuario: null,
      data: [],
      web: "",
      user: "",
      password: "",
      email: "",
      clave: "",
      observaciones: "",
      filterText: "",
    };
    this.handleAddDatos = this.handleAddDatos.bind(this);
    this.handleBorrarDatos = this.handleBorrarDatos.bind(this);
    this.handleEditarDatos = this.handleEditarDatos.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  readDocs() {
    db.collection("Item")
      .get()
      .then(
        (snapShots) => {
          this.setState({
            data: snapShots.docs.map((doc) => {
              return {
                id: doc.id,
                web: doc.data().web,
                user: doc.data().user,
                password: doc.data().password,
                email: doc.data().email,
                clave: doc.data().clave,
                observaciones: doc.data().observaciones,
              };
            }),
          });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  componentDidMount() {
    this.readDocs();
  }

  componentWillMount() {
    firebase.auth().onAuthStateChanged((usuario) => {
      this.setState({ usuario });
    });
    this.readDocs();
  }

  filterUpdate(value) {
    this.setState({
      filterText: value,
    });
  }

  handleAddDatos(dato) {
    db.collection("Item").add({
      clave: dato.clave,
      email: dato.email,
      observaciones: dato.observaciones,
      password: dato.password,
      user: dato.user,
      web: dato.web,
    });
    this.readDocs();
  }

  handleBorrarDatos(id) {
    db.collection("Item").doc(id).delete();
    this.readDocs();
  }

  handleEditarDatos(dato) {
    console.log(dato);
    db.collection("Item").doc(dato.id).update({
      id: dato.id,
      clave: dato.clave,
      email: dato.email,
      observaciones: dato.observaciones,
      password: dato.password,
      user: dato.user,
      web: dato.web,
    });
    this.readDocs();
  }

  handleAuth() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) =>
        console.log(`${result.usuario.email} ha iniciado sesion`)
      )
      .catch((error) => console.log(`Error ${error.code}: ${error.message}`));
  }

  handleLogOut() {
    firebase
      .auth()
      .signOut()
      .then((result) =>
        console.log(`${result.usuario.email} ha iniciado sesion`)
      )
      .catch((error) => console.log(`Error ${error.code}: ${error.message}`));
  }

  renderLoginButton() {
    if (this.state.usuario) {
      return (
        <div class="container-fluid">
          <div class="row">
            <div class="col-11">
              <Image
                thumbnail
                fluid
                className="login-img"
                width={60}
                height={60}
                src={this.state.usuario.photoURL}
                alt={this.state.usuario.displayName}
              />
              <h6>Hola {this.state.usuario.displayName}!</h6>
            </div>
            <div class="col-1">
              <Button variant="secondary my-2" onClick={this.handleLogOut}>
                Logout
              </Button>
            </div>
          </div>
          <div class="row justify-content-md-left">
            <div class="container">
              <BrowserRouter>
                <Navigation />
                <React.Fragment>
                  <Switch>
                    <Route
                      path="/BuscarDatos"
                      render={() => (
                        <BuscarDatos
                          filterText={this.state.filterText}
                          filterUpdate={this.filterUpdate.bind(this)}
                        />
                      )}
                    />
                    <Route
                      path="/AddDatos"
                      render={() => (
                        <AddDatos onAddDato={this.handleAddDatos} />
                      )}
                    />
                    <Route
                      path="/EditDatos"
                      render={() => (
                        <EditDatos
                          data={this.state.data}
                          onEditarDato={this.handleEditarDatos}
                        />
                      )}
                    />
                    <Route
                      path="/BorrarDatos"
                      render={() => (
                        <BorrarDatos
                          data={this.state.data}
                          onBorrarDato={this.handleBorrarDatos}
                        />
                      )}
                    />
                    <Route path="/TablaDatos" render={() => <Todos />} />
                    <Redirect from="/" to="/BuscarDatos" />
                  </Switch>
                </React.Fragment>
              </BrowserRouter>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div class="container">
          <Button variant="primary my-2" onClick={this.handleAuth}>
            Login con Google
          </Button>
        </div>
      );
    }
  }

  render() {
    return (
      <div class="container-fluid">
        <Jumbotron>
          <div class="text-center">
            <h1>LISTADO DE PASSWORDS</h1>
          </div>
          <div class="container">{this.renderLoginButton()}</div>
        </Jumbotron>
      </div>
    );
  }
}
export default App;
