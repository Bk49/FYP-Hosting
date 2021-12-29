import React from "react";
import { View, StyleSheet } from "react-native";
import GroupTopbar from "../../common/group/topbar-component/GroupTopbar";
import SideBar from "../../common/side-navigations/Sidebar";
import { useLocation } from "react-router-native";

export default GroupAssignment = () => {
    const {state} = useLocation();

    return (
        <View style={styles.container}>
            <SideBar></SideBar>
            <View style={styles.assignmentContainer}>
                <GroupTopbar item={1} heading={"Group Assignments"} groupId={state.groupId} groupName={state.groupName} groupImg={state.groupImg}></GroupTopbar>
            </View>  
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    assignmentContainer: {
        flex: 1
    }
});