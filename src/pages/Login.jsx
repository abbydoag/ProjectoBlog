import {useState} from 'react'
import useNavigate from '@hooks/useNavigate'
import Input from '@components/Input'
import Button from '@components/Button'

function Login() {
    const {navigate} = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const user = "AbbyDonis"
    const contra = "ProyectoBlog"

    const processLogin = async () => {
        if(username===user && password===contra){
            const token = "TokenPrueba"
            localStorage.setItem("access", token)
            navigate("/dashboard")
        }
        else{
            alert("Datos invalidos, intentelo nuevamente")
        }
    }
    const getToken = () => {
        return localStorage.getItem("access")
    }

    return (
        <div>
            <h1>Login</h1>
            <Input
                label="Usuario"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <Input
                label="Contraseña"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button text="Ingresar" color="primary" onClick={processLogin} />
        </div>
    )
}

export default Login