import React, {Component} from 'react';
import {connect} from 'react-redux';
import DG from '2gis-maps';

import './MapContainer.scss';
import * as actions from '../../store/actions/index';
import {Redirect} from "react-router-dom";
import Layout from "../../hoc/Layout";
import Button from "../../components/UI/Button";


class MapContainer extends Component {
  state = {
    position: {
      lat: null,
      lng: null
    },
    loading: true
  };

   componentDidMount() {
      this.getLocation();
       // this.drawMap();
  }

  componentWillUnmount() {
    console.log('WILL UNMOUNT')
    // this.setState({
    //   loading: false
    // })
  }

  onLogout = () => {
    this.props.onLogout()
  };

  getLocation = () => {
     window.navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position.coords.latitude)
        // this.setState( prevState => ({
        //   ...prevState,
        //   position: {
        //     lat: position.coords.latitude,
        //     lng: position.coords.longitude
        //   }
        // }), () => this.drawMap(position.coords.latitude, position.coords.longitude));
        this.drawMap(position.coords.latitude, position.coords.longitude)
      },
      err => console.log(err)
    );


  };


    drawMap(lat, lng) {
      if (lat && lng) {
        let map;
        DG.then(function() {

          map = DG.map('map', {
            center: [lat, lng],
            zoom: 13,
            touchZoom: false,
            boxZoom: false,
          });

          DG.marker([lat, lng]).addTo(map);

        });
      }
  }

  render() {
    let authRedirect = null;
    if(!this.props.isAuthenticated) {
      authRedirect = <Redirect to='/login'/>
    }
    return (
      <Layout
      isNavDisabled={true}
      headerStyle='header-map'
      wrapperStyle='map-wrapper'
      >
        <div className='map-container'>
          {authRedirect}

          <div id="map" className='map-element'></div>

          <Button
            clicked={this.onLogout}
            disabled={this.props.loading}
            btnType="mapButton">
            Понятно, я пойду
          </Button>

        </div>
      </Layout>

    );
  }

}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    loading: state.auth.loading
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password)),
    onLogout: () => dispatch(actions.logout())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer);



//
// import React from "react";
// import ReactDOM from "react-dom";
//
// import DG from '2gis-maps';
//
// import "./styles.css";
//
// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       position: {
//         lat: null,
//         lng: null
//       }
//     };
//   }
//
//   componentDidMount() {
//     const {lat, lng} = this.state.position;
//     this.getLocation()
//     this.drawMap(lat, lng);
//   }
//
//   getLocation = () => {
//     window.navigator.geolocation.getCurrentPosition(
//       position => {
//         console.log(position.coords.latitude)
//         this.setState( prevState => ({
//           ...prevState,
//           position: {
//             lat: position.coords.latitude,
//             lng: position.coords.latitude
//           }
//
//         }));
//       },
//       err => console.log(err)
//     );
//
//   }
//
//   async drawMap() {
//     const {lat, lng} = this.state.position;
//     let latitude = await lat !== null;
//     let longitude = await lng !== null;
//     DG.then(function() {
//       let map;
//
//       map = DG.map('map', {
//         center: [latitude, longitude],
//         zoom: 5
//       });
//
//       map.locate({setView: true, watch: true})
//         .on('locationfound', function(e) {
//           DG.marker([e.latitude, e.longitude]).addTo(map);
//         })
//         .on('locationerror', function(e) {
//           DG.popup()
//             .setLatLng(map.getCenter())
//             .setContent('Доступ к определению местоположения отключён')
//             .openOn(map);
//         });
//     });
//
//   }
//
//   render() {
//
//     return <div>
//       latitude: {this.state.position.lat}
//       <div id="map" style={{width:'500px', height:'400px'}}></div>
//     </div>;
//   }
// }
//
// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
