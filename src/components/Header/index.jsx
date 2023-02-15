import { useState } from 'react'
import { useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './styles.scss'


const Header = () => {
    let [username, setUsername] = useState()
    let nav = useNavigate()
    let loc = useLocation()
    let header_ref = useRef()
    let to_home = () => {nav('/recipes')}
    let to_sign_in = () => {nav('/sign-in')}


    let sign_out = () => {
        (async () => {
            await fetch('/api/users/sign-out')
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    setUsername(null);
                    nav('/');
                }
            })
        })();
    }

    

    useEffect(() => {
        // Scrolling logic
        window.scrollY > 50 ? header_ref.current.classList.add('scrolled') : header_ref.current.classList.remove('scrolled');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) header_ref.current.classList.add('scrolled');
            else header_ref.current.classList.remove('scrolled');
        })

        // Username
        if (!loc.state?.username) {
            (async () => {
                await fetch('/api/users/get-user')
                .then(res => res.json())
                .then(data => setUsername(data))
            })();

        } else { 
            setUsername(loc.state.username);
        }

    }, [loc.state])
    
    return (
        <div className="header" ref={header_ref}>
            <div className="brand" onClick={to_home}>
                <span className='a'>Cuisine</span>
                <span className='b'>Culture</span>
            </div>

            {username ? (
                <div className="user">
                    <span> Welcome, {username.toLowerCase()} </span>
                    <div onClick={sign_out}>Sign out</div>
                </div>
            ) : (
                <div className="user">
                    <span>Welcome, visitor</span>
                    <div onClick={to_sign_in}>Sign in</div>
                </div>
            )}
        </div>
    )
}

export default Header;