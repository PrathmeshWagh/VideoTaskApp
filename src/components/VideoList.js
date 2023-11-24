import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { VideoListData } from '../constants/VideoData';
import VideoPlayer from './VideoPlayer';



const VideoList = () => {

  const renderVideo = ({ item }) => {
    return (
      <VideoPlayer item={item} />
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.headerText}>Video List</Text>
      </View>
      <FlatList
        data={VideoListData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderVideo}

      />
    </View>
  )
}

export default VideoList

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 20,
  }
})