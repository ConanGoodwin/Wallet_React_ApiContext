import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bulma/css/bulma-rtl.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import './App.css';

function App() {
  return (
    <div className="body">
      <Switch>
        <Route exact path="/Projetos-Trybe/trybewallet/" component={ Login } />
        <Route exact path="/carteira" component={ Wallet } />
      </Switch>
    </div>
  );
}

export default App;
