import RecipeCard from '../components/RecipeCard';
import Carousels from '../components/Carousel';
import './style.css';

function Home() {
    return (
        <section className="md-container m-auto text-center">
         <Carousels />
         <h2 className="mt-5 mb-1">✨ Top Recipes ✨</h2>
        <div className="d-flex p-3 flex-wrap" id="cardContainer">
            <RecipeCard />
        </div>
        </section>
    );
}

export default Home;
