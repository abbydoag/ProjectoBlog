import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('http://127.0.0.1:8001/all-posts');

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts()
  }, []);

  return (
    <div className="dashboard">
      <h1 className="Title1">Posts</h1>
      <div className="header">
        <img className="gif" src="src/assets/RWBYGif1.gif" alt="Ruby" />
        <img className="gif" src="src/assets/RWBYGif2.gif" alt="Weiss" />
        <img className="gif" src="src/assets/RWBYGif3.gif" alt="Blake" />
        <img className="gif" src="src/assets/RWBYGif4.gif" alt="Yang" />
      </div>
      <div className="Content">
        {isLoading && (
          <div className="loading">Cargando...</div>
        )}
        {!isLoading && !error && posts.length === 0 && (
          <div className="empty-message">No hay posts</div>
        )}
        {!isLoading && !error && posts.length > 0 &&(
          <section className="post-list">
            <table className="tabla">
              <thead>
                <tr className="TableTitles">
                  <th></th>
                  <th>Contenido</th>
                  <th>Episodio</th>
                  <th>Pelea</th>
                  <th>Soundtrack</th>
                  <th>Video</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id}>
                    <th>{post.title}</th>
                    <td>{post.content}</td>
                    <td>{post.episode}</td>
                    <td>{post.nameFight}</td>
                    <td>{post.nameSoundtrack}</td>
                    <td>
                    <iframe
                      width="560"
                      height="315"
                      src={post.fightVideo}
                      frameborder="0"
                      title={post.title}
                    >
                    Your browser does not support iframes.
                    </iframe>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </div>
    </div>
  )
}

export default Dashboard