
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';
import FlatComponent from './FlatComponent';

import {Beverage} from '../models/Beverage';
import { NavigationScreenProp } from 'react-navigation';
import { SearchBar, Icon } from 'react-native-elements';
import { DrinkService } from '../services/DrinkService';

interface IState {
    beverages: Beverage[];

}

interface IProps {
  navigation?: NavigationScreenProp<any,any> // Injected in index.ts
}

export default class ListScreen extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);

    this.state = {
      beverages: [], 
    }
    this.toDetailView = this.toDetailView.bind(this);
  }

  componentDidMount() {
    DrinkService.Instance.getBeverages()
      .then(res => this.setState({beverages: res}));
  }


 
  toDetailView(id: string) {
    this.props.navigation!.push('Details', {beverage: this.state.beverages.find(beverage => beverage.ean === id)});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Beverages</Text>
        <View style={styles.searchContainer}>
        
        <SearchBar
          onChangeText={() => console.log('onChange')}
          onClearText={() => console.log('onChange')}
          placeholder='beverage name..' 
          containerStyle={{flexGrow: 1}}/>
        <Icon 
          type='material-community'
          name='barcode-scan'
          containerStyle={{padding: 10 }} 
          onPress={() => this.props.navigation!.navigate('BarcodeScanning')}
          />
        </View>
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
    //padding: 10,  
    backgroundColor: '#F5FCFF',
  },
  title: {
    textAlign: 'center',
    fontSize: 40,
    padding: 5,
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'row',

  }
});
