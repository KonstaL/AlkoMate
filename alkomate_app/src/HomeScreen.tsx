import React, { Component } from "react";
import { Text, SafeAreaView } from "react-native";
import ListScreen from "./ListScreen";

interface Props {

}

export default class App extends Component<Props> {
    render() {
        return(
            <SafeAreaView>
                <ListScreen/>
            </SafeAreaView>
        )
    }
}
