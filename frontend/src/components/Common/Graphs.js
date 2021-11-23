import React, {Component, auto} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import {LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
const data = [{name: '12-2-21', uv: 400},{name: '13-2-21', uv: 200},{name: '14-2-21', uv: 500},{name: '12-2-21', uv: 600},{name: '12-2-21', uv: 200},];

const styles = {
	display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    verticalAlign: "middle",
    // boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
    // borderRadius: "25px",
};

const headerStyles = {
	height: auto,
  width: auto,
//   textAlign: 'center',
  rounded: true,
  paddingTop: auto,
//   backgroundColor: '#76D8E3',
  opacity: 0.8,
  margin: 10,
  fontSize:20
};

let y = "Status of Motor: ";
let x = "Water level in tank: ";

export default class Home extends Component {
    
    constructor(props) {
        super(props);
        // this.logout = this.logout.bind(this);
    }



    render() {
        return (
            <div>
				<Paper style={headerStyles}>
					Water Level vs Time
				</Paper>
				<Paper style={styles}>
					<LineChart width={600} height={300} data={data}>
						<Line type="monotone" dataKey="uv" stroke="#8884d8" />
						<CartesianGrid stroke="#ccc" />
						<XAxis dataKey="name" />
						<YAxis />
					</LineChart>
				</Paper>
            </div>
        )
    }
}