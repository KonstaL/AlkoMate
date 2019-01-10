import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements'
import { DrinkService } from '../services/DrinkService';
import { NavigationScreenProp } from 'react-navigation';
import Toast from 'react-native-root-toast';


export interface AppProps {
    navigation?: NavigationScreenProp<any,any> // Injected in index.ts

}

export default class NewBeverageScreen extends React.Component<AppProps, any> {
  constructor(props: AppProps) {
    super(props);

    this.setState = this.setState.bind(this);
    this.sendDrink = this.sendDrink.bind(this);
    this.valuesAreValid = this.valuesAreValid.bind(this);
  }


  public render() {
    return (
      <View>
            <FormLabel>Name</FormLabel>
            <FormInput onChangeText={val => this.setState({name: val})}/>
            <FormValidationMessage>Not a valid value</FormValidationMessage>

            <FormLabel>Brand</FormLabel>
            <FormInput onChangeText={val => this.setState({brand: val})}/>
            <FormValidationMessage>Not a valid value</FormValidationMessage>

            <FormLabel>Size</FormLabel>
            <FormInput onChangeText={val => this.setState({size: val})}/>
            <FormValidationMessage>Not a valid value</FormValidationMessage>

            <FormLabel>Strength %</FormLabel>
            <FormInput onChangeText={val => this.setState({strength: val})}/>
            <FormValidationMessage>Not a valid value</FormValidationMessage>


        <Button title='submit!' onPress={this.sendDrink} color='#44FF44'/>
      </View>
    );
  }

  async sendDrink() {
    if(this.valuesAreValid()) {

      let beverage = {
        ean: this.props.navigation!.state.params.ean,
        name: this.state.name,
        brand: this.state.brand,
        size: Number(this.state.size) / 1000,
        strength: Number(this.state.strength) / 1000,
        country: '',
        views:0,
      }
      
      let res = await DrinkService.Instance.addBeverage(beverage);
      console.log('vastaus', res);
    } else {
      Toast.show('Invalid values!', {})
    }
  }

  valuesAreValid(): boolean {
    console.log('this value', this.state);
    const nameValid = !!this.state.name && this.state.name !== '';
    const brandValid = !!this.state.brand && this.state.brand !== '' 
    const sizeValid = !!this.state.size && Number(this.state.size) != NaN;
    const strengthValid = !!this.state.strength && Number(this.state.strength) != NaN;
    
    return nameValid && brandValid && sizeValid && strengthValid;
  }
}
