import ServicesHome from "../components/home/ServicesHome";
import SliderHome from "../components/home/slidesHome/SliderHome";
import SlideCentros from "../components/home/SlideCentros";
import EspecialistasHome from "../components/home/EspecialistasHome";
import { traerUsuariosAPI } from "../utils/queries";

traerUsuariosAPI()

const Home = () => {
  return (
    <main className="mt-20">
      <SliderHome />
      <ServicesHome />
      <SlideCentros />
      <EspecialistasHome />
    </main>
  )
}

export default Home;
