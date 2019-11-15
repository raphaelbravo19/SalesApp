import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import Navigator from './src/navigation/index'
import { Provider } from 'react-redux'
import store from './src/store/store'
import NavigationService from './src/services/navigation';
export default class App extends Component{
  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={{flex:1}}>
          <Navigator
            onNavigationStateChange={(prev, next, action) => {
              NavigationService.setNavigationState(prev, next, action);
              NavigationService.history.navigationListener(action);
            }}
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
