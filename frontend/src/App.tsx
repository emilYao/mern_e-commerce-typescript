import { Button } from "@/components/ui/button"
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./layout/products/Layout";
import DashboardLayout from "./layout/admin/DashboardLayout";
import AddProduct from "./components/pages/admin/AddProduct";
function App() {

  return (
  <>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Layout><span></span></Layout>}/>

        {/* don't forget to make it protected route */}
        <Route path="/admin-dasboard" element={<DashboardLayout/>}>
          <Route path="add-product" element={<AddProduct/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
