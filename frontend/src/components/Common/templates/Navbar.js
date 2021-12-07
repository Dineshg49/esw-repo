import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import Button from '@material-ui/core/Button';
import axios from 'axios';

export default class UserNavbar extends Component {
    
    constructor(props) {
        super(props);
        // this.logout = this.logout.bind(this);
    }
    
    render() {
        return (
            <div>                
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="navbar-item">
                                <Link to="/" className="nav-link">Dashboard</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/graphs" className="nav-link">Water Level</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/motor" className="nav-link">Motor Level</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/graph2" className="nav-link">Water Usage</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/stats" className="nav-link">Statistics</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}