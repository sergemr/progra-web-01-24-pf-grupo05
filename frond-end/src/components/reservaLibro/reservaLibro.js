import React, { useState } from "react";
import styles from "./reservaLibro.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const ReservaLibro = () => {
  const [nombreLibro, setNombreLibro] = useState("");
  const [nombreUsuario, setNombreUsuario] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3009/reservaLibro", {
        nombre_libro: nombreLibro,
        nombre_usuario: nombreUsuario,
      });
      console.log(response.data);
      alert("Libro reservado exitosamente");
      // Restablecer los campos de entrada después de una reserva exitosa
      setNombreLibro("");
      setNombreUsuario("");
    } catch (error) {
      console.error("Error al reservar libro:", error);
    }
  };

  return (
    <div className={styles.ReservaLibro} data-testid="ReservaLibro">
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
          <h1>Reserva de Libros</h1>
          <form onSubmit={handleSubmit}>
            <TextField
              id="nombre-libro"
              value={nombreLibro}
              onChange={(e) => setNombreLibro(e.target.value)}
              label="Nombre del Libro"
              variant="outlined"
            />
            <br />
            <br />
            <TextField
              id="nombre-usuario"
              value={nombreUsuario}
              onChange={(e) => setNombreUsuario(e.target.value)}
              label="Nombre del Usuario"
              variant="outlined"
            />
            <br />
            <br />
            <Button onClick={handleSubmit} type="submit" variant="contained" color="primary">
              Reservar Libro
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReservaLibro;