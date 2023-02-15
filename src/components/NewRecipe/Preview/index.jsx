import { useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Loader from '../../Loader'
import Rating from '../../Rating'
import Header from '../../Header'
import RecipeData from '../../Recipe/RecipeData'
import '../../Recipe/styles.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import Cookies from 'js-cookie'
import { convert_to_file } from '../../../assets/scripts/base64_img_converter'

const Preview = () => {
    let loc = useLocation();
    let nav = useNavigate();
    let [recipe, setRecipe] = useState(loc.state);
    let [sectState, setSectState] = useState('ingrs');
    let recipe_nav = useRef()
    

    let change_active_sect = e => {
        let sections = recipe_nav.current.children;
        for (let i = 0; i < sections.length; i++) {
            if (sections[i].classList.contains('active')) sections[i].classList.remove('active');
        }
        e.target.classList.add('active')

        setSectState(e.target.id);
    }

    let prev_page = () => {
        nav('/recipes/new/3', { state: recipe })
    }

    let create_recipe = () => {
        (async () => {
            fetch('/api/recipes/create-recipe/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': Cookies.get('csrftoken')
                },
                body: JSON.stringify(recipe)
            })
            .then(res => res.json)
            .then(data => {
                if (data.status === 'success') nav('/')
                else alert("There was an error creating the recipe.\n Try again")
            })
            .catch(err => {
                console.log(err)
                alert("There was an error creating the recipe.\n Try again")
            })
        }) ();
    };

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
                <div className="preview_nav">
                    <button onClick={prev_page}>
                        <FontAwesomeIcon icon={ faAngleLeft } />
                    </button>
                    <button onClick={create_recipe}>Create Recipe</button>
                </div>
            </div>

            
        </>
    )
}

export default Preview;