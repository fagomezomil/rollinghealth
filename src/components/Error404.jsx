import { Link } from "react-router-dom"

const error404 = () => {
  return (
    <div className='grid md:grid-cols-12 flex-row-reverse'>
      <div className='col-span-5 mt-20 ml-4 md:bg-[url("/images/404.png")] bg-cover bg-no-repeat md:h-[600px] md:w-[700px]'>
        {/* <img src="/images/404.png" alt="" /> */}
      </div>
      <div className="p-12 md:p-0 my-20 col-span-6 text-center flex flex-col content-center items-center justify-center">
        <h1 className="text-4xl lg:text-8xl p-4 text-[#126459] font-semibold">Este sitio aún está en construcción</h1>
        <p className="lg:text-3xl italic md:mt-4">Sepa disculpar las molestias</p>
        <Link to="/"><button className="slide-home-button mt-4 bg-neutral-500">Volver al inicio</button></Link>
      </div>
    </div>
  )
}

export default error404
