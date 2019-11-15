
import React, {Component} from 'react';
import { TextInput ,StyleSheet,View} from 'react-native';


export default class ClassicInput extends Component{
  
  render() {
      const {keyboard,rowMode, onChangeText, value, placeholder,marginBottom, customStart,customEnd} = this.props
      
    return (
        <View style={{...(rowMode?{flex:1}:{width:'100%'}),marginBottom}}>
          <TextInput keyboardType={keyboard||"default"} autoCapitalize={false} onChangeText={onChangeText} value={value} placeholderTextColor="rgba(255,255,255,0.8)" placeholder={placeholder} style={styles.input}/>
        </View>
    );
  }
}
const styles = StyleSheet.create({
    
    input:{
      width:'100%',
      fontSize: 15,
      backgroundColor:'rgb(100,100,100)',
      padding:10,
      color:'white',
      fontWeight: 'bold',
      borderRadius:5
    }})