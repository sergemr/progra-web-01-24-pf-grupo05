import React, { useState, useEffect } from 'react';
import styles from './consulta.module.css';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Button,
} from '@mui/material';
import Navbar from '../Navbar/Navbar';

const Consulta = () => {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    // Aquí haces la llamada a tu API para obtener todos los libros
    const fetchLibros = async () => {
      try {
        const response = await axios.get("http://localhost:3008/libros");
        setLibros(response.data);
      } catch (error) {
        console.error("Error fetching libros:", error);
      }
    };
    
    fetchLibros();
  }, []);

  return (
   <div className={styles.Consulta} data-testid="Consulta">
      <Navbar />
    <Box sx={{ marginTop: 4, mx: "auto", maxWidth: 800 }}>
      <Typography style={{ color: "white" }} variant="h4" gutterBottom component="div" >
        Lista de Libros
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Autor</TableCell>
              <TableCell>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {libros.map((libro) => (
              <TableRow
                key={libro.libro_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {libro.nombre_libro}
                </TableCell>
                <TableCell>{libro.nombre_autor}</TableCell>
                <TableCell>{libro.reservado ? 'Reservado' : 'Disponible'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </div>
  );
};

export default Consulta;