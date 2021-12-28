import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from "react-native";
import Sidebar from "../../common/side-navigations/Sidebar";
import Headers from "../../common/headers/Header";
import LearningResourcesTitle from "../../learning-resources-components/LearningResourcesTitle";
import LearningResourcesLevelButton from "../../learning-resources-components/LearningResourcesLevelButton";
import LearningResourcesSchoolItem from "../../learning-resources-components/LearningResourcesSchoolItem";

export default LearningResourcesLevel = () => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Sidebar></Sidebar>
                <ScrollView style={{flexDirection: 'column'}}>
                    <Headers text={"Learning Resources"}></Headers>

                    <View style={{flexDirection: 'row', paddingHorizontal: 30, paddingTop: 20, justifyContent: 'space-evenly'}}>
                        <LearningResourcesSchoolItem imageURL={require('../../../assets/Dunman_High_School.png')}></LearningResourcesSchoolItem>
                        <LearningResourcesSchoolItem imageURL={require('../../../assets/Hwa_Chong_Institution.png')}></LearningResourcesSchoolItem>
                        <LearningResourcesSchoolItem imageURL={require('../../../assets/Raffles_Institution.png')}></LearningResourcesSchoolItem>
                    </View>
                    <View style={{flexDirection: 'row', paddingHorizontal: 30, paddingTop: 20, paddingBottom: 50, justifyContent: 'space-evenly'}}>
                        <LearningResourcesSchoolItem imageURL={require('../../../assets/Anderson_Secondary_School.png')}></LearningResourcesSchoolItem>
                        <LearningResourcesSchoolItem imageURL={require('../../../assets/Singapore_Chinese_Girls_School.png')}></LearningResourcesSchoolItem>
                        <LearningResourcesSchoolItem imageURL={require('../../../assets/Chong_Cheng_High_Secondary.jpg')}></LearningResourcesSchoolItem>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: '100%'
    }
})
