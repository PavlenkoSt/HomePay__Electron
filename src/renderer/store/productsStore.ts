import { action, computed, makeAutoObservable, observable } from 'mobx'

import JSONCorrect from 'renderer/helpers/JSONCorrect'
import productsApi from 'renderer/api/products.api'
import ICategory from 'renderer/types/ICategory'
import IProduct from 'renderer/types/IProduct'

class ProductsStore {
  @observable categories: ICategory[] = []
  @observable products: IProduct[] = []
  @observable activeCategoryId: number | null | 'all-products' = null

  constructor() {
    makeAutoObservable(this)
  }

  @action setActiveCategoryId(categoryId: number | null | 'all-products') {
    this.activeCategoryId = categoryId
  }

  @action setCategories(categories: ICategory[]) {
    this.categories = categories
  }

  @action addCategory(category: ICategory) {
    const categories = JSONCorrect([...this.categories, category])
    this.setCategories(categories)
    productsApi.setCategories(categories)
  }

  @action removeCategory(categoryId: number) {
    const filteredCategories = this.categories.filter((category) => category.id !== categoryId)

    const resultCategories = JSONCorrect(filteredCategories)

    this.setCategories(resultCategories)
    productsApi.setCategories(resultCategories)
  }

  @action removeCategoryWithAllProducts(categoryId: number) {
    const categoryProductsId = this.products
      .filter((product) => product.categoryId === categoryId)
      .map((product) => product.categoryId)

    this.removeProductMany(categoryProductsId)
    this.removeCategory(categoryId)
  }

  @action removeCategoryWithMoveProducts(categoryId: number, categoryIdMoveTo: number) {
    const targetProducts = this.products
      .filter((product) => product.categoryId === categoryId)
      .map((product) => ({ ...product, categoryId: categoryIdMoveTo }))

    this.moveProductsToOtherCategory(targetProducts)
    this.plusCategoryProductsCount(categoryIdMoveTo, targetProducts.length)
    this.removeCategory(categoryId)
  }

  @action plusCategoryProductsCount(categoryId: number, count: number) {
    const category = this.categories.find((category) => category.id === categoryId)

    if (!category) return

    category.productsCount += count

    this.saveCategories([category, ...this.categories.filter((cat) => cat.id !== categoryId)])
  }

  @action moveProductsToOtherCategory(products: IProduct[]) {
    const ids = products.map((product) => product.id)

    const filteredProducts = this.removeProductsFromListByIdsArr(ids)

    this.saveProducts([...filteredProducts, ...products])
  }

  @action removeProductMany(arrayId: number[]) {
    const filteredProducts = this.removeProductsFromListByIdsArr(arrayId)
    this.saveProducts(filteredProducts)
  }

  @action saveProducts(productsProxy: IProduct[]) {
    const products = JSONCorrect(productsProxy)

    this.setProducts(products)
    productsApi.setProducts(products)
  }

  @action saveCategories(categoriesProxy: ICategory[]) {
    const categories = JSONCorrect(categoriesProxy)

    this.setCategories(categories)
    productsApi.setCategories(categories)
  }

  @action setProducts(products: IProduct[]) {
    this.products = products
  }

  @action removeProductsFromListByIdsArr(idsArr: number[]) {
    const filteredProducts = this.products.filter((product) => {
      for (let i = 0; i < idsArr.length; i++) {
        if (product.categoryId === idsArr[i]) {
          return false
        }
      }

      return true
    })

    return filteredProducts
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

  @computed activeCategoryName() {
    return (
      this.categories.find((category) => category.id === this.activeCategoryId)?.name ||
      'Все товары'
    )
  }

  @computed activeCategoryCount() {
    return (
      this.categories.find((category) => category.id === this.activeCategoryId)?.productsCount ||
      this.products.length ||
      0
    )
  }
}

export default ProductsStore
