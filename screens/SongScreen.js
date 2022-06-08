import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, BackHandler } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import TrackPlayer, { State, usePlaybackState, useProgress } from 'react-native-track-player';
import { Songs } from '../assets/SongsData';
import { SongContext } from '../contexts/SongContext';
import TextTicker from 'react-native-text-ticker';


export const Icon = [

  { 
    name: 'Heart',
    inactive: 'https://img.icons8.com/material-outlined/96/ffffff/like.png',
    active: 'https://img.icons8.com/material-rounded/96/ffffff/like--v1.png',
  },

  {

    name: 'Play',
    Icon: 'https://img.icons8.com/ios-glyphs/96/ffffff/play--v1.png',

  },

  {
    name: 'Pause',
    Icon: 'https://img.icons8.com/material-outlined/96/ffffff/pause--v1.png',
  },

  {
    name: 'dot',
    Icon: 'https://img.icons8.com/material-outlined/96/ffffff/filled-circle--v1.png',
  },

  {
    name: 'previous',
    Icon: 'https://img.icons8.com/ios-glyphs/96/ffffff/skip-to-start--v1.png',
  },

  {
    name: 'next',
    Icon: 'https://img.icons8.com/ios-glyphs/96/ffffff/end--v1.png',
  }
]

const SongScreen = ({ route, navigation}) => {

  const[heart, setHeart] = useState(Icon[0].inactive)

  const[Play, setPlay] = useState(Icon[1].Icon)

  const playbackState = usePlaybackState()

  const progress = useProgress()
 
  const {setSongCard} = useContext(SongContext)


  const backHandler =  
    BackHandler.addEventListener('hardwareBackPress', () => {
        setSongCard(true)
    })





  const playPause = (playState) => {

    const currentTrack = TrackPlayer.getCurrentTrack()

    if(currentTrack != null && playState === State.Playing) {
        TrackPlayer.pause()
    }
    else{
        TrackPlayer.play()
    }
}





  return (
    <LinearGradient colors={[route.params.color,'#1a1a1a','#1a1a1a']} style = {{flex: 1}}>
      <ScrollView>
      <View>
        
          <TouchableOpacity onPress={() => [navigation.goBack(), setSongCard(true)]}>
            <Image style={{height: 20, width: 20, marginLeft: 20, top: 50, marginRight: 30}} source={{uri : 'https://img.icons8.com/external-those-icons-fill-those-icons/24/ffffff/external-down-arrows-those-icons-fill-those-icons-1.png'}}/>
          </TouchableOpacity>
          <View style={styles.container}>
            <Image source={{uri: route.params.artwork}} style={[styles.image, {marginTop: 50}]}/>
          </View>
            <View style={{width: 350}}>
              <TextTicker style={styles.title} numberOfLines={1} scrollSpeed={50} loop bounce marqueeDelay={1000}>{route.params.name}</TextTicker>
            </View>
          <TextTicker style={{color: 'gray', marginLeft: 40, marginTop: 5, fontSize: 14, width: '80%'  }} loop bounce numberOfLines={1} marqueeDelay={3000} >{route.params.artist}</TextTicker>
      </View>
      <View>
        <Slider style={{height: 50, width: 350, marginLeft: 20,}} value={progress.position} minimumValue={0} maximumValue={progress.duration}
          onSlidingComplete={async(value) => {
            await TrackPlayer.seekTo(value)
          }} thumbTintColor={'white'} minimumTrackTintColor={'white'} maximumTrackTintColor={'white'}
        />
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'gray', marginLeft: 35, bottom: 20, marginTop: 10}}>{new Date(progress.position * 1000).toISOString().substring(14,19)}</Text>
            <Text style={{color: 'gray', marginLeft: 250, bottom: 20, marginTop: 10}}>{new Date(progress.duration * 1000).toISOString().substring(14,19) }</Text>
          </View>
        </View>
       
            
      

        <View style={{height: 70, width: '100%', bottom: 20, flexDirection: 'row', justifyContent: 'center'}}>

            <View style={{marginTop: 15, marginRight: 20}}>
              <TouchableOpacity onPress={() => [TrackPlayer.skipToPrevious(),navigation.goBack(), setSongCard(true)]}>
                <Image style={{height: 40, width: 40}} source={{uri : Icon[4].Icon}}/>
              </TouchableOpacity>
            </View>

            <View style={styles.imageCircle}>
              <TouchableOpacity onPress={() => {[playPause(playbackState)]}}>
                <Image style={{height: 40, width: 40, margin: 15}} source={{uri : playbackState === State.Paused || playbackState === State.Stopped? Icon[1].Icon : Icon[2].Icon }}/>
              </TouchableOpacity>
            </View>

            

            <View style={{marginTop: 15, marginLeft: 20}}>
              <TouchableOpacity onPress={() => [TrackPlayer.skipToNext(),navigation.goBack(), setSongCard(true)]}>
                <Image style={{height: 40, width: 40}} source={{uri : Icon[5].Icon}}/>
              </TouchableOpacity>
            </View>
        </View>

        <View style={{marginTop: 60}}>

        </View>
        </ScrollView>
      </LinearGradient>
  );
};


const styles = StyleSheet.create({


  container:{
      justifyContent: 'center',
      marginTop: 40,
      flexDirection: 'row',
  },

  image:{
    width: 330, 
    height: 330,

  },

  title: {
    fontSize: 20,
    color: 'white',
    marginLeft: 40,
    marginTop: 50,
    fontWeight: '900',
  },

  imageCircle:{
    backgroundColor: 'black',
    height: 70,
    width: 70,
    borderRadius: 35,
    alignSelf: 'center'
  },


})

export default SongScreen;
