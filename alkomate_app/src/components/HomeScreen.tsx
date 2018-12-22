import React, { Component } from "react";
import { Text, SafeAreaView, View, TouchableOpacity, StyleSheet } from "react-native";
import ListScreen from "./ListScreen";
import { RNCamera } from 'react-native-camera';

interface Props {

}

export default class App extends Component<Props> {
    camera?: RNCamera | null;

    constructor(props: Props) {
        super(props);
        this.takePicture = this.takePicture.bind(this)
    }
    render() {
        return(
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
                    onBarCodeRead={barCode => console.log('barcode read',barCode )}
                   
                />
                <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
                    <TouchableOpacity
                        onPress={this.takePicture}
                        style = {styles.capture}
                    >
                        <Text style={{fontSize: 14}}> SNAP </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }

    
    takePicture = async function() {
        console.log('picture taken');
        /*
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options)
            console.log(data.uri);
        }
        */
    };
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
