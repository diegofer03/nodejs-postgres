const express = require('express')
const validatorHandle = require('../../middlewares/validatorHandler')
const { getProductSchema, createProductSchema, queryProductSchema } = require('../../schemas/product')
const router = express.Router()
const ProductsService = require('./../../services/products')

const service = new ProductsService()

router.get('/', validatorHandle(queryProductSchema, 'query'),
  async (req,res)=>{
    try {
      const products = await service.findAll(req.query)
      res.status(200).json(products)
    } catch (error){
      res.status(404).json({
        msg: error.message
      })
    }
})

router.get("/:id",
  validatorHandle(getProductSchema, 'params'),
  async (req,res, next)=>{
  try {
    const {id} = req.params
    const products = await service.findOne(id)
    res.status(200).json(products)
  } catch (error) {
    next(error)
  }

})

router.post('/',
  validatorHandle(createProductSchema, 'body'),
  async (req,res,next)=>{
    try {
      const body = req.body
      const newProduct = await service.create(body)
      res.status(201).json({
        message: 'create',
        data: newProduct
      })
    } catch (error) {
      next(error)
    }
})

router.put('/:id',
  validatorHandle(getProductSchema, 'params'),
  validatorHandle(createProductSchema, 'body'),
  async (req,res, next)=>{
  try {
    const {id} = req.params
    const body = req.body
    const prodcut = await service.update(id, body)
    res.status(202).json({
      message: 'update',
      data: prodcut
    })
  } catch (error) {
    next(error)
  }

})

router.delete('/:id', (req,res)=>{
  const {id} = req.params
  const product = service.delete(id)
  res.status(200).json({
    message: 'delete',
    id: product
  })
})

module.exports = router;
