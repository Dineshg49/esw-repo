import React, {Component} from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import { validateFields } from './Validation';
import classnames from 'classnames';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"
// import UserProfile from './test';


const initialState = {
    email: {
      value: '',
      validateOnChange: false,
      error: ''
    },
    password: {
      value: '',
      validateOnChange: false,
      error: ''
    },
    type: 'user',
    submitCalled: false,
    allFieldsValidated: false
  };

export default class Login extends Component {
    
    constructor(props) {
        super(props);

        this.state = initialState;
        this.onChangeType = this.onChangeType.bind(this);
        }

        handleBlur(validationFunc, evt) {
            const field = evt.target.name;
            // validate onBlur only when validateOnChange for that field is false
            // because if validateOnChange is already true there is no need to validate onBlur
            if (
              this.state[field]['validateOnChange'] === false &&
              this.state.submitCalled === false
            ) {
              this.setState(state => ({
                [field]: {
                  ...state[field],
                  validateOnChange: true,
                  error: validationFunc(state[field].value)
                }
              }));
            }
            return;
          }

        handleChange(validationFunc, evt) {
        const field = evt.target.name;
        const fieldVal = evt.target.value;
        this.setState(state => ({
            [field]: {
            ...state[field],
            value: fieldVal,
            error: state[field]['validateOnChange'] ? validationFunc(fieldVal) : ''
            }
        }));
        }

        handleSubmit(evt) {
            evt.preventDefault();
            // validate all fields
            console.log(this.state)
            const { email, password,type} = this.state;
            const emailError = validateFields.validateEmail(email.value);
            const passwordError = validateFields.validatePassword(password.value);
            if ([emailError, passwordError].every(e => e === false)) {
              // no errors submit the form
             // console.log('success');
              const newUser = {
                email: email.value,
                password: password.value,
            }
            console.log(type)
            // console.log(email.value)
            if(type=="user"){
                console.log("ok user");
                axios.post('http://localhost:4000/user/login', newUser)
                    .then(res => {
                      if(res.data==='Success')
                      {
                        // ReactDOM.render(<UserApp/>,document.getElementById("root"));
                        // UserProfile.setName(email.value);
                        const newSession = {
                          email: email.value
                        }
                        axios.post('http://localhost:4000/user/session', newSession)
                          .then(res => {console.log(res.data)})
                          ;

                        window.open("/users/userprofile","_self");
                        // const newLink = {
                        //   pathname: "/users/userprofile",
                        //   name: email.value
                        // };
                        
                        // ReactDOM.render(<Link to={newLink}> hi </Link>, document.getElementById("root"));
                        
                      }
                      else
                        alert( res.data);console.log(res.data);
                    })
                    ;}
            
            else{
                console.log("ok recruiter");
                axios.post('http://localhost:4000/recruiter/login', newUser)
                    .then(res => {
                      if(res.data==='Success')
                      {
                        const newSession = {
                          email: email.value
                        }
                        axios.post('http://localhost:4000/recruiter/session', newSession)
                          .then(res => {console.log(res.data)})
                          ;

                        window.open("/recruiters/recruiterprofile","_self");
                        // const newLink = {
                        //   pathname: "/users/userprofile",
                        //   name: email.value
                        // };
                        
                        // ReactDOM.render(<Link to={newLink}> hi </Link>, document.getElementById("root"));
                        
                      }
                      else
                        alert( res.data);console.log(res.data);
                    })
                    ;}
    
            this.setState({
                email: '',
                password:'',
            });
              // clear state and show all fields are validated
              this.setState({ ...initialState, allFieldsValidated: true });
              
              this.showAllFieldsValidated();
            } else {
              // update the state with errors
              this.setState(state => ({
                email: {
                  ...state.email,
                  validateOnChange: true,
                  error: emailError
                },
                password: {
                  ...state.password,
                  validateOnChange: true,
                  error: passwordError
                }
              }));
            }
          }
        
          showAllFieldsValidated() {
            setTimeout(() => {
              this.setState({ allFieldsValidated: false });
            }, 1500);
          }
        
    
    // onChangeEmail(event) {
    //     this.setState({ email: event.target.value });
    // }
    // onChangePassword(event) {
    //     this.setState({ password: event.target.value });
    // }
    onChangeType(event) {
        this.setState({ type: event.target.value });
    }

    // onSubmit(e) {
    //     e.preventDefault();

    //     const newUser = {
    //         email: this.state.email,
    //         password: this.state.password,
    //     }
    //     //console.log(this.state.type)
    //     if(this.state.type=='user'){
    //         axios.post('http://localhost:4000/user/login', newUser)
    //             .then(res => {alert( res.data);console.log(res.data)})
    //             ;}
        
    //     else{
    //         axios.post('http://localhost:4000/recruiter/login', newUser)
    //             .then(res => {alert( res.data);console.log(res.data)})
    //             ;}

    //     this.setState({
    //         email: '',
    //         password:'',
    //     });
    

    render() {
        const { email, password, allFieldsValidated } = this.state;
        return (
            
            <div>
                
                <form onSubmit={evt => this.handleSubmit(evt)}>
                    Role:<br/>
                    <div >
                        <input type="radio" value="user" checked={this.state.type === "user"} onChange={this.onChangeType} name="gender" defaultChecked/> Applicant &nbsp;&nbsp;&nbsp;&nbsp;
                        <input type="radio" value="recruiter" checked={this.state.type === "recruiter"} onChange={this.onChangeType}  name="gender" /> Recruiter
                    </div>
                    <br/>

                    <div className="form-group">
                        <label>Email: </label>
                        <input 
                                type="text" 
                                name="email"
                               value={email.value}
                               placeholder="Enter your email"
                               className={classnames(
                                'form-control',
                                { 'is-valid': email.error === false },
                                { 'is-invalid': email.error }
                              )}
                              onChange={evt =>
                                this.handleChange(validateFields.validateEmail, evt)
                              }
                              onBlur={evt =>
                                this.handleBlur(validateFields.validateEmail, evt)
                              }
                            />
                            <div className="invalid-feedback">{email.error}</div>
             
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input
                            type="password"
                            name="password"
                            value={password.value}
                            placeholder="Enter your password"
                            className={classnames(
                                'form-control',
                                { 'is-valid': password.error === false },
                                { 'is-invalid': password.error }
                            )}
                            onChange={evt =>
                                this.handleChange(validateFields.validatePassword, evt)
                            }
                            onBlur={evt =>
                                this.handleBlur(validateFields.validatePassword, evt)
                            }
                        />
                     <div className="invalid-feedback">{password.error}</div>
                    </div>

                    <button
                type="submit"
                className="btn btn-secondary btn-block"
                onMouseDown={() => this.setState({ submitCalled: true })}
              >
                Submit
              </button>
                </form>
            </div>
        )
    }
}