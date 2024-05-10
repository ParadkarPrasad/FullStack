const Blog = require ('../models/blog')

const initialBlogs = [
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  },
]

const BlogsInDb = async ()=>{
  const blogs = await Blog.find({})
  return blogs.map(blog=> blog.toJSON());
}

module.exports= {
  BlogsInDb, initialBlogs
}