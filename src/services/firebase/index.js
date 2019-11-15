import firebase from 'firebase/app';
import 'firebase/database';
import { list } from 'rxfire/database';
import { createRow } from '../realm/realm_service';

const app = firebase.initializeApp({
    apiKey: "AIzaSyAsf3UiaFQNR6ckpypIAYfAfQXgm1uMJdE",
    authDomain: "emiliaapp-8b756.firebaseapp.com",
    databaseURL: "https://emiliaapp-8b756.firebaseio.com",
    storageBucket: "gs://emiliaapp-8b756.appspot.com",
});
export const todosRef = app.database().ref('users');
export const productsRef = app.database().ref('products');
export const pedidosRef = app.database().ref('pedidos');
export function firebaseInit(){
    
   // const todosRef = app.database().ref('users');
    list(todosRef).subscribe(change => {
        createRow('UsersLength',{id:0,length:change.length},true)
        //alert(JSON.stringify(change.length))
    });
    
    //todosRef.push({id:todosRef.length, name:"PAPA2"})
    //list(todosRef).pipe(
      //  map(list => { alert(JSON.stringify(list)); }))
}
export function productsInit(){
    
    
   // const todosRef = app.database().ref('users');
    list(productsRef).subscribe(change => {
        //alert(1)
        change.map(item=>{
            let {snapshot} = item
            let newObj = JSON.parse(JSON.stringify(snapshot))
            try {
                //alert(newObj.id)
                 createRow("Product", {
                    ...newObj,
                    id:parseInt(newObj.id)
                }, true)
            } catch (error) {
               alert(error) 
            } 
            
        })
        //createRow('ProductsLength',{id:0,length:change.length},true) //alert(JSON.stringify(change.length))
    });
    
    //todosRef.push({id:todosRef.length, name:"PAPA2"})
    //list(todosRef).pipe(
      //  map(list => { alert(JSON.stringify(list)); }))
}