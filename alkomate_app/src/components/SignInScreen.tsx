import * as React from 'react';
import { View, StyleSheet, Text, TextInput, AsyncStorage, Animated, Easing, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { Button } from 'react-native-elements';

import { UserToken } from '../models/UserToken';
import firebase from 'react-native-firebase';
import Toast from 'react-native-root-toast';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';


export interface AppProps {
  navigation?: NavigationScreenProp<any,any> // Injected in index.ts
}

export interface AppState {
  loginInProgress: boolean;
  rotationAnim: any;
}

export default class SignInScreen extends React.Component<AppProps, AppState> {
    animation: any

    state = {
      loginInProgress: false,
      rotationAnim: new Animated.Value(0),
    }
  
  componentDidMount() {
    const anim = Animated.timing(this.state.rotationAnim,{
        toValue: 1,
        duration: 5000,
        easing: Easing.bezier(.59,.3,.57,1.34),
        useNativeDriver: true
    });

    const animBack = Animated.timing(this.state.rotationAnim, {
        toValue: 0,
        duration: 5000,
        easing: Easing.bezier(.59,.3,.57,1.34),
        useNativeDriver: true
    });

    this.animation = Animated.loop(Animated.sequence([anim, animBack]));
    this.animation.start();
  }

  componentWillUnmount() {
    if(this.animation) {
      this.animation.stop();
    }
  }

  render() {
    // Transform animation into degrees
    const spin = this.state.rotationAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['10deg', '47deg']
    })


    return (
      <ImageBackground
        imageStyle={{resizeMode: 'cover'}}
        source={require('../../assets/images/bg.jpg')}
        style={styles.container} >

        <View style={styles.upperContainer}>
          <View style={styles.logoContainer}>
            <Animated.Text style={[styles.logo, { transform: [{rotate: spin}] }]}>&#xf13d;</Animated.Text>
          </View>
          
          <Text style={styles.title}>AlkoMate</Text>
        </View>
        <View style={styles.lowerContainer}>
          <View style={styles.googleContainer}>
            <GoogleSigninButton
              style={{ width: 312, height: 48 }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Light}
              onPress={this.signInGoogle}
              disabled={this.state.loginInProgress} 
            />
            <Button 
              backgroundColor="#00000000"
              title="Sign in with email 📫"
              onPress={this.signInAnonymously}
              color="#FFFFFF" 
            />
          </View>
        

          <Button 
            backgroundColor="#ffffff00"
            title="I just want to look around :)"
            onPress={this.signInAnonymously}
            color="#FFFFFF" 
          />
        </View>
        </ImageBackground>
    );
  }

  signInAnonymously = async () => {
    this.setState({loginInProgress: true})
    try {
      await firebase.auth().signInAnonymously()
      const fireUser = firebase.auth().currentUser;
      
      await AsyncStorage.setItem('fireUser', JSON.stringify(fireUser));
      this.props.navigation!.navigate('App');
      
    } catch(e) {
      console.error('error in fireauth', e);
      Toast.show('Something went wrong while trying to authenticate :(', {
        duration: Toast.durations.LONG,
      });
    }
    this.setState({loginInProgress: false})

  }

  signInGoogle = async () => {
    this.setState({loginInProgress: true})

    try {
      // Add any configuration settings here:
      await GoogleSignin.configure();
  
      const data = await GoogleSignin.signIn();
  
      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken!)
      // login with credential
      const currentUser = await firebase.auth().signInAndRetrieveDataWithCredential(credential);
  
      console.info(JSON.stringify(currentUser.user.toJSON()));
    } catch (e) {
      console.log('Error in google login',  e);
      Toast.show('Something went wrong while trying to authenticate :(', {
        duration: Toast.durations.LONG,
      });
    }

    this.setState({loginInProgress: false})
  }

  signInEmail = async () => {
    this.setState({loginInProgress: true})

    try {

    } catch (e) {
      console.log('Error in email login', e);
      Toast.show('Something went wrong while trying to authenticate :(', {
        duration: Toast.durations.LONG,
      });
    }


    this.setState({loginInProgress: false})
  }
}

const styles = StyleSheet.create({
  container: {
   //paddingTop: 100,
    //backgroundColor: '#F5FCFF',
    textAlign: 'center',
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  upperContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  lowerContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  googleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontFamily: 'lineawesome',
    fontSize: 120,
    color: 'white',
  },
  title: {
    fontSize: 70,
    color: 'white',
    textAlign: 'center',
    fontWeight: '200',
    textShadowRadius: 9,
    textShadowColor: '#333333',
    textShadowOffset: {
      width: 2,
      height: 2,
    }
  }
});
