import { Button } from "@/components/ui/button"
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./layout/products/Layout";
import DashboardLayout from "./layout/admin/DashboardLayout";
import AddProduct from "./components/pages/admin/AddProduct";
import Home from "./layout/products/pages/Home";
import ProductDetail from "./layout/products/pages/ProductDetail";
function App() {

  return (
  <>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index  element={<Home/>}/>
          <Route path="product/:category" element={<div>dkdk</div>}/>
          <Route path="product/:category/:id" element={<ProductDetail/>}/>
        </Route>

        {/* don't forget to make it protected route */}
        <Route path="/admin-dasboard" element={<DashboardLayout/>}>
          <Route index path="add-product" element={<AddProduct/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
