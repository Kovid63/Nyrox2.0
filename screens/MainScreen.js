import { View, Text, Image, StatusBar, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import React from 'react'; 

const MainScreen = ({navigation}) => {
  return (
  
    <View style={{flex: 1, backgroundColor: 'black'}}>
      
      <StatusBar translucent backgroundColor={'transparent'}/>
      <View> 
      <Image source={require('../Logo/NyroxLogo.png')} style={styles.Logo}/>
      </View>
      <Text style={[styles.Title,{marginTop: 50}]}>Bring Music To Life.</Text>
      <Text style={styles.Title}>100% Music.</Text>
      <Text style={styles.Title}>No Ads.</Text>
      <View>
        <TouchableOpacity onPress={() => navigation.push('SignUpScreen')} style={{height: 50, width: 300, backgroundColor: '#196591', alignSelf: 'center', marginTop: 80, borderRadius: 30, }}>
          <Text style={styles.button}>Sign Up Free</Text>
        </TouchableOpacity>
        </View>

        <View>
        <TouchableOpacity style={{height: 50, width: 300, backgroundColor: '#196591', alignSelf: 'center', marginTop: 20, borderRadius: 30, }} onPress={() => navigation.navigate('ArtistSongUploadScreen')}>
          <Text style={styles.button}>Artist Song Upload</Text>
        </TouchableOpacity>
        </View>

        <View>
        <TouchableOpacity style={styles.logInButton} onPress={() => navigation.push('LoginScreen')}>
          <Text style={[styles.button,{margin: 10}]}>Log in</Text>
        </TouchableOpacity>
        </View>
        
       
     </View>

  );
};


const styles = StyleSheet.create({

    Logo: {

      height: 100, 
      width: 100, 
      alignSelf: 'center', 
      marginTop: 100,

    },

    Title: {

      color: 'white',
      alignSelf: 'center', 
      fontWeight: '900', 
      fontSize: 30,

    },

    button: {
      color: 'white', 
      alignSelf: 'center', 
      margin: 12, 
      fontWeight: '700', 
      fontSize: 18,
    },

    logInButton: 
    {
      height: 50, 
      width: 300, 
      backgroundColor: 'black', 
      alignSelf: 'center', 
      marginTop: 20, 
      borderRadius: 30, 
      borderColor: 'gray', 
      borderWidth: 2,
   },



})

export default MainScreen;
