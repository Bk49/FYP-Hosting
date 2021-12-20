import React from "react";
import { View, StyleSheet, Text } from "react-native";
import SideBar from "../../common/side-navigations/Sidebar";

export default Overview = () => {
    return (
        <View style={styles.container}>
            <SideBar></SideBar>
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
