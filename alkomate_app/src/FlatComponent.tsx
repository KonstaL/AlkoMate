
import React, {Component, Props} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, Button, Image} from 'react-native';
import { Beverage } from './models/Beverage';
import { NavigationScreenProp } from 'react-navigation';

interface IProps {
    beverage: Beverage,
    navigate: (url: string) => void,
}

interface IState {

}

export default class FlatComponent extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.navigate = this.navigate.bind(this);
        this.getBeverageImage = this.getBeverageImage.bind(this);
    }

  
    navigate() {
        this.props.navigate(this.props.beverage.ean);
    }

    getBeverageImage() {
        return this.props.beverage.imageUrl
            ? <Image 
                source={{uri: this.props.beverage.imageUrl!}}
                style={{width: 66, height: 66}}

                />
            : <Text style={{ fontFamily: 'lineawesome', fontSize: 40 }}>&#xf13d;</Text>
    }

    render() {
        return (
        <View style={styles.container}>
            <Text style={styles.text} onPress={this.navigate}>{this.props.beverage.name}</Text>
            {this.getBeverageImage()}
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
