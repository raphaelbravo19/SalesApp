import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity,Modal} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {ClassicInput,ButtonGradient} from 'components'
import { requestPost } from '../../../../../../../../../../services/request';
import { productsRef, pedidosRef } from '../../../../../../../../../../services/firebase';
import realm, { getTable } from '../../../../../../../../../../services/realm/realm_service';
import { ScrollView } from 'react-native-gesture-handler';


export default class ModalProductDetail extends Component{
  
  onChangeText(key, value){
    this.setState({
      [key]: value
    })
  }
  updateStatus=(key,data)=>{
    
    pedidosRef.child(key).update({...data, status: data.status==1?0:1})
  }
  componentDidUpdate(){
    //alert(JSON.stringify(this.props.pedidos))
  }
  render() {
    const {active, closeModal,pedidos}=this.props
    
    return (
      <Modal animationType="fade" visible={active} transparent={true} onRequestClose={closeModal}>
          <View style={{width:'100%', height:'100%', alignItems:'center', justifyContent:'center'}}>
            <TouchableOpacity activeOpacity={1} onPress={closeModal} style={{height:'100%', width:wp('100%'), backgroundColor:'rgba(0,0,0,0.4)',position:'absolute',top:0, alignItems:'center', justifyContent:'center'}}/>
            <View style={styles.modal}>
                <Text style={styles.title}>Pedidos</Text>
                <ScrollView  keyboardShouldPersistTaps="always" style={styles.pedidosContainer}>
                  {
                    
                    pedidos.map(item=>{
                      let display = item[1]
                  
                      return(
                        <View style={{ backgroundColor:'rgb(150,150,150)',padding:hp('2%'), flexDirection:'row', flex:1 }}>
                          <TouchableOpacity onPress={()=>this.updateStatus(item[0], display)} style={{marginRight:hp('1%'),backgroundColor:display.status==0?'white':'rgb(100,200,100)', borderColor:'rgb(120,120,120)', borderWidth:1, width:hp('3%'), height:hp('3%')}}/>
                          <Text>{display.user} {display.cant}</Text>
                        </View>
                      )
                    })
                  }
                </ScrollView>
              </View>
          </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
   modal:{
    backgroundColor:'#F5FCFF',
    alignItems:'center', 
    justifyContent:'center',
    width:'90%',
    padding:hp('3%'),
    borderRadius:hp('1%')
   },
   pedidosContainer:{
    width:'90%',
    height:hp('40%'),
    backgroundColor:'rgb(200,200,200)',
    borderRadius:hp('1%'),
    borderWidth: 2,
    borderColor: 'rgb(120,120,120)',
   },
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
    fontSize: hp('4%'),
    textAlign: 'center',
    margin: hp('2%'),
    fontWeight:'bold'
  },
  loginButton:{
    backgroundColor:'rgba(0,0,0,0.8)',
    padding:15,
    borderRadius: 7,
    margin:5
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
