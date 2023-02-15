import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../Loader'
import Rating from '../Rating'
import Header from '../Header'
import RecipeData from './RecipeData'
import './styles.scss'

const Recipe = () => {
    let [recipe, setRecipe] = useState()
    let [sectState, setSectState] = useState('ingrs');
    let {recipe_owner, recipe_title} = useParams()
    let recipe_nav = useRef()

    

    let change_active_sect = e => {
        let sections = recipe_nav.current.children;
        for (let i = 0; i < sections.length; i++) {
            if (sections[i].classList.contains('active')) sections[i].classList.remove('active');
        }
        e.target.classList.add('active')

        setSectState(e.target.id);
    }

    useEffect(() => {
        (async () => {
            /* Delay the fetch request */
            setTimeout(async () => {
                await fetch(`/api/recipes/${recipe_owner}/${recipe_title}`)
                .then(res => res.json())
                .then(data => setRecipe(data))
            }, 3000)            
        })();

    }, [recipe_owner, recipe_title]);

    return (
        <>
            <Header />
            <div className="recipe_page non_header">
                {!recipe ? <Loader /> : (
                    <>
                        <div className="head">
                            <div className="title">{recipe.title}</div>
                            <div className="desc">
                                <img src={recipe.image} alt='' />
                                <p>{recipe.desc}</p>
                                <div className="owner">
                                    <Rating rating={recipe.rating} />
                                    <div>{recipe.owner}</div>
                                </div>
                            </div>
                        </div>

                        <div className="recipe_nav" ref={recipe_nav}>
                            <div id='ingrs' className="section active" onClick={change_active_sect}>Ingredients</div>
                            <div id='steps' className="section" onClick={change_active_sect}>Steps</div>
                            <div id='comments' className="section" onClick={change_active_sect}>Comments</div>
                        </div>

                        <div className="recipe_info">
                            <RecipeData recipe={recipe} val={sectState} />
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default Recipe;