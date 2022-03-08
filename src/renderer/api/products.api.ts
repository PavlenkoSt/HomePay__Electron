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
  addCategories: () => {},
  getProducts: () => {
    return window.electron.store.get(ProductsApiKeys.PRODUCTS)
  },
  addProduct: () => {},
  editProduct: () => {},
  removeProduct: () => {},
}

export default productsApi
