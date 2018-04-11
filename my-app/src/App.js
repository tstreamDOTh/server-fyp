import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import mqtt from 'mqtt';
import LineChart from 'react-linechart';
import axios from 'axios';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import '../node_modules/react-linechart/dist/styles.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import $ from 'jquery'; 

class App extends Component {

constructor () {
  super()
  this.state={
    tempData: [], 
    humData: [],
    distData: [],
    gasData: [],
    noiseData: [],
    open: true,
    showTemp: true,
    showHum: false,
    showDist: false,
    showGas:false,
    showNoise: false
  };
  this.loadData = this.loadData.bind(this)
   this.showTemp = this.showTemp.bind(this);
   this.showHum = this.showHum.bind(this);
   this.showDist = this.showDist.bind(this);
      this.showGas = this.showGas.bind(this);
      this.showNoise = this.showNoise.bind(this);
}

componentDidMount() {
    this.loadData();
  setInterval((this.loadData), 1000);
  }


loadData(){
  $.ajax({
      url: 'http://localhost:8000/temp',
      dataType: 'json',
      cache: false,
      success: function(data) {
        for(var i = 0 ; i<data.length ; i ++){
          data[i] = data[i].split(" ")[0];
        }
        this.setState({tempData: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  $.ajax({
      url: 'http://localhost:8000/hum',
      dataType: 'json',
      cache: false,
      success: function(data) {
        for(var i = 0 ; i<data.length ; i ++){
          data[i] = data[i].split("%")[0];
          console.log("hum = "+data[i])
        }
        this.setState({humData: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  $.ajax({
      url: 'http://localhost:8000/dist',
      dataType: 'json',
      cache: false,
      success: function(data) {
        for(var i = 0 ; i<data.length ; i ++){
          data[i] = data[i].slice(0, -2);;
          console.log(data[i])
        }
        this.setState({distData: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  $.ajax({
      url: 'http://localhost:8000/gas',
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log("DSs"+data)
        this.setState({gasData: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  $.ajax({
      url: 'http://localhost:8000/noise',
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log(data)
        this.setState({noiseData: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
}

showTemp(){
  this.setState({
      showTemp: true,
      showHum: false,
      showDist: false,
      showGas: false,
      showNoise: false,
    })
}
  showHum(){
    this.setState({
      showTemp: false,
      showHum: true,
      showDist: false,
      showGas:false,
      showNoise: false,
    })
  }

  showDist(){
    this.setState({
      showTemp: false,
      showHum: false,
      showDist: true,
      showGas: false,
      showNoise: false,
    })
  }

  showGas(){
    this.setState({
      showTemp: false,
      showHum: false,
      showDist: false,
      showGas: true,
      showNoise: false,
    })
  }
  showNoise(){
    this.setState({
      showTemp: false,
      showHum: false,
      showDist: false,
      showGas: false,
      showNoise: true,
    })
  }
  render() {
   
    var row  = []; 
    for(var i = 0 ; i<this.state.tempData.length ; i ++){
      row.push({x : i , y : this.state.tempData[i]})
    }
      const tempData = [
      {                 
        color: "steelblue", 
        points: row
      }
    ];

    var row2  = []; 
    for(var i = 0 ; i<this.state.humData.length ; i ++){
      row2.push({x : i , y : this.state.humData[i]})
    }
      const humData = [
      {                 
        color: "red", 
        points: row2
      }
    ];

    var row3  = []; 
    for(var i = 0 ; i<this.state.distData.length ; i ++){
      row3.push({x : i , y : this.state.distData[i]})
    }
      const distData = [
      {                 
        color: "orange", 
        points: row3
      }
    ];
if(this.state.showTemp){
    return (
      <div>
        <div className="App">
         <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <AppBar
    title="Monitoring Dashboard"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  />
  <Drawer style={{backgroundColor: 'rgb(68, 68, 68)', color: 'rgb(108, 246, 255)'}} open={this.state.open}>
          <MenuItem style={{backgroundColor: 'rgb(68, 68, 68)', color: 'rgb(108, 246, 255)'}}  onClick={this.showTemp}>Temperature</MenuItem>
          <MenuItem onClick={this.showHum}>Humidity</MenuItem>
          <MenuItem onClick={this.showDist}>Distance</MenuItem>
          <MenuItem onClick={this.showGas}>Harmful Gas Detection</MenuItem>
          <MenuItem onClick={this.showNoise}>Check Noise</MenuItem>
        </Drawer>
          <LineChart
            width={800}
            height={600}
            data={tempData}
            yMin='0'
            yMax='50'
            xLabel='t'
            yLabel='Temperature C'
            hideXAxis = {false}
          />
           </MuiThemeProvider>
        </div>  

      </div>
    );
  }
  else if(this.state.showHum){
    return (
      <div>
        <div className="App">
         <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <AppBar
    title="Monitoring Dashboard"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  />
  <Drawer open={this.state.open}>
               <MenuItem onClick={this.showTemp}>Temperature</MenuItem>
          <MenuItem  style={{backgroundColor: 'rgb(68, 68, 68)', color: 'rgb(108, 246, 255)'}} onClick={this.showHum}>Humidity</MenuItem>
          <MenuItem onClick={this.showDist}>Distance</MenuItem>
          <MenuItem onClick={this.showGas}>Harmful Gas Detection</MenuItem>
          <MenuItem onClick={this.showNoise}>Check Noise</MenuItem>
        </Drawer>
           <LineChart
            width={800}
            height={600}
            data={humData}
            yMin='0'
            yMax='100'
            xLabel='t'
            yLabel='Humidity %'
          />
           </MuiThemeProvider>
        </div>  

      </div>
    );
  }
  else if(this.state.showDist){
    return (
      <div>
        <div className="App">
         <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <AppBar
    title="Monitoring Dashboard"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  />
  <Drawer open={this.state.open}>
               <MenuItem onClick={this.showTemp}>Temperature</MenuItem>
          <MenuItem onClick={this.showHum}>Humidity</MenuItem>
          <MenuItem style={{backgroundColor: 'rgb(68, 68, 68)', color: 'rgb(108, 246, 255)'}}  onClick={this.showDist}>Distance</MenuItem>
          <MenuItem onClick={this.showGas}>Harmful Gas Detection</MenuItem>
          <MenuItem onClick={this.showNoise}>Check Noise</MenuItem>
        </Drawer>
           <LineChart
            width={800}
            height={600}
            data={distData}
            yMin='0'
            yMax='500'
            xLabel='t'
            yLabel='Distance (cm)'
          />
           </MuiThemeProvider>
        </div>  

      </div>
    );
  }
  else if(this.state.showGas){
    return (
      <div>
        <div className="App">
         <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <AppBar
    title="Monitoring Dashboard"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  />
  <Drawer open={this.state.open}>
               <MenuItem onClick={this.showTemp}>Temperature</MenuItem>
          <MenuItem onClick={this.showHum}>Humidity</MenuItem>
          <MenuItem onClick={this.showDist}>Distance</MenuItem>
          <MenuItem style={{backgroundColor: 'rgb(68, 68, 68)', color: 'rgb(108, 246, 255)'}}  onClick={this.showGas}>Harmful Gas Detection</MenuItem>
          <MenuItem onClick={this.showNoise}>Check Noise</MenuItem>
        </Drawer>
          <Card>
              <CardHeader
                title="Harmful Gas Check"
                subtitle="Live"
                avatar="gas.png"
              />
              <CardTitle title={this.state.gasData[this.state.gasData.length-1]}/>
            </Card>
           </MuiThemeProvider>
        </div>  

      </div>
    );
  }

  else if(this.state.showNoise){
    return (
      <div>
        <div className="App">
         <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <AppBar
    title="Monitoring Dashboard"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  />
  <Drawer open={this.state.open}>
               <MenuItem onClick={this.showTemp}>Temperature</MenuItem>
          <MenuItem onClick={this.showHum}>Humidity</MenuItem>
          <MenuItem onClick={this.showDist}>Distance</MenuItem>
          <MenuItem onClick={this.showGas}>Harmful Gas Detection</MenuItem>
          <MenuItem style={{backgroundColor: 'rgb(68, 68, 68)', color: 'rgb(108, 246, 255)'}}  onClick={this.showNoise}>Check Noise</MenuItem>
        </Drawer>
          <Card>
              <CardHeader
                title="Noise Check"
                subtitle="Live"
                avatar="sound.png"
              />
              <CardTitle title={this.state.noiseData[this.state.noiseData.length-1]}/>
            </Card>
           </MuiThemeProvider>
        </div>  

      </div>
    );
  }
    
    
  }
}

export default App;

