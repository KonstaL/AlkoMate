import * as React from 'react';
import { View, StyleSheet, Text, AsyncStorage } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import firebase from 'react-native-firebase';
import Toast from 'react-native-root-toast';
import { Icon, Divider, Button } from 'react-native-elements';


export interface ProfileProps {
    navigation?: NavigationScreenProp<any,any> // Injected in index.ts
}

export interface ProfileState {
  user: any;
}

export default class ProfileComponent extends React.Component<ProfileProps, ProfileState> {
  constructor(props: ProfileProps) {
    super(props);
    this.state = {
      user: firebase.auth().currentUser!.toJSON() 
    };
    console.log('user', this.state.user);

    this.signOutAsync = this.signOutAsync.bind(this);
  }


  signOutAsync = async () => {
    await firebase.auth().signOut();
    this.props.navigation!.navigate('AuthLoading');
  };



  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Icon raised name="mood" size={70} />
          <Text style={styles.username}>{this.state.user.displayName ? this.state.user.displayName : 'Anynomous'}</Text>
        </View>
        <Divider style={{ backgroundColor: 'blue', margin: 10}} />
        <Button title="preferences" buttonStyle={styles.buttonStyle} onPress={() => console.log('Do nothing')}/>
        <Button title="sign me out :)" buttonStyle={styles.buttonStyle} onPress={this.signOutAsync} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
      padding: 10,  
      backgroundColor: '#F5FCFF',
    },
    profileContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    username: {
      fontSize: 30,
    },
    buttonStyle: {
      marginTop: 5,
      marginBottom: 5,
    }
  });
  
