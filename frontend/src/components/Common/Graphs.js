import React, { Component, auto , useState} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';
// const data = [{ name: 'kveinop', uv: 400 }, { name: '13-2-21', uv: 200 }, { name: '14-2-21', uv: 500 }, { name: '12-2-21', uv: 600 }, { name: '12-2-21', uv: 200 },];
let data = [];
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
    // this.data = [];
  }
  

  componentDidMount() {
    function filter_data(ts, mode){
      var today = new Date();
      var dd = today.getDate();
      var mm = today.getMonth()  //January is 0!
      var yyyy = today.getFullYear();

      // today = dd + '/' + mm + '/' + yyyy;
      console.log(dd);
      console.log(mm);
      console.log(yyyy);
      // today = yyyy+ mm + dd;

      // console.log(today);
      if(mode == 0)
      {

      }
    }

    axios.get('http://localhost:4000/testy', {
    })
      .then(res => {
        let data2 = [];
        let array = res.data["m2m:cnt"]["m2m:cin"];
        
        // console.log(array);

        for (let i = 0; i < array.length; i++) {
          // let timestring = array[i].

          let data = array[i].con;
          // console.log();
          // let data = "/EF;2/";
          // console.log(data);
          // data = data.substring(1, data.length-1);
          data = data.split(';');
          // console.log(data[0]+data[1]);
          let hboi = hash(data[0]+data[1], 23);
          // console.log(hboi);
          let lvl = 0;
        // if(hboi == data[2])
        // {
            lvl = parseInt(Number("0x"+data[0]), 10);
            // console.log(parseInt(Number("0x"+data[0]), 10));
            // console.log(this.x);
            
            // if(data[1] == "1")
            //     this.y = this.y + "Off";
            // else 
            //     this.y = this.y + "Running";
            // this.setState({x:"hmm"});
        // }
        // else 
          // console.log("lmao")




          let ts = array[i].ct;
          let timev = filter_data(ts,0);
          // let timev = ts[9] + ts[10] + ":" + ts[11] + ts[12] + ":" + ts[13] + ts[14];
          let value = { name: timev, uv: lvl };
          if(timev !== "-1")
          {
            data2.push(value);
          }
        }

        // console.log(data2);
        this.data = data2;
        this.setState({data : data2})
        // console.log("out",this.data)

      })
      ;
  }


  render() {

    return (
      <div>
        <Paper style={headerStyles}>
          Water Level vs Time
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