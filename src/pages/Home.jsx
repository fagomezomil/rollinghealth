import ServicesHome from "../components/home/ServicesHome";
import SliderHome from "../components/home/slidesHome/SliderHome";
import SlideCentros from "../components/home/SlideCentros";
import EspecialistasHome from "../components/home/EspecialistasHome";
import Urgencias from "../components/home/Urgencias";

const Home = () => {
  return (
    <main className="mt-20">
      <SliderHome />
      <ServicesHome />
      <SlideCentros />
      <EspecialistasHome />
      <Urgencias />
    </main>
  )
}

export default Home;
