import { Link } from "react-router";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="redesSociales">
        <div>
          <p>Redes Sociales</p>
        </div>

        <div>
          <a
            href="https://www.instagram.com/mercadopulgasbsas/?hl=es"
            target="_blank"
          >
            <i className="fa-brands fa-instagram"></i>
          </a>
          <a target="_blanl" href="https://buenosaires.gob.ar/mercados/mercado-de-pulgas">
            <i className="fa-brands fa-linkedin"></i>
          </a>
          <a target="_blanl" href="https://api.whatsapp.com/send?phone=5499876345038&text=*Hola%20Mercado%20Pulgas!%20%20Queria%20saber%20de%20una%20Oferta...">
            <i className="fa-brands fa-whatsapp"></i>
          </a>
        </div>
      </div>
      <div style={{ flexDirection: "column" }}>
        <a target="_blank" href="https://www.linkedin.com/in/franco-burgoa-4a338514b/"> <p>Desarrollado por Franco Burgoa</p></a>
        <p>©Todos los derechos reservados</p>
      </div>
      <div>
        {" "}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.8682140364917!2d-58.444201!3d-34.582201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5ec3948a62b%3A0x907b874c7f0c046!2sMercado%20de%20las%20Pulgas!5e0!3m2!1ses!2sar!4v1750775369850!5m2!1ses!2sar"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </footer>
  );
};

export default Footer;
