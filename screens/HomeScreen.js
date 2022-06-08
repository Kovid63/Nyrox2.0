import { StyleSheet, StatusBar, Modal, View } from 'react-native';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Header from './screenComponents/Header';
import LinearGradient from 'react-native-linear-gradient';
import { SignedInStack } from '../Navigation';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../Firebase';
import { SongContext } from '../contexts/SongContext';






const HomeScreen = ({navigation}) => { 

  const today = new Date
  const hour = today.getHours()


  let light = '#4a4a4a'
  
    if(hour >= 4 && hour < 12)  light = '#4a4a4a'
    else if(hour >= 12 && hour < 16) light = '#917119'
    else if(hour >= 16 && hour < 23)  light = '#8444b8'
    else if(hour >= 22 && hour < 24 || hour >= 0 && hour < 4 ) light = '#196591'
   
    // get songs data
    const [songs, setSongs] = useState([])

    const getSongs = async () => {
        await getDocs(collection(db , 'songs')).then((snapshot) => {
            setSongs(snapshot.docs.map(doc => doc.data()))
        })
    }

    useEffect(() => {
        getSongs()
        setNav(navigation)
    } , [])


    const{setNav} = useContext(SongContext)
    
 
  return(

      <LinearGradient start={{x:0,y:0}} end={{x:0.6,y:0.6}} colors={[light, '#1a1a1a', '#1a1a1a']} style={styles.container}>
        <StatusBar translucent backgroundColor={'transparent'} />
        <Header navigation={navigation} data={songs}/>
      </LinearGradient>
)}


const styles = StyleSheet.create({

  container:{
    flex: 1,
    backgroundColor: 'black',
  }
})

export default HomeScreen;
