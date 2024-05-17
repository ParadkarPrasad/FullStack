import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const[title, setTitleChange] = useState('')
  const [author, setAuthorChange] = useState('')
  const [url, setUrlChange] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)
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
const handleCreate = async (event)=>{
  event.preventDefault()

  try{
    const newBlog = await blogService.create({
      title: title,
      author: author,
      url: url,
    })
    setBlogs(blogs.concat(newBlog))
    setSuccessMessage(`A new blog ${title} by ${author} added`)
    const getBlogs = await blogService.getAll()
    setBlogs(getBlogs)
    setTimeout(()=>{
      setSuccessMessage(null)
    },3000)
    setTitleChange(''),
    setAuthorChange(''),
    setUrlChange('')
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

      <h1>Create New</h1>
      <form onSubmit={handleCreate}>
        <div> 
        Title:
          <input type="text" value={title} name="title" onChange={({target})=>setTitleChange(target.value)}/>
        </div>
        <div>
        Author:
          <input type="text" value={author} name="Author" onChange={({target})=> setAuthorChange(target.value)}/>
        </div>
        <div>
        Url:
          <input type="text" value={url} name="Url" onChange={({target})=> setUrlChange(target.value)}/>
        </div>
        <p>
          <button type= "submit">Create</button>
        </p>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
    )}
    </div>
  )
}

export default App