const joi = require('joi')

const id = joi.number().integer()
const name = joi.string().alphanum().min(3).max(100)
const image = joi.string()

const createCategorySchema = joi.object({
  name: name.required(),
  image: image.required()
})

const updateCategorySchema = joi.object({
  name: name,
  image: image
})

const getCategorySchema = joi.object({
  id: id.required()
})

module.exports = {createCategorySchema, updateCategorySchema, getCategorySchema}
