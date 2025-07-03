import Layout from "../components/Layout/Layout";
import "../style/Login.css"
const Login = () => {
  return (
    <Layout>
      <section className="login-section">
        
        <form className="login-form-section">
          <h2>Iniciar Sesión</h2>
          <label htmlFor="email">
            E-Mail</label>
            <input
              name="email"
              id="email"
              placeholder="Pepito@hotmail.com"
              type="email"
            />
          
          <label htmlFor="pasword">
            Contrasena</label>
            <input name="password" placeholder="****************" id="password" type="password" />
          <button type="submit">Iniciar Sesión</button>
        </form>
      </section>
    </Layout>
  );
};

export default Login;
