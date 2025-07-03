import { use, useState } from "react";
import Layout from "../components/Layout/Layout";
import "../style/Register.css";
const Register = () => {
  const [nombre, setNombre] = useState();
  const [apellido, setApellido] = useState();
  const [color, setColor] = useState();
  const [factor, setFactor] = useState();
  const [email, setEmail] = useState();
  const [contrasena, setContrasena] = useState();
  const [confContra, setConfContra] = useState();
  const [error, setError] = useState();

  const handleNombre = (e) => {
    setNombre(e.target.value);
  };
  console.log(nombre, apellido, color, factor, email, contrasena, confContra);
  const handleApellido = (e) => {
    setApellido(e.target.value);
  };
  const handleColor = (e) => {
    setColor(e.target.value);
  };
  const handleFactor = (e) => {
    setFactor(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleContrasena = (e) => {
    setContrasena(e.target.value);
  };
  const handleConfContra = (e) => {
    setConfContra(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nombre || !apellido || !color || !factor || !email || !contrasena || !confContra){
      setError (' Debes completar todos los campos.')
    return;
  }
    if ( contrasena !== confContra) {
      setError ("Las contrasenas no coinciden.");
      return;
      
  }
  const Registro = {nombre, apellido, color, factor, email, contrasena, confContra}
  console.log ("Registro: " + Registro);
  setError('');
  setNombre('');
  setApellido('');
  setColor('');
  setEmail('');
  setFactor('');
  setContrasena('');
  setConfContra('');

}

  return (
    <Layout>
      <section className="register-section">
        <form onSubmit={handleSubmit} className="register-form-section">
          <h2>Registrate</h2>
          <label htmlFor="name">Nombre</label>
          <input
            onChange={handleNombre}
            value={nombre}
            placeholder="Pepito"
            type="text"
            name="name"
            id="name"
          />
          <label htmlFor="surname">Apellido</label>
          <input
            placeholder="Honguito"
            onChange={handleApellido} 
            value={apellido}
            type="text"
            name="surname"
            id="surname"
          />
          <label htmlFor="favoriteColor">Color Favorito</label>
          <input
            placeholder="Salmon Perlado"
            onChange={handleColor} 
            value={color}
            type="text"
            name="favoriteColor"
            id="favoriteColor"
          />
          <label htmlFor="factorSanguineo">Factor Sanguineo</label>
          <input
            placeholder="A Rh+"
            onChange={handleFactor} 
            value={factor}
            type="text"
            name="factorSanguineo"
            id="factorSanguineo"
          />

          <label htmlFor="email">E-Mail</label>
          <input
            name="email"
            onChange={handleEmail} 
            value={email}
            id="email"
            placeholder="Pepito@hotmail.com"
            type="email"
          />

          <label htmlFor="pasword">Contrasena</label>
          <input
            name="password"
            onChange={handleContrasena} 
            value={contrasena}
            placeholder="****************"
            id="password"
            type="password"
          />
          <label htmlFor="rePasword">Repita su Contrasena</label>
          <input
            name="rePassword"
            onChange={handleConfContra} 
            value={confContra}
            placeholder="****************"
            id="rePassword"
            type="password"
          /> <p style={{color: "red", fontSize: "20px"}}> {error}</p>
          <button type="submit">Iniciar Sesión</button>
        </form>
      </section>
    </Layout>
  );
};

export default Register;
