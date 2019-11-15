import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import * as screen_names from './screen_names/screen_names';
import { createStackNavigator } from 'react-navigation';
import CreateAccount from '../features/create_account';
import Login from '../features/login';
import Main from '../features/main_screen';
import Landing from '../features/landing';
import PayScreen from '../features/pay_screen';

const LandingStack = createStackNavigator(
  {
    [screen_names.LANDING]: {
      screen: Landing,
    },
  },
  { initialRouteName: screen_names.LANDING }
);
const AuthStack = createStackNavigator(
  {
    [screen_names.CREATE_ACCOUNT]: {
      screen: CreateAccount,
    },
    [screen_names.LOGIN]: {
      screen: Login,
    },
  },
  { initialRouteName: screen_names.LOGIN }
);
const AppStack = createStackNavigator(
  {
    [screen_names.MAIN]: {
      screen: Main,
    },
    [screen_names.PAY_SCREEN]: {
      screen: PayScreen,
    },
  },
  { initialRouteName: screen_names.MAIN }
);
const AppNavigator = createSwitchNavigator(
  {
    Landing: LandingStack,
    Auth: AuthStack,
    App: AppStack,
    
  },
  { initialRouteName: 'Landing' }
);

export default createAppContainer(AppNavigator);
