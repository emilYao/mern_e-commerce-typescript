import { Button } from "@/components/ui/button"
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./layout/Layout";
function App() {

  return (
  <>
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Layout><span></span></Layout>}/>
      </Routes>
    </BrowserRouter>
  </>
  )
}

export default App
