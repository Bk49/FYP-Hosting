import React, { useEffect, useState } from "react";
import { List } from 'react-native-paper';
import { View, Text, Button, StyleSheet, ScrollView, Picker } from "react-native";
import { over } from "lodash";
import GroupAssignmentBox from "./GroupAssignmentItem";


const GroupAssignmentAccordian = () => {
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  const [overduearrow,setoverduearrow] = useState("chevron-right")

  const [pendingarrow,setpendingarrow] = useState("chevron-right")

  const [completedarrow,setcompletedarrow] = useState("chevron-right")

  function toggleArrow(arrow,setarrow) {
    if (arrow == "chevron-right") {
      setarrow("chevron-down")
    } else {
      setarrow("chevron-right")
    }
  }

  return (

    <List.Section style={styles.Section}>

      <List.Accordion style={styles.List}
        title="Overdue Assignments"
        titleStyle = {styles.Title}
        onPress={() => {toggleArrow(overduearrow,setoverduearrow)}}
        left={props => <List.Icon {...props} icon={overduearrow} />}
        right={props => <Text></Text>}>
       <AssignmentBox></AssignmentBox>
      </List.Accordion>

      <List.Accordion style={styles.List}
        title="Pending Assignments"
        titleStyle = {styles.Title}
        onPress={() => {toggleArrow(pendingarrow,setpendingarrow)}}
        left={props => <List.Icon {...props} icon={pendingarrow} />}
        right={props => <Text></Text>}>    
        <AssignmentBox></AssignmentBox>
      </List.Accordion>

      <List.Accordion style={styles.List}
        title="Completed Assignments"
        titleStyle = {styles.Title}
        onPress={() => {toggleArrow(completedarrow,setcompletedarrow)}}
        left={props => <List.Icon {...props} icon={completedarrow} />}
        right={props => <Text></Text>}>    
        <AssignmentBox></AssignmentBox>
      </List.Accordion>
    </List.Section>



  );
};

const styles = StyleSheet.create({
  container: {

    flexDirection: 'row',
  },
  Test: {

    marginTop: 50,
    marginBottom: 15,
  
    alignItems: 'center',
   
  },
  List: {

   

  },
  Section: {
    marginHorizontal: 50,
  },

  Title: {
    color: 'black',
  }
});

export default GroupAssignmentAccordian;