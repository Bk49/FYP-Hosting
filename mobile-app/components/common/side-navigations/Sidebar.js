import React from 'react';
import { StyleSheet, Text, View, Image, Header } from 'react-native';
import { Entypo, FontAwesome5, Feather } from '@expo/vector-icons'; 
import { useNavigate } from "react-router-native";

const SideBar = () => {

    const navigate = useNavigate();

    return(
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../../assets/Psleonline_logo_transparent.png')}></Image>     
            <Text style={styles.text}><Entypo name="home" size={24} color="black" /> Overview</Text>
            <Text style={styles.text}><FontAwesome5 name="atom" size={24} color="black" /> Quiz</Text>
            <Text style={styles.text}><Feather name="clipboard" size={24} color="black" /> Assignments</Text>
            <Text style={styles.text}><FontAwesome5 name="users" size={24} color="black" /> My Groups</Text>
            <Text style={styles.text} onPress={() => navigate("/stats")}><FontAwesome5 name="chart-bar" size={24} color="black" /> My Statistics</Text>
            <Text style={styles.text}><FontAwesome5 name="award" size={24} color="black" /> Leaderboard</Text>
            <Text style={styles.text}><FontAwesome5 name="newspaper" size={24} color="black" /> Learning Resources</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E1F1FF',
        height: '100%',
        width: '25%',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        alignSelf:'flex-start'
    },
    text: {
        // fontFamily: 'Poppins_400Regular',
        fontSize: 25,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    image: {
        width: '100%',
        height: '10%',
    }
})

export default SideBar;