const express = require('express')
const CustomerService = require('../../services/customer')
const { updateCustomerSchema, createCustomerSchema, getCustomerSchema } = require('../../schemas/customer')
const validatorHandle = require('../../middlewares/validatorHandler')
const router = express.Router()

const service = new CustomerService()

router.get('/', async (req, res, next) => {
  try {
    const custom = await service.find()
    res.json(custom)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', validatorHandle(getCustomerSchema, 'params'), async (req, res, next)=>{
  try {
    const {id} = req.params
    const custom = await service.findOne(id)
     res.json(custom)
  } catch (error) {
    next(error)
  }
})

router.post('/', validatorHandle(createCustomerSchema, 'body'), async(req, res, next) => {
  try {
    const body = req.body
    const custom = await service.create(body)
    res.json({
      message: 'customer created',
      data: custom
    })
  } catch (error) {
    next(error)
  }
})

router.patch('/:id', validatorHandle(getCustomerSchema,'params'), validatorHandle(updateCustomerSchema,'body'), async (req, res, next)=>{
  try {
    const {id} = req.params
    const body = req.body
    const custom = await service.update(id, body)
    res.json({
      message: 'customer updated',
      data: custom
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', validatorHandle(getCustomerSchema, 'params'), async (req, res, next)=>{
  try {
    const {id} = req.params
    const custom = await service.delete(id)
    res.json({
      message: 'customer deleted',
      data: custom
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
