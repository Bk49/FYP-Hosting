import React from "react";
import { StyleSheet } from "react-native";
import { List } from 'react-native-paper';
import { FontAwesome5 } from '@expo/vector-icons'; 

const GroupMemberItem = ({username}) => {

    return (
        <List.Item title={username} titleStyle={styles.memberLabel}
        left={props => <FontAwesome5 style={styles.userIcon} name="user-circle" size={30}></FontAwesome5>} />    
    )
};

const styles = StyleSheet.create({
    userIcon: {
        marginLeft: 20,
        marginRight: 10,
        marginVertical: 5,
    },
    memberLabel: {
        fontSize: 20
    }
});

export default GroupMemberItem;