const joi = require('joi')

const id = joi.number().integer()
const name = joi.string().alphanum().min(3).max(100)
const description = joi.string()
const price = joi.number().integer().min(10)
const image = joi.string()
const categoryId = joi.number().integer()

const limit = joi.number().integer();
const page = joi.number().integer();
const minPrice = joi.number().integer()
const maxPrice = joi.number().integer()

const createProductSchema = joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required()
})

const updateProductSchema = joi.object({
  name: name,
  price: price,
  description: description,
  image: image,
  categoryId: categoryId
})

const getProductSchema = joi.object({
  id: id.required()
})

const queryProductSchema = joi.object({
  limit,
  page,
  price,
  minPrice,
  maxPrice: maxPrice.when('minPrice', {
    is: joi.number().integer().required(),
    then: joi.required()
  })
});

module.exports = {createProductSchema, updateProductSchema, getProductSchema, queryProductSchema}
