import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { List } from 'react-native-paper';
import ControlNestedTableRow from "./ControlNestedTableRow";

export default ControlAccordion = ({topic}) => {

    let arrow = "chevron-right";

    function editTopic() {
        console.log("editting topics")
    }

    return (
        <View>
            <List.Accordion
                left={props => <List.Icon {...props} icon={arrow} />}
                right={props => <Text></Text>}
                title={topic.topic_name}
                titleStyle={styles.itemLabel}
                style={styles.listItem}
                onPress={() => {
                    arrow = arrow === "chevron-right" ?  "chevron-down" : "chevron-right"
                }}
                onLongPress={() => {
                    // editTopic();
                }}>
                {topic.skills.length > 0 ?
                    
                <ControlNestedTableRow topic={topic}></ControlNestedTableRow>

                : <View></View>}
            </List.Accordion>
            
        </View>
    );
};

const styles = StyleSheet.create({
    itemLabel: {
        fontWeight: 'bold',
        fontSize: 25,
        color: 'black',
    },
    listItem: {
        backgroundColor:'white',
        borderBottomColor: '#eee',
        borderBottomWidth: 1,
    },
    editTopicIcon: {
        position: 'absolute',
        justifyContent: 'center',
        bottom: 0,
        marginHorizontal: 73,
        top: 0,
        textAlignVertical: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
});
