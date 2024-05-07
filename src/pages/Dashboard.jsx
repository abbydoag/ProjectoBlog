import React, {useState, useEffect} from 'react'

function Dashboard(){
    const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://127.0.0.1:8001/all-posts");

      if (!response.ok) {
        throw new Error("Error: ${response.statusText}");
      }

      const data = await response.json();
      setPosts(data);
    }
    catch (err){
      setError(err.message);
    }finally{
      setIsLoading(false);
    }
  };

  fetchPosts();
  }, []);

  return (
    <div className="dashboard">
      <h1 className="Title1">Posts</h1>
      <div className="header">
        <img className="gif" src="src/assets/RWBYGif1.gif" alt="Ruby"/>
        <img className="gif" src="src/assets/RWBYGif2.gif" alt="Weiss"/>
        <img className="gif" src="src/assets/RWBYGif3.gif" alt="Blake"/>
        <img className="gif" src="src/assets/RWBYGif4.gif" alt="Yang"/>
      </div>
      <div className='Content'>
        {isLoading && (
          <div className="loading">Cargando...</div>
        )}
        {!isLoading && !error && posts.length === 0 && (
          <div className="empty-message">No hay posts</div>
        )}
        {!isLoading && !error && posts.length > 0 && (
          <ul className="post-list">
            {posts.map((post) => (
              <li key={post.id} className="post">
                <h2>{post.title}</h2> <p className="excerpt">{post.content}</p>
                <a href={`post/${post.slug}`} className="read-more"></a>
                Mas
              </li>
                ))}
          </ul>
          )}
          </div>
      </div>
    )
}

export default Dashboard