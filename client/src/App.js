import './index.css';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
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

function App() {
  return (
    <AuthProvider>
      <Header />
      <main>
        <div className="overlay"></div>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/auth/login' element={<Login />}></Route>
          <Route path='/auth/register' element={<Register />}></Route>
          <Route path='/auth/logout' element={<Logout />}></Route>
          <Route path='/furniture/catalog' element={<Catalog />}></Route>
          <Route path='/furniture/:furnitureId' element={<Details />}></Route>
          <Route path='/contacts' element={<Contacts />}></Route>
          <Route path='/favorites' element={<Favorites />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/*' element={<NotFound />}></Route>
        </Routes>
      </main >
      <Footer />
    </AuthProvider>
  );
}

export default App;
