import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useEffect, useContext } from 'react';
import { Songs } from '../../assets/SongsData';
import { HISTORY } from '../../assets/His';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SongContext } from '../../contexts/SongContext';

const History = () => {

    const [data, setData] = React.useState([])

    const {state} = useContext(SongContext)


    const getCacheData = async () => {
  
        await AsyncStorage.getItem('history').then(res => {
         setData(JSON.parse(res))
        })
  
    }
  
    useEffect(() => {
      getCacheData()
    }, [state])
  
  return (
    <View>
        <View>
            <Text style={styles.heading}>History</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            { data ? data.map((podcast,index) => (
            <View style={{flexDirection: 'row'}} key={index}> 
                <Podcast Uri={podcast.artwork} epiName={podcast.title} Name={podcast.artist}/>
            </View>
            )): <Text style={{marginLeft: 20, color: 'white', marginTop: 20}}>No songs played yet :(</Text>}
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

export default History;
