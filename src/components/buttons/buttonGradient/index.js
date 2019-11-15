//import LinearGradient from 'react-native-linear-gradient';
import React, {Component} from 'react';
import { TouchableOpacity,View} from 'react-native';


export default class ButtonGradient extends Component{
  
  render() {
      const {onPress, containerStyle, colors, customStart,customEnd} = this.props
      
    return (
      <TouchableOpacity onPress={onPress}>
        <View start={customStart} end={customEnd} colors={colors}  style={containerStyle}>
            {this.props.children}
        </View>
      </TouchableOpacity>
    );
  }
}
