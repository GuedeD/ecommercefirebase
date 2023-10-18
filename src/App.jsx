import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Product from "./pages/Product";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PaymentDone from "./pages/PaymentDone";
import Dashboard from "./pages/admin/Dashboard";
import DashboardLayout from "./components/DashboardLayout";
import { createBrowserHistory } from "history";
import AddProduct from "./pages/admin/AddProduct";
import Purchases from "./pages/admin/Purchases";
import UpdateProduct from "./pages/admin/UpdateProduct";

const App = () => {
  return (
    <div className='font-bodyFont'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='cart' element={<Cart />} />
          <Route path='product/:id' element={<Product />} />
          <Route path='login' element={<Login />} />
          <Route path='payment' element={<PaymentDone />} />
          <Route path='dashboard' element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='add-product' element={<AddProduct />} />
            <Route path='update-product/:id' element={<UpdateProduct />} />
            <Route path='purchases' element={<Purchases />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
