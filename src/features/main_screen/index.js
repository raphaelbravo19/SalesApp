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

import { ClassicHeader, ProductItem, SwipeButton } from 'components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import realm, { deleteRow } from '../../services/realm/realm_service';
import TabContainer from './components/tabContainer';
import { ScrollView } from 'react-native-gesture-handler';
const IMAGES = {
  Banana: require('../../assets/products/banana.jpeg'),
  Brownie: require('../../assets/products/brownie.jpeg'),
  Chocolate: require('../../assets/products/chocolate.jpeg'),
  Cookies: require('../../assets/products/cookies.jpeg'),
  Alfajor: require('../../assets/products/alfajor.jpeg'),
  Orange: require('../../assets/products/orange.jpeg'),
};
export default class Main extends Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    fullname: '',
    total: 0,
    list: {},
    modal: false,
    cartBox: {},
    heightAnim: new Animated.Value(0),
    anim: false,
    usermodal: false,
    swipeVisible: true,
  };
  componentDidMount() {
    //alert(1);
    this.user = realm.objectForPrimaryKey('ActiveUser', 0);
    this.setState({
      fullname: this.user.firstname + this.user.lastname,
    });
    //alert(JSON.stringify(this.user))
  }
  logOut = () => {
    deleteRow(this.user);
    navigation.navigate(screen_names.LOGIN);
  };
  addItem = (item, remove) => {
    let list = this.state.list;
    if (list[item.name] != null) {
      list[item.name].cant =
        list[item.name].cant +
        (remove ? (list[item.name].cant == 0 ? 0 : -1) : 1);
    } else {
      list[item.name] = { cant: remove ? 0 : 1, unitPrice: item.price };
    }
    this.setState({
      list: list,
      total: this.state.total + item.price * (remove ? -1 : 1),
    });
    // alert(JSON.stringify(this.state.list));
  };
  setProfile = (x, y, width, height) => {
    //alert(y);
    this.setState({ profileBox: { x, y, width, height } });
  };
  render() {
    const products = [
      [
        { name: 'Cookies', src: IMAGES.Cookies, price: 10 },
        { name: 'Banana Cake', src: IMAGES.Banana, price: 20 },
      ],
      [
        { name: 'Brownie', src: IMAGES.Brownie, price: 30 },
        { name: 'Chocolate Cake', src: IMAGES.Chocolate, price: 40 },
      ],
      [
        { name: 'Sweet Biscuit', src: IMAGES.Alfajor, price: 50 },
        { name: 'Orange Cake', src: IMAGES.Orange, price: 60 },
      ],
    ];
    return (
      <View style={styles.container}>
        <ClassicHeader
          setProfile={this.setProfile}
          profile={() => this.setState({ usermodal: true })}
          logout={this.logOut}
          name="Pamer"
        />
        <TouchableOpacity
          ref={x => (this.cartbox = x)}
          onLayout={() => {
            this.cartbox.measure((x, y, width, height) => {
              this.setState(
                { cartBox: { x, y, width, height } },
                () => {
                  this.state.heightAnim.setValue(height);
                }
                //alert(JSON.stringify(this.state.cartBox))
              );
            });
          }}
          onPress={() => this.setState({ modal: true })}
          style={{
            shadowColor: 'rgb(150,150,150)',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            position: 'relative',
            zIndex: 2,
            shadowRadius: 3,
            borderRadius: wp('2%'),
            shadowOpacity: 0.6,
            backgroundColor: 'white',
            width: wp('93%'),
            marginTop: hp('1%'),
            paddingVertical: hp('2%'),
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingHorizontal: wp('3%'),
          }}
        >
          <Image
            source={require('../../assets/icons/cart.png')}
            style={{
              width: hp('3%'),
              height: hp('3%'),
              tintColor: 'rgb(50,50,50)',
            }}
          />
          <View style={{ alignItems: 'center' }}>
            <Text
              style={{
                fontFamily: 'Montserrat-Bold',
                fontSize: hp('2%'),
              }}
            >
              YOUR CART
            </Text>
            <Text
              style={{
                fontFamily: 'Montserrat-SemiBold',
                fontSize: hp('2%'),
              }}
            >
              S./ {parseFloat(this.state.total).toFixed(2)}
            </Text>
          </View>
          <Image
            source={require('../../assets/icons/arrow.png')}
            style={{
              width: hp('3%'),
              height: hp('3%'),
              tintColor: 'rgb(50,50,50)',
            }}
          />
        </TouchableOpacity>
        <ScrollView
          style={{
            flex: 1,
            width: '100%',
          }}
          contentContainerStyle={{ paddingTop: hp('2%') }}
        >
          {products.map((container, i) => {
            return (
              <View
                key={i}
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  paddingHorizontal: wp('5%'),
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: hp('2%'),
                }}
              >
                {container.map((item, j) => {
                  return (
                    <ProductItem
                      ref={x => (this[`box${i * 2 + j}`] = x)}
                      backAction={() => {}}
                      onPress={() => this.addItem(item)}
                      removePress={() => this.addItem(item, true)}
                      key={j}
                      quant={
                        this.state.list[item.name]
                          ? this.state.list[item.name].cant
                          : 0
                      }
                      price={item.price}
                      source={item.src}
                      name={item.name}
                      size={wp('42%')}
                    />
                  );
                })}
              </View>
            );
          })}
        </ScrollView>
        {this.state.swipeVisible && (
          <SwipeButton
            action={() => {
              navigation.navigate(screen_names.PAY_SCREEN, {
                total: this.state.total,
              });
            }}
            style={{
              shadowColor: 'rgb(0,0,0)',
              backgroundColor: 'white',
              shadowOffset: {
                width: 0,
                height: -3,
              },
              shadowRadius: 10,
              shadowOpacity: 0.2,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: hp('3%'),
                paddingHorizontal: hp('3%'),
                alignItems: 'center',
              }}
            >
              <Image
                source={require('../../assets/icons/arrow.png')}
                style={{
                  width: hp('2%'),
                  height: hp('3%'),
                  marginRight: wp('1%'),
                  tintColor: 'rgb(50,50,50)',
                }}
              />
              <Image
                source={require('../../assets/icons/arrow.png')}
                style={{
                  width: hp('2%'),
                  height: hp('3%'),
                  marginRight: wp('1%'),
                  tintColor: 'rgb(50,50,50)',
                }}
              />
              <Image
                source={require('../../assets/icons/arrow.png')}
                style={{
                  width: hp('2%'),
                  height: hp('3%'),
                  marginRight: wp('4%'),
                  tintColor: 'rgb(50,50,50)',
                }}
              />
              <Text
                style={{
                  letterSpacing: wp('2%'),
                  fontFamily: 'Montserrat-Bold',
                  fontSize: hp('3%'),
                }}
              >
                LETS PAY
              </Text>
            </View>
          </SwipeButton>
        )}
        <Modal
          transparent={true}
          animationType="fade"
          visible={this.state.modal}
          onRequestClose={() => {
            this.setState({ modal: false });
          }}
          onShow={() => {
            //setTimeout(() => {
            Animated.timing(this.state.heightAnim, {
              toValue: hp('50%'),
              duration: 300,
            }).start();
            setTimeout(() => this.setState({ anim: true }), 300);
            //}, 100);
          }}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
          >
            <Animated.View
              style={{
                shadowColor: 'rgb(150,150,150)',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                position: 'relative',
                top: this.state.cartBox.y + 16,
                left: this.state.cartBox.x,
                zIndex: 2,
                shadowRadius: 3,
                borderRadius: wp('2%'),
                shadowOpacity: 0.6,
                backgroundColor: 'white',
                width: wp('93%'),
                marginTop: hp('1%'),
                height: this.state.heightAnim,
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingHorizontal: wp('3%'),
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: hp('2%'),
                }}
              >
                <Image
                  source={require('../../assets/icons/cart.png')}
                  style={{
                    width: hp('3%'),
                    height: hp('3%'),
                    tintColor: 'rgb(50,50,50)',
                  }}
                />
                {this.state.anim ? (
                  <View style={{ alignItems: 'center' }}>
                    <Text
                      style={{
                        flex: 3,
                        fontFamily: 'Montserrat-Bold',
                        fontSize: hp('2.5%'),
                      }}
                    >
                      YOUR CART
                    </Text>
                  </View>
                ) : (
                  <View style={{ alignItems: 'center' }}>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-Bold',
                        fontSize: hp('2%'),
                      }}
                    >
                      YOUR CART
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Montserrat-SemiBold',
                        fontSize: hp('2%'),
                      }}
                    >
                      S./ {parseFloat(this.state.total).toFixed(2)}
                    </Text>
                  </View>
                )}
                {this.state.anim ? (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ anim: false });
                      Animated.timing(this.state.heightAnim, {
                        toValue: this.state.cartBox.height,
                        duration: 300,
                      }).start();
                      setTimeout(() => this.setState({ modal: false }), 300);
                    }}
                  >
                    <Image
                      source={require('../../assets/icons/close.png')}
                      style={{
                        width: hp('2%'),
                        height: hp('2%'),
                        tintColor: 'rgb(50,50,50)',
                      }}
                    />
                  </TouchableOpacity>
                ) : (
                  <Image
                    source={require('../../assets/icons/arrow.png')}
                    style={{
                      width: hp('3%'),
                      height: hp('3%'),
                      tintColor: 'rgb(50,50,50)',
                    }}
                  />
                )}
              </View>
              <View
                style={{ width: '100%', flex: 1, justifyContent: 'flex-start' }}
              >
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    borderBottomWidth: 2,
                    paddingBottom: hp('0.7%'),
                    marginBottom: hp('0.7%'),
                  }}
                >
                  <Text
                    style={{
                      flex: 3,
                      fontFamily: 'Montserrat-Bold',
                      fontSize: hp('2%'),
                    }}
                  >
                    Name
                  </Text>
                  <Text
                    style={{
                      flex: 1,
                      textAlign: 'center',
                      fontFamily: 'Montserrat-Bold',
                      fontSize: hp('2%'),
                    }}
                  >
                    Qty
                  </Text>
                  <Text
                    style={{
                      flex: 2,
                      textAlign: 'center',
                      fontFamily: 'Montserrat-Bold',
                      fontSize: hp('2%'),
                    }}
                  >
                    Unit.
                  </Text>
                  <Text
                    style={{
                      flex: 2,
                      textAlign: 'right',
                      fontFamily: 'Montserrat-Bold',
                      fontSize: hp('2%'),
                    }}
                  >
                    Total
                  </Text>
                </View>
                <ScrollView style={{ flex: 1 }}>
                  {Object.entries(this.state.list)
                    .filter(item => item[1].cant > 0)
                    .map((item, i) => {
                      return (
                        <View
                          key={i}
                          style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            paddingBottom: hp('0.5%'),
                          }}
                        >
                          <Text
                            style={{
                              flex: 3,
                              fontFamily: 'Montserrat-Regular',
                              fontSize: hp('2%'),
                            }}
                          >
                            {item[0]}
                          </Text>
                          <Text
                            style={{
                              flex: 1,
                              textAlign: 'center',
                              fontFamily: 'Montserrat-Regular',
                              fontSize: hp('2%'),
                            }}
                          >
                            {item[1].cant}
                          </Text>
                          <Text
                            style={{
                              flex: 2,
                              textAlign: 'center',
                              fontFamily: 'Montserrat-Regular',
                              fontSize: hp('2%'),
                            }}
                          >
                            {parseFloat(item[1].unitPrice).toFixed(1)}
                          </Text>
                          <Text
                            style={{
                              flex: 2,
                              textAlign: 'right',
                              fontFamily: 'Montserrat-Regular',
                              fontSize: hp('2%'),
                            }}
                          >
                            {parseFloat(
                              item[1].cant * item[1].unitPrice
                            ).toFixed(1)}
                          </Text>
                        </View>
                      );
                    })}
                </ScrollView>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    borderTopWidth: 2,
                    paddingBottom: hp('2%'),
                    paddingTop: hp('1%'),
                  }}
                >
                  <Text
                    style={{
                      textAlign: 'right',
                      fontFamily: 'Montserrat-Bold',
                      fontSize: hp('3%'),
                    }}
                  >
                    TOTAL
                  </Text>
                  <Text
                    style={{
                      textAlign: 'right',
                      fontFamily: 'Montserrat-Bold',
                      fontSize: hp('3%'),
                    }}
                  >
                    S./ {parseFloat(this.state.total).toFixed(1)}
                  </Text>
                </View>
              </View>
            </Animated.View>
          </View>
        </Modal>
        <Modal
          transparent={true}
          animationType="fade"
          visible={this.state.usermodal}
          onRequestClose={() => {
            this.setState({ usermodal: false });
          }}
        >
          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}
          >
            <TouchableOpacity
              onPress={() => this.setState({ usermodal: false })}
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            />
            <View
              style={{
                position: 'absolute',
                backgroundColor: 'white',
                borderRadius: hp('1.5%'),
                flexDirection: 'row',
                width:
                  wp('100%') -
                  (this.state.profileBox != null
                    ? this.state.profileBox.x
                    : 0 - hp('1%')) *
                    2,
                padding: hp('1%'),
                alignItems: 'center',
                left:
                  -hp('1%') +
                  (this.state.profileBox != null ? this.state.profileBox.x : 0),
                top:
                  -hp('1%') +
                  20 +
                  (this.state.profileBox != null ? this.state.profileBox.y : 0),
              }}
            >
              <Image
                source={require('../../assets/icons/user.png')}
                style={{
                  height: hp('5%'),
                  width: hp('5%'),
                  marginRight: wp('4%'),
                }}
              />
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Montserrat-Bold',
                  fontSize: hp('3%'),
                }}
              >
                {this.state.fullname}
              </Text>
            </View>
          </View>
        </Modal>
        {/* <TouchableOpacity style={styles.btnLogout} onPress={this.logOut}>
          <Text style={styles.textLogout}>Cerrar Sesion</Text>
        </TouchableOpacity> */}
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
