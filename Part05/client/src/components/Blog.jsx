import { useState } from 'react'
const Blog = ({ blog,updateLikes, username, deleteBlog }) => {

  const [visible, setVisible] = useState(false)
  const blogStyle= {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikes = () => {
    const blogToUpdate = ({
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1
    })
    updateLikes(blogToUpdate)
  }

  const handleDelete= () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      deleteBlog(blog.id)
    }
  }
  return(
    <div style={blogStyle}>
      {blog.title}
      <button onClick={() => setVisible(!visible)}>
        {visible? 'Hide': 'View'}
      </button>
      {visible === true &&
    <div>
      <p>{blog.author}</p>
      <p>{blog.url}</p>
      <p>Likes: {blog.likes} <button onClick={handleLikes}>likes</button></p>
      <div>
        <button onClick={handleDelete}>Remove</button>
      </div>

    </div>
      }
      {blog.author}
    </div>


  )}
export default Blog
