import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable} from 'react-native';
import React, { useContext, useState , useEffect} from 'react';
import { Songs } from '../../assets/SongsData';
import { SongContext } from '../../contexts/SongContext';
import { Icon } from '../SongScreen';
import { ProgressBar } from '@react-native-community/progress-bar-android';
import TrackPlayer, { State, usePlaybackState, useProgress } from 'react-native-track-player';
import TextTicker from 'react-native-text-ticker';
import { addDoc, arrayUnion, collection, doc, getDocs, query, deleteDoc, setDoc, updateDoc, where } from 'firebase/firestore';
import { Auth, db } from '../../Firebase';




const SongCard = () => {

    const {state, songCard, nav, setSongCard, heart, setHeart} = useContext(SongContext)

   



    const likedSongCheck = async () => {

        const q = query(collection(db, 'users', Auth.currentUser.email, 'library'), where('title', '==',  state.title))
        const doc = await getDocs(q)
        setHeart(doc.docs.length)
    }
    
   
    state == null ? null : likedSongCheck()
 
           

    const heartClick = async() => {
        const colRef = collection(db, 'users', Auth.currentUser.email , 'library')
        const docRef = doc(colRef, state.title)
       heart == 0 ?
       [await setDoc(docRef, state).then(() => {
            console.log('success')
        }).catch(() => {
            console.log('error')
        }) ,
        likedSongCheck()]
        : [await deleteDoc(docRef).then(() => {
            console.log('delete success')
        }).catch(() => {
            console.log('error')
        }), likedSongCheck()]
    }

    const playbackState = usePlaybackState()

    const progress = useProgress()

    const playPause = (playState) => {

        const currentTrack = TrackPlayer.getCurrentTrack()

        if(currentTrack != null) {
            if(playState === State.Playing || playState === State.Connecting || playState === State.Buffering) {
                TrackPlayer.pause()
            }
            else { 
                TrackPlayer.play()
              }
            }
        }

  return (
    songCard && state ? 
    <Pressable onPress={() => [nav.navigate('SongScreen', {
        name: state.title,
        artist: state.artist,
        artwork: state.artwork,
        color: state.color,
    }), setSongCard(false) ]}>
         <View style={[styles.container, {backgroundColor: state.color}]}>
             <View style = {{flexDirection: 'row'}}>
                    <Image style={styles.image} source={{uri : state.artwork}}/>
                        <View style={{width: '50%',marginLeft: 10}}>
                            <TextTicker style={styles.name} scrollSpeed={50} marqueeDelay={3000} numberOfLines={1} >{state.title}</TextTicker>
                            <Text style={styles.artist}>{state.artist == null ? '' : state.artist.split(',').slice(0,1)}</Text>
                        </View>
                        <View style={{flex:1, margin: 10, marginLeft: 40}}>
                            <TouchableOpacity onPress={() => {[heartClick()]}}>
                                <Image source={{uri : heart == 1 ?  Icon[0].active : Icon[0].inactive}} style={{height: 28, width: 28}}/>
                            </TouchableOpacity>
                        </View>

                        <View style={{flex: 1, alignItems: 'flex-end', margin: 10}}> 
                            <TouchableOpacity onPress={() => playPause(playbackState)}>
                                <Image source={{uri : playbackState === State.Paused || playbackState === State.Stopped ?  Icon[1].Icon : Icon[2].Icon}} style={{height: 30, width: 30}}/>
                            </TouchableOpacity>
                        </View>
            </View>
                <View style={{bottom: 4, width: '95%'}}>
                    <ProgressBar styleAttr='Horizontal' color='#212121' indeterminate={false} progress={(progress.position/(state.duration))}/>
                </View>
        </View>
               
        
    </Pressable> : null
  )
  
};


const styles = StyleSheet.create({

    container: {
        height: 55,
        bottom: 50,
        position: 'absolute',
        width: '95%',
        marginLeft: 10,
        borderRadius: 10,
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
        height: 25,
        color: 'white',
        fontSize: 14,
        fontWeight: '700',
        marginLeft: 10,
        top: 5,
    },

    artist: {
        color: '#a8a8a8',
        fontSize: 14,
        fontWeight: '700',
        marginLeft: 10,
        width: '100%',
        top: 2,
    },


})

export default SongCard
