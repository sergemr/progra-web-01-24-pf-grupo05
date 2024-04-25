import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./registro.module.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registro = () => {
   const [userName, setUserName] = useState("");
   const [userLastName, setUserLastName] = useState("");
   const [userPassword, setUserPassword] = useState("");
   const [userEmail, setUserEmail] = useState("");
   const navigate = useNavigate();
   const handleSumbit = async (e) => {
     e.preventDefault();
     try {
       const response = await axios.post("http://localhost:3008/register", {
         user_email: userEmail,
         user_name: userName,
         user_last_name: userLastName,
         user_password: userPassword,
       });
       console.log(response.data);
       // Reset input fields after successful registration
 
       localStorage.setItem("user", JSON.stringify(response.data.user));
       navigate("/");
       setUserEmail("");
       setUserName("");
       setUserPassword("");
     } catch (error) {
       console.error("Error registering user:", error);
     }
   };
   return (
    <div className={styles.Registro} data-testid="Registro">
      <Card sx={{ maxWidth: 380, margin: "auto" }}>
        <CardContent style={{ color:'black' }} >
          <h1>Register</h1>
          <TextField
            id="outlined-basic"
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
            label="correo electronico" style={{backgroundColor: 'white', color: 'white'}} 
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            id="outlined-basic"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            label="nombre "style={{backgroundColor: 'white', color: 'white'}} 
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            id="outlined-basic"
            onChange={(e) => {
              setUserLastName(e.target.value);
            }}
            label="apellido"style={{backgroundColor: 'white', color: 'white'}} 
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            id="outlined-basic"
            label="password"
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
            type="password" style={{backgroundColor: 'white', color: 'white'}} 
            variant="outlined"
          />

          <br />
          <br />
          <Button onClick={handleSumbit} variant="contained" style={{backgroundColor: 'green', color: 'white'}} >
            Registro
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

Registro.propTypes = {};

Registro.defaultProps = {};

export default Registro;
