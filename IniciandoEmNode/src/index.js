const express = require('express')

const app = express()

app.get('/', (request,response)=>{
  return response.json({ message: "Hello"})
})

app.listen(3333, ()=>{
  console.log('😎 Listen http://localhost:3333')
})