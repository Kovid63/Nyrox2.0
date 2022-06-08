import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { Songs } from '../../assets/SongsData';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TopMixes = () => {

    const [data, setData] = React.useState([])

    const set = new Set()

    const getCacheData = async () => {
  
        await AsyncStorage.getItem('history').then(res => {
         setData(JSON.parse(res))
        })
  
    }
  
    useEffect(() => {
      getCacheData()
      set.add(data)
    }, [])

  return (
    <View>
        <View>
            <Text style={styles.heading}>Your top mixes</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            { set.map((podcast,index) => (
            <View style={{flexDirection: 'row'}} key={index}> 
                <Podcast Uri={podcast.artwork} epiName={podcast.name} Name={podcast.artist}/>
            </View>
            ))}
        </ScrollView>
    </View>
  );
};


const Podcast = ({Uri,epiName,Name}) => (

    <View style={styles.Container}>
        <TouchableOpacity>
            <Image style={styles.image} source={{uri: Uri}}/>
            <Text style={styles.title}>{epiName}</Text>
            <Text style={styles.name}>{Name}</Text>
        </TouchableOpacity>
    </View>

)


const styles = StyleSheet.create({

    heading:{
        marginTop: 10,
        fontSize: 23,
        fontWeight: '800',
        color: 'white',
        marginLeft: 20,
    },

    Container:{
        margin: 20,
        height: 190,
        width: 200,
    },

    image: {
        height: 150, 
        width: 200,
        borderRadius: 10,
    },

    title:{
        marginTop: 10,
        fontSize: 12,
        fontWeight: '800',
        color: 'white',
    },

    name:{
        marginTop: 5,
        fontSize: 12,
        fontWeight: '800',
        color: 'gray',
    },
})

export default TopMixes;
