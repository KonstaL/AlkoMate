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
        this.props.navigation!.navigate(fireUser !== null ? 'App' : 'Auth');
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
