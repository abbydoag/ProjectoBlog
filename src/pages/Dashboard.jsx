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
        <img className="gif" src="src/assets/RWBYGif.gif" alt="Ruby" />
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
            <ul className="card-container">
              {posts.map((post) => (
                <ul key={post.id} className="post-card">
                  <article>
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-excerpt">{post.content}</p>
                    <div className="post-details">
                      {post.episode && (
                        <p>
                          <b>Episode: </b> {post.episode}
                        </p>
                      )}
                      {post.nameFight && (
                        <p>
                          <b>Fight: </b> {post.nameFight}
                        </p>
                      )}
                      {post.nameSoundtrack && (
                        <p>
                          <b>Soundtrack: </b> {post.nameSoundtrack}
                        </p>
                      )}
                      {post.fightVideo && (
                      <div className="post-video">
                        <iframe
                          width="500"
                          height="280"
                          src={post.fightVideo}
                          frameborder="0"
                          allow=" gyroscope"
                          title={post.title}
                        ></iframe>
                      </div>
                    )}
                    </div>
                  </article>
                </ul>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  )
}

export default Dashboard
