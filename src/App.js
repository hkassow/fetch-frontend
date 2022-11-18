
import './App.css';
import CreateUserForm from './CreateUserForm';
import ThankYou from './ThankYou';

import {BrowserRouter, Routes, Route} from 'react-router-dom'
function App() {


  return (
    <div className="App">
      <div id='fetch-header'>Fetch Rewards</div>  
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<CreateUserForm/>}></Route>
            <Route path='/congratulations' element={<ThankYou/>}></Route>
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
