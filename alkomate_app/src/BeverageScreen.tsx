import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, SectionList} from 'react-native';
import { Beverage } from './models/Beverage';
import { NavigationScreenProp } from 'react-navigation';


interface IProps {
    navigation?:  NavigationScreenProp<any,any>; 
}

interface IState {
    beverage: Beverage
}



export default class DetailScreen extends Component<IProps, IState> {

  static navigationOptions = ({ navigation }: any) => {
    return {
        title: navigation.getParam('beverage', {name: 'undefined'}).name,
    };
  };


  constructor(props: IProps) {
    super(props);

    const beverage = this.props.navigation!.getParam('beverage', {name: 'undefined'})
    
    this.state =  {
        beverage
    }

    this.getBeverageImage = this.getBeverageImage.bind(this);
  }

  getBeverageImage() {
    return this.state.beverage.imageUrl
        ? <Image 
            source={{uri: this.state.beverage.imageUrl!}}
            style={{width: 350, height: 350}}

            />
        : <Text style={{ fontFamily: 'lineawesome', fontSize: 80 }}>&#xf13d;</Text>
}

  render() {
    return (
      <View style={styles.container}>
        {this.getBeverageImage()}
        <Text style={styles.title}>{this.state.beverage.name}</Text>

        <SectionList
          renderItem={({item, index, section}) => <Text key={index}>{item}</Text>}
          renderSectionHeader={({section: {title}}) => (
            <Text style={{fontWeight: 'bold'}}>{title}</Text>
          )}
          sections={[
            {title: 'Brand', data: [this.state.beverage.brand]},
            {title: 'Strength', data: [this.state.beverage.strength]},
          ]}
          keyExtractor={(item, index) => item + index}
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
    fontSize: 35,
  }
});
