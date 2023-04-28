const boom = require('@hapi/boom')
// const pool = require('../../lib/postgres.pool')
const {models} = require('./../../lib/sequeliza')


class ProductsService {
  constructor(){
    this.generate()
    // this.pool = pool
    // //manejo de error por parte del pool
    // this.pool.on('error', (err)=>{console.log(err)})
  }

  generate(){
  }

  async create(data){
    const product = await models.products.create(data)
    return product
  }

  async findAll(){
    const product = await models.products.findAll({
      include: ['category']
    })
    return product;
  }

  findOne(id){
      const product = this.products.find(item => item.id == id)
      if(!product) throw boom.notFound('Product not found')
    return product;
  }

  update(id, body){
    const index = this.products.findIndex(item => item.id == id)
    if(index == -1){
      throw boom.notFound('Product not found')
    }
    this.products[index] = {
      ...this.products[index],
      ...body
    }
    return this.products[index]
  }

  delete(id){
    const index = this.products.findIndex(item => item.id == id)
    if(index == -1){
      throw boom.notFound('Product not found')
    }
    this.products.splice(index,1)
    return id
  }
}

module.exports = ProductsService
