import React,{Component} from 'react';
import Divider from 'material-ui/Divider'
import CryptoJS from 'crypto-js';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changeValueAdmin} from '../actions/adminLoginAction';

import {withRouter} from 'react-router-dom';
import {adminSetCurrentItem} from '../actions/adminSetCurrent';
import * as API from '../api/API';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import IconArrow from '../icons/IconArrow';
import SelectField from 'material-ui/SelectField';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const Car_Types=[
    {
        "name":"Hatchback"
    },
    {
        "name":"Sedan"
    },
    {
        "name":"MPV"
    },
    {
        "name":"SUV"
    },
    {
        "name":"Crossover"
    },
    {
        "name":"Coupe"
    },
    {
        "name":"Convertible"
    }
];

const carTypes=[];
Car_Types.map(type=>{
    carTypes.push(<MenuItem value={type.name} key={type.name} primaryText={type.name} />);
})

class AdminUpdateCar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            car_name:this.props.adminUpdateCurrentData.car_name,
            car_type:this.props.adminUpdateCurrentData.car_type,
            model_name:this.props.adminUpdateCurrentData.model_name,
            car_rental_price:this.props.adminUpdateCurrentData.car_rental_price
        };
      }

      handleNameChange = (event, index, value) => {
        this.setState({...this.state,car_name:event.target.value});
      };
      handleTypeChange = (event, index, value) => {
        this.setState({...this.state,car_type:value});
      };
      handleModalNameChange = (event, index, value) => {
        this.setState({...this.state,model_name:event.target.value});
      };
      handleRentalPriceChange = (event, index, value) => {
        this.setState({...this.state,car_rental_price:event.target.value});
      };

      updateCar(){
        console.log(this.state);
        API.updateCarAdmin(this.state)
        .then((res) => {
            if (res.status === 201) {
                console.log("Success");
                res.json().then(data => {
                    NotificationManager.success("Success", "Car Updated Successfully", 2500, true);
                    // this.props.history.push("/logs");
                });
        
            } else if (res.status === 401) {
                // console.log("Fail");
                // NotificationManager.error("Invalid username and password", "Login Failed", 2500, true);
                // this.props.history.push("/");
            } 
        });
      }
    render(){
        return(
            <div>
                <h1 >Add Car </h1>
                <div className="row" style={divstyle}>
                    <TextField style={istyle}
                        id="car_name"
                        hintText="Car Name"
                        onChange={this.handleNameChange}
                        value={this.state.car_name}
                    />
                </div>
                <div className="row" style={divstyle}>
                    <SelectField
                        value={this.state.car_type}
                        onChange={this.handleTypeChange}
                        floatingLabelText="Car Type"
                        maxHeight={200}  
                    >
                        {carTypes}
                    </SelectField>
                </div>
                <div className="row" style={divstyle}>
                    <TextField style={istyle}
                        id="model_name"
                        hintText="Model Name"
                        onChange={this.handleModalNameChange}
                        value={this.state.model_name}
                    />
                </div>
                <div className="row" style={divstyle}>
                    <TextField style={istyle}
                        id="rental_price"
                        hintText="CarRental Price"
                        onChange={this.handleRentalPriceChange}
                        value={this.state.car_rental_price}
                    />
                </div>
                <br/>
                <div className="row" style={divstyle}>
                    <button style={btnstyle}
                        id="destbtn"
                        onClick={()=>{this.updateCar()}}
                    >
                    Update
                    </button>
                </div>
            </div>
        )
    }
}

const rstyle={
    marginTop:'50px',
    marginRight:'15px',
    marginLeft:'15px'
}

const istyle={
    fontSize:'16px',
    height:'50px',
    width:'100%',
    backgroundColor:'white',
    marginRight:'5px',
    barderSize:'1px',
    borderColor:'black',
    
}

const roomStyle={
    fontSize:'16px',
    height:'50px',
    width:'100%',
    backgroundColor:'white',
    marginRight:'5px',
    barderSize:'1px',
    borderColor:'black',
    marginTop:"20px"
}

const btnstyle={
    border:'none',
    color:"white",
    fontSize:'16px',
    height:'50px',
    width:'100%',
    backgroundColor:'green',
    marginLeft:'5px',
    marginRight:'5px'
}
const divstyle={
    marginLeft:'7px',
    marginRight:'-2px',
    width:"300px"
}


function mapStateToProps(state){
    return{
        adminLoginData:state.adminLoginData,
        adminUpdateCurrentData:state.adminUpdateCurrentData
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            changeValueAdmin,
            adminSetCurrentItem,

        }
        ,dispatch);
  }
  
export default withRouter(connect(mapStateToProps,matchDispatchToProps)(AdminUpdateCar));