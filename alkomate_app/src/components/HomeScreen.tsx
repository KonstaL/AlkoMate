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

        this.state = {
           
        }
       this.toBarcodeScreen = this.toBarcodeScreen.bind(this);
    }
    render() {
        return(
            <SafeAreaView style={styles.container}>
               <Button title="Go snap a bar code" 
                onPress={this.toBarcodeScreen} />
            </SafeAreaView>
        )
    }


    toBarcodeScreen() {
        this.props.navigation!.push('BarcodeScanning');

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
