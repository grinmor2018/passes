import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Navigation extends Component {
  render() {
    return (
      <div class="container-fluid text-center">
        <nav class="navbar-sm navbar-light bg-transparent">
          <button class="btn btn-outline-primary btn-sm m-1" onClick={() => this.props.history.push("/BuscarDatos")}>
            <a class="navbar-brand" href="/BuscarDatos">
              <h6>Buscar</h6>
            </a>
          </button>
          <button class="btn btn-outline-success btn-sm m-1" onClick={() => this.props.history.push("/AddDatos")}>
            <a class="navbar-brand" href="/AddDatos">
              <h6>Añadir</h6>
            </a>
          </button>
          <button class="btn btn-outline-warning btn-sm m-1" onClick={() => this.props.history.push("/EditDatos")}>
            <a class="navbar-brand" href="/EditDatos">
              <h6>Editar</h6>
            </a>
          </button>
          <button class="btn btn-outline-danger btn-sm m-1" onClick={() => this.props.history.push("/BorrarDatos")}>
            <a class="navbar-brand" href="/BorrarDatos">
              <h6>Borrar</h6>
            </a>
          </button>
          <button class="btn btn-outline-secondary btn-sm m-1" onClick={() => this.props.history.push("/TablaDatos")}>
            <a class="navbar-brand" href="/TablaDatos">
              <h6>Ver</h6>
            </a>
          </button>
        </nav>
      </div>
    );
  }
}

export default withRouter(Navigation);
