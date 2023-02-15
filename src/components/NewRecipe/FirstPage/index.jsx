import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Header from "../../Header"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight, faImages } from '@fortawesome/free-solid-svg-icons'
import '../styles.scss'

const FirstPage = () => {
    let nav = useNavigate();
    let loc = useLocation();

    let [recipe_data, setData] = useState({

        title: "",
        desc: "",
        image: null,
        ingredients: {
            "data": []
        },
        steps: {
            "data": []
        },
        tags: {
            "data": []
        },
        rating: 10,
        prep_time: 0
    });

    // If page receives data from previous page, update state
    useEffect(() => {
        if (loc.state) {
            setData(loc.state)
            window.history.replaceState({}, document.title);
        } else {
            (async () => {
                fetch('/api/users/get-user')
                .then(res => res.json())
                .then(data => setData({...recipe_data, owner: data}))
            }) ();
        }
    }, [loc.state]);

    let next_page = () => {
        nav('/recipes/new/2', { state: recipe_data })
    }

    let image_handler = (image) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setData({ ...recipe_data, image: reader.result })
            }
        }
        reader.readAsDataURL(image)
    }


    return (
        <>
            <Header />
            <div className="first_page non_header">
                <div className="head">New Recipe</div>

                <div className="input_data pg_1">
                    <label>
                        <span>Recipe Name:</span>
                        <input
                            type="text"
                            placeholder="i.e Pilau, Ugali, Gnocci"
                            value={recipe_data.title}
                            onChange={
                                e => setData({ ...recipe_data, title: e.target.value })
                            }
                            required />
                    </label>

                    <label>
                        <span>Recipe Description:</span>

                        <textarea
                            rows='4'
                            placeholder="Enter a short description of your recipe"
                            value={recipe_data.desc}
                            onChange={
                                e =>setData({ ...recipe_data, desc: e.target.value })
                            }
                            required>
                        </textarea>

                    </label>

                     {/* If image does not exist in state  */}
                     {!recipe_data.image ? (
                        <div className="img_drop">
                            <span>Upload recipe image</span>
                            <div className="drag_area" onDragOver={e => e.preventDefault()}>
                                <div className="icon">

                                <input
                                    className='image_input'
                                    type="file" accept='image/*'
                                    onChange={e =>image_handler(e.target.files[0])} 
                                    required />

                                    <FontAwesomeIcon icon={faImages} />
                                </div>

                                <span className="drag_header">Drag & drop image or <span className="file_link">browse</span></span>
                            </div>
                        </div>
                     ) : (
                        <div className="img_drop">
                            <img src={recipe_data.image} alt="Recipe" />
                        </div>
                     )}
                </div>

                <div className="buttons">
                    
                    <button className='btn btn-dark valid' disabled>
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </button>

                    <button
                        className='btn btn-dark valid'
                        disabled={ !recipe_data.title || !recipe_data.desc || !recipe_data.image}
                        onClick={next_page}
                        >
                        <FontAwesomeIcon icon={faAngleRight} />
                    </button>

                </div>
            </div>
        </>
    )
}

export default FirstPage;