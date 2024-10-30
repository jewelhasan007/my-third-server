const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = 5000

// middleware
app.use(cors())
app.use(express.json())

// zigzagminded
// oIi6kgZE8WiUSobB
// WcvDb3yM2d7pWe8G

// const users = [
//     {name: "korim", emial: "korim@gmail.com"}
// ]

app.get('/', (req, res)=>{
res.send('the server is running')
})

// app.get('/users', (req, res)=>{
//     res.send(users)
// })

// app.post('/users',(req, res)=>{
//     const newUser = req.body;
//     users.push(newUser)
//     res.send(newUser)
//     console.log(newUser)
// })

// MondoDb connection



const uri = "mongodb+srv://zigzagminded:WcvDb3yM2d7pWe8G@cluster0.0frmz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

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

    const database = client.db("usersDB2");
    const usersCollections = database.collection("users");

    app.post('/users', async(req, res)=>{
      const user = req.body;
      console.log('new user inside async function run', user)
      const result = await usersCollections.insertOne(user);
      res.send(result)
    })
 
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, ()=>{
    console.log(`the port is running${port}`)
})
