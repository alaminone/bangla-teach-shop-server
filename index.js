const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// banglatech_hub
// 8hgibbn4Pj64SbZj



const uri = "mongodb+srv://banglatech_hub:8hgibbn4Pj64SbZj@cluster0.ufduuil.mongodb.net/?retryWrites=true&w=majority";

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

    const productCollection = client.db('TechProduct').collection('product');

    const brandCollection = client.db('TechBrand').collection('Brand');


    app.get('/product', async (req, res) => {
      const cursor = productCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

  app.post('/product',async (req , res ) =>{
    const newProduct = req.body;
    const result  = await productCollection.insertOne(newProduct);
    res.send(result);
  })
    // brand side

      app.get('/brand', async (req, res) => {
      const cursor = brandCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

  app.post('/brand',async (req , res ) =>{
    const newBrand = req.body;
    const result  = await brandCollection.insertOne(newBrand);
    res.send(result);
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





app.get('/', (req, res) => {
    res.send('bangla tech server is running');
  });
  
  app.listen(port, () => {
    console.log(`bangla tech server running on port ${port}`);
  });