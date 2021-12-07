import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import Home from './components/Common/Home'
import Navbar from './components/Common/templates/Navbar'
import Graphs from './components/Common/Graphs'
import cute from './components/Common/cute'

function App() {
  return (
    <Router>
      <div className="container">
        <Route path="/" component={Navbar}/>
        <Route exact path="/" exact component={Home}/>
        <Route exact path="/graphs" exact component={Graphs}/>
        <Route exact path="/graph2" exact component={cute}></Route>
      </div>
    </Router>
  );
}

export default App;
