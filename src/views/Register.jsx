import { use, useState } from "react";
import Layout from "../components/Layout/Layout";
import "../style/Register.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [confContra, setConfContra] = useState("");
  const [error, setError] = useState("");
  const [menssage, setMenssage] = useState("")


  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleContrasena = (e) => {
    setContrasena(e.target.value);
  };
  const handleConfContra = (e) => {
    setConfContra(e.target.value);
  };
const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMenssage('');
    if (!email || !contrasena || !confContra){
      setError (' Debes completar todos los campos.')
    return;
  }
    if ( contrasena !== confContra) {
      setError ("Las contrasenas no coinciden.");
      return;
      
  }

  try {
    await createUserWithEmailAndPassword (auth, email, contrasena)
    setMenssage("Registrado con exito.")   
    setTimeout(() => {
      setMenssage ('Redirigiendo al home...')
      
    }, 1500);
    setTimeout(() => {
      navigate("/")
      
    }, 3000);
  } catch (error) {
    setError("No pudimos registrar al usuario, intentelo de nuevo.")
  }
  
  setEmail('');
  setContrasena('');
  setConfContra('');
}

  return (
    <Layout>
      <section className="register-section">
        <form onSubmit={handleSubmit} className="register-form-section">
          <h2>Registrate</h2>
          
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
          /> <p style={{color: "white"}}>{menssage}</p>
          <p style={{color: "white", fontWeight:"600"}}>{error}</p>
          <button type="submit">Registrarse</button>
          
        </form>
      </section>
    </Layout>
  );
};

export default Register;
