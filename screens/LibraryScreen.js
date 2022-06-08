import { View, Text, ScrollView, Image, ImagePropTypes } from 'react-native'
import React, { useContext, useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { Songs } from '../assets/SongsData'
import { collection, deleteDoc, doc, getDocs, onSnapshot } from 'firebase/firestore'
import { Auth, db } from '../Firebase'
import { TouchableOpacity } from 'react-native-gesture-handler'
import TrackPlayer, { Event, State, TrackType } from 'react-native-track-player'
import { SongContext } from '../contexts/SongContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LibraryScreen = () => {


  const [library, setLibrary] = React.useState([])

  const [id, setId] = React.useState('')

  const{setState, setSongCard} = useContext(SongContext)


  const addDataToCache = async (data) => {

    const cache = await AsyncStorage.getItem('history')

    cache == null ? await AsyncStorage.setItem('history', JSON.stringify([data])): await AsyncStorage.setItem('history', JSON.stringify([data, ...JSON.parse(cache)]))
  }


  const getDataFromFirebase = async () => {
    const colRef = collection(db, 'users', Auth.currentUser.email, 'library')
    onSnapshot(colRef, (snapshot) => {
      setLibrary(snapshot.docs.map((doc) => doc.data()))
    })
  }

  
  
  /*  TrackPlayer.addEventListener(Event.PlaybackTrackChanged, ({track, nextTrack}) => {
      
      setState(library[nextTrack])
      addDataToCache(library[nextTrack])
      
    })*/

  

  useEffect(() => {
    getDataFromFirebase()
  },[])



  const deleteLiked = async (title) => {
    const colRef = collection(db, 'users', Auth.currentUser.email, 'library')
    const docRef = doc(colRef, title)

    await deleteDoc(docRef)
  }


  /*const playFromLibrary = (track) => {
    TrackPlayer.reset()
    TrackPlayer.add(track)
    TrackPlayer.play()
    setSongCard(true)
   
  }*/




  return (
    <LinearGradient style={{flex: 1}} colors = {['#12588a', '#1a1a1a', '#1a1a1a']}>
      <ScrollView>
        <View style={{alignItems: 'center'}}>
            <Text style={{color: 'white', fontSize: 26, fontWeight: '900', marginTop: 70}}>Your Music</Text>
        </View>
       { /*<View style={{backgroundColor: 'green', height: 40, width: 120, alignSelf: 'center', margin: 20, borderRadius: 30 }}>
        <TouchableOpacity onPress={() => [playFromLibrary(library)]}>
            <Text style={{color: 'white', fontSize: 16, fontWeight: '900', alignSelf: 'center', margin: 10}}>Play All</Text>
          </TouchableOpacity>

  </View>*/}
        
        {library.map((song, index) => (
        <View style={{marginLeft: 30, marginTop: 20, backgroundColor: '#3e3f40', width: 330, borderRadius: 5,
        flexDirection: 'row'}} key={index}>
          <Image source={{uri : song.artwork}} style={{height: 50, width: 50}}/>
         
            <Text style ={{color: 'white', height: 20 ,width: 200 ,alignSelf: 'center', fontSize: 16 ,fontWeight: '700', marginLeft: 10}}>{song.title}{' '}By{' '}{song.artist}</Text>
            <TouchableOpacity onPress={() => {deleteLiked(song.title)}}>
                <Image style={{height: 30, width: 30 , margin: 10, left: 5}} source={{uri : "https://img.icons8.com/material/480/ffffff/delete--v1.png"}}/>
            </TouchableOpacity>
        </View>
        ))
}
      </ScrollView>
    </LinearGradient>
  )
}

export default LibraryScreen