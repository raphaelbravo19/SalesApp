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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
//import LinearGradient from 'react-native-linear-gradient';
export default class ProductItem extends Component {
  state = {
    back: false,
  };
  setUp = () => {
    //alert(1);
    this.setState({ back: false });
  };
  render() {
    const {
      name,
      source,
      size,
      onPress,
      price,
      quant,
      removePress,
      backAction,
    } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          if (this.state.back) {
            this.setState({ back: !this.state.back });
          } else if (onPress) onPress();
          //this.setState({ back: !this.state.back });
        }}
        activeOpacity={0.8}
        style={[styles.container, { width: size, height: size }]}
      >
        {this.state.back ? (
          <View
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={styles.title}>Price</Text>
            <Text style={styles.title}>S./ {price}</Text>
          </View>
        ) : (
          <View
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={source}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: size,
                height: size,
                borderRadius: hp('2%'),
              }}
            />
            <Text style={styles.title}>{name}</Text>
            <TouchableOpacity
              onPress={() => {
                backAction();
                this.setState({ back: !this.state.back });
              }}
              style={{
                position: 'absolute',
                bottom: hp('1%'),
                right: hp('1%'),
              }}
            >
              <Image
                source={require('../../assets/icons/info.png')}
                style={{
                  width: hp('2%'),
                  height: hp('2%'),
                }}
              />
            </TouchableOpacity>
          </View>
        )}
        {quant > 0 && !this.state.back && (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={removePress}
            style={{
              position: 'absolute',
              width: hp('3%'),
              height: hp('3%'),
              top: -hp('1.3%'),
              left: -hp('1.3%'),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={require('../../assets/icons/remove.png')}
              style={{
                height: hp('3%'),
                width: hp('3%'),
              }}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(26,30,42)',
    borderRadius: hp('2%'),
    shadowColor: 'rgb(100,100,100)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 5,
    shadowOpacity: 0.8,
  },
  title: {
    color: 'white',
    fontSize: hp('3.3%'),
    textAlign: 'center',
    fontFamily: 'Montserrat-Bold',
    textShadowColor: 'rgba(0, 0, 0, 0.9)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});
