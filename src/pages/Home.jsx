function Home() {
    return (
        <div>
            <h1 className="Title1">Bienvenido</h1>
            <p className="paragraph">¡Comparte tus escenas favoritas y animate a dar tu opinión!</p> 
            <h4 className="subtitle">⚠️ALERTA DE SPOILERS⚠️</h4> 
            <h5 className="subtitle">Procede con cuidado</h5>
            
            <div className="Media">
                <iframe
                width="560" 
                height="315"
                src="https://www.youtube.com/embed/bfp9r5Luxkc?si=_4sGX4NArG8lXQ7J"
                frameborder="0"
                ></iframe>
            </div>
        </div>
    )
}
export default Home