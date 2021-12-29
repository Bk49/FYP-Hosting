import React from "react";
import { View, Text, Button, StyleSheet, ScrollView, Picker } from "react-native";
import { Title } from "react-native-paper";

const GroupAssignmentBox = () => {
  return (
    <View style={styles.view}>
      <View>
        <Title style={styles.assignmentTitle}>Group 1 Pending Assgn</Title>
        <Text style={styles.assignmentText}>Assigned By: Teacher Teacher (Group 1)</Text>
        <Text style={styles.skillsText}>Assigned By Fractions</Text>
      </View>

      <View style={{alignItems:'center'}}> 
        <Text style={styles.dateText}>Thu Dec 30 2021</Text>
        <Text style={styles.assignmentState}>Overdue</Text>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  view: {
    backgroundColor: 'white',
    height: 150,
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    marginHorizontal: 22,
    justifyContent: "space-between",
    flexDirection: "row",
  },

  assignmentTitle: {
    textDecorationLine: 'underline',
    marginTop: 17,
    marginLeft: 15,
    marginBottom: 15,
    fontFamily: 'Feather',
  },

  assignmentText: {
    marginLeft: 15,

  },

  dateText: {
    fontFamily: 'Poppins',
    marginLeft: 15,
    alignItems: 'flex-end',
    marginTop: 10,
    marginRight: 10,
  },

  assignmentState: {
    color: '#FF5A5A',
    backgroundColor: '#F3C5C5',
    marginLeft: 15,
    width: 70,
    alignItems: 'flex-end',
    borderColor: '#F3C5C5',
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 4,
  },

  skillsText: {
    color: '#63A6E4',
    backgroundColor: '#EBF0FF',
    marginTop: 15,
    marginLeft: 15,
    width: 145,
    borderWidth: 1,
    borderColor: '#EBF0FF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 3,
  },

});

export default GroupAssignmentBox;