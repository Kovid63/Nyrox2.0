import { View, Text, StyleSheet, Image, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { BottomIcons } from '../assets/BottomIcons'
import { Songs } from '../assets/SongsData'
import { collection, collectionGroup, getDocs, query, where } from 'firebase/firestore'
import { db } from '../Firebase'
import TrackPlayer, { State, usePlaybackState, useProgress } from 'react-native-track-player'
import { SongContext } from '../contexts/SongContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SearchScreen = ({navigation}) => {

  const [search, setSearch] = React.useState('')

  const [songs, setSongs] = React.useState([])


  const playbackState = usePlaybackState()

  const {setState, setSongCard,} = useContext(SongContext)

  const addDataToCache = async (data) => {

    const cache = await AsyncStorage.getItem('history')

    cache == null ? await AsyncStorage.setItem('history', JSON.stringify([data])): await AsyncStorage.setItem('history', JSON.stringify([data, ...JSON.parse(cache)]))
  }


  // trackplayer song set up
  const play = async (song, playState) => {

    if(playState === State.Playing || playState === State.Paused || playState === State.Stopped || playState === State.Buffering){
      TrackPlayer.reset()
      await TrackPlayer.add(song).then(() => {
            TrackPlayer.play()
      })
    }
    else{
      TrackPlayer.reset()
      await TrackPlayer.add(song).then(() => {
        TrackPlayer.play()
  })
    }

  }


  const q = query(collection(db, 'songs'), where('docName', '>=', search))

  const getSearch = async () => {

    await getDocs(q).then((snapshot) => {
     setSongs(snapshot.docs.map((doc) => doc.data()))
    })
  }

  const progress = useProgress()

  return (

    <View style={styles.container}>
        <ScrollView>
      <View style={styles.bar} > 
          <Image style={styles.image} source={{uri : BottomIcons[1].inactiveUri}}/>
          <TextInput 
          
          placeholder='Search query'
          placeholderTextColor={'gray'} 
          style={styles.input}
          onChangeText={(value) => {[setSearch(value), getSearch()]}}
          
          
          ></TextInput>
      </View>
      {songs.map((song, index) => (
    search == '' ? null : <TouchableOpacity onPress={() => [setSongCard(true), setState(song) , play(song, playbackState), addDataToCache(song)]} key={index}>
      <View style={styles.results}>
        <Image source={{uri : song.artwork}} style={styles.songImage}/>
          <View>
            <Text style={styles.songName}>{song.title}</Text>
            <Text style={styles.songArtist}>{song.artist}</Text>
          </View>
      </View>
    </TouchableOpacity>
      )
      )}

      </ScrollView>
    </View>
    
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
  },

  bar: {
    height: 50,
    width: 330,
    backgroundColor: '#2b2b2b',
    marginTop: 60,
    alignItems: 'center',
    flexDirection: 'row',
  },

  image: {
    height: 30,
    width: 30,
    marginLeft: 10,
  },

  input: {
    fontSize: 20,
    color: 'white',
    marginLeft: 10,
    width: '80%',
  },

  results: {
    height: 50,
    width: 330,
    backgroundColor: '#2b2b2b',
    alignContent: 'center',
    flexDirection: 'row',
  },

  songImage: {
    height: 40,
    width: 40,
    marginLeft: 10,
  },

  songName: {
    color: 'white',
    fontSize: 14,
    marginLeft: 10,
    fontWeight: '700',
  },

  songArtist: {
    color: 'gray',
    fontSize: 12,
    marginLeft: 10,
    fontWeight: '700',
  }

})

export default SearchScreen