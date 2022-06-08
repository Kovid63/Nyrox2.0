import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { Songs } from '../../assets/SongsData';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase';
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player';
import { SongContext } from '../../contexts/SongContext';
import  AsyncStorage  from '@react-native-async-storage/async-storage'


const RecentSong = ({navigation, songsData,}) => {

  const [activeSong, setActiveSong] = useState(null)

  const {setState, setSongCard} = useContext(SongContext)

  const playbackState = usePlaybackState()

  

  const addDataToCache = async (data) => {

    const cache = await AsyncStorage.getItem('history')

    cache == null ? await AsyncStorage.setItem('history', JSON.stringify([data])): await AsyncStorage.setItem('history', JSON.stringify([data, ...JSON.parse(cache)]))
  }

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

  const SongGridView = ({songArtwork, songGridName, songId, musicObject, }) => (

    <TouchableOpacity onPress={() => [setActiveSong(songGridName), setState(musicObject), setSongCard(true), play(musicObject, playbackState), addDataToCache(musicObject)]}>
        <View style={styles.songContainer}>
            <Image source={{uri: songArtwork}} 
                    style={styles.songImage}/>
            <Text style={styles.songName}>{songGridName}</Text>
            {activeSong == songGridName ? <Text style={{color: 'green', alignSelf: 'center', fontWeight: '700'}}>...</Text> : null}
        </View>
    </TouchableOpacity>

  )


  return (
    <>
  <View style={{marginLeft: 10, flexDirection: 'row'}}>
      <View>
      {songsData.slice(0,3).map((song,index) => (
      <SongGridView musicObject = {song} songId={song.id} songArtwork={song.artwork} songGridName={song.title.length > 22 ? song.title.slice(0,20) + '...'  : song.title } key={index}/>
      ))}
     </View>
     <View>
      {songsData.slice(3,6).map((song,index) => (
      <SongGridView musicObject = {song} songId={song.id} songArtwork={song.artwork} songGridName={song.title.length > 22 ? song.title.slice(0,20) + '...'  : song.title} key={index}/>
      ))}
     </View>
  </View>
  </>
  );
};





const styles = StyleSheet.create({

    songContainer:{
        backgroundColor:'transparent',
         height: 50, 
         width: 170, 
         borderRadius: 6,
         marginLeft: 10,
         marginTop: 20,
         flexDirection: 'row',
        },

     songImage:{
        height: '100%',
        width: 50,
        borderTopLeftRadius: 6,
        borderBottomLeftRadius:6,
     },
     
     songName:{
        color: 'white',
        width: '58%',
        fontSize: 16,
        alignSelf: 'center',
        marginLeft: 10,
        fontWeight: '700'

     },

     container: {
      height: 50,
      bottom: 50,
      position: 'absolute',
      width: '95%',
      marginLeft: 10,
      backgroundColor: '#196591',
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      elevation: 1,
  },

  image: {
      height: 40,
      width: 40,
      margin : 5,
      marginLeft: 10,
      borderRadius: 4,
  },

  name: {
      color: 'white',
      fontSize: 14,
      fontWeight: '700',
      marginLeft: 10,
      width: '100%',
  },

  artist: {
      color: '#a8a8a8',
      fontSize: 14,
      fontWeight: '700',
      marginLeft: 10,
      width: '100%',
  },
     


})

export default RecentSong










