import React, { Component } from "react";
import db from "../FirestoreConfig";
import { Button, Table } from "react-bootstrap";

class AddDatos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web: "",
      user: "",
      password: "",
      email: "",
      clave: "",
      observaciones: "",
      data: []
    };
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  readDocs() {
    db.collection("Item")
      .get()
      .then(
        snapShots => {
          this.setState({
            data: snapShots.docs.map(doc => {
              return {
                id: doc.id,
                web: doc.data().web,
                user: doc.data().user,
                password: doc.data().password,
                email: doc.data().email,
                clave: doc.data().clave,
                observaciones: doc.data().observaciones
              };
            })
          });
        },
        error => {
          console.log(error);
        }
      );
  }

  componentDidMount() {
    this.readDocs();
  }

  handleInput(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    var opcion = window.confirm(
      "Añadir " + JSON.stringify(this.state.web + ":" + this.state.user) + "??"
    );
    e.preventDefault();
    if (opcion === true) {
      this.props.onAddDato(this.state);
      this.setState({
        web: "",
        user: "",
        password: "",
        email: "",
        clave: "",
        observaciones: ""
      });
      this.readDocs();
    } else {
      alert("Has cancelado");
    }
  }

  render() {
    return (
      <div class="container-fluid">
        <div class="bg-success my-2">
          <h2>Añadir datos</h2>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div class="row">
            <div class="col">
              <div class="form-group">
                <label for="formGroupWeb">Web</label>
                <input
                  type="text"
                  class="form-control"
                  name="web"
                  id="formWeb"
                  placeholder="Enter Web"
                  onChange={this.handleInput}
                  value={this.state.web}
                />
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label for="formGroupUser">User</label>
                <input
                  type="text"
                  class="form-control"
                  name="user"
                  id="formUser"
                  placeholder="Enter user"
                  onChange={this.handleInput}
                  value={this.state.user}
                />
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label for="formGroupPassword">Password</label>
                <input
                  type="text"
                  class="form-control"
                  name="password"
                  id="formPassword"
                  placeholder="Enter Password"
                  onChange={this.handleInput}
                  value={this.state.password}
                />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="form-group">
                <label for="formGroupEmail">Email</label>
                <input
                  type="email"
                  class="form-control"
                  name="email"
                  id="formEmail"
                  placeholder="Enter Web"
                  onChange={this.handleInput}
                  value={this.state.email}
                />
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label for="formGroupClave">Clave</label>
                <input
                  type="text"
                  class="form-control"
                  name="clave"
                  id="formClave"
                  placeholder="Enter Clave"
                  onChange={this.handleInput}
                  value={this.state.clave}
                />
              </div>
            </div>
            <div class="col">
              <div class="form-group">
                <label for="formGroupObservaciones">Observaciones</label>
                <input
                  type="text"
                  class="form-control"
                  name="observaciones"
                  id="formObservaciones"
                  placeholder="Enter Observaciones"
                  onChange={this.handleInput}
                  value={this.state.observaciones}
                />
              </div>
            </div>
          </div>
          <Button variant="success " type="submit">
            SAVE
          </Button>
        </form>
        <p></p>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Web</th>
              <th>Usuario</th>
              <th>Password</th>
              <th>Email</th>
              <th>Clave</th>
              <th>Observaciones</th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((row, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{row.web}</td>
                <td>{row.user}</td>
                <td>{row.password}</td>
                <td>{row.email}</td>
                <td>{row.clave}</td>
                <td>{row.observaciones}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default AddDatos;
