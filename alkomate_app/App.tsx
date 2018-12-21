import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import {createStackNavigator, createBottomTabNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation';
import HomeScreen from './src/components/HomeScreen';
import ListScreen from './src/components/ListScreen';
import DetailScreen from './src/components/BeverageScreen';
import SignInScreen from './src/components/SignInScreen';
import AuthLoadingComponent from './src/components/AuthLoading';

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen
  }
});

const DrinkStack = createStackNavigator({
  Home: {
    screen: ListScreen 
  },
  Details: {
    screen: DetailScreen,
  }
});

const ProfileStack = createStackNavigator({
  Home: {
    screen: HomeScreen // FIXME: temporary, not the real screen
  }
});

const TabNavigator = createBottomTabNavigator({
  Home: HomeStack,
  Drinks: DrinkStack,
  Profile: ProfileStack,
});

const AuthStack = createStackNavigator({
   SignIn: SignInScreen 
});

const AppContainer =  createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingComponent,
    App: TabNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));




interface Props {}
export default class App extends Component<Props> {
  render() {
    return (
      <AppContainer />
    );
  }
}


