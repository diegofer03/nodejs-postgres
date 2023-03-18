const express = require('express');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/errorHandlers');
const cors = require('cors');
const routerApi = require('./routes')
const app = express()

const port = process.env.PORT || 3000;

app.use(express.json())

app.use(cors())

app.get("/", (req,res)=>{
  res.send("Hola mundo en express")
})

//routing
routerApi(app)

//middlewares
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, ()=>{
  // eslint-disable-next-line no-console
  console.log('port: '+port)
})
