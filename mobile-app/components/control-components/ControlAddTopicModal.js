import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default ControlAddTopicModal = () => {

    return (
        <TouchableOpacity style={styles.addTopicBtn}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: "bold"}}>Add Topic</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    addTopicBtn: {
        backgroundColor: '#6696ca',
        paddingVertical: 8, 
        paddingHorizontal: 30,
        alignSelf: 'center',
        borderRadius: 7,
        marginTop: 30
    }
});
