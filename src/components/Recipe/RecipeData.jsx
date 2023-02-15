const RecipeData = ({recipe, val}) => {
    return (
        <div className="data">
            {
                val === 'ingrs' ? (
                    <ul>
                        {recipe.ingredients.data.map((ingredient, i) => (<li key={i}>{ingredient}</li>))}
                    </ul>
                ) : val === 'steps' ? (
                    <ol>
                        {recipe.steps.data.map((step, i) => (<li key={i}>{step}</li>))}
                    </ol>
                ) : (
                    <div>Feature under construction</div>
                )
            }
        </div>
    )
}

export default RecipeData;