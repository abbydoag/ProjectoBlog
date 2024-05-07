import useNavigate from "@hooks/useNavigate"
import Logo from '@assets/Logo.png'

const Nav = ({ loggedIn, token }) => {
  const { page, navigate } = useNavigate()

  const userToken = loggedIn ? getRawToken() : {}

  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand">
          <img src={Logo} alt="Logo" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className={page === "/" ? "nav-link active" : "nav-link"} onClick={() => navigate('/')} id="buttonNav">
                <i className="fa-solid fa-house-chimney"></i> Home
              </a>
            </li>
            <li className="nav-item">
              <a className={page === "/about" ? "nav-link active" : "nav-link"} onClick={() => navigate('/about')}>
                <i className="fa-solid fa-circle-info"></i> Sobre nosotros
              </a>
            </li>
            {loggedIn && (
              <li className="nav-item">
                <a
                  className={page === "/logout" ? "nav-link active" : "nav-link"}
                  onClick={() => navigate("/logout")}
                >
                  <i className="fa-solid fa-right-from-bracket"></i> Cerrar Sesión
                </a>
              </li>
            )}
            {/*Si loggedIn */}
            {!loggedIn && (
              <li className="nav-item">
                <a
                  className={page === "/login" ? "nav-link active" : "nav-link"}
                  onClick={() => navigate("/login")}
                >
                  <i className="fa-solid fa-right-to-bracket"></i> Login
                </a>
              </li>
            )}
            {loggedIn && (
              <span className="navbar-text">
                <i className="fa-solid fa-user"></i> {token?.name}
              </span>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav