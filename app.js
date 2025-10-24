const express = require('express')
const path = require('path')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')));


app.set('views', path.join(__dirname, 'src/views'))

let posts = [
  { id: 1, title: 'My First Blog', content: 'This is my first post!' },
]

app.get('/', (req, res) => {
  res.render('index', { posts })
})

app.get('/new', (req, res) => {
  res.render('new')
})

app.post('/new', (req, res) => {
  const { title, content } = req.body
  const newPost = { id: Date.now(), title, content }
  posts.push(newPost)
  res.redirect('/')
})
app.get('/posts/:id', (req, res) => {
  const post = posts.find((p) => p.id == req.params.id)
  if (!post) return res.send('Post not found')
  res.render('show', { post })
})

app.get('/posts/:id/edit', (req, res) => {
  const post = posts.find((p) => p.id == req.params.id)
  if (!post) return res.send('Post not found')
  res.render('edit', { post })
})

app.post('/posts/:id/edit', (req, res) => {
  const post = posts.find((p) => p.id == req.params.id)
  if (!post) return res.send('Post not found')
  post.title = req.body.title
  post.content = req.body.content
  res.redirect('/')
})
app.post('/posts/:id/delete', (req, res) => {
  posts = posts.filter((p) => p.id != req.params.id)
  // res.status(200).send(`Item with ID ${req.params.id} deleted.`);
  res.redirect('/')
})

module.exports = { app }
