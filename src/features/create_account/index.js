import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Image,
  Modal,
} from 'react-native';
import navigation from '../../services/navigation';
import * as screen_names from '../../navigation/screen_names/screen_names';
import { requestPost, requestGet } from '../../services/request';
import { ButtonGradient } from 'components';
import realm from '../../services/realm/realm_service';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default class CreateAccount extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    firstname: '',
    lastname: '',
    username: '',
    password: '',
    repassword: '',
    terms: false,
    accountModal: false,
  };
  handleBack = () => {
    this.props.navigation.goBack();
  };
  handleAddUser = () => {
    let length = realm.objectForPrimaryKey('UsersLength', 0);

    if (this.state.password == this.state.repassword && this.state.terms) {
      this.handleVerify().then(response => {
        if (response) {
          requestPost('/users.json', {
            id: length.length,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            username: this.state.username,
            password: this.state.password,
          }).then(res => {
            alert('Account successfully created!');
            this.props.navigation.goBack();
          });
        } else {
          alert('That user is already taken!');
        }
      });
    } else {
      if (this.state.terms) alert('Both passwords should be the same!');
      else alert('Please accept the terms and conditions!');
    }
  };
  handleVerify = () => {
    return requestGet(
      `/users.json?orderBy="username"&equalTo="${this.state.username}"`
    ).then(response => {
      return Object.values(response).length == 0;
    });
  };
  onChangeText(key, value) {
    this.setState({
      [key]: value,
    });
  }
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <TouchableOpacity
          onPress={Keyboard.dismiss}
          style={styles.backDismiss}
        />
        <View style={styles.header}>
          <TouchableOpacity onPress={this.handleBack}>
            <Text style={styles.backText}>{'<'}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.loginHeader}>
          <Text style={styles.title}>Register</Text>
        </View>
        <View style={styles.loginContainer}>
          <View style={styles.columnInput}>
            <TextInput
              value={this.state.firstname}
              onChangeText={x => this.onChangeText('firstname', x)}
              placeholderTextColor="rgba(255,255,255,0.8)"
              placeholder="FirstName"
              style={styles.inputColumnLeft}
            />
            <TextInput
              value={this.state.lastname}
              onChangeText={x => this.onChangeText('lastname', x)}
              placeholderTextColor="rgba(255,255,255,0.8)"
              placeholder="LastName"
              style={styles.inputColumnRight}
            />
          </View>
          <TextInput
            autoCapitalize={false}
            value={this.state.username}
            onChangeText={x => this.onChangeText('username', x)}
            placeholderTextColor="rgba(255,255,255,0.8)"
            placeholder="Username"
            style={styles.input}
          />
          <TextInput
            value={this.state.password}
            onChangeText={x => this.onChangeText('password', x)}
            placeholderTextColor="rgba(255,255,255,0.8)"
            secureTextEntry={true}
            placeholder="Password"
            style={styles.input}
          />
          <TextInput
            value={this.state.repassword}
            onChangeText={x => this.onChangeText('repassword', x)}
            placeholderTextColor="rgba(255,255,255,0.8)"
            secureTextEntry={true}
            placeholder="Re-type Password"
            style={styles.input}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginTop: hp('3%'),
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.setState({ terms: !this.state.terms });
            }}
          >
            <Image
              resizeMode="contain"
              style={{
                height: hp('3%'),
                width: hp('3%'),
                marginRight: wp('2%'),
              }}
              source={
                this.state.terms
                  ? require('../../assets/icons/success.png')
                  : require('../../assets/icons/pending.png')
              }
            />
          </TouchableOpacity>
          <View style={{ flexDirection: 'row' }}>
            <Text
              style={{
                ...styles.loginButtonText,
                fontSize: hp('2.7%'),
                color: 'rgb(40,40,40)',
              }}
            >
              Agree with{' '}
            </Text>
            <TouchableOpacity
              onPress={() => this.setState({ accountModal: true })}
            >
              <Text
                style={{
                  ...styles.loginButtonText,
                  fontSize: hp('2.7%'),
                  color: 'rgb(40,40,240)',
                }}
              >
                terms and conditions
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ButtonGradient
          colors={['#4c669f', '#3b5998', '#192f6a']}
          onPress={this.handleAddUser}
          containerStyle={styles.loginButton}
        >
          <Text style={styles.loginButtonText}>Create Account</Text>
        </ButtonGradient>
        <Modal
          visible={this.state.accountModal}
          transparent={true}
          onRequestClose={() => this.setState({ accountModal: false })}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View
              style={{
                backgroundColor: 'white',
                width: '90%',
                paddingHorizontal: wp('5%'),
                paddingVertical: hp('5%'),
                borderRadius: hp('2%'),
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: hp('3%'),
                  fontFamily: 'Montserrat-Bold',
                  marginBottom: hp('2%'),
                }}
              >
                Terms and Conditions
              </Text>
              <Text
                style={{
                  fontSize: hp('2.5%'),
                  textAlign: 'justify',
                  fontFamily: 'Montserrat-Italic',
                }}
              >{`The acess to the application is free, except for the cost of the conection through the network.
In order to use it you will need to register with a username and password.
Complete all the helds of the corresponding registration form.
The account is personal, unique and non-transferable.
The uber can only access the aplication through authorized means.
The user must have a smartphone with iOS or android openanng system.
The personal data enrered by the users must be exact, and current.
Sewrely and confidentally sale your password account`}</Text>
              <TouchableOpacity
                style={{ position: 'absolute', top: hp('2%'), right: hp('2%') }}
                onPress={() => this.setState({ accountModal: false })}
              >
                <Image
                  style={{ height: hp('2.6%'), width: hp('2.6%') }}
                  source={require('../../assets/icons/close.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  header: {
    position: 'absolute',
    top: 0,
    width: '100%',
    padding: 10,
  },
  backText: {
    fontSize: 30,
    color: 'rgba(0,0,0,0.7)',
  },
  loginHeader: {
    width: '100%',
    alignItems: 'center',
  },
  loginContainer: {
    width: '85%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
  },
  columnInput: {
    flexDirection: 'row',
  },
  inputColumnLeft: {
    width: '50%',
    fontSize: 15,
    backgroundColor: 'rgb(100,100,100)',
    padding: 10,
    marginVertical: 5,
    color: 'white',
    fontWeight: 'bold',
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
  },
  inputColumnRight: {
    width: '50%',
    fontSize: 15,
    backgroundColor: 'rgb(100,100,100)',
    padding: 10,
    marginVertical: 5,
    color: 'white',
    fontWeight: 'bold',
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  input: {
    width: '100%',
    fontSize: 15,
    backgroundColor: 'rgb(100,100,100)',
    padding: 10,
    margin: 5,
    color: 'white',
    fontWeight: 'bold',
    borderRadius: 5,

    fontFamily: 'Montserrat-SemiBold',
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
  },
  createAccountLink: {
    position: 'absolute',
    bottom: 30,
  },
  createAccountText: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.7)',
  },
});
