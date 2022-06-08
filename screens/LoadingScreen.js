import { View, Text, Image, StatusBar, Pressable } from 'react-native';
import React from 'react';

const LoadingScreen = ({navigation}) => {

    setTimeout(() => { 
        navigation.push('MainScreen');
    }, 2000)

  return (
  
    <View style={{flex: 1, backgroundColor: 'black', justifyContent: 'center'}}>
      <Pressable onPress={() => {navigation.push('MainScreen')}}>
       <StatusBar translucent backgroundColor={'transparent'}/>
        <Image source={require('../Logo/NyroxLogo.png')} style={{height: 150, width: 150, alignSelf: 'center'}}/>
      </Pressable>
    </View>
  
  );
};

export default LoadingScreen;
