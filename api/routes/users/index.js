const express = require('express')
const UserService = require('../../services/user');
const { getUserSchema, updateUserSchema, createUserSchema } = require('../../schemas/user');
const validatorHandle = require('../../middlewares/validatorHandler');
const router = express.Router()
const service = new UserService();

router.get("/", async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
})

router.get("/:id", validatorHandle(getUserSchema, 'params'), async (req,res,next)=>{
  try {
    const {id} = req.params
    const user = await service.findOne(id)
    res.status(200).json(user)
  } catch (error) {
    next(error);
  }
})

router.post("/", validatorHandle(createUserSchema, 'body'), async (req, res, next) => {
  try {
    const body = req.body
    const newUser = await service.create(body)
    res.status(201).json({
      message:'user created',
      data: newUser
    })
  } catch (error) {
    next(error)
  }
})

router.patch("/:id", validatorHandle(getUserSchema, 'params'), validatorHandle(updateUserSchema, 'body'), async (req, res, next) => {
  try {
    const {id} = req.params
    const body = req.body
    const update = await service.update(id, body)
    res.status(200).json({
      message: 'user updated',
      data: update
    })
  } catch (error) {
    next(error)
  }
})

router.delete("/:id", validatorHandle(getUserSchema, 'params'), async (req, res, next)=>{
  try {
    const {id} = req.params
    const userDelete = await service.delete(id)
    res.status(200).json({
      message: 'user deleted',
      data: userDelete
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router;
