import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ItemComprar from './components/itemComprar';
import realm, { getTable } from '../../../../../../../../services/realm/realm_service';
import PedidoModal from './components/pedidoModal';
import { productsRef, pedidosRef } from '../../../../../../../../services/firebase';
import { list } from 'rxfire/database';



export default class ComprarScreen extends Component{
  state={
    modal:false,
    data:null,
    list:[]
  }
  componentDidMount(){
    this.user = realm.objectForPrimaryKey("ActiveUser",0)
    productsRef.on('value', (snapshot) => {
      let data = snapshot.val();
      let list = data?Object.entries(data):[];
      this.setState({list})
    });
  }
  addPedidos=(val)=>{
    let {data} = this.state
    pedidosRef.push({
      ...val,
      user: this.user.username,
      producto: data.id,
      status:0
    })
  }
  render() {
    return (
      <View style={{width:'100%', height:'100%'}}>
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.container}>
          {
            this.state.list!=null?
            this.state.list.filter(item=>item[1].user!=this.user.username).map(item=>{
              let display= item[1]
              return <ItemComprar open={()=>{
                this.modal.reset()
                this.setState({modal:true, data:{...display, id:item[0]}})
              }} name={display.name}/>
            }):null
          }
        </ScrollView>
        <PedidoModal action={this.addPedidos} ref={x=>this.modal=x} data={this.state.data} active={this.state.modal} closeModal={()=>this.setState({modal:false})}/>
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
