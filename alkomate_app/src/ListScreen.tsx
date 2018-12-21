
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';
import FlatComponent from './FlatComponent';

import {Beverage} from './models/Beverage';
import { NavigationScreenProp } from 'react-navigation';

interface IState {
    beverages: Beverage[];

}

interface IProps {
  navigation?: NavigationScreenProp<any,any> // Injected in index.ts
}

export default class ListScreen extends Component<IProps, IState> {
  static navigationOptions = {
    title: 'Users',
  }

  constructor(props: IProps) {
    super(props);

    this.state = {
      beverages: [], 
    }
    this.toDetailView = this.toDetailView.bind(this);
  }

  componentDidMount() {
    fetch('http://localhost:8000/public/beverages')
      .then(res => res.json())
      .then(res => res.beverages)
      .then(res => this.setState({beverages: res}));
  }


 
  toDetailView(id: string) {
    this.props.navigation!.push('Details', {beverage: this.state.beverages.find(beverage => beverage.ean === id)});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Beverages</Text>
        <FlatList
          data={this.state.beverages}
          renderItem={({item}) => <FlatComponent beverage={item} navigate={this.toDetailView}/>}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,  
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 40,
  }
});
