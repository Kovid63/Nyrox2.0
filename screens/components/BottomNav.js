import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { BottomIcons } from '../../assets/BottomIcons';
import LinearGradient from 'react-native-linear-gradient';


const BottomNav = ({navigation}) => {



  const [activeTab, setActiveTab] = useState('Home')


  const Icon =({icon, navigation}) => {
  
      return(
        <View style={{backgroundColor:'transparent'}}>
           <TouchableOpacity onPress={() => [setActiveTab(icon.name), navigation.push(icon.screen)]}>
            <Image source={{uri: activeTab == icon.name? icon.activeUri : icon.inactiveUri}} style={styles.Icons}/>
           </TouchableOpacity>
        </View>
  
  )}




  return (

<View style={styles.wrapper}>
    <LinearGradient colors={['transparent','black','black']}>
     
      <View style={{flexDirection: 'row', justifyContent: 'space-between', height: 60,}}>
        {BottomIcons.map((icon,index)=>(
      <Icon key={index} icon={icon} navigation = {navigation}/>
      ))}
      </View>

       
      </LinearGradient>
      
</View>


  );
};






const styles = StyleSheet.create({

    wrapper: {
        position: 'absolute',
        bottom: '0%',
        height: 45,
        width: '100%',
        elevation: 3,
    },

    Icons:{
        height: 35,
        width: 35,
        marginLeft: 30,
        marginRight: 30,
    }
})

export default BottomNav;
