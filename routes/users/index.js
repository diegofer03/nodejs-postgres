const express = require('express')
const router = express.Router()

router.get("/", (req,res)=>{
  const {limit, offset} = req.query

  if(limit && offset){
    res.json(
      {
        limit: limit,
        offset: offset,
      }
    )
  }else{
    res.send('no hay nada')
  }

})

router.get("/:id", (req,res)=>{
  const {id} = req.params

  res.json(
    {
      id: id,
      name: 'Diego Fernandez',
      rol: 'FullStack'
    }
  )
})

module.exports = router;
