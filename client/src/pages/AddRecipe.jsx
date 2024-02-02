import RecipeForm from '../components/RecipeForm';
import './style.css';

function AddRecipe() {
    return (
        <main className="md-container m-auto text-center" id="cardContainer">
            <RecipeForm />
        </main>
    );
}

export default AddRecipe;