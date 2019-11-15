import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity,ScrollView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ItemVender from './components/itemVender';
import ModalAddProduct from './components/addProduct';
import realm, { getTable } from '../../../../../../../../services/realm/realm_service';
import { list } from 'rxfire/database';
import { productsRef, pedidosRef } from '../../../../../../../../services/firebase';



export default class VenderScreen extends Component{
  state={
    modal: false,
    list:[],
    pedidos:[]
  }
  closeModal=(val)=>{
   //alert(1)
  
    this.setState({modal:val})
  }
  deleteElement=(index)=>{
    if(this.state.list[index]!=null) productsRef.child(this.state.list[index][0]).remove()
  }
  //realmRef=realm;
  componentDidMount(){
    this.user = realm.objectForPrimaryKey("ActiveUser",0)
    
    productsRef.on('value', (snapshot) => {
      let data = snapshot.val();
      let list = data?Object.entries(data):[];
      this.setState({list})
   });
    pedidosRef.on('value', (snapshot) => {
      let data = snapshot.val();
      let pedidos = data?Object.entries(data):[];
      this.setState({pedidos})
      //alert(JSON.stringify(pedidos))
 });
    
  }
  
  render() {
    
    return (
      <View style={{flex:1, width:'100%', alignItems:'center'}}>
        <TouchableOpacity onPress={()=>this.closeModal(true)} style={{width:"97%", padding:hp('2%'),alignContent:'center', justifyContent:'center', borderRadius:10, backgroundColor:'rgb(100,150,255)', marginTop:10}}>
            <Text style={{color:'white', fontSize:hp('3%'),alignSelf:'center',paddingVertical:0, textAlign:'center',fontWeight:'bold'}}>AGREGAR</Text>
          </TouchableOpacity>
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
          
          {
            this.state.list.length>0?
              this.state.list.filter(item=>item[1].user==this.user.username).map(item=>{
                let display= item[1]
                let pedidos=this.state.pedidos.filter(val=>val[1].producto==item[0])
                //if(this.state.pedidos.length>0)alert(display.name+' '+JSON.stringify(this.state.pedidos))
                return <ItemVender pedidos={pedidos} name={display.name+" "+pedidos.length}/>
              })
            :null
          }
          </ScrollView>
          <ModalAddProduct closeModal={()=>this.closeModal(false)} active={this.state.modal}  />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer:{
    flex: 1,
    width:'100%',
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
