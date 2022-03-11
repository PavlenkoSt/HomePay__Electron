import { action, makeAutoObservable, observable } from 'mobx'

import productsApi from 'renderer/api/products.api'

import ICategory from 'renderer/types/ICategory'
import IProduct from 'renderer/types/IProduct'

class ProductsStore {
  @observable categories: ICategory[] = []
  @observable products: IProduct[] = []

  constructor() {
    makeAutoObservable(this)
  }

  @action setCategories(categories: ICategory[]) {
    this.categories = categories
  }

  @action addCategory(category: ICategory) {
    const categories = [...this.categories, category]
    console.log('categories', this.categories)
    this.setCategories(categories)
    // productsApi.setCategories(categories)
  }

  @action setProducts(products: IProduct[]) {
    this.products = products
  }

  @action init() {
    const categories = productsApi.getCategories()
    const products = productsApi.getProducts()

    // need check
    if (!categories) {
      productsApi.setCategories([])
    }

    if (!products) {
      productsApi.setProducts([])
    }

    this.setCategories(categories)
    this.setProducts(products)
  }
}

export default ProductsStore
