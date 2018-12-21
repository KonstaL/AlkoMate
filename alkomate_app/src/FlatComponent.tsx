
import React, {Component, Props} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, Button} from 'react-native';
import { Beverage } from './models/Beverage';
import { NavigationScreenProp } from 'react-navigation';

interface IProps {
    beverage: Beverage,
    navigation: NavigationScreenProp<any,any>
    navigate: (url: string) => void,
}

interface IState {

}

export default class FlatComponent extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.navigate = this.navigate.bind(this);
    }

  
    navigate() {
        this.props.navigate(this.props.beverage.ean);
    }

    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.text} onPress={this.navigate}>{this.props.beverage.name}</Text>
            <Button 
                title={'Remove'} 
                onPress={() => console.log('hello world')}
            />
        </View>
        );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 40,
  },
  text: {
      fontSize: 20,
  }
});
