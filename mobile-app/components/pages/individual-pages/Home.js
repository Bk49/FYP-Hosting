import React from "react";
import { Button, View, Text, StyleSheet } from "react-native";
import { useNavigate } from "react-router-native";

export default Home = () => {
    const navigate = useNavigate();
    return (
        <View style={styles.container}>
            <Text>Home Page!</Text>
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.button}
                    title="Login"
                    onPress={() => navigate("Login")}
                />
                <Button
                    style={styles.button}
                    title="Sign Up"
                    onPress={() => navigate("SignUp")}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    buttonContainer: {
        width: 500,
        height: 300,
    },
});
