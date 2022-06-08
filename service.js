import { useContext } from "react";
import  TrackPlayer, { Event, useProgress } from "react-native-track-player";
import { SongContext } from "./contexts/SongContext";



module.exports = async function() {

    

    TrackPlayer.addEventListener('remote-play', () => TrackPlayer.play());

    TrackPlayer.addEventListener('remote-pause', () => TrackPlayer.pause());

    TrackPlayer.addEventListener('remote-stop', () => TrackPlayer.destroy());

    TrackPlayer.addEventListener('remote-seek', ({position}) => TrackPlayer.seekTo(position));

    TrackPlayer.addEventListener('remote-next', () => TrackPlayer.skipToNext());
    
    TrackPlayer.addEventListener('remote-previous', () => TrackPlayer.skipToPrevious());

   
    

  
};