import React, { Component } from "react";
import db from "../FirestoreConfig";
import { Table } from "react-bootstrap";

export default class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
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

  render() {
    return (
      <div class="container">
        <div class="bg-secondary my-2">
          <h2>Ver datos</h2>
        </div>
        <Table striped bordered hover /* onSubmit={this.handleSubmit} */>
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
