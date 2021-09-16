// Dependencies
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Image, Text } from 'react-native';

// Styles
import { styles } from './styles';



const ViewPosts = ({ navigation, route }) => {
  const [posts, setPosts] = useState({});

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "View Posts",
      headerStyle: {
        backgroundColor: '#6685A4',
      },
      headerTintColor: '#FFF',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerShown: true,
    })
  }, [navigation])

  useEffect(() => {
    const { post } = route.params;
    console.log(route.params);
    setPosts(post);
  }, [])

  return (
    <View style={styles.container}>
      <Image source={{ uri: posts.
// @ts-ignore
      image }} style={styles.img} />
      
      <Text style={styles.title}>{posts.
// @ts-ignore
      title}</Text>
      <Text style={styles.content}>{posts.
// @ts-ignore
      content}</Text>
    </View>
  );
}

export default ViewPosts;