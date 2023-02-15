import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import Header from "../Header"
import './styles.scss'

const SignIn = () => {
    let [user, setUser] = useState({
        username: "",
        password: "",
    });

    let nav = useNavigate();

    let sign_in_user = (e) => {
        e.preventDefault();
        if (user.username === "" || user.password === "") {
            alert("Please fill all the fields");
        } else {
            
            // Send data to backend via API
            (async () => {
                await fetch('/api/users/sign-in', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': Cookies.get('csrftoken'),
                    },
                    body: JSON.stringify({
                        username: user.username,
                        password: user.password
                    })
                })

                .then(res => res.json())

                .then(data => {
                    if (data.status === 'success') nav('/recipes', {state: {username: user.username}});
                    else if(data.err) setUser({...user, err: data.err});
                })

                .catch(() => {
                    alert("There was an error signing into your account.\nPlease check your credentials and try again.\nIf you are still having issues, please contact me at charleskamiri6@gmail.com");
                })

            })();

    }
}

    return (
        <>
            <Header user={user} />
            <div className="signin non_header">
                <form>
                    <h5>Log in to your account.</h5>
                    <label>
                        Username:
                        <input type="text" value={user.username} onChange={e => (
                            setUser({ ...user, username: e.target.value, err: "" })
                        )} required />
                    </label>

                    <label>
                        Password:
                        <input type="password" value={user.password} onChange={e => (
                            setUser({ ...user, password: e.target.value, err: "" })
                        )} required />
                    </label>

                    <div className="error">
                        {user.err}
                    </div>

                    <button onClick={sign_in_user}>Log in</button>

                    <div className="info">
                        Don't have an account yet?
                        <Link to='/sign-up'>Sign up</Link>
                    </div>
                </form>

            </div>
        </>
    )
}




export default SignIn;