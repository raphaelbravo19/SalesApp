import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, Modal}  from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {ClassicInput, ButtonGradient} from 'components'
import { pedidosRef } from '../../../../../../../../../../services/firebase';


export default class PedidoModal extends Component{
  state={
    cant: '0',
    direccion: ''
  }
  onChangeText(key, value){
    this.setState({
      [key]: value
    })
  }
  reset(){
    this.setState({
      cant: '0',
      direccion: ''
    })
  }
  addPedido=()=>{
    pedidosRef.push({
      
    })
  }
  modifyCant=add=>{
    this.setState({cant:(parseInt(this.state.cant)+(add?1:this.state.cant=='0'?0:-1)).toString()})
  }
  render() {
    const {active, closeModal, data}=this.props
    const {name,price}= data || ''
    return (
      <Modal animationType="fade" visible={active} transparent={true} onRequestClose={closeModal}>
          <View style={{width:'100%', height:'100%', alignItems:'center', justifyContent:'center'}}>
            <TouchableOpacity activeOpacity={1} onPress={closeModal} style={{height:'100%', width:wp('100%'), backgroundColor:'rgba(0,0,0,0.4)',position:'absolute',top:0, alignItems:'center', justifyContent:'center'}}/>
            <View style={styles.modal}>
              <Text style={styles.title}>Realizar Pedido</Text>
              <Text style={styles.description}>Nombre: {name}</Text>
              <ClassicInput placeholder="Direccion" marginBottom={hp('1%')} onChangeText={x=>this.onChangeText("direccion", x)} value={this.state.direccion}/>
              <View style={{flexDirection:"row"}}>
                <ClassicInput keyboard={"number-pad"} rowMode placeholder="Cantidad" marginBottom={hp('1%')} onChangeText={x=>this.onChangeText("cant", x)} value={this.state.cant}/>
                <View style={{width:"20%",marginLeft:wp('1%'),paddingBottom:hp('1%'), height:'100%'}}>
                  <TouchableOpacity onPress={()=>this.modifyCant(true)} style={{width:'100%', flex:1, backgroundColor:'rgb(200,200,200)', alignItems:'center', justifyContent:'center'}}><Text style={{fontSize:hp('3%'), fontWeight:"bold"}}>+</Text></TouchableOpacity>
                  <TouchableOpacity onPress={()=>this.modifyCant(false)} style={{ width:'100%', flex:1, backgroundColor:'rgb(200,200,200)', alignItems:'center', justifyContent:'center'}}><Text style={{fontSize:hp('3%'), fontWeight:"bold"}}>-</Text></TouchableOpacity>
                </View>
              </View>
              <ButtonGradient colors={['rgb(100,150,255)','rgb(100,150,255)']} containerStyle={styles.loginButton} onPress={()=>this.props.action({...this.state})}>
                <Text style={styles.loginButtonText}>Aceptar</Text>
              </ButtonGradient>
            </View>
          </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'red',
    width:'95%',
    padding:hp('3%'),
    marginTop:hp('1%')
  },
  title: {
    fontSize: hp('4%'),
    textAlign: 'center',
    margin: hp('2%'),
    fontWeight:'bold'
  },
  description:{
    fontSize: hp('3%'),
    textAlign: 'center',
    margin: hp('1%'),
    fontWeight:'bold'
  },
  modal:{
    backgroundColor:'#F5FCFF',
    alignItems:'center', 
    justifyContent:'center',
    width:'90%',
    padding:hp('3%'),
    borderRadius:hp('1%'),
    alignSelf: 'center',
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
