import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  Image,
} from 'react-native';
import navigation from '../../services/navigation';
import * as screen_names from '../../navigation/screen_names/screen_names';
import { requestGet } from '../../services/request';
import { ButtonGradient } from 'components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { createRow, deleteRow } from '../../services/realm/realm_service';
import { productsInit } from '../../services/firebase';
export default class Login extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    username: '',
    password: '',
  };
  handleCreateAccount = () => {
    navigation.navigate(screen_names.CREATE_ACCOUNT);
  };
  handleVerify = () => {
    return requestGet(
      `/users.json?orderBy="username"&equalTo="${this.state.username}"`
    ).then(response => {
      return Object.values(response);
    });
  };
  onChangeText(key, value) {
    this.setState({
      [key]: value,
    });
  }
  componentDidMount() {
    // let length = realm.objectForPrimaryKey("UsersLength",0)
    //alert(length.length)
    //alert(JSON.stringify(user))
    //deleteRow(user)
  }
  loginAction = () => {
    this.handleVerify().then(response => {
      if (response.length > 0) {
        if (response[0].password == this.state.password) {
          //alert(`Bienvenido ${response[0].firstname} ${response[0].lastname}`)
          //productsInit()
          createRow('ActiveUser', { ...response[0], user_id: 0 }, true);
          navigation.navigate(screen_names.MAIN);
        } else {
          alert('Contraseña incorrecta!');
        }
      } else {
        alert('Usuario invalido!');
      }
    });
  };
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TouchableOpacity
          onPress={Keyboard.dismiss}
          style={styles.backDismiss}
        />
        <View style={styles.loginHeader}>
          <Image
            source={require('../../assets/icons/logo.png')}
            style={{
              height: hp('22%'),
              marginBottom: hp('2%'),
            }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.loginContainer}>
          <TextInput
            autoCapitalize={false}
            onChangeText={x => this.onChangeText('username', x)}
            value={this.state.username}
            placeholderTextColor="rgba(255,255,255,0.8)"
            placeholder="Username"
            style={styles.input}
          />
          <TextInput
            autoCapitalize={false}
            onChangeText={x => this.onChangeText('password', x)}
            value={this.state.password}
            placeholderTextColor="rgba(255,255,255,0.8)"
            secureTextEntry={true}
            placeholder="Password"
            style={styles.input}
          />
        </View>
        <ButtonGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          containerStyle={styles.loginButton}
          onPress={this.loginAction}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </ButtonGradient>
        <TouchableOpacity
          style={styles.createAccountLink}
          onPress={this.handleCreateAccount}
        >
          <Text style={styles.createAccountText}>
            Aun no tienes una cuenta?
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  backDismiss: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  loginHeader: {
    width: '100%',
    alignItems: 'center',
  },
  loginContainer: {
    width: '85%',
    backgroundColor: 'rgba(0,0,0,0.1)',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  input: {
    width: '100%',
    fontSize: 15,
    fontFamily: 'Montserrat-SemiBold',
    backgroundColor: 'rgb(100,100,100)',
    padding: 10,
    margin: 5,
    color: 'white',
    fontWeight: 'bold',
    borderRadius: 5,
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    margin: 20,
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 15,
    borderRadius: 7,
    margin: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Montserrat-Bold',
  },
  createAccountLink: {
    position: 'absolute',
    bottom: 30,
  },
  createAccountText: {
    fontSize: 16,
    fontFamily: 'Montserrat-SemiBold',
    color: 'rgba(0,0,0,0.7)',
  },
});
