import React, { Component } from "react";
import db from "../FirestoreConfig";
import { Button, Table } from "react-bootstrap";

class EditDatos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      web: "",
      user: "",
      password: "",
      email: "",
      clave: "",
      observaciones: ""
    };
    this.posicion = 0;
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleRowSelection(e, i) {
    this.setState({
      id: e.id,
      web: e.web,
      user: e.user,
      password: e.password,
      email: e.email,
      clave: e.clave,
      observaciones: e.observaciones
    });
    this.posicion = i;
  }
  handleInput(e) {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.onEditarDato(this.state);
    this.setState({
      id: "",
      web: "",
      user: "",
      password: "",
      email: "",
      clave: "",
      observaciones: ""
    });
    this.posicion = 0;
  }

  onChange(e) {
    this.handleRowSelection.bind(this);
  }
  onSubmit(e) {
    var opcion = window.confirm(
      "Es correcto? " +
        JSON.stringify(this.state.web + ":" + this.state.user) +
        "??"
    );

    e.preventDefault();
    if (opcion === true) {
      this.props.onEditarDato(this.state);
    } else {
      alert("Has cancelado");
    }
  }

  componentDidMount() {
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

  render() {
    const data = this.props.data;

    return (
      <div class="container">
        <div class="bg-warning my-2">
          <h2>Editar Datos</h2>
        </div>
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
            {data.map((row, i) => (
              <tr key={i} onClick={this.handleRowSelection.bind(this, row, i)}>
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
        </form>
        <p></p>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div class="form-group">
            <label for="formGroupWebEditada">Web editada</label>
            <input
              type="text"
              class="form-control"
              id="formEdited"
              size="lg"
              name="name"
              value={
                this.state.web +
                ": " +
                this.state.user +
                " " +
                this.state.password +
                " " +
                this.state.email +
                " " +
                this.state.clave +
                " " +
                this.state.observaciones
              }
              onChange={this.onChange.bind(this)}
            />
          </div>
          <p></p>
          <Button type="submit" variant="success">
            SAVE
          </Button>
        </form>
      </div>
    );
  }
}

export default EditDatos;
