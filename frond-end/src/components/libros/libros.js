import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./libros.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Libro from "../libro/libro";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


const Libros = () => {
  const [libros, setLibros] = useState([]);

  const handleRefresh = () => {
    window.location.reload();
  };
  const navigate = useNavigate();
  const fetchLibros = async () => {
    console.log("fetchLibros");
    try {
      const response = await axios.get("http://localhost:3008/libros", {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      setLibros(response.data);
    } catch (e) {
      console.error("Error fetching libros:", e);
    }
  };
  useEffect(() => {
    fetchLibros();
  }, []);

  const handleFilter = (e) => {
    const { value } = e.target;
    const filteredLibros = libros.filter((libro) => {
      return libro.nombre_libro.toLowerCase().includes(value.toLowerCase());
    });
    setLibros(filteredLibros);
  };
  return (
    <div className={styles.Libros} data-testid="Libros">
      <a href="/home">Home</a>
      <br />
      <br />
      Libros Registrados: &nbsp;
      {libros.length}
      <br />
      <br />
      <Grid container>
        <Grid spacing={2} item xs={12}>
          <TextField
            id="outlined-basic"
            onChange={handleFilter}
            label="Filtro por Nombre"
            variant="outlined"
          />
        </Grid>
        <hr />
      </Grid>
      <Grid container>
        {libros.map((libro, index) => (
          <Grid item xs={12} md={6} lg={4}>
            <Libro libro={libro} refreshData={fetchLibros} />
          </Grid>
        ))}

        {libros.forEach((libro) => {
          console.log("libro: forEach", libro);
        })}
      </Grid>
      <br />
      <br />

      <Button onClick={handleRefresh} variant="contained">
        Refrescar
      </Button>
      <ul></ul>
    </div>
  );
};

Libros.propTypes = {};

Libros.defaultProps = {};

export default Libros;