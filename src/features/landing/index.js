import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import realm from '../../services/realm/realm_service';
import navigation from '../../services/navigation';
import * as screen_names from '../../navigation/screen_names/screen_names';
import { productsInit } from '../../services/firebase';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class Landing extends Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.user = realm.objectForPrimaryKey('ActiveUser', 0);
    setTimeout(() => {
      if (this.user != null) {
        //productsInit()
        navigation.navigate(screen_names.MAIN);
      } else {
        navigation.navigate(screen_names.LOGIN);
      }
    }, 2000);
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Image
          resizeMode="contain"
          source={require('../../assets/icons/logo.png')}
          style={{ height: hp('20%') }}
        />
      </View>
    );
  }
}
