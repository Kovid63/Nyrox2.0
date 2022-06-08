import { View, Text, StatusBar, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import React, {useState} from 'react';
import { Auth } from '../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { ProgressBar } from '@react-native-community/progress-bar-android';


const Icon = [
    {
        name: 'eye',
        inactiveUri: 'https://img.icons8.com/material-rounded/96/ffffff/visible.png',
        activeUri: 'https://img.icons8.com/material-rounded/96/ffffff/hide.png',
    },
    
]

const LoginScreen = () => {


  const[eye, setEye] = useState(Icon[0].activeUri)

  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')

  const[progress, setProgress] = useState(false)


  const Login = async() => {

        setProgress(true)
        
        await signInWithEmailAndPassword(Auth, email.trim(), password).then(() => {
            console.log('Login Successful')
        }).catch((error) => {
            console.log(error.message)
            setProgress(false)
        })


  }

  
  return (
    <View style={styles.constainer}>
        <StatusBar translucent backgroundColor={'transparent'}/>
            <View style={{marginTop: 20}}>
            {
               progress ? <ProgressBar styleAttr='Horizontal' color='#196591'/> : <View style={{marginTop: 16}}/>
            }
            </View>
        <View>  
            <Text style={[styles.title, {marginTop: 40}]}>Email</Text>
            <View style={[styles.input]}>
                <View style={{width: 300}}>
                    <TextInput  placeholder='Email or username' placeholderTextColor={'gray'} style={{color: 'white', fontSize: 18, fontWeight: '700', margin: 5}} onChangeText={(value) => setEmail(value)}/>
                </View>
            </View>
        </View> 

        <View>  
          <Text style={[styles.title, {marginTop: 20}]}>Password</Text>
            <View style={styles.input}>
                <View style={{width: 200}}>
                    <TextInput placeholder='Password' placeholderTextColor={'gray'} secureTextEntry={eye == Icon[0].inactiveUri ? false : true} style={{color: 'white', fontSize: 18, fontWeight: '700', margin: 5}} onChangeText={(value)=>setPassword(value)} /> 
                </View>
               

                
                    <TouchableOpacity onPress={() => setEye(eye == Icon[0].inactiveUri ? Icon[0].activeUri : Icon[0].inactiveUri)}>  
                            <View> 
                                <Image source={{uri : eye}} style={{height: 20, width: 20, marginLeft: 80, margin: 15, }}/>
                            </View>
                    </TouchableOpacity>
                
            </View>
        </View> 

        <View style={{alignItems: 'center'}}>
            <TouchableOpacity style={styles.button} onPress={() => Login()}>
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};



const styles = StyleSheet.create({

    constainer:{
        flex: 1,
        backgroundColor: 'black',
    },

    title:{
        color: 'white',
        fontSize: 30,
        fontWeight: '900',
        marginTop: 80,
        marginLeft: 30,
    },

    input:{
        height: 50,
        width: 330,
        backgroundColor: '#4a4a4a',
        marginTop: 10,
        marginLeft: 30,
        borderRadius: 5,
        flexDirection: 'row',
    },

    button:{
        height: 40,
        width: 200,
        backgroundColor: '#196591',
        marginTop: 30,
        alignItems: 'center',
        borderRadius: 30,
    },

    buttonText:{
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
        marginTop: 5,
    },
})

export default LoginScreen;
