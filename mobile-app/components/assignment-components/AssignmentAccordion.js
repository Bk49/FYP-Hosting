import React, { useEffect, useState } from "react";
import { List } from 'react-native-paper';
import { View, Text, Button, StyleSheet, ScrollView, Picker } from "react-native";
import { over, set } from "lodash";
import AssignmentBox from "./AssignmentItem";
import getAssignmentBox from "../../axios/assignment-api/getAssignment";
import Assignment from "../pages/individual-pages/Assignment";


const AssignmentAccordian = () => {
  const [expanded, setExpanded] = React.useState(true);
  const handlePress = () => setExpanded(!expanded);
  const [overduearrow, setoverduearrow] = useState("chevron-right")
  const [pendingarrow, setpendingarrow] = useState("chevron-right")
  const [completedarrow, setcompletedarrow] = useState("chevron-right")
  const [getOverdueAssignments, setOverdueAssignments] = useState();
  const [getPendingAssignments, setPendingAssignments] = useState();
  const [getCompletedAssignments, setCompletedAssignments] = useState();
  const [getoverdueTitle, setoverdueTitle] = useState();
  const [overdueCount, setoverdueCount] = useState(0);
  const [assignmentAccordian, setassignmentAccordian] = useState();

  function displayAllAssignments(data) {
    var assignmentDeadline = new Date(data.deadline);
    var currentDateTime = new Date();

    if (data.completed_quiz == false) {
      if (currentDateTime > assignmentDeadline == false) {
        //pending assignments      
        setPendingAssignments(prevState => [prevState, <AssignmentBox post={data} assignmentStatus="Pending"></AssignmentBox>])
      } else {
        setOverdueAssignments(prevState => [prevState, <AssignmentBox post={data} assignmentStatus="Overdue"></AssignmentBox>])
        setoverdueCount(prevState => prevState + 1)
        console.log("passed")
        console.log(overdueCount)
      }
    }
    else if (data.completed_quiz) {
      setCompletedAssignments(prevState => [prevState, <AssignmentBox post={data} assignmentStatus="Completed"></AssignmentBox>])
    }
  }

  function displayAccordion() {
    setassignmentAccordian();
    for (let k = 0; k < 3; k++) {
     
      let title;
      let arrow;
      let setArrow;
      let getAssignment;

      switch (k) {
        case 0:
          title = "Overdue Assignment";
          arrow = overduearrow;
          setArrow = setoverduearrow;
          getAssignment = getOverdueAssignments;
          break;

        case 1:
          title = "Pending Assignment";
          arrow = pendingarrow;
          setArrow = setpendingarrow;
          getAssignment = getPendingAssignments;
          break;

        case 2:
          title = "Completed Assignment";
          arrow = completedarrow;
          setArrow = setcompletedarrow;
          getAssignment = getCompletedAssignments;
          break;
      }
      console.log("bye")
      console.log(getCompletedAssignments)
      setassignmentAccordian(
        prevState => [prevState,
          <List.Accordion style={styles.List}
            title={title}
            titleStyle={styles.Title}
            onPress={() => { toggleArrow(arrow, setArrow) }}
            left={props => <List.Icon {...props} icon={arrow} />}
            right={props => <Text></Text>}>
            {getAssignment}
          </List.Accordion>
        ]
      )
    }
  }

  useEffect(() => {

    getAssignmentBox()
      .then((data) => {
        console.log(data)
        // displayAllAssignments(data)
        setOverdueAssignments()
        setPendingAssignments()
        setCompletedAssignments()
        setoverdueTitle();
        setoverdueCount(0);
        for (let i = 0; i < data.length; i++) {
          displayAllAssignments(data[i]);
          console.log(data[i])
        }
        setoverdueTitle("Overdue Assignments (" + overdueCount + ")")
      })
  }, [])

  function toggleArrow(arrow, setarrow) {
    if (arrow == "chevron-right") {
      setarrow("chevron-down")
    } else {
      setarrow("chevron-right")
    }
  }

  return (

    <List.Section  onLayout={() => displayAccordion()} style={styles.Section}>
      {assignmentAccordian}
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
    backgroundColor: 'white'
  },
  Section: {
    marginHorizontal: 50,
  },

  Title: {
    color: 'black',
  }
});

export default AssignmentAccordian;