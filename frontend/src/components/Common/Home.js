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
// import ReactDOM from 'react-dom';
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
let y = "Status of Motor: ";
let x = "Water level in tank: ";
let resultx = 0;
let level = 20; 
let total = 35; 
let volume = 25;

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
    }
    state = {
      level : 0,
      value : level*volume/total,
      mstatus: 0,
      x: "Water level in tank: "
    };
    startColor = '#6495ed'; // cornflowerblue
    endColor = '#dc143c'; // crimson
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
                        this.setState({value: this.state.level*volume/total});
                        // console.log("x is ", this.state.level, total, this.state.level*100/total);
                        // console.log(parseInt(Number("0x"+data[0]), 10));
                        // console.log(this.x);
                        
                        if(motor == 2)
                            this.setState({mstatus: 0});
                        else
                            this.setState({mstatus: 1});
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
					{this.state.x} {this.state.level}cm
				</Paper>
                <Paper style={styles}>
					Volume of Water contained: {Math.round(this.state.value)} Litres
				</Paper>
				<Paper style={styles}>

					{y}
          {this.state.mstatus == 0 ?
          'OFF':'ON'}
          {this.state.mstatus == 0 ?
          <FcCancel/>:<FcApproval/>}
				</Paper>
            
        <div>
                <LiquidFillGauge
                    style={{ margin: '0 auto' }}
                    width={radius * 2}
                    height={radius * 2}
                    value={this.state.value*4}
                    percent="%"
                    textSize={1}
                    textOffsetX={0}
                    textOffsetY={0}
                    textRenderer={(props) => {
                        const value = Math.round(props.value);
                        const radius = Math.min(props.height / 2, props.width / 2);
                        const textPixels = (props.textSize * radius / 2);
                        const valueStyle = {
                            fontSize: textPixels
                        };
                        const percentStyle = {
                            fontSize: textPixels * 0.6
                        };
 
                        return (
                            <tspan>
                                <tspan className="value" style={valueStyle}>{value}</tspan>
                                <tspan style={percentStyle}>%{} </tspan>
                            </tspan>
                        );
                    }}
                    riseAnimation
                    waveAnimation
                    waveFrequency={2}
                    waveAmplitude={1}
                    gradient
                    gradientStops={gradientStops}
                    circleStyle={{
                        fill: fillColor
                    }}
                    waveStyle={{
                        fill: fillColor
                    }}
                    textStyle={{
                        fill: color('#444').toString(),
                        fontFamily: 'Arial'
                    }}
                    waveTextStyle={{
                        fill: color('#fff').toString(),
                        fontFamily: 'Arial'
                    }}
                    // onClick={() => {
                    //     this.setState({ value: Math.random() * 100 });
                    // }}
                />
            </div>
            </div>
        )
    }
}

// ReactDOM.render(<App />, document.querySelector('#app'));