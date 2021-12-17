import React from "react";
import { View, StyleSheet, Text } from "react-native";

export default Overview = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>This is Overview</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "black",
        bottom: 50,
        fontSize: 25,
    },
});
