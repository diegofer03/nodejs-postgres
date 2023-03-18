const boom = require('@hapi/boom')
const faker = require('faker')

class ProductsService {
  constructor(){
    this.products = []
    this.generate()
  }

  generate(){
    const size =  10
    for(let i = 0; i < size; i++){
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt( faker.commerce.price(),10),
        image: faker.image.imageUrl()
      })
    }
  }

  create(data){
    const newProduct = {
      id : faker.datatype.uuid(),
      ... data
    }
    this.products.push(newProduct)
    return newProduct

  }

  async find(){
    // eslint-disable-next-line no-unused-vars
    return new Promise((resolve, reject)=>{
      setTimeout(()=>{
        resolve(this.products)
      }, 2000)
    });
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
