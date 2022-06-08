import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { PODS } from '../../assets/PodcastData';

const Episodes = () => {
  return (
    <View>
        <View>
            <Text style={styles.heading}>Episodes for you {'(This is Dummy data)'}</Text>
            <Text style={{color: 'gray', fontSize: 14, marginLeft: 20, }}>*will be implemented in future releases</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            { PODS.map((podcast,index) => (
            <View style={{flexDirection: 'row'}} key={index}> 
                <Podcast Uri={podcast.image} epiName={podcast.episode_name} Name={podcast.name}/>
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
        marginTop: 30,
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

export default Episodes;
