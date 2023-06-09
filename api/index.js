const express = require('express');
const { logErrors, errorHandler, queryErrorHandler, boomErrorHandler } = require('./middlewares/errorHandlers');
const cors = require('cors');
const routerApi = require('./routes');
const { checkApiKey } = require('./middlewares/authHandler');
const passport = require('passport');
const app = express()

const port = process.env.PORT || 3000;

app.use(express.json())

app.use(cors())

app.get("/", checkApiKey, (req,res)=>{
  res.send("Hola mundo en express")
})
app.use(passport.initialize());
require('./utils/auth')
//routing
routerApi(app)

//middlewares
app.use(logErrors)
app.use(boomErrorHandler)
app.use(queryErrorHandler)
app.use(errorHandler)

app.listen(port, ()=>{
  // eslint-disable-next-line no-console
  console.log('port: '+port)
})
