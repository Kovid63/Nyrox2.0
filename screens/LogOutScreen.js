import { View, Text, TouchableOpacity } from 'react-native';
import React, {useContext} from 'react';
import { Auth } from '../Firebase';
import { SongContext } from '../contexts/SongContext';
import TrackPlayer from 'react-native-track-player';


const LogOutScreen = () => {



  return (
    <View style={{backgroundColor: '#1a1a1a', flex: 1}} >
        <View>
            <TouchableOpacity onPress={async() => [await Auth.signOut()]}>
                <Text style={{color: 'white', fontSize: 16, fontWeight: '700', marginTop: 100, marginLeft: 30}}>Log out</Text>
                <Text style={{color: 'gray', fontSize: 12, marginTop: 5, marginLeft: 30}}>You are currently logged in as {Auth.currentUser.email.split('@')[0]}</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};

export default LogOutScreen;
