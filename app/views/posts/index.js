import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import UploadFile from '../../utils/uploadFile';




//Component
import Button from '../../components/button';
import Mod from '../../components/modal';


//Styles 
import { styles } from './styles';

// API
import postAPI from '../../api/post';



const Posts = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    postAPI.get()
      .then(({ data = [] }) => {
        setPosts(data);
    })
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Posts",
      headerStyle: {
        backgroundColor: '#6685A4',
      },
      headerTintColor: '#FFF',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTitleAlign: 'center',
      headerShown: true,
    })
  }, [navigation])

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        navigation.navigate('ViewPosts', { post: item });
      }}
    >
      <Image source={{ uri: item.image }} style={styles.itemImage} />

      <View style={styles.textContainerRow}>
        <Text style={styles.itemTitle}>{item.title}</Text>

        <Text style={styles.itemContent}>{item.content}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item.uuid}
      />
    </View>
  );
}

export default Posts;