import React, {useEffect, useState} from "react";
import { View, StyleSheet, Text, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Sidebar from "../../common/side-navigations/Sidebar";
import Headers from "../../common/headers/Header";
import getAllQuizzes from "../../../axios/quiz-api/getAllQuizzes"
import getLevel from "../../../axios/level-api/getLevel";

export default Overview = () => {
    const [page, setPage] = useState();
    useEffect(() => { 
        getLevel()
        .then((data) => {
            // let vname;
            // let head = '';
            // let notes = [];
            // let end = '_name';
            // let topicsArray = [];
            // let level = '';
            // console.log("success fuck jeongsheng");
            // for (let i = 0; i < data.length; i ++) {
            //     if (data[i].level > 0 && data[i].level < 7) {
            //         head = "Primary "
            //     }
            //     else {
            //         head = "Secondary "
            //     }
            //     notes.push({
            //         "id": data[i]._id,
            //         "display": head + data[i][vname + end],
            //         "topic": data[i].topics,
            //         // "skill": data[i].topics[0]
            //     }) 
            // }
            if (data.length > 0) {
                setPage(
                    <View style={{flexDirection: 'column'}}>
                        <View style={styles.primaryContainer}>
                            <LinearGradient 
                            colors={['#7F7FD5', '#86A8E7', '#91EAE4']}>
                                <Text style={styles.headerText}>Primary</Text>
                                <Image style={styles.image} source={require('../../../assets/primary_img.png')}></Image>
                            </LinearGradient>
                        </View>
                    </View>
                );
            }

            else {
                setPage(
                    <Text style={{alignSelf: 'center', fontSize: 30}}>No Quiz Available</Text>
                )
            }
        })
    }, []);


    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Sidebar></Sidebar>
                <ScrollView style={{flexDirection: 'column'}}>
                    <Headers text={"Quiz"}></Headers>
                    {page}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: '100%'
    },
    primaryContainer: {
        height: 400,
        width: Dimensions.get('window').width * 0.3,
        paddingLeft: 30,
        borderRadius: 15
    },
    headerText: {
        fontSize: 30,
        color: '#FFFFFF',
        
        alignSelf: 'center'
    },
    image: {
        marginHorizontal: 20,
        
    }
});

