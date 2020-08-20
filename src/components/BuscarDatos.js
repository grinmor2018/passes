import React, { Component } from "react";
import db from "../FirestoreConfig";
import { Table, Form } from "react-bootstrap";

class BuscarDatos extends Component {
  state = {
    data: []
  };

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

  filterUpdate() {
    const val = this.myValue.value;
    this.props.filterUpdate(val);
  }

  render() {
    const { filterText } = this.props;

    return (
      <div class="container-fluid">
        <div class="bg-primary my-2">
          <h2>Buscar datos</h2>
        </div>
        <Form>
          <Form.Group controlId="formBasicSearch">
            <Form.Control
              type="text"
              ref={value => (this.myValue = value)}
              placeholder="Introduce una web..."
              onChange={this.filterUpdate.bind(this)}
            />
          </Form.Group>
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
              {this.state.data
                .filter(name => {
                  return (
                    name.web.toLowerCase().indexOf(filterText.toLowerCase()) >=
                    0
                  );
                })
                .map((row, i) => (
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
        </Form>
      </div>
    );
  }
}

export default BuscarDatos;
