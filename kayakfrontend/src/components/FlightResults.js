import React,{Component} from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import IconArrow from '../icons/IconArrow';
import IconSort from '../icons/IconSort';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import * as API from '../api/API';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import {withRouter} from 'react-router-dom';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {changeFlightListing} from '../actions/flightListingAction';
import {changeFlightSearch} from '../actions/flightSearchAction';

import img1 from '../images/price-alert_ad_white.png';
import img2 from '../images/explore_ad_v1.jpg';
import img3 from '../images/explore_ad_white.png';

class FlightResults extends Component
{
    state = {
        valueClass: 'Economy',
        valueTraveler: 1,
        sort:0,
        type:'arrival'
    }

    componentDidMount(){
        this.getFlights();
    }

    getFlights = () =>{
        var filter_prop = {
            stops: [],
            flight_name: []
        }
        var order = this.state.type+(this.state.sort?'_desc':'_asc');
        var data ={
            origin:     document.getElementById('source').value,
            destination:document.getElementById('destination').value,
            arrival_date:     document.getElementById('toDate').value,
            departure_date:   document.getElementById('fromDate').value,
            class:      this.state.valueClass,
            no_of_traveler:this.state.valueTraveler,
            order,
            filter_prop
        }
        if(data.origin && data.destination && data.arrival_date && data.departure_date){
            console.log(data);
            API.doFlightSearch(data)
            .then((res)=>{
                if(res.status===201){
                    res.json().then(items=>{
                        console.log(items.data);
                        this.props.changeFlightListing(items.data);
                    });
                }
            });
        }
        else{
            NotificationManager.warning('Enter Search Details','Search Fields are Empty',2500);
        }
    }

    showFlights = () => {
        if(this.props.userData.flights !== undefined)
        {
            const flights=this.props.userData.flights;
            console.log(flights);
            return flights.map(flight=>(
                <div style={flightstyle}>
                    <div className="col-md-4" style={{padding:'0px'}}>
                        
                    </div>
                    <div className="col-md-8">
                        <div className="row" style={{padding:'10px'}}>
                            Hello
                        </div>
                    </div>
                </div>
            ))
        }
    }

    handleChangeClass = (event, index, valueClass) => this.setState({...this.state,valueClass});
    handleChangeTraveler = (event, index, valueTraveler) => this.setState({...this.state,valueTraveler});

    render(){
        
        return(
            <div>
                <div className="row" style={rstyle}>
                    <div className="col-md-2" >
                        <div className="row" style={divstyle}>
                            <TextField style={istyle}
                                id="source"
                                hintText="From Where?"
                                defaultValue={this.props.userData.flightSearch.origin}
                            />
                        </div>
                    </div>
                    <div className="col-md-2" >
                        <div className="row" style={divstyle}>
                            <TextField style={istyle}
                                id="destination"
                                hintText="To Where?"
                                defaultValue={this.props.userData.flightSearch.destination}
                            />
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="row" style={divstyle}>
                                    <DatePicker id="fromDate" defaultDate={new Date(this.props.userData.flightSearch.departure_date)} style={istyle} hintText="From" container="inline" autoOk/>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="row" style={divstyle}>
                                    <DatePicker id="toDate" defaultDate={new Date(this.props.userData.flightSearch.arrival_date)} style={istyle} hintText="To" container="inline" autoOk/>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="row" style={divstyle}>
                                    <SelectField
                                        value={this.props.userData.flightSearch.class}
                                        onChange={this.handleChangeClass}
                                        style={istyle}
                                        >
                                        <MenuItem value={'Economy'} primaryText="Economy" />
                                        <MenuItem value={'Business'} primaryText="Business" />
                                        <MenuItem value={'First'} primaryText="First" />
                                    </SelectField>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="row" style={divstyle}>
                                    <SelectField
                                        value={this.props.userData.flightSearch.no_of_traveler}
                                        onChange={this.handleChangeTraveler}
                                        style={istyle}
                                        >
                                        <MenuItem value={1} primaryText="1 traveler" />
                                        <MenuItem value={2} primaryText="2 travelers" />
                                        <MenuItem value={3} primaryText="3 travelers" />
                                        <MenuItem value={4} primaryText="4 travelers" />
                                        <MenuItem value={5} primaryText="5 travelers" />
                                        <MenuItem value={6} primaryText="6 travelers" />
                                        <MenuItem value={7} primaryText="7 travelers" />
                                        <MenuItem value={8} primaryText="8 travelers" />
                                        <MenuItem value={9} primaryText="9 travelers" />
                                        <MenuItem value={10} primaryText="10 travelers" />
                                    </SelectField>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-1">
                        <div className="row" style={divstyle}>
                            <button style={btnstyle}
                                id="destbtn"
                                hintText="Where"
                                onClick={()=>{
                                    this.getFlights();      
                                }}
                            >
                            <IconArrow color="white"/> 
                            </button>
                        </div>
                    </div>
                </div>
                <div className="row" style={{backgroundColor:'#eaebee',minHeight:'100vh',width:'100%',margin:'0px',paddingBottom:'50px'}}>
                    <div className="col-md-2">
                        <div className="row">
                            <div className="col-md-12" style={{margin:'10px',backgroundColor:'white'}}>
                                <div className="row" style={starttitle} onClick={()=>{
                                        //console.log('click');
                                        this.setState({...this.state,sort:!this.state.sort,type:'price'});
                                        this.getFlights();
                                    }}>
                                    <span style={{float:'left',marginTop:'10px',fontWeight:'600',fontSize:'12px',color:(this.state.type==='price')?'#80abec':'black'}}>PRICE</span>
                                    <span style={{float:'right',marginTop:'5px',color:'#558fe6',fontWeight:'100',fontSize:'12px',width:'fit-content'}} hoverColor="white" >
                                    {(this.state.type==='price') &&
                                    <IconSort width="24" height="24" color="#80abec" sort={this.state.sort}/>
                                    }
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12" style={{margin:'10px',marginTop:'0px',backgroundColor:'white'}}>
                                <div className="row" style={starttitle} onClick={()=>{
                                        //console.log('click');
                                        this.setState({...this.state,sort:!this.state.sort,type:'arrival'});
                                        this.getFlights();
                                    }}>
                                    <span style={{float:'left',marginTop:'10px',fontWeight:'600',fontSize:'12px',color:(this.state.type==='arrival')?'#80abec':'black'}}>ARRIVAL</span>
                                    <span style={{float:'right',marginTop:'5px',color:'#558fe6',fontWeight:'100',fontSize:'12px',width:'fit-content'}} hoverColor="white">
                                    {(this.state.type==='arrival') &&
                                    <IconSort width="24" height="24" color="#80abec" sort={this.state.sort}/>
                                    }
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12" style={{margin:'10px',marginTop:'0px',backgroundColor:'white'}}>
                                <div className="row" style={starttitle} onClick={()=>{
                                        //console.log('click');
                                        this.setState({...this.state,sort:!this.state.sort,type:'departure'});
                                        this.getFlights();
                                    }}>
                                    <span style={{float:'left',marginTop:'10px',fontWeight:'600',fontSize:'12px',color:(this.state.type==='departure')?'#80abec':'black'}}>DEPARTURE</span>
                                    <span style={{float:'right',marginTop:'5px',color:'#558fe6',fontWeight:'100',fontSize:'12px',width:'fit-content'}} hoverColor="white">
                                    {(this.state.type==='departure') &&
                                    <IconSort width="24" height="24" color="#80abec" sort={this.state.sort}/>
                                    }
                                    </span>                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="row">
                            <div className="col-md-12" style={{margin:'10px',marginLeft:'20px'}}>
                                {this.showFlights()}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="row">
                            <div className="col-md-12" style={{marginTop:'10px',marginLeft:'15px',marginRight:'20px'}}>    
                                <img src={img1} style={{width:'286px',cursor:'pointer'}}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12" style={{marginTop:'10px',marginLeft:'15px',marginRight:'20px'}}>    
                                <img src={img2} style={{width:'286px',cursor:'pointer'}}/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12" style={{marginTop:'10px',marginLeft:'15px',marginRight:'20px'}}>    
                                <img src={img3} style={{width:'286px',cursor:'pointer'}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const flightstyle={
    marginBottom:'10px',
    backgroundColor:'#ffffff',
    height:'209px',
    width:'100%',
}

const starttitle={
    margin:'10px',
    color:'#0f0f0f',
    fontFamily:'"HelveticaNeue-Bold",Helvetica,Arial,sans-serif',
    fontWeight:'600',
    fontSize:'1.2em',
    cursor:'pointer',
    marginLeft:'0px'
}

const rstyle={
    marginTop:'19px',
    marginRight:'15px',
    marginLeft:'15px',
    height:'71px',
    width:'100%'
}
const btnstyle={
    border:'none',
    fontSize:'16px',
    height:'50px',
    width:'60%',
    marginLeft:'5px',
    marginRight:'5px',
    backgroundImage: 'linear-gradient(135deg,#ff690f 0%,#ff4f3a 100%)',
    boxShadow:'5px 5px 5px 1px #eaebee'
}
const istyle={
    fontSize:'16px',
    fontWeight:'600',
    height:'50px',
    width:'100%',
    backgroundColor:'white',
    marginLeft:'5px',
    marginRight:'5px',
    barderSize:'1px',
    borderColor:'black',
    textAlign:'center',
    boxShadow:'5px 5px 5px 1px #eaebee'
}
const divstyle={
    marginLeft:'-20px',
    marginRight:'-2px',
}

function mapStateToProps(state){
    return{
        userData:state.userData,
    };
}

function matchDispatchToProps(dispatch){
    return bindActionCreators(
        {
            changeFlightListing,
            changeFlightSearch,
        }
    ,dispatch);
}

export default withRouter(connect(mapStateToProps,matchDispatchToProps)(FlightResults));