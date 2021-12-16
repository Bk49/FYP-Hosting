import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";

export default SignUp = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>SignUp Page</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003744',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color:'white',
    }
})