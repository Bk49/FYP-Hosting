import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, Header, TouchableOpacity } from 'react-native';
import { Entypo, FontAwesome5, Feather, Ionicons } from '@expo/vector-icons'; 
import { useNavigate } from "react-router-native";
import SidebarItem from './SidebarItem';
import client from "../../../axios/clientConfig"
import path from "../../../axios/paths";
import AsyncStorage from "@react-native-async-storage/async-storage";
import login from '../../../axios/user-api/login';


export default Sidebar = ({currentPage}) => {

    const navigate = useNavigate();
    const [sideBar, setSideBar] = useState();
    const [data, setData] = useState();
    // 1. get the role of the user
    // 2. render sidebar based on user's role
    const getUserData = async () => {
        const data = await AsyncStorage.getItem("userInfo");
        return JSON.parse(data)
    };  

    useEffect(() => {
        console.log(currentPage === "Overview")
        getUserData()
        .then((data) => {
            setData(data);
            if (data.role == "teacher" || data.role == "parent") {
                setSideBar(
                    <View>
                        <SidebarItem isHere={(currentPage === "Groups")} icon={<FontAwesome5 name="users" size={24} color="black" />} text={" My Groups"}></SidebarItem>
                        <SidebarItem isHere={(currentPage === "Leaderboard")} icon={<FontAwesome5 name="award" size={24} color="black" />} text=" Leaderboard"></SidebarItem>
                        <SidebarItem isHere={(currentPage === "Learning Resources")} icon={<FontAwesome5 name="newspaper" size={24} color="black" />} text=" Learning Resources"></SidebarItem>
                    </View>
                )
            }
            else if (data.role == "student") {
                setSideBar(
                    <View>
                        <SidebarItem isHere={currentPage} icon={<Entypo name="home" size={24} color="black" />} text={" Overview"}></SidebarItem>
                        <SidebarItem isHere={currentPage} icon={<FontAwesome5 name="atom" size={24} color="black" />} text={" Quiz"}></SidebarItem>
                        <SidebarItem isHere={currentPage} icon={<Feather name="clipboard" size={24} color="black" />} text={" Assignments"}></SidebarItem>
                        <SidebarItem isHere={currentPage} icon={<FontAwesome5 name="users" size={24} color="black" />} text={" My Groups"}></SidebarItem>
                        <SidebarItem isHere={currentPage} icon={<FontAwesome5 name="chart-bar" size={24} color="black" />} text=" My Statistics"></SidebarItem>
                        <SidebarItem isHere={currentPage} icon={<FontAwesome5 name="award" size={24} color="black" />} text=" Leaderboard"></SidebarItem>
                        <SidebarItem isHere={currentPage} icon={<FontAwesome5 name="newspaper" size={24} color="black" />} text=" Learning Resources"></SidebarItem>
                    </View>
                )
            }
            else if (data.role == "admin") {
                setSideBar(
                    <View>
                        <SidebarItem isHere={(currentPage === "Quiz Control Panel")} icon={<Ionicons name="settings" size={24} color="black" />} text={" Quiz Control Panel"}></SidebarItem>
                        <SidebarItem isHere={(currentPage === "Leaderboard")} icon={<FontAwesome5 name="award" size={24} color="black" />} text={" Leaderboard"}></SidebarItem>
                    </View>
                )
            }
        });   
    }, [])

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../../assets/Psleonline_logo_transparent.png')}></Image>    
            {sideBar}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#E1F1FF',
        height: '100%',
        width: '25%',
        paddingTop: 10,
        
    },
    buttons: {
        paddingVertical: 5
    },
    buttonText: {
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

