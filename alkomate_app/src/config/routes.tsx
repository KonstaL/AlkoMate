import {createStackNavigator, createBottomTabNavigator, createAppContainer, createSwitchNavigator, BottomTabNavigatorConfig} from 'react-navigation';
import HomeScreen from '../components/HomeScreen';
import ListScreen from '../components/ListScreen';
import DetailScreen from '../components/BeverageScreen';
import SignInScreen from '../components/SignInScreen';
import AuthLoadingComponent from '../components/AuthLoading';
import ProfileComponent from '../components/Profile';
import BarcodeScreen from '../components/BarcodeScreen';
import NewBeverageScreen from '../components/NewBeverageScreen';


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
  },
  BarcodeScanning: BarcodeScreen,
  NewBeverage: NewBeverageScreen
});

const ProfileStack = createStackNavigator({
  Home: {
    screen: ProfileComponent 
  }
});


const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
  },
  Drinks: DrinkStack,
  Profile: ProfileStack,
},{ 
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});

const AuthStack = createStackNavigator({
   SignIn: SignInScreen 
}, { headerMode: 'none' });

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

