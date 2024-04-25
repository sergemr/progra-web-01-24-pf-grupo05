import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./perfil.module.css";

//imports MUI
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Perfil = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("user");
    navigate("/");
  };
  // Your component code goes here

  const navigate = useNavigate(); // Hook para la navegación
  // Simula la carga de datos de usuario
  const userData = JSON.parse(localStorage.getItem("user"));

  // Si no hay datos de usuario, muestra un mensaje o redirige
  if (!userData) {
    return <p>No hay datos de usuario disponibles</p>;
  }
  
  const handleBack = () => {
   navigate('/libros');
 };


  return (
    <div className={styles.Perfil} data-testid="Perfil">
      <Navbar />
    <Card sx={{ maxWidth: 400,
    maxHeight: 380, 
    mx: "auto", 
    mt: 5, 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50vh' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          Perfil de Usuario
        </Typography>
        <Box display="flex" justifyContent="center" mt={2}> {/* Centra el Avatar */}
          <Avatar sx={{ width: 56, height: 56 }}>U</Avatar>
        </Box>
        <Typography color="text.secondary" gutterBottom>
          Nombre: {userData.user_name}
        </Typography>
        <Typography color="text.secondary">
          Apellido: {userData.user_last_name}
        </Typography>
        <Typography color="text.secondary">
          Email: {userData.user_email}
        </Typography>
        <br />
        <br />
        <Button variant="contained" color="primary" onClick={logout}>
          Logout
        </Button>
      </CardContent>
    </Card>
    </div>
  );
};

Perfil.propTypes = {};

Perfil.defaultProps = {};

export default Perfil;