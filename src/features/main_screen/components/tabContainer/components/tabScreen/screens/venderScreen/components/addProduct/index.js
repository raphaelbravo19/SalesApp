import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity,Modal} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {ClassicInput,ButtonGradient} from 'components'
import { requestPost } from '../../../../../../../../../../services/request';
import { productsRef } from '../../../../../../../../../../services/firebase';
import realm, { getTable } from '../../../../../../../../../../services/realm/realm_service';


export default class ModalAddProduct extends Component{
  state={
    name:'',
    price:'',
  }
  onChangeText(key, value){
    this.setState({
      [key]: value
    })
  }
  
  addProduct=()=>{
    const {closeModal}=this.props
    let user = realm.objectForPrimaryKey("ActiveUser",0)
    productsRef.push({
      user: user.username,
      name:this.state.name,
      price: this.state.price
    },()=>closeModal())

    /*requestPost('/products.json',
    {
      name:this.state.name,
      price:this.state.price,
    })*/
  }
  render() {
    const {active, closeModal}=this.props
    return (
      <Modal  animationType="fade" visible={active} transparent={true} onRequestClose={closeModal}>
          <View style={{width:'100%', height:'100%', alignItems:'center', justifyContent:'center'}}>
            <TouchableOpacity activeOpacity={1} onPress={closeModal} style={{height:'100%', width:wp('100%'), backgroundColor:'rgba(0,0,0,0.4)',position:'absolute',top:0, alignItems:'center', justifyContent:'center'}}/>
            <View style={styles.modal}>
              <Text style={styles.title}>Agregar Producto</Text>
              <ClassicInput placeholder="Nombre" marginBottom={hp('1%')} onChangeText={x=>this.onChangeText("name", x)} value={this.state.name}/>
              <ClassicInput placeholder="Precio" marginBottom={hp('1%')} onChangeText={x=>this.onChangeText("price", x)} value={this.state.price}/>
              <ButtonGradient colors={['rgb(100,150,255)','rgb(100,150,255)']} containerStyle={styles.loginButton} onPress={this.addProduct}>
                <Text style={styles.loginButtonText}>Aceptar</Text>
              </ButtonGradient>
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
    borderRadius:hp('1%'),
    alignSelf: 'center',
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
