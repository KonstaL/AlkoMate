import {createStackNavigator, createBottomTabNavigator, createAppContainer, createSwitchNavigator} from 'react-navigation';
import HomeScreen from '../components/HomeScreen';
import ListScreen from '../components/ListScreen';
import DetailScreen from '../components/BeverageScreen';
import SignInScreen from '../components/SignInScreen';
import AuthLoadingComponent from '../components/AuthLoading';
import ProfileComponent from '../components/Profile';

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
    screen: ProfileComponent 
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

export default AppContainer;

