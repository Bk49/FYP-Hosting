import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView } from "react-native";
import SideBar from "../../common/side-navigations/Sidebar";
import AssignmentAccordian from "../../assignment-components/AssignmentAccordion";
import AssignmentBox from "../../assignment-components/AssignmentItem";
import NewQuizModal from "../../group-components/assignment/GroupAssignQuizModal";
import getAssignmentBox from "../../../axios/assignment-api/retrieveAssignment";
import { List } from "react-native-paper";

export default Assignment = () => {

    return (     
        <View style={styles.container}>
            <SideBar></SideBar>
            <ScrollView style={styles.scrollView}> 
            <View style={styles.Assignment}>
                <View>
                    <Text style={styles.heading}>My Assignments</Text>
                </View>
                
                <List.Section>
                <View style={styles.styledAccordian}>
                    <AssignmentAccordian></AssignmentAccordian>
                </View>
              
                </List.Section>
               
            </View>
            </ScrollView>
            <NewQuizModal></NewQuizModal>
            {/* <View style={styles.AssignmentBox}>
                <AssignmentBox></AssignmentBox>
            </View> */}
            
        </View>
       
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },

    heading: {
        marginTop: 50,
        textAlign: "center",
        marginBottom: 15,
        fontSize: 36,
        fontWeight: '500',
        fontFamily: 'Coolvetica'
    },

    Assignment: {
        flex: 1,
    
    },

    // AssignmentBox: {
    //     flex: 2, 
    //     backgroundColor: "beige",
    //     borderWidth: 5,
    //     width: 100, 
    //     height: 50,
    //     backgroundColor: 'powderblue'
    // },

    styledAccordian: {
        flex: 1,
        marginTop: 100,
        
        
    }

});

