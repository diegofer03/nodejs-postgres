const express = require('express')
const router = express.Router()

const faker = require('faker')

router.get("/", (req,res)=>{
  res.json([
    {
      name: faker.commerce.productAdjective(),
    },
    {
      name: faker.commerce.productAdjective(),
    }
  ])
})

router.get("/:id", (req,res)=>{
  const {id} = req.params

  res.json(
    {
      id: id,
      name: faker.commerce.productAdjective(),
    }
  )
})

router.get("/:categoryId/prodcuts/:prodcutId", (req,res)=>{
  const {categoryId, prodcutId } = req.params

  res.json(
    {
      categoryId: categoryId,
      prodcutId: prodcutId,
    }
  )
})

module.exports = router;
