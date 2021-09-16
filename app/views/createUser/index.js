import React, { Component, useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';


import createUser from '../../api/user';
import Button from '../../components/button';
import Input from '../../components/Inputs';
import UploadFile from '../../utils/uploadFile';
// @ts-ignore
import userImg from '../../assets/icons/usuario.png';

//Styles
import { styles } from './styles';

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: null,
      Password: null,
      Phone: null,
      uri: null,
    };
  }


  render() {
    const { Email, Password, Phone, uri, } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={{
            height: 200,
            width: 200,
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 75
          }}
          onPress={() => {
            launchImageLibrary({ mediaType: 'mixed' }, (res) => {
              if (!res.didCancel) {
                res.assets.forEach(image => {
                  const img = image.uri;
                  console.log({ img });
                  return this.setState({ uri: img })      
                })
              }
            });
          }}
        >
          <Image
            source={uri ? { uri } : userImg}
            style={{
              height: 120,
              width: 120,
            }}
          />
        </TouchableOpacity>
        <Input
          title="Email"
          custom={{
            value: Email,
            onChangeText: val => this.setState({ Email: val }),
            secureTextEntry: false,
          }}
        />
        <Input
          title="Password"
          custom={{
            value:  Password,
            onChangeText: val => this.setState({ Password: val }),
            secureTextEntry: true,
          }}
        />
        <Input
          title="Phone"
          custom={{
            value:  Phone,
            onChangeText: val => this.setState({ Phone: val }),
            secureTextEntry: false,
          }}
        />
       <Button
          title="Save"
          action={() => {
            const usr = {
              email: Email,
              phoneNumber: Phone,
              password: Password,
              displayName: 'Person X',
              photoURL: uri,
            };
            console.log({ usr });
            createUser.post(usr)
              .then(rows => {
                console.log({ rows });
                auth().signInWithEmailAndPassword(Email, Password)
                  .then(user => {
                    console.log({ user, usr });
                    this.props.navigation.navigate('Home');
                  })
                  .catch(err => console.log({ err }));
              }).catch(err => console.log({ err }));
          }}
        />
      </View>
    );
  }
}

// const CreateUser = (props) => {
//   const [email, setEmail] = useState(null);
//   const [password, setPassword] = useState(null);
//   const [phone, setPhone] = useState(null);
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Email:</Text>
//       <TextInput
//         style={styles.text}
//         value={email}
//         onChangeText={val => setEmail(val)}
//       />
//       <Text style={styles.title}>Password:</Text>
//       <TextInput
//         secureTextEntry
//         style={styles.text}
//         value={password}
//         onChangeText={val => setPassword(val)}
//       />
//       <Text style={styles.title}>Phone:</Text>
//       <TextInput
//         style={styles.text}
//         value={phone}
//         onChangeText={val => setPhone(val)}
//       />

//       <TouchableOpacity
//         style={styles.btn}
//         onPress={() => {
//           console.log({email, password, phone});
//         }}
//       >
//         <Text style={styles.btnTxt}>SAVE</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

export default CreateUser;