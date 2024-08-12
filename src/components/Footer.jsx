const Footer = () => {
  return (
    <footer className="bg-[#3b3a35] text-white lg:p-12">
      <ul className="flex flex-wrap justify-center mb-4">
        <li className="w-full md:w-1/3 xl:w-1/3">
          <h2 className="text-lg font-bold mb-2">CASA CENTRAL</h2>
          <p className="">Tte. Gral. Juan Domingo Perón 4190, CABA.</p>
          <p className="">CP C1199ABB</p>
        </li>
        <li className="w-full md:w-1/3 xl:w-1/3">
          <h2 className="text-lg font-bold mb-2">CONTACTOS</h2>
          <p className="">Tel. (+54 11) 4959 - 0200</p>
          <p className="">Fax. (+54 11) 4959 - 0201</p>
          <p className="">Mail. contacto@rollinghealth.com.ar</p>
          <ul>
            <li className="mb-2"><a href="#">Formulario de contacto</a></li>
          </ul>
        </li>
        <li className="w-full md:w-1/3 xl:w-1/3">
          <h2 className="text-lg font-bold mb-2">Legales</h2>
          <ul className="list-none p-0 m-0">
            <li className="mb-2"><a href="#">Términos y condiciones de uso</a></li>
            <li className="mb-2"><a href="#">Política de privacidad</a></li>
            <li className="mb-2"><a href="#">Defensa de las y los Consumidores.</a></li>
            <li className="mb-2"><a href="#">Reportes de incidentes</a></li>
            <li className="mb-2"><a href="#">Trabajar con nosotros</a></li>
          </ul>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;