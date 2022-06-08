import { Text, SafeAreaView, StyleSheet, Image, View, TouchableOpacity, ScrollView, Pressable, ToastAndroid } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import RecentSong from '../components/RecentSong';
import Episodes from '../components/Episodes';
import { Icons } from '../../assets/Icons';
import TopMixes from '../components/TopMixes';
import History from '../components/History';
import SongCard from '../components/SongCard';
import TrackPlayer, { Capability, State, usePlaybackState, useProgress } from 'react-native-track-player';
import { Auth, db } from '../../Firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Songs } from '../../assets/SongsData';
import { SongContext } from '../../contexts/SongContext';
import AsyncStorage from '@react-native-async-storage/async-storage';




const greeting = () => {
    const today = new Date
    const hour = today.getHours()

    if(hour >= 4 && hour < 12) return <Text>Good morning</Text>
    else if(hour >= 12 && hour < 16) return <Text>Good afternoon</Text>
    else if(hour >= 16 && hour < 23) return <Text>Good evening</Text>
    else if(hour >= 22 && hour < 24 || hour >= 0 && hour < 4 ) return <Text>Good night</Text>
}



const playPauseIcons = [

    {

        name: 'Play',
        Icon: 'https://img.icons8.com/ios-glyphs/96/ffffff/play--v1.png',
    
      },
    
      {
        name: 'Pause',
        Icon: 'https://img.icons8.com/material-outlined/96/ffffff/pause--v1.png',
      },



]





const Header = ({navigation, data,}) => {

    //logout user
    const LogOut = () => {
        navigation.navigate('LogOutScreen')
    }


    const history = () => {
        navigation.navigate('HistoryScreen')
    }

    const notification = () => {
       // ToastAndroid.show('Will be implemented soon', ToastAndroid.LONG)

       console.log(TrackPlayer.getCurrentTrack().then(track => console.log(track)))
    }


    const { songScreen } = useContext(SongContext)

   
        songScreen ? navigation.navigate('SongScreen') : null

    

  return (
    <View>
    <ScrollView showsVerticalScrollIndicator={false}>
    <SafeAreaView style={styles.headerContainer}>
        <Text style={styles.greeting}>{greeting()}</Text>
        <View style= {{flexDirection: 'row'}}>
            <Icon imageStyle={styles.icons} imageUri={Icons[0].uri} nav = {notification}/>
            <Icon imageStyle={styles.icons} imageUri={Icons[1].uri} nav={history}/>
            <Icon imageStyle={styles.icons} imageUri={Icons[2].uri} nav={LogOut}/>
        </View>
        
    </SafeAreaView>
        <View>
            <RecentSong navigation={navigation} songsData={data}/>
            <Episodes/>
            {/*<TopMixes/>*/}
            <History/>
        </View>
    </ScrollView>
    </View>
    
  );
};


const Icon = ({imageUri, imageStyle, nav}) => (
    <TouchableOpacity onPress={() => nav()}>
        <Image source={{uri: imageUri}} style = {imageStyle}/>
    </TouchableOpacity>

)


const styles = StyleSheet.create({

    greeting:{
        marginTop: 40,
        fontSize: 26,
        fontWeight: '700',
        color: 'white',
        marginLeft: 20,
    },

    headerContainer: {
        height: 80,
        flexDirection: 'row',
        justifyContent: 'space-between',
        
    },

    icons: {
        height: 20,
        width: 20,
        marginTop: 48,
        marginRight: 20,
    }


})
export default Header;
