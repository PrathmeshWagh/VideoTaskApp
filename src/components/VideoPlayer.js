import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/FontAwesome6'



const VideoPlayer = ({ item }) => {
  const [isClick, setIsClick] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [progress, setProgress] = useState(null)
  const videoRef = useRef();

  const format = seconds => {
    if (seconds == null || isNaN(seconds)) {
      return '00:00';
    }

    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };



  return (
    <View style={styles.videoContainer}>
      <TouchableOpacity onPress={() => setIsClick(!isClick)}>
        <Video
          source={{ uri: item.uri }}
          paused={isPaused}
          ref={videoRef}
          onProgress={(val) => {
            setProgress(val);
          }}
          muted
          style={{ width: '100%', height: 200, }}
          resizeMode='contain'
        />
        {isClick && (
          <TouchableOpacity style={styles.video}>
            <View style={{ flexDirection: 'row', }}>
              <TouchableOpacity onPress={() => {
                videoRef.current.seek(parseInt(progress?.currentTime) - 10)
              }}>
                <Icon name={'arrow-rotate-left'} size={25} color={'white'} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setIsPaused(!isPaused)}>
                <Icon
                  name={isPaused ? 'play' : 'pause'}
                  size={25}
                  color={'white'}
                  style={{ marginLeft: 80 }}
                />
              </TouchableOpacity>


              <TouchableOpacity onPress={() => {
                videoRef.current.seek(parseInt(progress?.currentTime) + 10)
              }}>
                <Icon name={'arrow-rotate-right'} size={25} color={'white'} style={{ marginLeft: 80 }} />
              </TouchableOpacity>
            </View>
            <View style={styles.sliderbar}>
              <Text style={{ color: 'white', fontSize: 13 }}>
                {format(progress?.currentTime)}
              </Text>
              <Slider
                style={{ width: '80%', height: 40 }}
                minimumValue={0}
                maximumValue={progress?.seekableDuration}
                value={progress?.currentTime || 0}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#fff"

                onValueChange={(x) => {
                  videoRef.current.seek(x);
                }}
              />
              <Text style={{ color: 'white' }}>
                {format(progress?.seekableDuration)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
      <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>
        {item.title}
      </Text>
    </View>
  )
}

export default VideoPlayer

const styles = StyleSheet.create({
  videoContainer: {
    height: 250,
    marginVertical: 20,
    marginHorizontal: 20,

  },
  video: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,.5)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sliderbar: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center'
  }
})