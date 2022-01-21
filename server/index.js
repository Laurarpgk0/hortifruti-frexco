const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()

app.use(cors())

app.get('/', async (req, res) => {

  console.log('STARTED')

  try {
    const { data } = await axios('https://www.fruityvice.com/api/fruit/all')
    console.log(data)
    return res.json(data)
    
  } catch (error){
    console.log(error )

  }


})

app.listen(8000)

