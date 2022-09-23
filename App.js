// import * as React from 'react';
// import {View,Text} from 'react-native'
// import MainContainer from './navigation/MainContainer';

// const App = ()=>{
//   return (
//     <MainContainer/>
//   )
// }

// export default App;

import * as React from 'react';
import {View,Text} from 'react-native'
import MainContainer from './navigation/MainContainer';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import forgroundService from './background-geoLocations/forgroundService';
import RNLocation from 'react-native-location';
import {useEffect,useState}  from 'react';


RNLocation.configure({
  distanceFilter: 2, // Meters
  desiredAccuracy: {
    ios: "best",
    android: "balancedPowerAccuracy"
  },
  // Android only
  androidProvider: "auto",
  interval: 10, // Milliseconds
  maxWaitTime: 100, // Milliseconds
  // iOS Only
  activityType: "other",
  allowsBackgroundLocationUpdates: false,
  headingFilter: 1, // Degrees
  headingOrientation: "portrait",
  pausesLocationUpdatesAutomatically: false,
  showsBackgroundLocationIndicator: false,
})

const App = ()=>{

  const [userLocation,setUserLocation]  = useState();

  const restaurants = [ 
    {
        title:'Store 1 : Quality Bakers,kochi',
        location:{latitude:10.013309,longitude:76.330606},
        description:"Stay work"
    },
    {
        title:'Store 2: Mens fashion dress shop,near bbk mark,kochi',
        location:{latitude:10.013225,longitude: 76.329297},
        description:"Stay happy to work" 
    }
  ];

  forgroundService.userLocations = {latitude:10.007864, longitude:76.316088};
  forgroundService.shopsAddress = restaurants;

    
  // const getGrantedPermission = async()=>{   
  //   const granted = await RNLocation.requestPermission({
  //       android: {
  //         detail: 'fine'
  //       }
  //   });
  //     if (granted) {
  //       console.log("PERMISSION GRANTED....");
  //       const locationSubscription = RNLocation.subscribeToLocationUpdates((locations) => {
  //         console.log("RNLocation :: ", locations);
  //         console.log("LOCATIONS ::: ", locations[locations.length - 1]);
  //         const getCurrentLocation = locations[locations.length - 1];
  //         console.log("GET CURRENT LOCATIONS :: " , getCurrentLocation); 
  //         //AsyncStorage.setItem("region_details_tqsr",JSON.stringify(getCurrentLocation));
  //         forgroundService.userLocations = getCurrentLocation;
  //         forgroundService.mapRefreshed = true;
          
  //        // setUserLocation(loc => (loc = getCurrentLocation));
  //         //console.log("set user location" , userLocation);
  //         forgroundService.mapRefreshed = true;
  //     })
  //     return locationSubscription;
  //   }
  // }
  
  // ReactNativeForegroundService.add_task(
  //   () => getGrantedPermission(),
  //   {
  //       delay: 100,
  //       onLoop: true,
  //       taskId: 'taskid',
  //       onError: (e) => console.log(`Error logging:`, e),
  //   }
  // );

  
  return (
    <MainContainer
    userLocation = {{name:'navani',email:'dats'}}
    />
  )
}

export default App;
