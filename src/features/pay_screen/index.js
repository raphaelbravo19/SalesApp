import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Animated,
} from 'react-native';
import navigation from '../../services/navigation';
import * as screen_names from '../../navigation/screen_names/screen_names';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import realm, { deleteRow } from '../../services/realm/realm_service';

import { ScrollView } from 'react-native-gesture-handler';

export default class PayScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    fullname: '',
    total: 0,
  };
  componentDidMount() {
    this.user = realm.objectForPrimaryKey('ActiveUser', 0);
    //alert(Object.keys(this.props.navigation.getParam('total'));
    this.setState({
      fullname: this.user.firstname + this.user.lastname,
      total: this.props.navigation.getParam('total'),
    });
    //alert(JSON.stringify(this.user))
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          resizeMode="contain"
          style={{ width: wp('80%') }}
          source={require('../../assets/icons/logo.png')}
        />
        <Text
          style={{
            textAlign: 'center',
            fontSize: hp('5%'),
            fontFamily: 'Montserrat-SemiBold',
          }}
        >
          Please pay S./ {this.state.total} in cash to your courier
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.reset(screen_names.MAIN);
          }}
          style={{
            padding: hp('3%'),
            marginTop: hp('5%'),
            backgroundColor: 'rgb(190,100,100)',
          }}
        >
          <Text
            style={{
              color: 'white',
              fontFamily: 'Montserrat-Bold',
              backgroundColor: 'rgb(190,100,100)',
            }}
          >
            GO BACK
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingHorizontal: wp('9%'),
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
  btnLogout: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgb(180,60,51)',
  },
  textLogout: {
    fontSize: hp('4%'),
    color: 'white',
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
