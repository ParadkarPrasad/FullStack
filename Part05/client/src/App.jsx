import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import Toggable from './components/Toggable'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)
 const blogFormRef = useRef()
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(()=>{
    const savedUser = window.localStorage.getItem('loggedBlogUser')
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  },[])

  const handleLogin = async (event)=>{
    event.preventDefault()

    try{
      const user = await loginService.login({username, password})
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch(exception){
      setErrorMessage('wrong username or password')
      setTimeout(()=>{
        setErrorMessage(null)
      }, 5000)
    }
    
  }

  const handleLogout = ()=>{
    window.localStorage.removeItem('loggedBlogUser')
    setUser(null)
  }

  // Create a new blog from UI
const handleCreate = async (blogObject)=>{
  
  try{
    blogFormRef.current.toggleVisibility()
    const newBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(newBlog))
    setSuccessMessage(`A new blog ${newBlog.title} by ${newBlog.author} added`)
    const getBlogs = await blogService.getAll()
    setBlogs(getBlogs)
    setTimeout(()=>{
      setSuccessMessage(null)
    },3000)
  }catch(error){
    console.log(error)
  }
}

// Update a Blog 
  const updateBlog = async (blogObject)=>{
    try{
      const updatedBlog = await blogService.update(blogObject.id, blogObject)
      const newBlog = blogs.map((blog)=> blog.id === updatedBlog.id?  updatedBlog : blog)
      setBlogs(newBlog)
      setSuccessMessage(`Blog ${updatedBlog.title} by ${updatedBlog.author} updated`)
      // setTimeout(()=>{
      //   setSuccessMessage(null)
      // },3000)
    }catch(error){
      console.log(error)
    }
  }
  // Delete Blog
  const deleteBlog = async(blogObject)=>{
    try{
       await blogService.deleteBlog(blogObject)
      const newBlog = blogs.filter((blog)=>blog.id !== blogObject)
      setBlogs(newBlog)
      setSuccessMessage(`Blog ${blogObject.title} by ${blogObject.author} deleted`)
    }catch(error){
      console.log(error)
    }
  }
  const loginForm = ()=> (
  <form onSubmit={handleLogin}>
  <h1>Login into application</h1>
  <p>{errorMessage}</p>
  <div>
    username
    <input type="text" value={username} name="username" onChange={({target})=> setUsername(target.value)}/>
  </div>
  <div>
    password
    <input type="password" value={password} name="password" onChange={({target})=>setPassword(target.value)}/>
  </div>
  <button type="submit">login</button>
  </form>
  )
  return (
    <div>
    {!user ? (
      loginForm() 
    ):(
    <div>
      <h2>blogs</h2>
      <p>{successMessage}</p>
       <p>{user.name} logged in</p>
      <button onClick={handleLogout}>logout</button>
  <Toggable buttonLabel="new note" ref={blogFormRef}>
      <BlogForm saveBlog={handleCreate}/>
  </Toggable>
      {blogs.sort((a,b)=>b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} username={user.username} updateLikes={updateBlog} deleteBlog={deleteBlog}/>
      )}
    </div>
    )}
    </div>
  )
}

export default App