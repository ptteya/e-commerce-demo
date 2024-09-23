import './index.css';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import AdminRoute from 'components/routes/AdminRoute';
import GuestRoute from 'components/routes/GuestRoute';
import AuthRoute from 'components/routes/AuthRoute';

import Header from 'components/layout/Header/Header';
import Footer from 'components/layout/Footer/Footer';
import Home from 'components/pages/Home/Home';
import About from 'components/pages/About/About';
import Login from 'components/pages/auth/Login';
import Register from 'components/pages/auth/Register';
import Logout from 'components/pages/auth/Logout';
import Catalog from 'components/pages/Catalog/Catalog';
import NotFound from 'components/pages/404/404';
import Contacts from 'components/pages/Contacts/Contacts';
import Favorites from 'components/pages/Favorites/Favorites';
import Details from 'components/pages/Details/Details';
import ScrollToTop from 'components/ScrollToTop';
import Cart from 'components/pages/Cart/Cart';
import Edit from 'components/pages/Edit';
import Create from 'components/pages/Create';
import PromoteUser from 'components/pages/PromoteUser/PromoteUser';
import OrderSuccess from 'components/pages/OrderSuccess/OrderSuccess';

function App() {
  return (
    <AuthProvider>
      <Header />
      <main>
        <div className="overlay"></div>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route
            path='/users/login'
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path='/users/register'
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />
          <Route
            path='/users/logout'
            element={
              <AuthRoute>
                <Logout />
              </AuthRoute>
            }
          />
          <Route path='/furniture' element={<Catalog />} />
          <Route path='/furniture/:furnitureId' element={<Details />} />
          <Route
            path='/furniture/edit/:furnitureId'
            element={
              <AdminRoute>
                <Edit />
              </AdminRoute>
            }
          />
          <Route
            path='/furniture/create'
            element={
              <AdminRoute>
                <Create />
              </AdminRoute>
            }
          />
          <Route path='/contacts' element={<Contacts />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/cart/confirmation' element={<OrderSuccess />}></Route>
          <Route path='/admin/promote-users' element={
            <AdminRoute>
              <PromoteUser />
            </AdminRoute>
          }
          />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </AuthProvider>
  );
}

export default App;
