import './index.css';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

import AdminRoute from 'components/AdminRoute';
import GuestRoute from 'components/GuestRoute';
import AuthRoute from 'components/AuthRoute';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import Home from 'components/Home/Home';
import About from 'components/About/About';
import Login from 'components/Login';
import Register from 'components/Register';
import Logout from 'components/Logout';
import Catalog from 'components/Catalog/Catalog';
import NotFound from 'components/404/404';
import Contacts from 'components/Contacts/Contacts';
import Favorites from 'components/Favorites/Favorites';
import Details from 'components/Details/Details';
import ScrollToTop from 'components/ScrollToTop';
import Cart from 'components/Cart/Cart';
import Edit from 'components/Edit';
import Create from 'components/Create';

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
            path='/auth/login'
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path='/auth/register'
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />
          <Route
            path='/auth/logout'
            element={
              <AuthRoute>
                <Logout />
              </AuthRoute>
            }
          />
          <Route path='/furniture/catalog' element={<Catalog />} />
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
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </AuthProvider>
  );
}

export default App;
