import React, { Component } from "react";
import { Button, TextInput, Image, View, Text, StyleSheet } from "react-native";
import { Cambria, Feather, Poppins, Coolvetica } from "@expo/vector-icons";
import { render } from "react-dom";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { email: '', password: '' };
    }
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={require('../../../assets/Psleonline_logo_with_background.jpg')}></Image>
                <Text style={styles.text}>Log In</Text>
                <TextInput style={styles.input} placeholder="Email" onChangeText={(email) => this.setState({ email })} value={this.state.email} />
                <TextInput style={styles.input} placeholder="Password" onChangeText={(password) => this.setState({ password })} value={this.state.password} />
                <View style={styles.buttonContainer}><Button title="Login" /></View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003744',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        bottom: 50,
        fontSize: 25,
    },
    image: {
        width: 500,
        resizeMode: 'contain',
    },
    input: {
        borderRadius: 15,
        backgroundColor: 'white',
        width: 375,
        height: 40,
        marginTop: 10,
        bottom: 25,
        padding: 10,
    },
    buttonContainer:{
        width: 375,
        borderRadius: 15,
    }
})

export default Login;