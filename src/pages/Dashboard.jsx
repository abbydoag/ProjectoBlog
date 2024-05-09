import React, { useState, useEffect } from 'react'
import Input from '@components/Input'

function Dashboard() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    episode: "",
    nameFight: "",
    nameSoundtrack: "",
    fightVideo: ""
  });

  const [form, setForm] = useState(false)
  const makePost = async(event) => {
    event.preventDefault();
  
    try {  
      const response = await fetch("http://127.0.0.1:8001/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPost),
      });
  
      if (response.ok) {
        const updatePage = await fetch("http://127.0.0.1:8001/all-posts")
        if(updatePage.ok){
          const updatePosts = await updatePage.json()
          setPosts(updatePosts)
        }
      } else {
        throw new Error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      alert(`Error, no se pudo crear el post: ${error.message}`);
    }
  }

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

  const openForm = () => {
    setForm(true)
  }
  const closeForm = () =>{
    setForm(false)
  }

  return (
    <div className="dashboard">
      <h1 className="Title1">Posts</h1>
      <div className="header">
        <img className="gif" src="src/assets/RWBYGif.gif" alt="Ruby" />
        <img className="gif" src="src/assets/RWBYGif2.gif" alt="Weiss" />
        <img className="gif" src="src/assets/RWBYGif3.gif" alt="Blake" />
        <img className="gif" src="src/assets/RWBYGif4.gif" alt="Yang" />
      </div>
      <button onClick={openForm} className="createPostButton">Crear Post</button>
      <div>
        <div>
          {
            form &&(
              <div className="form">
                <div className="form-content">
                  <span className="X" onClick={closeForm}>X</span>
                  <form onSubmit={makePost}>
                    <Input
                      name="title"
                      label="Titulo"
                      type="text"
                      value={newPost.title}
                      onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                    /> 
                    <Input
                      name="content"
                      label="Contenido"
                      type="text"
                      value={newPost.content}
                      onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                    />
                    <Input
                      name="episode"
                      label="Episodio"
                      type="text"
                      value={newPost.episode}
                      onChange={(e) => setNewPost({...newPost, episode: e.target.value})}
                    />   
                    <Input
                      name="nameFight"
                      label="Nombre de la pelea"
                      type="text"
                      value={newPost.nameFight}
                      onChange={(e) => setNewPost({...newPost, nameFight: e.target.value})}
                    />
                    <Input
                      name="nameSoundtrack"
                      label="Soundtrack"
                      type="text"
                      value={newPost.nameSoundtrack}
                      onChange={(e) => setNewPost({...newPost, nameSoundtrack: e.target.value})}
                    />
                    <Input
                      name="fightVideo"
                      label="Video (embeded)"
                      type="text"
                      value={newPost.fightVideo}
                      onChange={(e) => setNewPost({...newPost, fightVideo: e.target.value})}
                    />  
                    <button className="createPost" type="submit">Publicar</button>
                  </form>
                </div>
              </div>
            )
          }
        </div>
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
                          <b>Episodio⠀</b> {post.episode}
                        </p>
                      )}
                      {post.nameFight && (
                        <p>
                          <b>Pelea⠀</b> {post.nameFight}
                        </p>
                      )}
                      {post.nameSoundtrack && (
                        <p>
                          <b>Soundtrack⠀</b> {post.nameSoundtrack}
                        </p>
                      )}
                      <b>Video</b>
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