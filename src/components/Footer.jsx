import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-footer-style">
      <div>
        <h2 className="titulo-footer">CASA CENTRAL</h2>
        <p className="">Tte. Gral. Juan Domingo Perón 4190, CABA.</p>
        <p className="">CP C1199ABB</p>
        <iframe className="w-11/12 mt-6" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14241.076361140696!2d-65.2050432!3d-26.8313923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1723988109297!5m2!1ses!2sar" ></iframe>
      </div>
      <div>
        <h2 className="titulo-footer">CONTACTOS</h2>
        <p className="">Tel. (+54 11) 4959 - 0200</p>
        <p className="">Fax. (+54 11) 4959 - 0201</p>
        <p className="">Mail. contacto@rollinghealth.com.ar</p>
        <ul>
          <li className="mb-2"><a href="#">Formulario de contacto</a></li>
        </ul>
      </div>
      <div>
        <h2 className="titulo-footer">Legales</h2>
        <ul className="list-disc list-inside p-0 m-0">
          <li className="mb-2"><a href="#">Términos y condiciones de uso</a></li>
          <li className="mb-2"><a href="#">Política de privacidad</a></li>
          <li className="mb-2"><a href="#">Defensa de las y los Consumidores.</a></li>
          <li className="mb-2"><a href="#">Reportes de incidentes</a></li>
          <li className="mb-2"><a href="#">Trabajar con nosotros</a></li>
        </ul>
      </div>
      <div>
        <img src="/images/rollinghealth.svg" alt="" className="w-3/5  mt-4 md:mt-0 " />
        <p className="text-sm font-light mt-4">Rolling Health es un proyecto integramente realizado por Mariana Cervantes, Lucas Capdevilla, Marcelo Frias y Federico Alvarez, integrantes del Grupo 4 de la comisión de React Avanzado I para Rolling Code.</p>
        <p className="italic text-sm font-light mt-4">3 de Septiembre de 2024</p>
      </div>
      <hr className=" border-white w-full col-span-1 md:col-span-2 lg:col-span-4 my-8" />
      <div className="block md:flex md:col-span-2  lg:col-span-4 justify-center items-center text-sm">
        <p className="mr-3">© Rolling Health. Todos los derechos reservados.</p>
        <div className="flex">
          <p className="mr-2">Desarrollado para: </p>
          <img src="/images/rollingcodelogoW.svg" alt="" className="h-6 " />
        </div>
      </div>
      <div>
      <div className="container-social">
        <p className="social-badge"><FaFacebook className="text-white text-3xl" /></p>
        <p className="social-badge"><FaYoutube className="text-white text-3xl" /></p>
        <p className="social-badge"><FaInstagram className="text-white text-3xl" /></p>
      </div>
      </div>
    </footer>
  );
};

export default Footer;