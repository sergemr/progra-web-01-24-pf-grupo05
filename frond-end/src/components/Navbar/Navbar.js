import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleSumbitPerfil = async () => {
    navigate("/perfil");
  }
  const handleSumbitHome = async () => {
    navigate("/libros");
  }
  const handleSumbitConsulta = async () => {
    navigate("/consulta");
  }
  const handleSumbitRegistroLibro = async () => {
    navigate("/registroLibro");
  }
  const handleSumbitLogin = async () => {
    navigate("/");
  }
  const handleSumbitRegistro = async () => {
    navigate("/registro");
  }
  const handleSumbitReservaLibro = async () => {
    navigate("/reservaLibro");
  }

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
            <Button onClick={handleSumbitPerfil} color="inherit">Profile</Button>
            <Button onClick={handleSumbitHome} color="inherit">Home</Button>
            <Button onClick={handleSumbitConsulta} color="inherit">Consulta</Button>
            <Button onClick={handleSumbitRegistroLibro} color="inherit">Registrar Libro</Button>
            <Button onClick={handleSumbitReservaLibro} color="inherit">Reservar Libro</Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;