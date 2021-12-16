import React from "react";
import { Button,View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/stack';

export default Home = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text>Home Page!</Text>
            <View style={styles.buttonContainer}>
                <Button style={styles.button} title="Login" onPress={() => navigation.push('Login')}/>
                <Button style={styles.button} title="Sign Up" onPress={() => navigation.navigate('SignUp')}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        width: 500,
        height: 300,
    },
})