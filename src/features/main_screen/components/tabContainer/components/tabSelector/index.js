import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default class TabSelector extends Component{
  render() {
    const {options, selected,toggle} = this.props
    const len = options.length
    return (
      <View style={styles.container}>
        {
            options.map((option,i)=>{
                return (
                    <TouchableOpacity disabled={i==selected} onPress={()=>toggle(i)} style={{...styles.tab,width:wp(`${100/len}%`), backgroundColor: i==selected?'rgba(0,0,0,0.2)':'rgba(0,0,0,0)'}}>
                        <Text>{option}</Text>
                    </TouchableOpacity>
                )
            })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  tab:{
      alignItems:'center',
      justifyContent:'center',
      paddingVertical: hp('2%'),
      borderColor: 'rgba(0,0,0,0.3)' ,
      borderRightWidth:1,
      borderBottomWidth: 1,
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
