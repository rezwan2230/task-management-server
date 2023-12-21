const express = require('express')
var cors = require('cors')
const app = express()
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())










app.get('/', (req, res) => {
  res.send('Task Management System')
})

app.listen(port, () => {
  console.log(`Task Management System is running on port ${port}`)
})