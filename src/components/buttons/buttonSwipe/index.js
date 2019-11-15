import React, { Component } from 'react';
import {
  PanResponder, // we want to bring in the PanResponder system
  Animated,
  Dimensions,
  View,
} from 'react-native';

class SwipeButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pan: new Animated.ValueXY(),
      scale: new Animated.Value(1),
    };
    this._panResponder = {};
    this.valueWidth = 50;
    this.handleMove = this.handleMove.bind(this);
  }
  handleMove(e, gestureState) {
    let { dx } = gestureState;
    //if(dx==100)
    this.state.pan.setValue({ x: dx < 0 ? 0 : dx, y: 0 });
  }
  componentWillMount() {
    this._panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,

      // Initially, set the value of x and y to 0 (the center of the screen)
      // Initially, set the value of x and y to 0 (the center of the screen)
      onPanResponderGrant: (e, gestureState) => {
        // Set the initial value to the current state
        this.state.pan.setOffset({
          x: this.state.pan.x._value,
          y: this.state.pan.y._value,
        });
        this.state.pan.setValue({ x: 0, y: 0 });
      },

      // When we drag/pan the object, set the delate to the states pan position
      onPanResponderMove: this.handleMove,

      // When we drag/pan the object, set the delate to the states pan position
      onPanResponderRelease: (e, { vx, vy }) => {
        // Flatten the offset to avoid erratic behavior
        this.state.pan.flattenOffset();
        //const screenWidth = Dimensions.get("window").width;
        //alert(this.state.pan.x._value)
        Animated.spring(this.state.pan.x, {
          toValue:
            this.state.pan.x._value > Dimensions.get('screen').width * 0.5
              ? Dimensions.get('screen').width
              : 0,
          bounciness: 10,
        }).start();
        if (this.state.pan.x._value > Dimensions.get('screen').width * 0.5) {
          if (this.props.action) {
            this.props.action();
          }
        }
        //
      },
    });
  }
  render() {
    let { pan, scale } = this.state;
    let rotate = '0deg';
    // Calculate the x and y transform from the pan value
    let [translateX, translateY] = [pan.x, pan.y];
    //alert()
    // Calculate the transform property and set it as a value for our style which we add below to the Animated.View component
    let imageStyle = {
      transform: [{ translateX }, { translateY }, { rotate }, { scaleX: 1 }],
    };
    return (
      <View
        style={{
          width: '100%',
          justifyContent: 'center',
          alignItems: 'flex-start',
          ...this.props.style,
        }}
      >
        <Animated.View style={imageStyle} {...this._panResponder.panHandlers}>
          {this.props.children}
        </Animated.View>
      </View>
    );
  }
}

export default SwipeButton;
