import * as React from 'react';
import { View, StyleSheet, Text, AsyncStorage, Button } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

export interface ProfileProps {
    navigation?: NavigationScreenProp<any,any> // Injected in index.ts
}

export interface ProfileState {
}

export default class ProfileComponent extends React.Component<ProfileProps, ProfileState> {
  constructor(props: ProfileProps) {
    super(props);
    this.state = {
    };
  }


  signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation!.navigate('Auth');
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="sign me out :)" onPress={this.signOutAsync} />
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
  
