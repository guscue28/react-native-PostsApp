// Dependencies
import React, { useEffect, useLayoutEffect, useState } from 'react';
import {
  View, Image, TouchableOpacity,
  FlatList, Text, Alert,
} from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';


// Components
import Button from '../../components/button';
import Mod from '../../components/modal';
import Input from '../../components/Inputs';
// @ts-ignore
import add from '../../assets/icons/add.png';
import UploadFile from '../../utils/uploadFile';

//API
import postsAPI from '../../api/post';
import myPostsAPI from '../../api/myPosts';

// Styles
import { customStyles, styles } from './styles';

const MyPosts = ({ navigation }) => {
  const [view, setView] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [image, setImage] = useState('');
  const [errors, setErrors] = useState({
    title: '',
    content: '',
    image: '',
  });
  const [uid, setUid] = useState('');
  const [uuid, setUuid] = useState(0);

  const cleanStates = () => {
    setContent('');
    setTitle('');
    setImage('');
    setView(false);
    setErrors({
      title: '',
      content: '',
      image: '',
    });
    setUuid(0);
  }

  useEffect(() => {
    auth()
      .onAuthStateChanged((user) => {
        if (user) {
                const { uid } = user;
                myPostsAPI.post({ uid })
                  .then(({data = [] }) => {
                      setPosts(data);
                    setUid(uid);
                        console.log({ data })
                  })
              }
          })
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "MyPosts",
      headerStyle: {
        backgroundColor: '#6685A4',
      },
      headerTintColor: '#FFF',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTitleAlign: 'center',
      headerShown: true,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => setView(true)}
        >
          <Image source={add} style={styles.addBtn} />
        </TouchableOpacity>
      )
    })
  }, [navigation])

  const renderItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />

      <View style={styles.textContainerRow}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemContent}>{item.content}</Text>
      </View>

      <View style={styles.buttonContainerRow}>
        <TouchableOpacity
          onPress={() => {
            setTitle(item.title);
            setContent(item.content);
            setImage(item.image);
            setUuid(item.uuid);
            setView(true);
        }}
        >
          <Text style={styles.buttonTxtRow}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              'Alert',
              'Do you want to delete this post?',
              [
                {
                  text: 'Yes',
                  onPress: () => {
                    postsAPI.delete({ uuid: item.uuid })
                      .then(() => {
                        setPosts((_posts) => {
                          _posts.splice(index, 1);
                          console.log('_posts', _posts);
                          return [..._posts];
                        });
                    })
                  }
                },
                {
                  text: 'No',
                  style: 'cancel'
                }
              ],
              { cancelable: true, onDismiss: () =>console.log('close')}
            )
        }}
        >
          <Text style={styles.buttonTxtRow}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
      />

      <Mod
        visible={view}
        onClose={() => setView(false)}
      >
        <Input
          title="Title"
          custom={{
            value: title,
            onChangeText: psw => {
              setTitle(psw);
              setErrors(_errors => ({ ..._errors, title: '' }))
            },
            secureTextEntry: false,
          }}
        />

        {errors.title ? <Text style={styles.errorLabel}>{ errors.title }</Text> : null}

        <Input
          title="Content"
          custom={{
            value: content,
            onChangeText: psw => {
              setContent(psw);
              setErrors(_errors => ({ ..._errors, content: '' }))
            },
            multiline: true,
            style: customStyles          
          }}
        />

        {errors.content ? <Text style={styles.errorLabel}>{errors.content}</Text> : null}

        <Button
          title="Load Img"
          action={() => {
            launchImageLibrary({ mediaType: 'mixed' }, (res) => {
              if (!res.didCancel) {
                res.assets.forEach(image => {
                  const img = image.uri;
                  console.log({ img });
                  setImage(img);
                  setErrors(_errors => ({ ..._errors, image: '' }));
                })
              }
            });
          }}
        />

        {errors.image ? <Text style={styles.errorLabel}>{errors.image}</Text> : null}
        {image ? (<Text style={styles.imageLoaded}>Image Loaded</Text>) : null }
        <Button
          title="Save"
          action={() => {
            let err = {};

            if (!title) err = {...err, title: 'Please fill in the title field'
            };
            if (!image) err = { ...err, image: 'Please select a image' };
            if (!content) err = { ...err, content: 'Please fill in the content field' };

            if (err.title || err.image || err.content) {
              setErrors(_errors => ({ ..._errors, ...err }));
            } else {
              if (uuid) {
                postsAPI.put({ image, content, title, uid, uuid })
                  .then(({ data }) => {
                    setPosts((_posts) => {
                      const index = _posts.findIndex(i => i.uuid === uuid);
                      _posts[index] = data;
                      return [..._posts];
                    });
                    cleanStates();
                })
              } else {
                postsAPI.post({ image, content, title, uid })
                  .then(({ data }) => {
                    setPosts((_posts) => ([..._posts, data]));
                    console.log({ data });
                    cleanStates();
                  });
              }
            }
          }}
        />
      </Mod>
    </View>
  );
 }

export default MyPosts;