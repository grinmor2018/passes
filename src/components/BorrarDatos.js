import React, { Component } from "react";
import db from "../FirestoreConfig";
import { Button, Table, Form } from "react-bootstrap";

class BorrarDatos extends Component {
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

  handleRowSelection(e) {
    this.setState({
      id: e.id,
      web: e.web,
      user: e.user,
      password: e.password,
      email: e.email,
      clave: e.clave,
      observaciones: e.observaciones
    });
  }

  onChange(e) {
    this.handleRowSelection.bind(this);
  }
  handleSubmit(e) {
    var opcion = window.confirm(
      "Eliminar " +
        JSON.stringify(this.state.web + ":" + this.state.user) +
        "??"
    );
    e.preventDefault();
    if (opcion === true) {
      this.props.onBorrarDato(this.state.id);
      this.readDocs();
    } else {
      alert("Has cancelado");
    }
  }

  render() {
    const data = this.props.data;
    return (
      <div class="container">
        <div class="bg-danger my-2">
        <h2>Borrar Datos</h2>
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
              <tr key={i} onClick={this.handleRowSelection.bind(this, row)}>
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
        <Form onSubmit={this.handleSubmit.bind(this)}>
        <Form.Label>Web a eliminar</Form.Label>
          <Form.Control
            type="text"
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
          <p></p>
          <Button type="submit" variant="primary">
            DELETE
          </Button>
        </Form>
      </div>
    );
  }
}

export default BorrarDatos;
