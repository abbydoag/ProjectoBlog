import useNavigate from "@hooks/useNavigate"
import Nav from "@components/Nav"

import Login from "@pages/Login"
import Logout from "@pages/Logout"
import Home from "@pages/Home"
import Dashboard from "@pages/Dashboard"
import About from "@pages/About"

//rutas
const routes = {
    //Home
    '/':{
        component: Home,
        requiresAuth: false
    },
    //pagina abiut
    "/about":{
        component: About,
        requiresAuth: false
    },
    //pagna login
    "/login":{
        component: Login,
        requiresAuth: false
    },
    "/logout":{
        component: Logout,
        requiresAuth: false
    },
    //pagina donde se ven los posts, el TL
    "/dashboard":{
        component: Dashboard,
        requiresAuth: true
    }
}

function Router(){
    const {page} = useNavigate()

    let CurrentPage = () => <h1>⛔ 404 Page Not Found ⛔</h1>

    if(routes[page]){
        //Si esta login navegar
        if (routes[page].requiresAuth && !localStorage.getItem("access")) {
            CurrentPage = Login
        } else {
            CurrentPage = routes[page].component
        }
    }
    //redirección a home si se hace logout
    if (page === "/logout"){
        window.location.replace("/");
    }

    return(
        <div>
            <Nav/>
            <div className="container mt-3">
                <div className="p-5 mb-4 bg-body-tertiary rounded-3">
                    <CurrentPage/>
                </div>
            </div>
        </div>
    )
}

export default Router