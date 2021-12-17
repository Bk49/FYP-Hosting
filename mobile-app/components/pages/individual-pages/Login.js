import React, { useState } from "react";
import { useNavigate } from "react-router-native";
import {
    Button,
    TextInput,
    Image,
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
} from "react-native";
import login from "../../../axios/user-api/login";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    let navigate = useNavigate();

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <Image
                style={styles.image}
                source={require("../../../assets/Psleonline_logo_with_background.jpg")}
            ></Image>
            <Text style={styles.text}>Log In</Text>
            <Text style={styles.error}>{errorMsg}</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(e) => setEmail(e)}
                value={email}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                onChangeText={(e) => setPassword(e)}
                value={password}
            />
            <View style={styles.buttonContainer}>
                <Button
                    title="Login"
                    onPress={() => {
                        login({
                            email: email,
                            password: password,
                            rememberMe: true,
                        })
                            .then(({ user }) => {
                                const { role } = user;
                                if (role === "admin") navigate("/control");
                                else navigate("/overview");
                            })
                            .catch((e) => {
                                if (Array.isArray(e)) setErrorMsg(e.error[0]);
                                else setErrorMsg(e.error);
                            });
                    }}
                />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#003744",
        alignItems: "center",
    },
    text: {
        color: "white",
        bottom: 50,
        fontSize: 25,
    },
    error: {
        color: "red",
        width: 200,
        height: 50,
        fontSize: 15,
    },
    image: {
        width: 500,
        resizeMode: "contain",
    },
    input: {
        borderRadius: 15,
        backgroundColor: "white",
        width: 375,
        height: 40,
        marginTop: 10,
        bottom: 25,
        padding: 10,
    },
    buttonContainer: {
        width: 375,
        borderRadius: 15,
    },
});

export default Login;
