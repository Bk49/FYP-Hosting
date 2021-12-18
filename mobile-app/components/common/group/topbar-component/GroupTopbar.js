import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'

const GroupTopbar = () => {

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Image style={styles.groupImg} source={require("../../../../assets/sample_groupimg.png")}></Image>
                <Text style={styles.itemHeading}>Announcements</Text>
            </View>
            <View style={styles.menu}>
                <FontAwesome5 name="bars" size={24} color="black" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        backgroundColor: '#F2F2F2',
        paddingVertical: 10,
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        alignItems: 'center'
    },
    groupImg: {
        width: 50,
        height: 50,
    },
    itemHeading: {
        fontSize: 30,
        fontWeight: '700',
        marginLeft: 10,
        fontFamily: "PoppinsRegular"
    },
    leftContainer: {
        display: 'flex',
        flexDirection: 'row',
    },

})

export default GroupTopbar;