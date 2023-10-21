const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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
    app.get('/product/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productCollection.findOne(query);
      res.send(result);
    });

  app.post('/product',async (req , res ) =>{
    const newProduct = req.body;
    const result  = await productCollection.insertOne(newProduct);
    res.send(result);
  })




  app.put('/product/:id', async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const option = {upsert :true};
    const updateProduct = req.body;
    const update = {
      $set:{
        name:updateProduct.name,
        imageURL:updateProduct.imageURL,brandName:updateProduct.brandName,
        price:updateProduct.price,description:updateProduct.description,category:updateProduct.category,
      }
    }
    const result = await productCollection.updateOne(filter,update,option);
    res.send(result);
  });


  app.delete('/product/:id', async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await productCollection.deleteOne(query);
    res.send(result);
  });
    // brand side
// jfjifvifvi
      app.get('/brand', async (req, res) => {
      const cursor = brandCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });
    app.get('/productsByBrand/:brandId', async (req, res) => {
      const brandId = req.params.brandId;
      const query = { brandId: brandId }; // Modify the query to match your data structure
      const products = await productCollection.find(query).toArray();
      res.send(products);
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