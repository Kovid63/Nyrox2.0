import React, {useEffect, useState} from 'react';
import { LogBox } from 'react-native';
import AuthNavigation from './AuthNavigation'
import BottomNav from './screens/components/BottomNav';
import TrackPlayer, { Capability, usePlaybackState, State } from 'react-native-track-player';
import SongCard from './screens/components/SongCard';
import { SongContext } from './contexts/SongContext';
import SongScreen from './screens/SongScreen';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
])

const App = () => {
  

  const setUpTrackPlayer = async () => {

    try {
        await TrackPlayer.setupPlayer()
        
    } catch (error) {
        console.log(error)
    }
}

useEffect(() => {

    setUpTrackPlayer()

    return () => TrackPlayer.destroy()
},[])

TrackPlayer.updateOptions({
  stopWithApp: false,
  capabilities: [Capability.Play, Capability.Pause, Capability.SeekTo, Capability.SkipToNext, Capability.SkipToPrevious],
  compactCapabilities: [Capability.Play, Capability.Pause, Capability.SeekTo, Capability.SkipToNext, Capability.SkipToPrevious],
})


const [state, setState] = useState()

const[nav, setNav] = useState(null)

const [songCard, setSongCard] = useState(true)

const [songExists , setSongExists] = useState(false)

const [heart , setHeart] = useState(0)

const [history, setHistory] = useState([])

const [index , setIndex] = useState(null)

//const [isLoggedIn, setIsLoggedIn] = useState(false)


  return (
    <> 
    <SongContext.Provider value={{state, setState, nav , setNav, songCard, setSongCard, songExists, setSongExists, heart , setHeart, history, setHistory, index, setIndex,/* isLoggedIn, setIsLoggedIn*/}}> 
            <AuthNavigation/>
    </SongContext.Provider>
    </>
  );
};

export default App;
