import React, { Component } from "react";
import { Text, SafeAreaView, View, TouchableOpacity, StyleSheet, Modal, Alert, Button } from "react-native";
import ListScreen from "./ListScreen";
import Toast from "react-native-root-toast";
import { DrinkService } from "../services/DrinkService";
import { iid } from "react-native-firebase";
import { NavigationScreenProp } from "react-navigation";

interface Props {
    navigation?: NavigationScreenProp<any,any> // Injected in index.ts

}

interface State {

}

export default class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }
       
    render() {
        return(
            <SafeAreaView style={styles.container}>
              <Text>This area is not really implemented :)</Text>
              <Text>Todays recommendations</Text>
              <Text>Activity</Text>
            </SafeAreaView>
        )
    }


 
   

    
}
    
const styles = StyleSheet.create({
    container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
    },
    preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
    },
    capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
    }
});
