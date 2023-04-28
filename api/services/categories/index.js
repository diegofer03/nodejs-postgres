// const boom = require("@hapi/boom");
const {models} = require("../../lib/sequeliza");

class CategoriesService {
  constructor(){
  }

  async findAll(){
    const category = await models.Category.findAll()
    return category
  }

  async findOne(id){
    const category = await models.Category.findByPk(id, {
      include: ['products']
    })
    return category
  }

  async create(data){
    const category = await models.Category.create(data)
    return category
  }

  async update(){

  }

  async delete(){

  }
}

module.exports = CategoriesService
