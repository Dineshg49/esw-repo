import React, {Component, auto} from 'react';
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
// import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { FcCancel } from "react-icons/fc";
import { FcApproval } from "react-icons/fc";
import { color } from 'd3-color';
import { interpolateRgb } from 'd3-interpolate';
// import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LiquidFillGauge from 'react-liquid-gauge';
import { Toast } from 'bootstrap';

const styles = {
	height: auto,
  width: auto,
  textAlign: 'center',
  rounded: true,
  paddingTop: auto,
  backgroundColor: '#76D8E3',
  opacity: 0.8,
  margin: 10,
  fontSize:40
};
let y = "Average Monthly Water Usage: ";
let x = "Average Daily Water Usage:  ";
let resultx = 0;
let level = 100; 
let total = 200; 

// function hash(s, M) {
//     let sum = 0, mul = 1;
//     for (let i = 0; i < s.length; i++) {
//     //   mul = (i % 4 == 0) ? 1 : mul * 256;
//         console.log(sum);
//         console.log(s.charCodeAt(i));
//       sum += s.charAt(i) * mul;
//       console.log(sum);
//     }
//     console.log(Math.abs(sum) % M);
//     return (Math.abs(sum) % M);
//   }

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
        // this.logout = this.logout.bind(this);
        this.state = {
            level : 40,
            davg: 49.6,
            mavg:248
          //   x: "Water level in tank: "
          };
    }
    startColor = '#6495ed'; // cornflowerblue
    endColor = '#dc143c'; // crimson

    componentDidUpdate() {
        function gettim(ts)
        {
          var y = parseInt(ts[0] + ts[1] + ts[2] + ts[3]);
          var m = parseInt(ts[4] + ts[5]);
          var d = parseInt(ts[6] + ts[7]);
          var h= parseInt(ts[9] + ts[10]);
          var min = parseInt(ts[11]+ ts[12]);
    
          let ret = String(d) + "/" + String(m) + "/" + String(y) + " " + String(h) + ":" +String(min);
          return ret;
    
        }
        function interval(months,days,hours)
        {
          var interva = months*30*24*60 + days*24*60 + hours*60;
          return interva;
        }
        function calc() {
          var today = new Date();
          var dd = today.getDate();
          var mm = today.getMonth()+1  //January is 0!
          var yyyy = today.getFullYear();
          var hh =today.getHours();
    
          var curr_time = yyyy*12*30*24*60 + mm*30*24*60 + dd*24*60 + hh*60;
          return curr_time;
    
    
        }
        function check(curr_time,ts, months,days,hours){
          var interval = months*30*24*60 + days*24*60 + hours*60;
          var y = parseInt(ts[0] + ts[1] + ts[2] + ts[3]);
          var m = parseInt(ts[4] + ts[5]);
          var d = parseInt(ts[6] + ts[7]);
          var h= parseInt(ts[9] + ts[10]);
          var min = parseInt(ts[11]+ ts[12]);
    
          var lt = y*12*30*24*60 + m*30*24*60 + d*24*60 + h*60 + min;
    
          if(curr_time-lt > interval)
          {
            return 0;
          }
          else
          {
            return 1;
          }
    
    
        }
        function filter_data(sum,ts, months,days,hours) {
    
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
    
            console.log("this",array);
            let sum = 0;
            let curr_time = calc();
            let grapharray = [];
            let velocity_of_water = 5; //litres per minute
            let interva = 1 // minutes
            for (let i = array.length-1; i > 0; i--) {
              let data = array[i].con;
              data = data.split(';');
              let hboi = hash(data[0] + data[1], 23);
              let lvl = 0;
              lvl = parseInt(Number("0x" + data[0]), 10);
    
              let ts = array[i].ct;
              let timev;
              let flag = check(curr_time,ts, 0,1,0);
              if(flag == 0)
              {
                let timec = gettim(ts);
                grapharray.push({name: sum, uv: timec }); // push the time also 
                sum = 0;
                curr_time -= interval(0,1,0);
              }
              let status_i = 0; // off
              let status_i_minus_1 = 1; // on
    
              if(status_i & status_i_minus_1)
              {
                sum+= velocity_of_water*interva;
              }
              else if(status_i ^ status_i_minus_1)
              {
                sum+= (velocity_of_water*interva)/2;
              }
    
              // add the value of the current interval to the sum
    
              // if(this.state.duration == "1")
              //   timev = filter_data(sum,ts, parseInt(this.state.textFieldValue),0,0);
              // if(this.state.duration == "2")
              //   timev = filter_data(sum,ts, 0, parseInt(this.state.textFieldValue),0);
              // if(this.state.duration == "3")
              //   timev = filter_data(sum,ts, 0,0,parseInt(this.state.textFieldValue));
              // let value = { name: timev, uv: lvl };
              // if (timev !== "-1") {
              //   data2.push(value);
              // }
            }
            let avg = 0;
            for(let i=0;i<grapharray.length;i++)
            {
                avg+= grapharray[i].name;
            }
            avg/= grapharray.length;
            // this.setState({davg: avg});
            this.data = data2;
            this.setState({ data: data2 })
          })
          ;
      }

    componentDidMount() {

      
        axios.get('http://localhost:4000/test', {
          })
                    .then(res => {
                        let data = res.data["m2m:cin"].con;
                        console.log(res);
                        // let data = "/EF;2/";
                        // console.log(data);
                        // data = data.substring(1, data.length-1);
                        // let data = array[i].con;
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
                        
                        this.setState({level: water});
                        // this.setState({motor})
                        console.log("x is ", this.state.level);
                        // console.log(parseInt(Number("0x"+data[0]), 10));
                        // console.log(this.x);
                        
                        if(motor == 1)
                            this.setState({mstatus: "Off"});
                        else
                            this.setState({mstatus: "On"});
                        // this.setState({x:"hmm"});
                        

                    //   if(res.data==='Success')
                    //   {
                    //     // ReactDOM.render(<UserApp/>,document.getElementById("root"));
                    //     // UserProfile.setName(email.value);
                    //     // const newSession = {
                    //     //   email: email.value
                    //     // }
                    //     // const newLink = {
                    //     //   pathname: "/users/userprofile",
                    //     //   name: email.value
                    //     // };
                        
                    //     // ReactDOM.render(<Link to={newLink}> hi </Link>, document.getElementById("root"));
                        
                    //   }
                    //   else
                    //     alert( res.data);console.log(res.data);
                    })
                    ;
        }


    render() {
      const radius = 200;
        const interpolate = interpolateRgb(this.startColor, this.endColor);
        const fillColor = interpolate(this.state.value / 100);
        const gradientStops = [
            {
                key: '0%',
                stopColor: color(fillColor).darker(0.5).toString(),
                stopOpacity: 1,
                offset: '0%'
            },
            {
                key: '50%',
                stopColor: fillColor,
                stopOpacity: 0.75,
                offset: '50%'
            },
            {
                key: '100%',
                stopColor: color(fillColor).brighter(0.5).toString(),
                stopOpacity: 0.5,
                offset: '100%'
            }
        ];
        return (
            <div>    
				<Paper style={styles}>
					Average Daily Water Usage: {this.state.davg} Litres
				</Paper>
				<Paper style={styles}>
					{y} {this.state.mavg} Litres
				</Paper>
            </div>
        )
    }
}

// ReactDOM.render(<App />, document.querySelector('#app'));