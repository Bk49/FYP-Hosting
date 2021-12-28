import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import Sidebar from "../../common/side-navigations/Sidebar";

export default Control = () => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Sidebar></Sidebar>
                <Text>This is Control</Text>
            </View>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: '100%'
    }
})