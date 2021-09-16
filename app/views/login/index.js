import React, { Component } from 'react';
import { Text, TextInput, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import auth from '@react-native-firebase/auth';


//Components
import Loading from '../../components/loading';
import Button from '../../components/button';
import Input from '../../components/Inputs';

//Styles
import { styles } from './styles';


class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Email: null,
      Password: null,
      loading: true,
    }
  }

  componentDidMount() {
    auth()
      .onAuthStateChanged((usr) => {
        console.log({ usr });
        if (usr) {
          this.setState(
            () => ({ loading: false }),
            () => this.props.navigation.navigate('Home')
          )
        } else {
          this.setState({ loading: false });
        }
      });
  }

  render() {
    const { Email, Password, loading } = this.state;
    return (
      <Loading loading={loading}>
      <View style={styles.container}>
        <View style={styles.subcontainer}>
          <Image
            // @ts-ignore
            source={require('../../assets/icons/usuario.png')}
            style={styles.img}
          />
        </ View>
        <View style={styles.subcontainer}>
            <Input
              title="Email"
              custom={{
                autoCapitalize: 'none',
                value: Email,
                onChangeText: em => this.setState({ Email: em }),
                secureTextEntry: false,
              }}
            />
            <Input
              title="Password"
              custom={{
                value :Password,
                onChangeText: psw => this.setState({ Password: psw }),
                secureTextEntry: true,
                }}
            />
            
        <Button
              title="Login"
              action={() => {
                console.log(Email, Password );
              auth().signInWithEmailAndPassword(Email, Password)
                .then(usr => {
                  console.log(usr);
                  this.props.navigation.navigate('Home')
                })
                .catch(err => console.log({ err }))
            }}
            />

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('CreateUser', { ID: 1 });
            }}
            >
              <Text style={{ color: '#FFF', fontWeight: 'bold', marginTop: 10}}>Create An Account</Text>
            </TouchableOpacity>
        </View>
        </View>
      </Loading>
    );
  }
}

export default Login;