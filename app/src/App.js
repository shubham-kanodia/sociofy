import { useState } from 'react';
import './App.css';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Signup from './Pages/Signup';


function App() {
  const [token, setToken] = useState(localStorage.getItem('AUTH_TOKEN') || '');
  const [isNewUser, setIsNewUser] = useState(true);

  let componentToLoad;

  if (token) {
    if (isNewUser) {
      componentToLoad = <Signup setIsNewUser={setIsNewUser} />
    }
    else {
      componentToLoad = <Home />
    }
  }
  else {
    componentToLoad = <Login setIsNewUser={setIsNewUser} setToken={setToken}/>
  }

  return (
    <div className='h-screen bg-primarydark'>
      { componentToLoad }
    </div>
  );
}

export default App;
