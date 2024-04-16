import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Consulta() {
  const [librosReservados, setLibrosReservados] = useState([]);

  useEffect(() => {
    // Realizar la solicitud al servidor para obtener los libros reservados
    axios.get('/libros/reservados')
      .then(response => {
        setLibrosReservados(response.data);
      })
      .catch(error => {
        console.error('Error al obtener los libros reservados:', error);
      });
  }, []);

  return (
    <div>
      <a href="/home">Home</a>
      <h2>Libros Reservados</h2>
      <ul>
        {librosReservados.map(libro => (
          <li key={libro.libro_id}>{libro.nombre_libro} - {libro.nombre_autor}</li>
        ))}
      </ul>
    </div>
  );
}

export default Consulta;
