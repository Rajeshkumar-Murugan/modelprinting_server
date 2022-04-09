var express = require('express');
const client = require('nodemon/lib/cli');
var router = express.Router();
const {dbUrl,mongodb,MongoClient,dbName} = require('../dbConfig')


/* GET home page. */
router.get('/', async(req, res, next)=>{
  const client = await MongoClient.connect(dbUrl)
  try {
    const db = await client.db(dbName)
    let model = await db.collection('model').find().toArray()
     res.json({
       statusCode:200,
       message:"Model data Fetched Sucessfully",
       data: model
     })

  } catch (error) {
    console.log(error)
    res.json({
      statusCode:500,
      message:"Internal Server Error" 
    })
  }
  finally{
    client.close()
  }

});
router.get('/model/:name', async(req, res, next)=>{
  const client = await MongoClient.connect(dbUrl)
  try {
    const db = await client.db(dbName)
    let model = await db.collection('model').find({Name:req.params.name}).toArray()
    if(model){
      res.json({
        statusCode:200,
        message:"model data Fetched Sucessfully",
        data: model
      })
    }
    else{
      res.json({
        statusCode:500,
        message:"Model is not available",
      })
    }
    

  } catch (error) {
    console.log(error)
    res.json({
      statusCode:500,
      message:"Internal Server Error" 
    })
  }
  finally{
    client.close()
  }

});



router.get('/user', async(req, res, next)=>{
  const client = await MongoClient.connect(dbUrl)
  try {
    const db = await client.db(dbName)
    let user = await db.collection('auth').find().toArray()
     res.json({
       statusCode:200,
       message:"Userdata Fetched Sucessfully",
       data: user
     })

  } catch (error) {
    console.log(error)
    res.json({
      statusCode:500,
      message:"Internal Server Error" 
    })
  }
  finally{
    client.close()
  }

});

//Get Movies data


// Get Request with ID

router.post('/addmodel',async(req, res)=>{
  const client = await MongoClient.connect(dbUrl)

  try {
    const db = await client.db(dbName)
    
      const model =await db.collection('model').insertOne(req.body)
      res.json({
        statusCode:200,
        message:"Model Added Sucessfully",
        data:model
      })

    
  } catch (error) {
    console.log(error)
    res.json({
      statusCode:500,
      message:"Internal Server Error" 
    })
    
  }
  finally{
client.close()

  }
})


// Put Request with ID
router.put('/edit-model',async(req, res)=>{
  const client = await MongoClient.connect(dbUrl)

  try {
    const db = await client.db(dbName)
    
    let business = await db.collection('model').findOneAndReplace({Name:req.body.Name},req.body
    //   {
    //     businessName:req.body.businessName,
    //     email:req.body.email,
    //     mobile:req.body.mobile,
    //     address:req.body.address,
    //     city:req.body.city,
    //     state:req.body.state,
    //     Zipcode:req.body.Zipcode,
    // }
    )
    res.json({
      statusCode:200,
      message:"Name Edited Successfully"
    })
    
   
    
  } catch (error) {
    console.log(error)
    res.json({
      statusCode:500,
      message:"Internal Server Error" 
    })
    
  }
  finally{
client.close()

  }
})

// Delete Request with ID
router.delete('/delete/:id', async(req, res, next)=>{
  const client = await MongoClient.connect(dbUrl)
  try {
    const db = await client.db(dbName)
    let model = await db.collection('model').deleteOne({_id:mongodb.ObjectId(req.params.id)})
     res.json({
       statusCode:200,
       message:"Model Deleted Sucessfully",
     })

  } catch (error) {
    console.log(error)
    res.json({
      statusCode:500,
      message:"Internal Server Error" 
    })
  }
  finally{
    client.close()
  }

});



// });

module.exports = router;
