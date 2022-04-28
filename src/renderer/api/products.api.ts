import IProduct from 'renderer/types/IProduct'
import ICategory from 'renderer/types/ICategory'

enum ProductsApiKeys {
  CATEGORIES = 'categories',
  PRODUCTS = 'products',
}

const productsApi = {
  getCategories: () => {
    return window.electron.store.get(ProductsApiKeys.CATEGORIES)
  },
  setCategories: (categories: ICategory[]) => {
    window.electron.store.set(ProductsApiKeys.CATEGORIES, categories)
  },
  getProducts: () => {
    return window.electron.store.get(ProductsApiKeys.PRODUCTS)
  },
  setProducts: (products: IProduct[]) => {
    window.electron.store.set(ProductsApiKeys.PRODUCTS, products)
  },
}

export default productsApi
