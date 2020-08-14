const express = require('express')

const app = express()

app.use(express.json())

app.get('/projects', (request,response)=>{
  return response.json([
    'projects 1'
  ])
})

app.post('/projects', (request,response)=>{
  return response.json([
    'projects 1',
    'projects 2',
    'projects 3'
  ])
})

app.put('/projects/:id', (request,response)=>{
  return response.json([
    'projects 30',
    'projects 20',
    'projects 10'
  ])
})

app.delete('/projects/:id', (request,response)=>{
  return response.json([
    'projects 30',
    'projects 20',
  ])
})

app.listen(3333, ()=>{
  console.log('😎 Listen http://localhost:3333')
})