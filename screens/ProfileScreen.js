import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import React from 'react';
import {Auth} from '../Firebase'

const ProfileScreen = ({route}) => {
  
  return (
    <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
        <View style={{flexDirection: 'row'}}> 
            <View style={styles.prof_Name}>
                <Text style={{color: 'white', fontSize: 24, fontWeight: '700'}}>{Auth.currentUser.email.substring(0,1).toUpperCase()}</Text>
            </View>
            <Text style={styles.text}>{Auth.currentUser.email.split('@')[0].substring(0,1).toUpperCase()}{Auth.currentUser.email.split('@')[0].substring(1)}</Text>
        </View>

        <View>
          <Text style={{color: 'white',
            fontSize: 18,
            fontWeight: '700',
            marginTop: 40,
            marginLeft: 40,
        
            }}>Email</Text>  

          <Text style={{color: 'gray',
            fontSize: 14,
            fontWeight: '700',
            marginLeft: 40,
        
            }}>{Auth.currentUser.email}</Text>  
        </View>


        <View>
          <Text style={{color: 'white',
            fontSize: 18,
            fontWeight: '700',
            marginTop: 20,
            marginLeft: 40,
        
            }}>Privacy Policy</Text>  

          <Text style={{color: 'gray',
            fontSize: 14,
            fontWeight: '700',
            marginLeft: 40,
        
            }}>We don't hide anything</Text>  
        </View>

        <View>
          <Text style={{color: 'white',
            fontSize: 18,
            fontWeight: '700',
            marginTop: 20,
            marginLeft: 40,
        
            }}>Support</Text>  

          <Text style={{color: 'gray',
            fontSize: 14,
            fontWeight: '700',
            marginLeft: 40,
        
            }}>Connect with us 24/7</Text>  
        </View>
    </SafeAreaView>

  );
};


const styles = StyleSheet.create({

    prof_Name: {
        backgroundColor: '#196591',
        marginTop: 60,
        height: 70,
        width: 70,
        marginLeft: 30,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
    },

    text:{
        color: 'white',
        marginTop: 70,
        marginLeft: 20,
        fontSize: 24,
        fontWeight: '900',
    },

})

export default ProfileScreen;
