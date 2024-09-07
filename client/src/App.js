import { Routes, Route } from 'react-router-dom';
import './index.css';

import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Home } from './components/Home/Home';
import { About } from './components/About/About';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Header />
      <main>
        <div className="overlay"></div>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/auth/login' element={<Login />}></Route>
          <Route path='/auth/register' element={<Register />}></Route>
        </Routes>
      </main >
      <Footer />
    </AuthProvider>
  );
}

export default App;
