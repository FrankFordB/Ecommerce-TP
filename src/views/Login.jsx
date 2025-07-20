import { useState } from "react";
import Layout from "../components/Layout/Layout";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Navigate, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import "../style/Login.css";




const Login = () => {
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error , setError] = useState("");
  const [menssage, setMenssage] = useState("");

  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    
  };
  const handleContrasena = (e) => {
    setContrasena(e.target.value);
    
  };
console.log(contrasena, email);
const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMenssage('');
    if (!email || !contrasena){
      setError (' Debes completar todos los campos.')
    return;
  }

  try {
    await signInWithEmailAndPassword (auth, email, contrasena)
    setMenssage("Logueado con exito.")   
    setTimeout(() => {
      setMenssage ('Redirigiendo al home...')
      
    }, 1500);
    setTimeout(() => {
      navigate("/")
      
    }, 3000);
  } catch (error) {
    setError("Tu contrasena o email son incorrecto.")
  }
  
  setEmail('');
  setContrasena('');
  
}

  return (
    <Layout>
      <section className="login-section">
        <form onSubmit={handleSubmit} className="login-form-section">
          <h2>Iniciar Sesión</h2>
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
          <p style={{color: "green", fontSize: "16 px"}}>{menssage} </p>
          <p style={{color: "red", fontSize: "16px"}}>{error } </p>
          <button type="submit">Iniciar Sesión</button>
        </form>
      </section>
    </Layout>
  );
};

export default Login;
