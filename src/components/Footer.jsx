import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#3b3a35] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 text-white p-4 pt-20 lg:px-12 relative">
      <div>
        <h2 className="text-lg font-bold mt-4 md:mt-0 mb-2">CASA CENTRAL</h2>
        <p className="">Tte. Gral. Juan Domingo Perón 4190, CABA.</p>
        <p className="">CP C1199ABB</p>
        <iframe className="w-11/12 mt-6" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14241.076361140696!2d-65.2050432!3d-26.8313923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2sar!4v1723988109297!5m2!1ses!2sar" ></iframe>
      </div>
      <div>
        <h2 className="text-lg font-bold mt-4 md:mt-0 mb-2">CONTACTOS</h2>
        <p className="">Tel. (+54 11) 4959 - 0200</p>
        <p className="">Fax. (+54 11) 4959 - 0201</p>
        <p className="">Mail. contacto@rollinghealth.com.ar</p>
        <ul>
          <li className="mb-2"><a href="#">Formulario de contacto</a></li>
        </ul>
      </div>
      <div>
        <h2 className="text-lg font-bold mt-4 md:mt-0 mb-2">Legales</h2>
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
        <p className="text-sm font-light mt-4">Rolling Health es un proyecto integramente realizado por Mariana Cervantes, Lucas Capdevilla, Marcelo Frias, Joaquin Ortiz y Federico Alvarez, integrantes del Grupo 4 de la comisión de React Avanzado I para Rolling Code.</p>
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
      <div className="flex mt-8 gap-6 absolute -top-16 left-[15%] sm:left-[37%] lg:left-[45%]">
        <p className="flex items-center justify-center bg-[#126459] rounded-full border-white border-2 p-4"><FaFacebook className="text-white text-3xl" /></p>
        <p className="flex items-center justify-center bg-[#126459] rounded-full border-white border-2 p-4"><FaYoutube className="text-white text-3xl" /></p>
        <p className="flex items-center justify-center bg-[#126459] rounded-full border-white border-2 p-4"><FaInstagram className="text-white text-3xl" /></p>
      </div>
      </div>
    </footer>
  );
};

export default Footer;