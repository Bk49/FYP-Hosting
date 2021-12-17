import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'
import GroupSidebarItem from '../sidebar-component/GroupSidebarItem';

const GroupSidebar = () => {
    return (
        <View style={styles.container}>
            <View style={styles.upperContainer}>
                <View>
                    <FontAwesome5 name="times" size={30} color="black" />
                </View>
                <View>
                    <Image style={styles.groupImg} source={require("../../../../assets/sample_groupimg.png")}></Image>
                </View>
                <View>
                    <Text style={styles.groupName}> Math4Life</Text>
                </View>
                <View style={styles.line}></View>
            </View>
            <GroupSidebarItem></GroupSidebarItem>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E9E7FA',
        paddingVertical: 15,
        alignItems: 'flex-start',
        alignSelf: 'flex-end'
    },
    groupImg: {
        width: 150,
        height: 150,
        marginTop: 30,
        marginBottom: 17
    },
    groupName: {
        fontSize: 30,
        fontWeight: '700'
    },
    line: {
        borderBottomColor: '#BE94F4',
        borderBottomWidth: 1,
        width: 260,
        marginTop: 30,
        marginBottom: 15
    },
    upperContainer: {
        marginHorizontal: 20
    }
})

export default GroupSidebar;