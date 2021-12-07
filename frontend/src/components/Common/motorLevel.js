import React, { Component, auto, useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import Button from '@mui/material/Button';
import {Paper, TextField} from '@mui/material';
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
// const data = [{ name: 'kveinop', uv: 400 }, { name: '13-2-21', uv: 200 }, { name: '14-2-21', uv: 500 }, { name: '12-2-21', uv: 600 }, { name: '12-2-21', uv: 200 },];

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
  fontSize: 20
};

// const [dataop, setdataop] = useState([]);
let decrypt = [
  {'u': 0, 'x': 1, 'r': 2, 'p': 3, 'c': 4, 't': 5, 'z': 6, 'v': 7, 'd': 8, 'k': 9, 'h': -1},
  {'n': 0, 'h': 1, 'e': 2, 'u': 3, 'v': 4, 'y': 5, 'z': 6, 'a': 7, 'p': 8, 'x': 9, 'j': -1},
  {'g': 0, 's': 1, 'c': 2, 'a': 3, 'j': 4, 'i': 5, 'q': 6, 'v': 7, 'd': 8, 'f': 9, 'k': -1}
]

function hash(s, M) {
  let sum = 0, mul = 1;
  for (let i = 0; i < s.length; i++) {
    mul = (i % 4 == 0) ? 1 : mul * 256;
    sum += s.charCodeAt(i) * mul;
  }
  // console.log(sum);
  return (Math.abs(sum) % M);
}


export default class Home extends Component {


  constructor(props) {
    super(props);
    this.state = {
      textFieldValue: '',
      duration: '1'
    }
    // this.data = [];
  }


  componentDidUpdate() {
    function filter_data(ts, months,days,hours) {

      var total_minutes  = months*30*24*60 + days*24*60 + hours*60;
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()+1  //January is 0!
      var yyyy = today.getFullYear();
      var hh =today.getHours();


      var y = parseInt(ts[0] + ts[1] + ts[2] + ts[3]);
      var m = parseInt(ts[4] + ts[5]);
      var d = parseInt(ts[6] + ts[7]);
      var h= parseInt(ts[9] + ts[10]);
      var min = parseInt(ts[11]+ ts[12]);

      yyyy-=y;
      mm-=m;
      dd-=d;
      hh-=h;

      var minutes_passed = yyyy*12*30*24*60 + mm*30*24*60 + dd*24*60 + hh*60;

      // console.log(total_minutes,minutes_passed)
      if(minutes_passed < total_minutes)
      {
        let ret = String(d) + "/" + String(m) + "/" + String(y) + " " + String(h) + ":" +String(min);
        return ret;
      }
      else{
        return "-1";
      }
    }

    axios.get('http://localhost:4000/testy', {
    })
      .then(res => {
        let data2 = [];
        let array = res.data["m2m:cnt"]["m2m:cin"];

        // console.log(array);

        for (let i = 0; i < array.length; i++) {
          let data = array[i].con;
          data = data.split(';');
          let water = 0;
          let motor = decrypt[data[3]][[data[1][0]]];
          // motor = motor-1;
          for(let i=0; i<data[0].length; i++)
            if(decrypt[data[3]][[data[0][i]]] != -1)
            {
              water = water*10;
              water = water + decrypt[data[3]][[data[0][i]]]
              // console.log(decrypt[data[3]][[data[0][i]]]);
              // console.log(data[0]);
            }
          console.log("got", water.toString() + motor.toString());
          let hboi = hash(water.toString() + motor.toString(), 50);
          console.log(hboi, data);
          if(hboi == data[2])
            console.log("yee");
          // else
          //   console.log("f")
          let lvl = 0;
          if(motor == 1)
            lvl = 1;

          let ts = array[i].ct;
          let timev;
          if(this.state.duration == "1")
            timev = filter_data(ts, parseInt(this.state.textFieldValue),0,0);
          if(this.state.duration == "2")
            timev = filter_data(ts, 0, parseInt(this.state.textFieldValue),0);
          if(this.state.duration == "3")
            timev = filter_data(ts, 0,0,parseInt(this.state.textFieldValue));
          let value = { name: timev, uv: lvl };
          if (timev !== "-1") {
            data2.push(value);
          }
        }
        this.data = data2;
        this.setState({ data: data2 })
      })
      ;
  }

  componentDidMount(){
    this.setState({textFieldValue: ""});
  }

  handleTextFieldChange = (event) => {
    //  console.log("sort button", this.state.sortValue)
    // console.log(eve)
    this.setState({
        textFieldValue: event.target.value
    })
    }
  handleSortJobs = (event) => {
    //  console.log("sort button", this.state.sortValue)
    this.setState({
        duration: event.target.value
    })
    }

  render() {
    // console.log(this.state.duration, this.state.textFieldValue)
    // console.log("lol", decrypt[2]['j']);
    return (
      <div>
        <Paper style={headerStyles}>
          Motor Status vs Time
        </Paper>
        <Paper style={styles}>
        <select name="sortValue" onChange={this.handleSortJobs}>
                        <option value="1">Months</option>
                        <option value="2">Days</option>
                        <option value="3">Hours</option>
        </select>
        </Paper>
        <Paper style={styles}>
          <TextField margin="dense" label="Enter a number" size="small" value={this.state.textFieldValue} onChange={this.handleTextFieldChange} />
        </Paper>
        <Paper style={styles}>
          <LineChart width={600} height={300} data={this.data}>
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