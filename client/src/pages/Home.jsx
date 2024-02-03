import GameCard from "../components/GameCard";
import Carousels from "../components/Carousel";
import "./style.css";

function Home() {
  return (
    <section className="md-container m-auto text-center">
      <Carousels />
      <h2 className="mt-5 mb-1">✨ Let The Games Begin! ✨</h2>
      <div className="d-flex p-3 flex-wrap" id="cardContainer">
        <GameCard />
      </div>
    </section>
  );
}

export default Home;
