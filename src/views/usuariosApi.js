import React, { Component } from "react";
 /* import axios from "axios";  */
import { Link } from "react-router-dom";
import HomeIcon from "@material-ui/icons/Home";
import { Fab, TextField } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import PersonIcon from "@material-ui/icons/Person";

import {
  Button,
  Container,
  List,
  ListItem,
  ListSubheader,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";

class usuariosApi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      idUsuario: 0,
      usuarios1: [],
    };
  }
  state = {};

  titulo = "USUARIOS";

  frmNombre = React.createRef();
  frmEdad = React.createRef();

  addUsuario = (event) => {
    event.preventDefault();

    const url = "http://localhost:5000/api/usuarios";

    const data = { nombre: this.frmNombre.value, edad: this.frmEdad.value };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));

    this.frmEdad.value = "";
    this.frmNombre.value = "";
    this.frmEdad.focus();
    this.frmNombre.focus();

    this.loadUsuario();
  };

  viewUsuario = (id) => (event) => {
    event.preventDefault();

    this.frmEdad.value = "";
    this.frmNombre.value = "";
    this.frmEdad.focus();
    this.frmNombre.focus();
    this.frmNombre.value = this.state.usuarios1[id];
  };

  editUsuario = (id) => (event) => {
    event.preventDefault();

    const url = "http://localhost:5000/api/usuarios/"+id;

    const data = { nombre: this.frmNombre.value, edad: this.frmEdad.value };

    fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((response) => console.log("Success:", response));

    this.frmEdad.value = "";
    this.frmNombre.value = "";
    this.frmEdad.focus();
    this.frmNombre.focus();

    this.loadUsuario();
    

    console.log(url);

    this.loadUsuario();
  };

  deleteUsuario = (id) => (event) => {
    event.preventDefault();
    console.log("Delete action");
    console.log(id)
    const url = "http://localhost:5000/api/usuarios/" + id;

    fetch(url, {
      method: "delete",
    }).then((response) =>
      response.json().then((json) => {
        return json;
      })
    );

    console.log(url);

    this.loadUsuario();
  };

  loadUsuario() {
    fetch("http://localhost:5000/api/usuarios")
      .then((response) => response.json())
      .then((json) => this.setState({ usuarios1: json }))
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.loadUsuario();
  }

  render() {
    return (
      <div className="App-content">
        <Container maxWidth="xs">
          <Link to="/">
            <Button
              variant="contained"
              color="default"
              size="small"
              startIcon={<HomeIcon />}
            >
              Regresar
            </Button>
          </Link>
        </Container>
        <form autoComplete="off" onSubmit={this.addUsuario}>
          <TextField
            label="Nombre"
            type="text"
            margin="normal"
            variant="outlined"
            inputRef={(e) => (this.frmNombre = e)}
          />
          <TextField
            label="Edad"
            type="text"
            margin="normal"
            variant="outlined"
            inputRef={(e) => (this.frmEdad = e)}
          />
          <Fab color="primary" size="medium" onClick={this.addUsuario}>
            <AddIcon />
          </Fab>
        </form>

        <List
          component="nav"
          subheader={
            <ListSubheader component="div">{this.titulo}</ListSubheader>
          }
        >
          {this.state.usuarios1.map((usuario, index) => (
            <ListItem button key={index}>
              <ListItemIcon onClick={this.viewUsuario(index)}>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText inset primary={usuario.nombre} />
              <ListItemText inset primary={usuario.edad} />
              <ListItemIcon onClick={this.editUsuario(usuario.id)}>
                <EditIcon />
              </ListItemIcon>
              <ListItemIcon onClick={this.deleteUsuario(usuario.id)}>
                <DeleteIcon />
              </ListItemIcon>
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

export default usuariosApi;
