

const BlogForm = ({handleNew,title,author,url, handleTitleChange,handleAuthorChange,handleUrlChange}) => {
  return (
    <div>
      <h1>Create New</h1>
      <form onSubmit={handleNew}>
      <div> 
        Title:
          <input type="text" value={title} name="title" onChange={handleTitleChange}/>
        </div>
        <div>
        Author:
          <input type="text" value={author} name="Author" onChange={handleAuthorChange}/>
        </div>
        <div>
        Url:
          <input type="text" value={url} name="Url" onChange={handleUrlChange}/>
        </div>
        <p>
          <button type= "submit">Create</button>
        </p>
      </form>
    </div>
  )
}

export default BlogForm