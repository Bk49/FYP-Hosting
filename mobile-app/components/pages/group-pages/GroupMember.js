import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import SideBar from "../../common/side-navigations/Sidebar"
import GroupTopbar from "../../common/group/topbar-component/GroupTopbar";
import { useLocation } from "react-router-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from 'react-native-loading-spinner-overlay';
import GroupMemberAccordion from "../../group-components/member/GroupMemberAccordion";
import getGroupMembers from "../../../axios/group-api/getGroupMembers";
import GroupManageModal from "../../group-components/member/GroupManageModal";

export default GroupMember = () => {

    const getUserData = async () => {
        const data = await AsyncStorage.getItem("userInfo");
        return JSON.parse(data)
    };

    const {state} = useLocation();
    const [isReady, setReady] = useState(true);
    const [modal, setModal] = useState();
    const [needsUpdate, setUpdate] = useState(0);
    const [groupImg, setGroupImg] = useState(state.groupImg);

    useEffect(() => {
        let ownerId;

        getGroupMembers(state.groupId)
        .then((data) => {
            ownerId = data.owner._id;
            getUserData()
            .then((data) => {
                if (data._id == ownerId) {
                    setModal(<GroupManageModal groupId={state.groupId} group_name={state.groupName} setUpdate={setUpdate} groupImg={groupImg} setGroupImg={setGroupImg}></GroupManageModal>)
                }
            });
        })
    }, [needsUpdate]);

    return (
        <View style={styles.container}>
            <Spinner visible={isReady} textContent="Loading..."></Spinner>
            <SideBar></SideBar>
            <View style={styles.memberContainer}>
                <GroupTopbar item={3} heading={"Members"} groupId={state.groupId} groupName={state.groupName} groupImg={groupImg}></GroupTopbar>
                <ScrollView>
                    <View style={styles.contentContainer}>
                        <GroupMemberAccordion state={state} loading={setReady} update={needsUpdate}></GroupMemberAccordion>
                    </View> 
                </ScrollView>
                {modal}
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
    memberContainer: {
        flex: 1
    },
    contentContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        flex: 1,
    },
});