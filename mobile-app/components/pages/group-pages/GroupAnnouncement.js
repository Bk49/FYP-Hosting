import React, {useEffect, useState} from "react";
import { View, StyleSheet, TextInput, Image, Text, ScrollView } from "react-native";
import { useLocation, useSearchParams } from "react-router-native";
import GroupTopbar from "../../common/group/topbar-component/GroupTopbar";
import SideBar from "../../common/side-navigations/Sidebar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getGroupById from "../../../axios/group-api/getGroupById";

export default GroupAnnouncement = () => {
    const {state} = useLocation();
    const [msg, setMsg] = useState("")
    const [ownMsg, setOwnMsg] = useState();
    const [otherMsg, setOtherMsg] = useState();
    const [date, setDate] = useState();
    const [allMsg, setAllMsg] = useState();
    
    const getUserData = async () => {
        const data = await AsyncStorage.getItem("userInfo");
        return JSON.parse(data)
    };
    
    useEffect(() => {
        getUserData()
        .then((data) => {
            getGroupById(state.groupId)
                .then((result) => {
                    for (let i = 0; i < result.posts.length; i++) {
                        console.log(result)
                        if (result.posts[i].made_by == data._id) {
                            displayOwnMsg(result.posts[i]);    
                        }
                        else {
                            displayOtherMsg(result.post[i]);
                        }

                    }
                })
        });
        
    }, [])
    
    function displayOwnMsg(post) {
        setOwnMsg(
            <View style={styles.ownMsg}>
                <Text style={styles.msgOwner}>{post.sender_name}</Text>
                <Text style={styles.msgContent}>{post.content}</Text>
                <Text style={styles.msgTime}>{displayTime(post.created_at)}</Text>
            </View> 
        )
        appendMessage();
    }

    function displayOtherMsg(post) {
        appendMessage();
    }

    function appendMessage() {
        setAllMsg(ownMsg)
    }

    function displayTime(dt) {
        let time = new Date(dt);
        let hStr = ((time.getHours() < 10) ? "0" : "") + time.getHours();
        let mStr = ((time.getMinutes() < 10) ? "0" : "") + time.getMinutes();
    
        return hStr + ":" + mStr;
    }

    return (
        <View style={styles.container}>
            <SideBar></SideBar>
            <View style={styles.announcementContainer}>
                <GroupTopbar item={0} heading={"Announcements"} groupId={state.groupId} groupName={state.groupName} groupImg={state.groupImg}></GroupTopbar>
                <ScrollView>
                    <View style={styles.msgContainer}>
                        <Text style={styles.date}>27 December</Text>
{/*                         
                        <View style={styles.otherMsg}>
                            <Text style={styles.msgOwner}>Others</Text>
                            <Text style={styles.msgContent}>Content</Text>
                            <Text style={styles.msgTime}>Time</Text>
                        </View>
                        <View style={styles.otherMsg}>
                            <Text style={styles.msgOwner}>Others</Text>
                            <Text style={styles.msgContent}>Content</Text>
                            <Text style={styles.msgTime}>Time</Text>
                        </View>
                        <View style={styles.otherMsg}>
                            <Text style={styles.msgOwner}>Others</Text>
                            <Text style={styles.msgContent}>Content</Text>
                            <Text style={styles.msgTime}>Time</Text>
                        </View>
                        <View style={styles.otherMsg}>
                            <Text style={styles.msgOwner}>Others</Text>
                            <Text style={styles.msgContent}>Content</Text>
                            <Text style={styles.msgTime}>Time</Text>
                        </View>
                        <View style={styles.otherMsg}>
                            <Text style={styles.msgOwner}>Others</Text>
                            <Text style={styles.msgContent}>Content</Text>
                            <Text style={styles.msgTime}>Time</Text>
                        </View>
                        <View style={styles.otherMsg}>
                            <Text style={styles.msgOwner}>Others</Text>
                            <Text style={styles.msgContent}>Content</Text>
                            <Text style={styles.msgTime}>Time</Text>
                        </View>
                        <View style={styles.otherMsg}>
                            <Text style={styles.msgOwner}>Others</Text>
                            <Text style={styles.msgContent}>Content</Text>
                            <Text style={styles.msgTime}>Time</Text>
                        </View>
                        <View style={styles.otherMsg}>
                            <Text style={styles.msgOwner}>Others</Text>
                            <Text style={styles.msgContent}>Content</Text>
                            <Text style={styles.msgTime}>Time</Text>
                        </View> */}
                    </View>
                </ScrollView>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Message here, Shift + Enter to go to new line"
                        onChangeText={(e) => setMsg(e)}
                        value={msg}
                    />
                    <Image
                        style={styles.sendBtn}
                        source={require("../../../assets/send.png")}
                    ></Image>
                </View>
                
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        zIndex: 1
    },
    announcementContainer: {
        flex: 1
    },
    input: {
        borderWidth: 1,
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        fontSize: 20,
        width: 700,
    },
    sendBtn: {
        width: 35,
        height: 35,
        marginLeft: 20,
        alignSelf: 'center'
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 20,
        backgroundColor: 'white'
    },
    msgContainer: {
        width: 750,
        alignSelf: 'center',
    },
    date: {
        textAlign: 'center',
        marginVertical: 20,
        fontSize: 20
    },
    ownMsg: {
        padding: 10,
        backgroundColor: '#e1f1ff',
        alignSelf: 'flex-end',
        borderRadius: 12,
        borderBottomRightRadius: 0,
        paddingRight: 50,
        marginVertical: 10,
        marginRight: 40
    },
    msgOwner: {
        fontWeight: 'bold'
    },
    msgContent: {
        fontSize: 20
    },
    msgTime: {

    },
    otherMsg: {
        padding: 10,
        backgroundColor: '#e5e5e5',
        alignSelf: 'flex-start',
        borderRadius: 12,
        borderBottomLeftRadius: 0,
        paddingRight: 50,
        marginVertical: 10
    }
});