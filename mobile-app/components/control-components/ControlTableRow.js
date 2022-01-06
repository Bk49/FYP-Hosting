import React, {useState} from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default ControlTableRow = ({skill}) => {

    const [icon, setIcon] = useState("plus")

    function displaySkills() {
        if (icon == "plus") {
            setIcon("minus");
        }
        else {
            setIcon("plus");
        }
    }

    return (
        <View>
            <View style={[styles.row]}>
                <View style={[styles.cellSpace, {flex: 1, alignItems: 'center'}]}>
                    <TouchableOpacity onPress={() => displaySkills()}>
                        <FontAwesome5 name={icon} size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <Text style={[styles.cellSpace, {flex: 4}]}>{skill.skill_name}</Text>
                <Text style={[styles.cellSpace, {flex: 2}]}>{skill.skill_code}</Text>
                <Text style={[styles.cellSpace, {flex: 2, textAlign: 'center'}]}>{skill.num_of_qn}</Text>
                <Text style={[styles.cellSpace, {flex: 2, textAlign: 'center'}]}>{skill.duration}</Text >
                <View style={[styles.cellSpace, {flex: 1, alignItems: 'center'}]}>
                    <TouchableOpacity>
                        <FontAwesome5 name="pen" size={24} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
            {icon != "plus" ? 
            <View style={{borderRadius: 7, marginHorizontal: 20, backgroundColor: '#b1dbff'}}>
                <View style={{flexDirection: 'row', backgroundColor: '#2a2a72', borderTopRightRadius: 7, borderTopLeftRadius: 7, paddingHorizontal: 15, paddingVertical: 5}}>
                    <Text style={{flex: 3, color: 'white'}}>Difficulty</Text>
                    <Text style={{flex: 3, color: 'white'}}>Min. Range</Text>
                    <Text style={{flex: 3, color: 'white'}}>Max. Range</Text>
                    <Text style={{flex: 3, color: 'white'}}>Weightage</Text>
                </View>
                <View style={{flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 5}}>
                    <Text style={{flex: 3}}>Easy</Text>
                    <Text style={{flex: 3}}>{skill.easy_values.min}</Text>
                    <Text style={{flex: 3}}>{skill.easy_values.max}</Text>
                    <Text style={{flex: 3}}>{skill.percent_difficulty.substring(0, 2)}</Text>
                </View>
                <View style={{flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 5}}>
                    <Text style={{flex: 3}}>Medium</Text>
                    <Text style={{flex: 3}}>{skill.medium_values.min}</Text>
                    <Text style={{flex: 3}}>{skill.medium_values.max}</Text>
                    <Text style={{flex: 3}}>{skill.percent_difficulty.substring(3, 5)}</Text>
                </View>
                <View style={{flexDirection: 'row', paddingHorizontal: 15, paddingVertical: 5}}>
                    <Text style={{flex: 3}}>Hard</Text>
                    <Text style={{flex: 3}}>{skill.difficult_values.min}</Text>
                    <Text style={{flex: 3}}>{skill.difficult_values.max}</Text>
                    <Text style={{flex: 3}}>{skill.percent_difficulty.substring(6, 8)}</Text>
                </View>
            </View> : 
            <View></View>}
        </View>
      
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 20
    },
    row: {
        flexDirection: 'row',
        flex: 12
    },
    cellSpace: {
        fontSize: 20,
        margin: 10,
        alignSelf: 'center'
    },
});
