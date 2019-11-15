import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
//import LinearGradient from 'react-native-linear-gradient';
export default class ClassicHeader extends Component {
  render() {
    const { name, logout, profile, setProfile } = this.props;
    return (
      <View style={styles.container}>
        <Image
          source={require('../../../assets/icons/logo.png')}
          style={{ height: hp('8%') }}
          resizeMode="contain"
        />
        <TouchableOpacity
          onPress={profile}
          ref={x => (this.userButton = x)}
          onLayout={() => {
            setTimeout(() => this.userButton.measure(setProfile), 1000);
          }}
          style={{ position: 'absolute', left: wp('5%') }}
        >
          <Image
            source={require('../../../assets/icons/user.png')}
            style={{ height: hp('5%'), width: hp('5%') }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={logout}
          style={{ position: 'absolute', right: wp('5%') }}
        >
          <Image
            source={require('../../../assets/icons/logout.png')}
            style={{ height: hp('5%'), width: hp('5%') }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: hp('2%'),
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1,
    alignItems: 'center',
    shadowColor: 'rgb(100,100,100)',
    elevation: 50,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 2,
    shadowOpacity: 0.2,
  },
  title: {
    fontSize: hp('4%'),
    fontWeight: 'bold',
  },
});
