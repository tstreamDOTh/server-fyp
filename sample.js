import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import mqtt from 'mqtt';
import LineChart from 'react-linechart';
import axios from 'axios';
import '../node_modules/react-linechart/dist/styles.css';
import $ from 'jquery'; 

class App extends Component {

constructor () {
  super()
  this.state={
    tempData: [], 
    humData: []
  };
  this.loadData = this.loadData.bind(this)
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
          console.log(data[i])
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
          data[i] = data[i].split(" ")[0];
          console.log(data[i])
        }
        this.setState({humData: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
}
  render() {
    console.log(this.state.data)
    var row  = []; 
    for(var i = 0 ; i<this.state.tempData.length ; i ++){
      row.push({x : "2018-06-"+i , y : this.state.tempData[i]})
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

    return (
      <div>
        <div className="App">
        <div style={{backgroundColor: 'red'}}>
        Navbar
        </div>
        <LineChart
            width={400}
            height={300}
            data={humData}
            xLabel='Time'
            yLabel='Temperature C'
          />
          <br/>
          <h2>Monitoring Dashboard</h2>
          <LineChart isDate={true}
            width={400}
            height={300}
            data={tempData}
            xLabel='Time'
            yLabel='Temperature C'
            hideXAxis = {false}
          />
        
        </div>        
      </div>
    );
  }
}

export default App;

