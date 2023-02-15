import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const RedirectToHome = () => {
    let nav = useNavigate();
    useEffect(() => {
        nav('/recipes')
    })
}

export default RedirectToHome;