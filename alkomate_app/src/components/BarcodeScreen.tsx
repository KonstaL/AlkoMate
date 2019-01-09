import React, { Component } from "react";
import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { DrinkService } from '../services/DrinkService';
import Toast from 'react-native-root-toast';
import { NavigationScreenProp } from "react-navigation";


export interface AppProps {
    navigation?: NavigationScreenProp<any,any> // Injected in index.ts

}

export default class BarcodeScreen extends Component<AppProps, any> {
    camera?: RNCamera | null;
    loadingDrink: boolean = false;


    constructor(props: AppProps) {
        super(props);

        this.barcodeRead = this.barcodeRead.bind(this);
        this.promptDrinkAdding = this.promptDrinkAdding.bind(this);
    }

    public render() {
        return (
            <SafeAreaView style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style = {styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                    onBarCodeRead={this.barcodeRead}
                    
                    />
            <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableOpacity
                    onPress={()=> console.log('a')}
                    style = {styles.capture}
                    >
                    <Text style={{fontSize: 14}}> SNAP </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
        );
    }
    async barcodeRead(barcode: {type: string, data: string}) {
        Toast.show('cmon', {})
        console.log('cmon');
        console.log('whole barcode', barcode);
        const isEANType = barcode.type === 'org.gs1.EAN-13' || barcode.type === 'EAN_13'

        if(isEANType && !this.loadingDrink)  {
            console.log('testi', this.loadingDrink);
            this.loadingDrink = true; // This.setState is too slow, so using syncronous code instead
            let drink = await DrinkService.Instance.getBeverageById(barcode.data)
            
            if (drink) {
                console.log('drink found');
            } else {
                this.promptDrinkAdding();
            }
            
            console.log('ean 13', barcode.data);
            this.loadingDrink = false;
            Toast.show('async func done', {
                duration: Toast.durations.SHORT,
            });
        } else {
            console.log('barcode', barcode)
            Toast.show('Unkown barcode' +  barcode.type, {
                duration: Toast.durations.SHORT,
            });
        }
    }   

    promptDrinkAdding() {
        Alert.alert(
            'New beverage found!',
            `Looks like you found a beverage that no one else has added yet!
            Do you want to add the beverage so that everyone can find it?`,
            [
            {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: false }
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

