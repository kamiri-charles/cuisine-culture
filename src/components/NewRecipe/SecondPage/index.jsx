import { useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Header from "../../Header"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons"
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons"
import '../styles.scss'
import { useEffect } from "react"


const SecondPage = () => {
    let loc = useLocation();
    let ingr_ref = useRef();
    let nav = useNavigate();
    let [recipe_data, setData] = useState(loc.state)

    let addIngredient = () => {
        if (ingr_ref.current.value) {
            setData({ ...recipe_data, ingredients: { ...recipe_data.ingredients, data: [...recipe_data.ingredients.data, ingr_ref.current.value] } })
            ingr_ref.current.value = ""
        }
    }

    let removeIngredient = (index) => {
        let new_data = recipe_data.ingredients.data.filter((item, i) => i !== index)
        setData({ ...recipe_data, ingredients: { ...recipe_data.ingredients, data: new_data } })
    }

    let prev_page = () => {
        nav('/recipes/new/1', { state: recipe_data })
    }

    let next_page = () => {
        nav('/recipes/new/3', { state: recipe_data })
    }


    useEffect(() => {
        console.log(loc)
    })


    return (
        <>
            <Header />
            <div className="second_page non_header">
                <div className="head">Ingredients</div>
                <ol type='i'>
                    {recipe_data.ingredients.data.map((ingr, i) => (
                        <li key={i}>

                            <div className="ingredient">
                                {ingr}
                                <FontAwesomeIcon icon={faTrash} onClick={
                                    () => removeIngredient(i)
                                } />
                            </div>

                        </li>
                    ))}

                    <div className="input_data">
                        <label>
                            <input ref={ingr_ref} type="text" placeholder="Add a new ingredient" />
                        </label>
                        <button onClick={addIngredient}>
                            <FontAwesomeIcon icon={faAdd} />
                        </button>
                    </div>
                </ol>

                <div className="buttons">
                    <button className="btn btn-dark" onClick={prev_page}>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>

                    <button className="btn btn-dark" onClick={next_page} disabled={
                        recipe_data.ingredients.data.length === 0
                    }>
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>
                </div>
            </div>
        </>
    )
}
export default SecondPage;