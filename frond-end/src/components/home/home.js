import React from 'react';
import PropTypes from 'prop-types';


const Home = () => {

   return (
      <div>
         <nav>
            <a href="/perfil">Perfil</a>
            &nbsp; &nbsp;
            <a href="/consulta">Consulta</a>
            &nbsp; &nbsp;
            <a href="/libros">Libros Registrados</a>
            &nbsp; &nbsp;
            <a href="/libro">Resgistrar Libro</a>
         </nav>
         <h1>Home</h1>
      </div>
   );
}

Home.propTypes = {};

Home.defaultProps = {};

export default Home;
