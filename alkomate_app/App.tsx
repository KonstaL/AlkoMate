import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';
import {createStackNavigator, createBottomTabNavigator, createAppContainer} from 'react-navigation';
import HomeScreen from './src/components/HomeScreen';
import ListScreen from './src/components/ListScreen';
import DetailScreen from './src/components/BeverageScreen';

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen
  }
});

const DrinkStack = createStackNavigator({
  Home: {
    screen: ListScreen // FIXME: temporary, not the real screen
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

const AppContainer = createAppContainer(TabNavigator);


interface Props {}
export default class App extends Component<Props> {
  render() {
    return (
      <AppContainer />
    );
  }
}


