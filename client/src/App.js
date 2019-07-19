import React, { Component } from 'react';
import axios from "axios";
import GoogleMapReact from 'google-map-react';
import Marker from './utility/marker_styles.jsx';
import ReactTooltip from 'react-tooltip';
import './App.scss';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      lat: 1.3521,
      lng: 103.8198,
      zoom: 11,
      addLat: 1.3521,
      addLng: 103.8198,
      lineCoords: [],
      data: null,
      location: null,
      onTripTotal: null,
      notOnTripTotal: null,
      selectedCar: null,
      loading: true
    }
  }

  componentDidMount() {
    setInterval(() => {
      fetch('https://challenge.smove.sg/locations')
      .then(res => { 
        res.json().then(data => ({
          data: data,
          status: res.status
            })
        ).then(res => {
          this.setState({loading: false})
          this.setState({data: res.data.data}) 
          this.setState({onTripTotal: res.data.data.filter((x, i) => x.is_on_trip).length})
          this.setState({notOnTripTotal: res.data.data.filter((x, i) => !x.is_on_trip).length})
        });
      })
    }, 3000) 
  }


  fetchLocation(lat,lng) {
    axios.get("/location", { params: {
      lat: lat,
      lng: lng
    }})
    .then(res => {
      this.setState({location: res.data})
    })
  }

  renderMarkers() {
    return  this.state.data ? this.state.data.map((d, i) => {
      return (
          <Marker
            key = {i}
            lat = {d.latitude}
            lng = {d.longitude}
            text={d.id}
            fontColor="red"
            dataTip={d.id.toString()}
            dataFor={d.id.toString()}
            color={d.is_on_trip ? "#013220" : "#8b0000"}
          /> 
      )
    }) : ''
  }

  renderTooltips() {
    
    return  this.state.data ? this.state.data.map((d, i) => {
      
      return (
        <ReactTooltip key={i} id={d.id.toString()} effect='solid' 
          afterShow={ () => this.fetchLocation(d.latitude, d.longitude)}
          afterHide={ () => this.setState({location:null})}
        >
            <div key={i} id={d.id.toString()}>
              <h2 className="tooltip-margin">Car {d.id}</h2>
              <p className="tooltip-margin">{d.is_on_trip ? "On Trip" : "Not On Trip"}</p>              
            </div>    
        </ReactTooltip>
      )
    }) : ''
  }

  renderLocation() {
    if (this.state.location) {
      return (  
        <div className="location">
          {this.state.location}
        </div>
      )
    } else {
      return ''
    }
  }


  renderTotalNumOfCars() {
    const options = [
      'one', 'two', 'three'
    ]
    if (this.state.data) {
      return (
        <div className="modal">
          <div>Total Number of Cars Currently</div>
          <div>On Trip: {this.state.onTripTotal}</div>
          <div>Not On Trip: {this.state.notOnTripTotal}</div>
        </div>
      )
    }
  }

  initGeocoder = ({ maps }) => {
    const Geocoder = new maps.Geocoder();
    this.setState({map: Geocoder});
  }

  render() {
    const { lat, lng, zoom } = this.state;


    return (
      <div style={{ height: '100vh', width: '100%', position:'relative' }}>
        
          {this.renderLocation()}
          {this.renderTotalNumOfCars()}
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyDDpqjPsg8vIUgdVdmzHKuZWW44h3mtZTI' }}
              defaultCenter={{lat, lng}}
              center={[this.state.addLat, this.state.addLng]}
              defaultZoom={zoom}
              onGoogleApiLoaded={this.initGeocoder}
            >
              {this.state.loading ?  <div className="lds-ring"></div> : ''}
              {this.renderMarkers()}
              {this.renderTooltips()}
            </GoogleMapReact>
      </div>
    )
  }
}

export default App;
