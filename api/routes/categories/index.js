const express = require('express')
const router = express.Router()

const CategoriesService = require('../../services/categories')
const validatorHandle = require('../../middlewares/validatorHandler')
const { createCategorySchema, getCategorySchema } = require('../../schemas/category')
const passport = require('passport')
const { checkRole } = require('../../middlewares/authHandler')
const service = new CategoriesService()

router.get("/", async (req,res, next)=>{
  try {
    const category = await service.findAll()
    res.json(category)
  } catch (error) {
    next(error)
  }
})

router.get("/:id", validatorHandle(getCategorySchema, 'params'), async (req,res, next)=>{
  try {
    const {id} = req.params
    const category = await service.findOne(id)
    res.json(category)
  } catch (error) {
    next(error)
  }
})

router.post("/",
  passport.authenticate('jwt', {session: false}),
  checkRole('admin'),
  validatorHandle(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const category = await service.create(body)
      res.json({
        message: 'category created',
        data: category
      })
    } catch (error) {
      next(error)
    }
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
