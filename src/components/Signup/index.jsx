import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Cookies from "js-cookie"
import Header from "../Header"
import validate_email from "../../assets/scripts/validate_email"
import './styles.scss'

const SignUp = () => {
    let [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });

    let nav = useNavigate();

    let create_user = (e) => {
        if (user.username === "" || user.email === "" || user.password === "") {
            alert("Please fill all the fields");
        } else if (!validate_email(user.email)) {
            alert("Please enter a valid email");
        } else {
            e.preventDefault();
            
            // Send data to backend via API
            (async () => {
                await fetch('/api/users/sign-up', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': Cookies.get('csrftoken'),
                    },
                    body: JSON.stringify(user)
                })

                .then(res => res.json())

                .then(data => {
                    if (data.username) alert(data.username);
                    else if (data.email) alert(data.email);
                    else if (data.status === 'success') {
                        alert("Account created successfully.\nYou can now sign in.");
                        nav('/sign-in');
                    };

                })

                .catch(() => {
                    alert("There was an error creating your account.\nPlease try again in a few moments.\nIf you are still having issues, please contact me at charleskamiri6@gmail.com");
                })

            })();

    }
}

    return (
        <>
            <Header />
            <div className="signup non_header">
                <form>
                    <h5>Create an account.</h5>
                    <label>
                        Username:
                        <input type="text" placeholder="Choose a unique identifier" value={user.username} onChange={e => (
                            setUser({ ...user, username: e.target.value.toLowerCase() })
                        )} required />
                    </label>
                    <label>
                        Email:
                        <input type="email" placeholder="Enter your email adress" value={user.email} onChange={e => (
                            setUser({ ...user, email: e.target.value })
                        )} required />
                    </label>

                    <label>
                        Password:
                        <input type="password" placeholder="Choose a strong password" value={user.password} onChange={e => (
                            setUser({ ...user, password: e.target.value })
                        )} required />
                    </label>

                    <button onClick={create_user}>Create Account</button>

                    <div className="info">
                        Already have an account?
                        <Link to='/sign-in'>Sign in</Link>
                    </div>
                </form>

            </div>
        </>
    )
}




export default SignUp;