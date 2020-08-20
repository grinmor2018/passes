import React, { Component } from "react";

class TablaDatos extends Component {
  render() {
    const { data } = this.props;

    return (
      <div className="container">
        <h2>Ver datos</h2>
        <table onSubmit={this.handleSubmit}>
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
        </table>
      </div>
    );
  }
}

export default TablaDatos;
