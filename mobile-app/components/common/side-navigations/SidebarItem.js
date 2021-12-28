import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Header, TouchableOpacity, Pressable, Touchable } from 'react-native';
import { Entypo, FontAwesome5, Feather } from '@expo/vector-icons';
import { useNavigate } from "react-router-native";

export default SidebarItem = (item, { isHere }) => {
    const navigate = useNavigate();
    const [checked, toggleChecked] = useState(false);
    const [color, setColor] = useState(item.text.trim() === isHere ? '#FFFFFF' : '#E1F1FF');
    console.log(item.text.trim() + item.text.trim() === isHere);
    const navigatePage = () => {
        if (item.text.includes("Overview")) {
            navigate("/Overview");
        }
        else if (item.text.includes("Quiz")) {
            navigate("/Quiz");
        }
        else if (item.text.includes("Assignments")) {
            navigate("/Assignment")
        }
        else if (item.text.includes("My Groups")) {
            navigate("/");
        }
        else if (item.text.includes("My Statistics")) {
            navigate("/Stats")
        }
        else if (item.text.includes("Leaderboard")) {
            navigate("/Leaderboard");
        }
        else if (item.text.includes("Learning Resources")) {
            navigate("/LearningResourcesLevel");
        }
        else if (item.text.includes("Quiz Control Panel")) {
            navigate("/")
        }
    }

    return (
        item.text.trim() === isHere ? (
            <View>
                <TouchableOpacity style={{ paddingVertical: 5, backgroundColor: '#E1F1FF' }} checked={checked} onPress={() => navigatePage()}>
                    <Text style={styles.buttonText}>{item.icon}{item.text}</Text>
                </TouchableOpacity>
            </View>)
            : (
                <View>
                    <TouchableOpacity style={{ paddingVertical: 5, backgroundColor: '#FFFFFF' }} checked={checked} onPress={() => navigatePage()}>
                        <Text style={styles.buttonText}>{item.icon}{item.text}</Text>
                    </TouchableOpacity>
                </View>)

    )
}


const styles = StyleSheet.create({
    buttonText: {
        // fontFamily: 'Poppins_400Regular',
        fontSize: 25,
        paddingTop: 10,
        marginLeft: 20,
        marginRight: 20,
    },
})