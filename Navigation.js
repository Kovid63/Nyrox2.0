import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SongScreen from './screens/SongScreen';
import HomeScreen from './screens/HomeScreen';
import MainScreen from './screens/MainScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import ProfileScreen from './screens/ProfileScreen';
import LogOutScreen from './screens/LogOutScreen';
import LoadingScreen from './screens/LoadingScreen';
import SearchScreen from './screens/SearchScreen';
import LibraryScreen from './screens/LibraryScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import { Image, Text, View } from 'react-native';
import { BottomIcons } from './assets/BottomIcons';
import HistoryScreen from './screens/HistoryScreen';
import ArtistSongUploadScreen from './screens/ArtistSongUploadScreen';

const stack = createStackNavigator()

const Tabs = createBottomTabNavigator()


const screenoptions = {

  headerShown: false,

}


export const Navbottom = () => (
  <>

      <Tabs.Navigator initialRouteName='HomeScreen' screenOptions={{ 
        tabBarShowLabel: false, 
        headerShown: false,
        lazy: true,
        
      
        tabBarStyle: {
          position: 'absolute',
          elevation: 0,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          
        },
        tabBarBackground: () => (
          <LinearGradient colors={['transparent','black','black']}>
            <View style={{height: 50, marginTop: 50}}>

            </View>
          </LinearGradient>
         ),
      }}>
        <Tabs.Screen name="HomeScreen" component={HomeScreen} options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', width: 60}}>
              <Image source={{uri: focused ? BottomIcons[0].activeUri :BottomIcons[0].inactiveUri}} style={{
                height: 30,
                width: 30,
              }}/>
              <Text style={{color: 'white', fontSize: 12}}>Home</Text>
            </View>
          )
        }} />

        <Tabs.Screen name="SearchScreen" component={SearchScreen} options={{
          tabBarIcon: ({focused}) => (
            <View style={{width: 40}}>
              <Image source={{uri: focused ? BottomIcons[1].activeUri :BottomIcons[1].inactiveUri}} style={{
                height: 30,
                width: 30,
              }}/>
              <Text style={{color: 'white', fontSize: 12}}>Search</Text>
            </View>
          )
        }} />

      <Tabs.Screen name="LibraryScreen" component={LibraryScreen} options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', width: 80}}>
              <Image source={{uri: focused ? BottomIcons[2].activeUri :BottomIcons[2].inactiveUri}} style={{
                height: 30,
                width: 30,
              }}/>
              <Text style={{color: 'white', fontSize: 12}}>Your{' '}Library</Text>
            </View>
          )
        }} />

      <Tabs.Screen name="ProfileScreen" component={ProfileScreen} options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', width: 60}}>
              <Image source={{uri: focused ? BottomIcons[3].activeUri :BottomIcons[3].inactiveUri}} style={{
                height: 30,
                width: 30,
              }}/>
              <Text style={{color: 'white', fontSize: 12,}}>Profile</Text>
            </View>
          )
        }} />  
      </Tabs.Navigator>
   
   </>
  
)


export const SignedInStack = () => {
  return (
    <>
    <NavigationContainer>
      <stack.Navigator initialRouteName='NavBottom' screenOptions={screenoptions}> 
        <stack.Screen name='HomeScreen' component = {HomeScreen}/>
        <stack.Screen name='ProfileScreen' component = {ProfileScreen}/>
        <stack.Screen name='LogOutScreen' component = {LogOutScreen}/>
        <stack.Screen name='SongScreen' component = {SongScreen}/>
        <stack.Screen name='SearchScreen' component = {SearchScreen}/>
        <stack.Screen name='LibraryScreen' component = {LibraryScreen}/>
        <stack.Screen name='NavBottom' component = {Navbottom}/>
        <stack.Screen name='HistoryScreen' component = {HistoryScreen}/>
      </stack.Navigator>
    </NavigationContainer>
    </>
  );
};

export const SignedOutStack = () => {
  return (
    <>
    <NavigationContainer>
      <stack.Navigator initialRouteName='LoadingScreen' screenOptions={screenoptions}> 
        <stack.Screen name='LoadingScreen' component={LoadingScreen}/>
        <stack.Screen name='MainScreen' component = {MainScreen}/>
        <stack.Screen name='LoginScreen' component = {LoginScreen}/>
        <stack.Screen name='SignUpScreen' component = {SignUpScreen}/>
        <stack.Screen name= 'ArtistSongUploadScreen' component = {ArtistSongUploadScreen}/>
      </stack.Navigator>
    </NavigationContainer>
    </>
  );
};

