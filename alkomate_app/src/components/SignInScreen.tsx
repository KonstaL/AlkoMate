import * as React from 'react';
import { View, StyleSheet, Text, TextInput, AsyncStorage, Button } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { UserToken } from '../models/UserToken';

export interface AppProps {
  navigation?: NavigationScreenProp<any,any> // Injected in index.ts
}

export interface AppState {
}

export default class SignInScreen extends React.Component<AppProps, AppState> {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    const userToken = {
      token: 'abc',
      authDone: true
    } as UserToken

    await AsyncStorage.setItem('userToken', JSON.stringify(userToken));
    this.props.navigation!.navigate('App');
  };
}
const styles = StyleSheet.create({
  container: {
    padding: 10,  
    backgroundColor: '#F5FCFF',
  }
});
