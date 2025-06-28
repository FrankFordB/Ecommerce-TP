import Layout from "../components/Layout/Layout";
import "../style/Register.css";
const Register = () => {
  return (
    <Layout>
      <section className="register-section">
       
        <form className="register-form-section">
           <h2>Registrate</h2>
          <label htmlFor="name">Nombre</label>
          <input placeholder="Pepito" type="text" name="name" id="name" />
          <label htmlFor="surname">Apellido</label>
          <input
            placeholder="Honguito"
            type="text"
            name="surname"
            id="surname"
          />
          <label htmlFor="favoriteColor">Color Favorito</label>
          <input
            placeholder="Salmon Perlado"
            type="text"
            name="favoriteColor"
            id="favoriteColor"
          />
          <label htmlFor="factorSanguineo">Factor Sanguineo</label>
          <input
            placeholder="A Rh+"
            type="text"
            name="factorSanguineo"
            id="factorSanguineo"
          />

          <label htmlFor="email">E-Mail</label>
          <input
            name="email"
            id="email"
            placeholder="Pepito@hotmail.com"
            type="email"
          />

          <label htmlFor="pasword">Contrasena</label>
          <input
            name="password"
            placeholder="****************"
            id="password"
            type="password"
          />
          <label htmlFor="rePasword">Repita su Contrasena</label>
          <input
            name="rePassword"
            placeholder="****************"
            id="rePassword"
            type="password"
          />
          <button type="submit">Iniciar Sesión</button>
        </form>
      </section>
    </Layout>
  );
};

export default Register;
