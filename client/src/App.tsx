import './App.css';
import Header from './components/header';
import Home from './components/homePage/home';
import Footer from './components/footer/footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ContextProvider } from './context/context';
import PostComponent from './postComponent/PostComponent';

function App() {
  return (
    <Router>
      <ContextProvider>
        <div className="bg-white h-screen w-full">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<PostComponent />} /> 
          </Routes>
          <Footer />
        </div>
      </ContextProvider>
    </Router>
  );
}

export default App;
