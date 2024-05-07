import { useEffect } from 'react'
import useNavigate from "@hooks/useNavigate"

const Logout = () => {
    const { navigate } = useNavigate()

    useEffect(() => {
        localStorage.clear()

        setTimeout(() => {
            navigate('/')
        }, 1000)
    }, [])

    return <h1>Vuelve pronto!</h1>
}

export default Logout