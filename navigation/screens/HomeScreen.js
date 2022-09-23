import * as React from 'react';
import {useState,useEffect} from 'react';

import {View,Text} from 'react-native';


//DropDown Component for select store
//import {DropDown} from '../../components/DropDownBar'
import ReactNativeForegroundService from '@supersami/rn-foreground-service';

import DropDown from '../../UI/DropDown';
import Map from '../../UI/Map';
import forgroundService from '../../background-geoLocations/forgroundService';
import RNLocation from 'react-native-location';

// const [location,setLocation] = useState(forgroundService.userLocations);
// useEffect(()=>{
//     ()=>setLocation(loc => (loc = forgroundService.userLocations));
//     console.log("location data:::: " , location);
// },[location]);


RNLocation.configure({
    distanceFilter: 100, // Meters
    desiredAccuracy: {
      ios: "best",
      android: "balancedPowerAccuracy"
    },
    // Android only
    androidProvider: "auto",
    interval: 100, // Milliseconds
    fastestInterval: 100, // Milliseconds
    maxWaitTime: 100, // Milliseconds
    // iOS Only
    activityType: "other",
    allowsBackgroundLocationUpdates: false,
    headingFilter: 1, // Degrees
    headingOrientation: "portrait",
    pausesLocationUpdatesAutomatically: false,
    showsBackgroundLocationIndicator: false,
})



const HomeScreen = ({navigation}) =>{
    const [state,setState] = useState({
        latitude:0,
        longitude:0
    });
    const geoLocation = async ()=>{

        RNLocation.configure({
            distanceFilter:2,
            desiredAccuracy:{
              android:'balancedPowerAccuracy'
            },
            androidProvider:'auto',
            interval:200,
            maxWaitTime:1000
        })
        const granted = await RNLocation.requestPermission({
          android: {
            detail: 'fine'
          }
        });
        if (granted) {
          console.log("PERMISSION GRANTED....");
          const locationSubscription = RNLocation.subscribeToLocationUpdates((locations) => {
            console.log("LOCATIONS ::: ", locations[locations.length - 1]);
            const result = locations[locations.length - 1];
            setState({
              latitude:result.latitude,
              longitude:result.longitude
            })
            return result;
          });
          return locationSubscription;
        }
    }

    useEffect(()=>{
        ReactNativeForegroundService.add_task(
            () => geoLocation(),
            {
                delay: 100,
                onLoop: true,
                taskId: 'taskid',
                onError: (e) => console.log(`Error logging:`, e),
            }
        );
    },[state])



    return(
        <>
        <DropDown/>
        <Map
        userLocations = {state}
        resturants = {forgroundService.shopsAddress}
        />
        </>
    )
}

export default HomeScreen;
