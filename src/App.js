import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import './App.css';
import Home from './pages/home/Home';
import About from './pages/about/About';
import Sermon from './pages/sermon/Sermon';
import Evenements from './pages/evenements/Evenements';
import Ministry from './pages/ministry/Ministry';
import Contact from './pages/contact/Contact';
import Donate from './pages/donate/Donate';
import NotFound from './pages/NotFound';
import Detailpastoral from './pages/detailpastoral/Detailpastoral'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sermon" element={<Sermon />} />
        <Route path="/evenements" element={<Evenements />} />
        <Route path="/ministry" element={<Ministry />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/detailpastoral" element={<Detailpastoral />} />
      </Routes>
    </Router>
  );
};

export default App;
