import React,{Component} from 'react';
import Divider from 'material-ui/Divider'

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import {changeValueAdmin} from '../actions/adminLoginAction';
import {adminSetCurrentItem} from '../actions/adminSetCurrent';
import {adminSetActivePage} from '../actions/adminActivePage';
import {withRouter} from 'react-router-dom';
import {List, ListItem} from 'material-ui/List';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import AdminFlights from './AdminFlights';
import AdminHotels from './AdminHotels';
import AdminCars from './AdminCars';

import AdminAllHotels from './adminAllHotels';
import AdminAllFlights from './adminAllFlights';
import AdminAllCars from './adminAllCars';
import AdminUpdateHotel from './adminUpdateHotel';
import AdminUpdateFlight from './adminUpdateFlight';
import AdminUpdateCar from './adminUpdateCar';
import {NavLink} from 'react-router-dom';
import AdminCustomNavbar from './AdminCustomNavBar';

import * as API from '../api/API';

class AdminHome extends Component{


    handleLogin = (adminLoginData) => {
        API.doLogin(adminLoginData)
        .then((res) => {
            if (res.status === 201) {
                console.log("Success");
                res.json().then(user => {
                    //this.props.loginSuccess(user);
                    //NotificationManager.success("Welcome", "Login Successful", 2500, true);
                    this.props.history.push("/adminHotels");
                });
        
            } else if (res.status === 401) {
                // console.log("Fail");
                // NotificationManager.error("Invalid username and password", "Login Failed", 2500, true);
                // this.props.history.push("/");
            } 
        });
      }


    
    showAll(){
        
        this.props.adminSetActivePage("all");
        {this.props.adminCurrentItem=="Hotels" && this.props.history.push("/adminshowHotels")};
        {this.props.adminCurrentItem=="Flights" && this.props.history.push("/adminShowFlights")};
        {this.props.adminCurrentItem=="Cars" && this.props.history.push("/adminShowCars")};
        

    }
    addItem(){
        this.props.adminSetActivePage("add");
        {this.props.adminCurrentItem=="Hotels" && this.props.history.push("/adminHotels")}
        {this.props.adminCurrentItem=="Flights" && this.props.history.push("/adminFlights")}
        {this.props.adminCurrentItem=="Cars" && this.props.history.push("/adminCars")}
    }
    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-md-12" style={{backgroundColor:'black',height:'46px'}}>
                        <div className="row" style={navstyle}>
                            <AdminCustomNavbar />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-2 col-md-offset-1" style={{marginTop:'50px'}}>
                        <div className="row" style ={linkStyle}>
                            {this.props.adminCurrentItem=="Hotels" &&
                            <NavLink to="/adminHotels" style={lstyle} activeStyle={linkactive}>Add {this.props.adminCurrentItem}</NavLink>}
                            {this.props.adminCurrentItem=="Flights" &&
                            <NavLink to="/adminFlights" style={lstyle} activeStyle={linkactive}>Add {this.props.adminCurrentItem}</NavLink>}
                            {this.props.adminCurrentItem=="Cars" &&
                            <NavLink to="/adminCars" style={lstyle} activeStyle={linkactive}>Add {this.props.adminCurrentItem}</NavLink>}
                            

                        </div>

                        <div className="row" style ={linkStyle}>
                            {this.props.adminCurrentItem=="Hotels" &&
                            <NavLink to="/adminshowHotels" style={lstyle} activeStyle={linkactive}>Show All {this.props.adminCurrentItem}</NavLink>
                            }
                            {this.props.adminCurrentItem=="Flights" &&
                            <NavLink to="/adminshowFlights" style={lstyle} activeStyle={linkactive}>Show All {this.props.adminCurrentItem}</NavLink>
                            }
                            {this.props.adminCurrentItem=="Cars" &&
                            <NavLink to="/adminshowCars" style={lstyle} activeStyle={linkactive}>Show All {this.props.adminCurrentItem}</NavLink>
                            }
                        </div>

                    </div>   
                
                    <div className="col-md-7 " style={{marginTop:"20px"}}>
                        <Route exact path='/adminHotels' component={AdminHotels}/>
                        <Route exact path='/adminFlights' component={AdminFlights}/>
                        <Route exact path='/adminCars' component={AdminCars}/>
                        <Route exact path="/adminShowHotels" component={AdminAllHotels}/>
                        <Route exact path="/adminShowFlights" component={AdminAllFlights}/>
                        <Route exact path="/adminShowCars" component={AdminAllCars}/>
                        <Route exact path="/adminUpdateHotel" component={AdminUpdateHotel}/>
                        <Route exact path="/adminUpdateFlight" component={AdminUpdateFlight}/>
                        <Route exact path="/adminUpdateCar" component={AdminUpdateCar}/>
                    </div>
                    {/* <div className="col-md-3">

                    
                        {   this.props.adminActivePage=="add" &&

                            <RaisedButton backgroundColor="#03A9F4" style={{"marginTop":"30px"}} onClick={()=>{this.showAll()}}>
                                Show {this.props.adminCurrentItem}
                            </RaisedButton>
                        }
                        {   this.props.adminActivePage=="all" &&

                            <RaisedButton backgroundColor="#03A9F4" style={{"marginTop":"30px"}} onClick={()=>{this.addItem()}}>
                            Add {this.props.adminCurrentItem}
                            </RaisedButton>
                        }
                    </div> */}
                </div>
                
            </div>
        )
    }
}
const ListStyle = {
    marginLeft:"25px",
    marginTop:"50px"
  };

const buttonStyle = {
    backgroundColor: "#545456",
    color: "#fff",
    borderRadius: "2px",
    boxShadow: "0 2px 2px 0 rgba(0,0,0,0.16)",
    height: "42px",
    width: "100%",
    fontSize: "16px",
    marginTop:"50px"
}

const navstyle={
    marginLeft:'120px',
    marginRight:'120px'
}
const lstyle={
    fontSize: '15px',
    lineHeight: '16px',
    color: '#666666',
    display: 'block',
    msFlex: '1',
    textDecoration: 'none',
    fontWeight:'500'
}
const linkStyle={
    marginBottom: "20px"
}

const linkactive={
    color: '#000000'
}

function mapStateToProps(state){
    return{
        adminLoginData:state.adminLoginData,
        adminCurrentItem:state.adminCurrentItem,
        adminActivePage:state.adminActivePage,

    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            adminSetCurrentItem,
            adminSetActivePage,

        }
        ,dispatch);
  }
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(AdminHome));
