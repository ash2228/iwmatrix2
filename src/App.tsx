import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import About from './components/About';
import Events from './pages/Events';
import Sponsor from './pages/Sponsor';



function App() {
  return (
    <BrowserRouter>
      <MainDiv>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Navbar' element = {<Navbar />} />
          <Route path='/Home' element={ <Home />} />
          <Route path='/Events' element={ <Events /> } />
          <Route path='/Sponsors' element={<Sponsor />} />

          
        
         
        </Routes>
      </MainDiv>
     
    </BrowserRouter>

  );
}

const MainDiv = styled.div`
background-color: black;
`;
export default App;
