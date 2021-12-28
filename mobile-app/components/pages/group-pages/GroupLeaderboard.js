import React from "react";
import { View, StyleSheet } from "react-native";
import SideBar from "../../common/side-navigations/Sidebar";
import GroupTopbar from "../../common/group/topbar-component/GroupTopbar";
import { useLocation } from "react-router-native";

export default GroupLeaderboard = () => {

    const {state} = useLocation();

    return (
        <View style={styles.container}>
            <SideBar></SideBar>
            <View style={styles.leaderboardContainer}>
                <GroupTopbar item={4} heading={"Group Leaderboard"} groupId={state.groupId} groupName={state.groupName} groupImg={state.groupImg}></GroupTopbar>
            </View>  
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    leaderboardContainer: {
        flex: 1
    }
});