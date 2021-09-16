import React, { useLayoutEffect, useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import {
  DrawerContentScrollView, DrawerItemList, DrawerItem
} from '@react-navigation/drawer';

import auth from '@react-native-firebase/auth';

// @ts-ignore
import logout from '../../assets/icons/logout.jpg';
// @ts-ignore
import userImg from '../../assets/icons/usuario.png';
import { styles } from './style';

const CustomDrawerContent = (props) => {
  const [avatar, setAvatar] = useState('');

  useLayoutEffect(() => {
    auth()
      .onAuthStateChanged((usr) => {
        if (usr && usr.photoURL) {
          setAvatar(usr.photoURL);
        } else {
          setAvatar(userImg);
        }
      })
  }, [props])

  return (
    <View
      style={styles.container}>
      <View
        style={styles.subContainer}>
        <Image
          source={avatar ? { uri: avatar } : userImg}
          style={styles.iconImg}
        />
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList
          {...props}
          // activeBackgroundColor="#FFF"
          // labelStyle={styles.text}
          style={{ backgroundColor: '#000', color: '#FFF'}}
        />
      </DrawerContentScrollView>

      <DrawerItem
        label="Sign Out"
        labelStyle={{ color: '#FFF' }}
        style={styles.text}
        icon={() => (
          <Image
            source={logout}
            style={styles.logutImg}/>
        )}
        onPress={() => {
          auth()
            .signOut().then(() => {
              props.navigation.navigate('Login');
            });
        }}
      />
    </View>
  )

}

export default CustomDrawerContent;