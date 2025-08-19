import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { ProductProvider } from "./context/ProductContext"
import { ProductCategoryProvider } from "./context/ProductCategoryContext"

function App() {
  return (
    <ProductProvider>
      <ProductCategoryProvider>
      <RouterProvider router={router}/>
      </ProductCategoryProvider>
    </ProductProvider>
  )
}

export default App