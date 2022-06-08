import { View, Image, StatusBar, TextInput, Text, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native'
import React from 'react'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../Firebase'
import ImageColors from 'react-native-image-colors'

const ArtistSongUploadScreen = ({navigation}) => {


  const[image , setImage] = React.useState('https://cbdworship.com/assets/images/album_art/placeholder.png')
  const[url , setUrl] = React.useState('')
  const[title , setTitle] = React.useState('')
  const[artist , setArtist] = React.useState('')
  const[duration, setDuration] = React.useState(0)
  const[bgcolor, setBgColor] = React.useState('')

  const onSubmit = async() => {

    if(!url || !title || !artist || !duration || !bgcolor || !image){ 
      ToastAndroid.show('Please fill in all the fields', ToastAndroid.SHORT)
    }
    else{

      await setDoc(doc(db, 'songs', title), {
        artist: artist,
        title: title,
        duration: duration,
        url: url,
        artwork: image,
        docName: title,
        color: bgcolor,
      }).then(() => {
        console.log('success')
        ToastAndroid.show('Song Uploaded', ToastAndroid.SHORT)
        navigation.navigate('MainScreen')

      }).catch(err => {
        console.log(err)
        ToastAndroid.show('Error Uploading Song', ToastAndroid.SHORT)
      })
    }

  }


  return (
    <View style={{backgroundColor: 'black', flex: 1}}> 
    <ScrollView>
    <StatusBar translucent backgroundColor={'transparent'}/>
      <View style={{alignSelf: 'center', marginTop: 80}}>
            <Image source={{uri : image == '' ? 'https://cbdworship.com/assets/images/album_art/placeholder.png' : image}} style={{width: 250, height: 250}}/>
      </View>
      <Text style={{color: 'white', marginTop: 40, marginLeft: 45, fontWeight: '700', fontSize: 20}}>Song Poster Url</Text>
      <View style={{backgroundColor: '#1c1c1c', height: 40 , marginTop: 10, width: 300, marginLeft: 43}}>
        <TextInput style={{color: 'white', fontSize: 18}} placeholder={'Enter or Paste Url here'} placeholderTextColor={'gray'} onChangeText={(value) => setImage(value)}></TextInput>
      </View>

      <Text style={{color: 'white', marginTop: 10, marginLeft: 45, fontWeight: '700', fontSize: 20}}>Song Title</Text>
      <View style={{backgroundColor: '#1c1c1c', height: 40 , marginTop: 10, width: 300, marginLeft: 43}}>
        <TextInput style={{color: 'white', fontSize: 18}} placeholder={'Enter or Paste Song Title'} placeholderTextColor={'gray'} onChangeText={(value) => setTitle(value)}></TextInput>
      </View>

      <Text style={{color: 'white', marginTop: 10, marginLeft: 45, fontWeight: '700', fontSize: 20}}>Song Url</Text>
      <View style={{backgroundColor: '#1c1c1c', height: 40 , marginTop: 10, width: 300, marginLeft: 43}}>
        <TextInput style={{color: 'white', fontSize: 18}} placeholder={'Enter or Paste Url here'} placeholderTextColor={'gray'} onChangeText={(value) => setUrl(value)}></TextInput>
      </View>

      <Text style={{color: 'white', marginTop: 10, marginLeft: 45, fontWeight: '700', fontSize: 20}}>Background color hex</Text>
      <View style={{backgroundColor: '#1c1c1c', height: 40 , marginTop: 10, width: 300, marginLeft: 43}}>
        <TextInput style={{color: 'white', fontSize: 18}} placeholder={'Enter or Paste hex here'} placeholderTextColor={'gray'} onChangeText={(value) => setBgColor(value)}></TextInput>
      </View>

      <Text style={{color: 'white', marginTop: 10, marginLeft: 45, fontWeight: '700', fontSize: 20}}>Artist{'(s)'}</Text>
      <View style={{backgroundColor: '#1c1c1c', height: 40 , marginTop: 10, width: 300, marginLeft: 43}}>
        <TextInput style={{color: 'white', fontSize: 18}} placeholder={'Enter or paste the name of artist(s)'} placeholderTextColor={'gray'} onChangeText={(value) => setArtist(value)}></TextInput>
      </View>

      <Text style={{color: 'white', marginTop: 10, marginLeft: 45, fontWeight: '700', fontSize: 20}}>Song Duration</Text>
      <View style={{backgroundColor: '#1c1c1c', height: 40 , marginTop: 10, width: 300, marginLeft: 43, marginBottom: 20}}>
        <TextInput style={{color: 'white', fontSize: 18}} placeholder={'Enter the duration(in seconds)'} placeholderTextColor={'gray'} onChangeText={(value) => setDuration(value)}></TextInput>
      </View>

      <View>
        <TouchableOpacity style={{backgroundColor: '#0f3954', height: 30 , marginTop: 10, width: 100, alignSelf: 'center', marginBottom: 20, borderRadius: 30}} onPress={() => onSubmit()}>
        <Text style={{color: 'white', fontWeight: '700', fontSize: 20, alignSelf: 'center'}}>Submit</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </View>
  )
}

export default ArtistSongUploadScreen