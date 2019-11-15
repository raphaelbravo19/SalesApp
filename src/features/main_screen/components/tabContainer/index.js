import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import TabSelector from './components/tabSelector';
import TabScreen from './components/tabScreen';

const options = ["Comprar", "Vender"]

export default class TabContainer extends Component{
  
  state={
    tabIndex:0
  }
  toggleTab = (val)=>{
      this.setState({tabIndex:val})
  }
  render() {
    
    return (
      <View style={styles.container}>
        <TabSelector options={options} toggle={this.toggleTab} selected={this.state.tabIndex}/>
        <TabScreen selected={this.state.tabIndex}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width:'100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  loginHeader:{
    width:'100%',
    alignItems:'center'
  },
  loginContainer:{
    width:'85%',
    backgroundColor:'rgba(0,0,0,0.2)',
    padding: 20,
    alignItems:'center',
    justifyContent:'space-between',
    borderRadius:10
  },
  btnLogout:{
    borderRadius:10,
    padding:10,
    width:'90%',
    alignItems:'center',
    backgroundColor:'rgb(180,60,51)'
  },
  textLogout:{
    fontSize:hp('4%'),
    color:'white'
  },
  input:{
    width:'100%',
    fontSize: 15,
    backgroundColor:'rgb(100,100,100)',
    padding:10,
    margin:5,
    color:'white',
    fontWeight: 'bold',
    borderRadius:5
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    margin: 20,
    fontWeight:'bold'
  },
  loginButton:{
    backgroundColor:'rgba(0,0,0,0.8)',
    padding:15,
    borderRadius: 7,
    margin:20
  },
  loginButtonText:{
    color:'white',
    fontSize: 20
  },
  createAccountLink:{
    position:'absolute',
    bottom: 30
  },
  createAccountText:{
    fontSize:16,
    color:'rgba(0,0,0,0.7)'
  }
});
