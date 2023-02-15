import { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom'
import Header from '../Header'
import Loader from "../Loader"
import Rating from "../Rating"
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd } from '@fortawesome/free-solid-svg-icons'
import './styles.scss'


const Home = () => {
    let [recipes, setRecipes] = useState();
    let nav = useNavigate();

    let to_new_recipe = () => {
        (async () => {
            fetch('/api/users/get-user')
            .then(res => res.json())
            .then(data => {
                data ? nav('/recipes/new/1') : nav('/sign-in')
            });
        }) ();
    };

    let limit_desc = (desc) => {
        if (desc.length > 50) {
            return desc.substring(0, 80) + '...'
        }
    };

    useEffect(() => {
        (async () => {
            /* Delay the fetch request */
            setTimeout(async () => {
                await fetch('/api/recipes/')
                .then(res => res.json())
                .then(data => setRecipes(data))
            }, 2000)            
        }) ();

    }, []);

    return (
        <>
            <Header />
            <div className="recipes non_header">
                {!recipes ? <Loader /> : recipes.map(recipe => (
                    <Link to={`${recipe.owner_slug}/${recipe.title_slug}`} key={recipe.id}>
                        <Row xs={1} md={2} className="g-4">
                            <Col>
                            <Card bg='dark' className='recipe_card' text='white'>
                                <Card.Img variant="top" src={recipe.image} />
                                <Card.Body>
                                    <Card.Title className='custom_title'>{recipe.title}</Card.Title>
                                    <Card.Text className="recipe_desc">
                                        {limit_desc(recipe.desc)}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className='text-muted recipe_footer'>
                                    <Rating rating={recipe.rating} />
                                    <div className="user">{recipe.owner}</div>
                                </Card.Footer>
                            </Card>
                            </Col>
                        </Row>
                    </Link>
                ))}

                <div className="new" onClick={to_new_recipe}>
                    <FontAwesomeIcon icon={faAdd} />
                </div>
            </div>
        </>
    )
}

export default Home;