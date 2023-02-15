import { useRef, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash, faAngleLeft, faAngleRight, faAdd } from "@fortawesome/free-solid-svg-icons"
import Header from "../../Header"
import '../styles.scss'

const ThirdPage = () => {
    let loc = useLocation();
    let steps_ref = useRef();
    let nav = useNavigate();
    let [recipe_data, setData] = useState(loc.state)

    let addStep = () => {
        if (steps_ref.current.value) {
            setData({ ...recipe_data, steps: { ...recipe_data.steps, data: [...recipe_data.steps.data, steps_ref.current.value] } })
            steps_ref.current.value = ""
        }
    }

    let removeStep = (index) => {
        let new_data = recipe_data.steps.data.filter((item, i) => i !== index)
        setData({ ...recipe_data, steps: { ...recipe_data.steps, data: new_data } })
    }

    let prev_page = () => {
        nav('/recipes/new/2', { state: recipe_data })
    }

    let next_page = () => {
        nav('/recipes/new/preview', { state: recipe_data })
    }

    return (
        <>
            <Header />

            <div className="third_page non_header">
                <div className="head">Steps</div>
                <ol>
                    {recipe_data.steps.data.map((step, i) => (
                        <li key={i}>
                            <div className="step">
                                {step}
                                <FontAwesomeIcon icon={faTrash} onClick={
                                    () => removeStep(i)
                                } />
                            </div>
                        </li>
                    ))}

                    <div className="input_data">
                        <label>
                            <textarea
                                placeholder={`Add step ${recipe_data.steps.data.length+1}`}
                                ref={steps_ref}
                                required
                                >
                                </textarea>
                        </label>
                        <button onClick={addStep}>
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

export default ThirdPage;