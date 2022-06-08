import { View, Text, Image, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useContext } from 'react/cjs/react.production.min'

const HistoryScreen = () => {

  const [data , setData] = React.useState([])

  const getCacheData = async () => {
  
      await AsyncStorage.getItem('history').then(res => {
       setData(JSON.parse(res))
      })

  }

  useEffect(() => {
    getCacheData()
  }, [])



  return (
    <View style={{flex: 1, backgroundColor: '#1a1a1a'}}>
      <View style={{alignItems: 'center'}}>
            <Text style={{color: 'white', fontSize: 26, fontWeight: '900', marginTop: 70, marginBottom: 40}}>Recently Played</Text>
        </View>
        <ScrollView>
      { data == null? <Text style={{alignSelf: 'center',color: 'white', fontSize: 16, fontWeight: '500', marginTop: 70, marginBottom: 40}}>Play some songs and they will appear here</Text> : data.map((song, index) => (
        
        <View style={{marginLeft: 30, flexDirection: 'row', margin: 10}} key={index}>
            <Image style={{width: 60, height: 25}} source={{uri : song.artwork}}/>
            <Text style={{color: 'white', fontSize: 16, fontWeight: '900', left: 15, width: 300}}>{song.title.length > 30 ? song.title.substring(0,28) + '...': song.title}</Text>
        </View>
       
      ))
        }
        </ScrollView>
    </View>
  )
}

export default HistoryScreen