import * as React from 'react';
import { View, StyleSheet, Text, AsyncStorage, ActivityIndicator, StatusBar } from 'react-native';
import { NavigationNavigator, NavigationScreenProp } from 'react-navigation';
import { UserToken } from '../models/UserToken';
import firebase from 'react-native-firebase';

export interface AuthLoadingProps {
    navigation?: NavigationScreenProp<any,any> // Injected in index.ts
}

export interface AuthLoadingState {
}

export default class AuthLoadingComponent extends React.Component<AuthLoadingProps, AuthLoadingState> {
    constructor(props: AuthLoadingProps) {
        super(props);
        this.bootstrapAsync();
    }
    
    // Fetch the token from storage then navigate to our appropriate place
    bootstrapAsync = async () => {
        const fireUser = await firebase.auth().currentUser;
        const fireUserString = await AsyncStorage.getItem('fireUser');


        console.log('Current fireuser from fire:', fireUser);
        if(fireUserString) {
            console.log('Current fireuser from async', JSON.parse(fireUserString));
        }
       
        const userTokenString = await AsyncStorage.getItem('userToken');
    
        const userToken = userTokenString 
            ? JSON.parse(userTokenString) as UserToken
            : undefined
        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        this.props.navigation!.navigate(userToken && userToken.authDone ? 'App' : 'Auth');
    };
    
    // Render any loading content that you like here
    render() {
        return (
        <View style={styles.container}>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      padding: 10,  
      backgroundColor: '#F5FCFF',
    }
});
