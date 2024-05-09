import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Route, RouterProvider, createRoutesFromElements } from 'react-router'
import { createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';


//private routing
import PrivateRoutes from './components/PrivateRoutes.jsx'

//authentication
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'

import Profile from './pages/User/Profile.jsx';
import Home from './pages/Home.jsx';
import Favorites from './pages/Products/Favorites.jsx';
import ProductInfo from './pages/Products/ProductInfo.jsx';
import Cart from './pages/Cart.jsx';
import Product from './Product.jsx';

import AdminRoutes from './pages/Admin/AdminRoutes.jsx';
import UserList from './pages/Admin/UserList.jsx';
import CategoryList from './pages/Admin/CategoryList.jsx';
import ProductList from './pages/Admin/productList.jsx';
import ProductUpdate from './pages/Admin/ProductUpdate.jsx';
import AllProducts from './pages/Admin/AllProducts.jsx';
import Shipping from './pages/Orders/Shipping.jsx';
import PlaceOrder from './pages/Orders/PlaceOrder.jsx';
import Orders from './pages/Orders/Orders.jsx';
import UserOrder from './pages/User/UserOrder.jsx';
import OrderList from './pages/Admin/OrderList.jsx';
import Dashboard from './pages/Admin/Dashboard.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
   <Route path="/" element={<App/>} >
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path='/' index={true} element={<Home />} />
      <Route path='/favorites' index={true} element={<Favorites />} />
      <Route path='/product/:id' index={true} element={<ProductInfo />} />
      <Route path='/cart' index={true} element={<Cart />} />
      <Route path='/products' index={true} element={<Product />} />
      <Route path='/user-orders' index={true} element={<UserOrder />} />


      <Route path='' element={<PrivateRoutes />}>
        <Route path='/profile' element={<Profile />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
        <Route path='/order/:id' element={<Orders />} />
      </Route>


      {/*Admin*/}
      <Route path='/admin' element={<AdminRoutes />}>
        <Route path='userList' element={<UserList />} />
        <Route path='categoryList' element={<CategoryList />} />
        <Route path='productList' element={<ProductList />} />
        <Route path='orderlist' element={<OrderList />} />
        <Route path='allproductslist' element={<AllProducts />} />
        <Route path='product/update/:_id' element={<ProductUpdate />} />
        <Route path='dashboard' element={<Dashboard />} />
      </Route>

   </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>,
)
