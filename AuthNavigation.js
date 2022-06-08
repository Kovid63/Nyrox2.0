
import React, {useState, useEffect}from 'react';
import { Auth } from './Firebase';
import { Navbottom, SignedInStack, SignedOutStack } from './Navigation';
import SongCard from './screens/components/SongCard';
import SongScreen from './screens/SongScreen';

const AuthNavigation = () => {


    const[currentUser, setCurrentUser] = useState(null)
    
    const userHandler = (user) => {
        
        user ? setCurrentUser(user) : setCurrentUser(null)

    }

    
    useEffect(() =>

       { 
           Auth.onAuthStateChanged(user => userHandler(user))

       },
    
    [] )




  return <>
      {
    currentUser ? <><SignedInStack/><SongCard/></> : <SignedOutStack/>
      }
      </> 
};

export default AuthNavigation;
