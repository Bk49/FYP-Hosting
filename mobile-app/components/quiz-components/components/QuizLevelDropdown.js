import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, Image } from "react-native";
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import getLevel from "../../../axios/level-api/getLevel";
import { useNavigate } from "react-router-native";
import SelectDropdown from 'react-native-select-dropdown'


export default QuizLevelDropdown = ({levels}) => {
    const navigate = useNavigate()
    const [skills, setSkills] = useState([]);
    // const topicNames = [
    //     { label: 'parent', value: 'parent' },
    //     { label: 'Teacher', value: 'teacher' },
    //     { label: 'Student', value: 'student' },
    // ];
    // console.log(levels);
    // for (let y = 0; y < levels.length; y++) {
    //     for (let i = 0; i < levels[y].topics.length; i++) {
    //         console.log("topics");
    //         console.log(levels[y].topics[i].skills);
    //         for (let x = 0; x < levels[y].topics[i].skills.length; i++) {
    //             console.log(levels.topics[i].skills[x].skill_code)
    //         }
    //     }
    // }

    const countries = ["Egypt", "Canada", "Australia", "Ireland"]

    useEffect(() => {
        let skillsJson;
        let skillsArray = [];

        for (let i = 0; i < levels.topics.length; i++) {
            skillsJson = levels.topics[i].skills;
        }

        if (skillsJson.length == 0) {
            skillsArray.push("No topics available")
        }
        else {
            for (let i = 0; i < skillsJson.length; i++) {
                skillsArray.push(skillsJson[i].skill_name);
            }
        }

        setSkills(skillsArray);

    }, [])

    return (
        <View>
            <SelectDropdown
                data={skills}
                defaultButtonText= {"Primary " + levels.level}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return "Primary " + levels.level
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}
            />
            {/* <Text style={styles.text}  onPress={() => navigate("/QuizInstruction")}>{levels.level > 0 && levels.level < 7 ? "Primary" : "Secondary"} {levels.level}</Text>
            {levels.topics.length <= 0 ? <Text>No topics available</Text> : levels.topics.map((topic, index) => (console.log("test")))} */}
            {/* <View style={styles.dropdown}>
                <Dropdown
                    containerStyle={styles.shadow}
                    data={role}
                    labelField="label"
                    valueField="value"
                    label="Dropdown"
                    placeholder="Select"
                    value= ""
                    onChange={item => {

                    }} />
            </View> */}
        </View>
        
    )
}

const styles = StyleSheet.create({
    text: {
        fontSize: 30,
        alignSelf: 'center',
        alignContent: 'center',
        alignItems: 'center'
    }
})