import ServicesHome from "../components/ServicesHome";
import SlideCentros from "../components/SlideCentros";
import SliderHome from "../components/slidesHome/SliderHome"

const Home = () => {
  return (
    <main className="mt-20">
      <SliderHome />
      <ServicesHome />
      <SlideCentros />
    </main>
  )
}

export default Home;
