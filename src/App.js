import './App.css';
import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieInfo from './pages/MovieInfo';
import Subscribe from './components/Subscribe/Subscribe';
import Watchlist from './components/Watchlist/Watchlist';

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movie/:id" element={<MovieInfo />} />
          <Route path="/subscribe" element={<Subscribe />} />
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
