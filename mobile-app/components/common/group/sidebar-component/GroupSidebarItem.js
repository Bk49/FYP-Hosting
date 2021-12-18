import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient';

const GroupSidebarItem = () => {
    return (
        <View>
            <View style={styles.itemContainer}>
                <View style={styles.itemIcon}>
                    <FontAwesome5 name="bullhorn" size={24} color="#AF7CF1" />
                </View>
                <View>
                    <Text style={styles.text}> Announcements</Text>
                </View>
            </View>
            <View style={styles.itemContainer}>
                <View style={styles.itemIcon}>
                    <FontAwesome5 name="clipboard" size={24} color="#AF7CF1" />
                </View>
                <View>
                    <Text style={styles.text}> Group Assignments</Text>
                </View>
            </View>      
            <View style={styles.itemContainer}>
                <View style={styles.itemIcon}>
                    <FontAwesome5 name="question" size={24} color="#AF7CF1" />
                </View>
                <View>
                    <Text style={styles.text}> Ask a Question</Text>
                </View>
            </View>      
            <View style={styles.itemContainer}>
                <View style={styles.itemIcon}>
                    <FontAwesome5 name="users" size={24} color="#AF7CF1" />
                </View>
                <View>
                    <Text style={styles.text}> Members</Text>
                </View>
            </View>      
            <LinearGradient colors={['#6A3093', '#A044FF']} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={styles.itemContainer}>
                <View style={styles.itemIcon}>
                    <FontAwesome5 name="award" size={24} color="white" />
                </View>
                <View>
                    <Text style={[styles.text, {color: 'white'}]}> Group Leaderboard</Text>
                </View>
            </LinearGradient>  
            <View style={styles.itemContainer}>
                <View style={styles.itemIcon}>
                    <FontAwesome5 name="chart-bar" size={24} color="#AF7CF1" />
                </View>
                <View>
                    <Text style={styles.text}> Progress</Text>
                </View>
            </View>   
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        paddingRight: 10,
        color: '#AF7CF1'
    },
    itemContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    itemIcon: {
        width: 30,
        alignItems: 'center',
        alignSelf: 'center',
    },
})


export default GroupSidebarItem;