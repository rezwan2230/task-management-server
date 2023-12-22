const express = require('express')
var cors = require('cors')
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nvdjbig.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    const toDoesCollection = client.db("taskManagement").collection("toDoes");

    app.get('/toDoes', async (req, res) => {
      const result = await toDoesCollection.find().toArray()
      res.send(result)
    })

    app.post('/addToDoes', async (req, res) => {
      const toDoes = req.body;
      const result = await toDoesCollection.insertOne(toDoes)
      res.send(result)
    })








    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
  res.send('Task Management System')
})

app.listen(port, () => {
  console.log(`Task Management System is running on port ${port}`)
})