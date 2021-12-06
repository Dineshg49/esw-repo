import React, {Component, auto} from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import Button from '@mui/material/Button';
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
let y = "Status of Motor: ";
let x = "Water level in tank: ";
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
      level : 40,
      value : level*100/total 
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
                        data = data.split(';');
                        // console.log(data[0]+data[1]);
                        let hboi = hash(data[0]+data[1], 23);
                        console.log(hboi);
                        if(hboi == data[2])
                        {
                            this.x = this.x + parseInt(Number("0x"+data[0]), 10);
                            // console.log(parseInt(Number("0x"+data[0]), 10));
                            // console.log(this.x);
                            
                            if(data[1] == "1")
                                this.y = this.y + "Off";
                            else
                                this.y = this.y + "Running";
                            this.setState({x:"hmm"});
                        }

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
					{x} {level}m
				</Paper>
				<Paper style={styles}>

					{y}
          {resultx == 0 ?
          'OFF':'ON'}
          {resultx == 0 ?
          <FcCancel/>:<FcApproval/>}
				</Paper>
            
        <div>
                <LiquidFillGauge
                    style={{ margin: '0 auto' }}
                    width={radius * 2}
                    height={radius * 2}
                    value={this.state.value}
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
                                <tspan style={percentStyle}>kvein{} </tspan>
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