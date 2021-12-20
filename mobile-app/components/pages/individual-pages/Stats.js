import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, ScrollView, Picker } from "react-native";
import filter from "../../../axios/user-api/filter";
import detailedBenchmark from "../../../axios/user-api/detailedBenchmark";
import { FontAwesome5 } from '@expo/vector-icons'; 

import SideBar from "../../common/side-navigations/Sidebar";
import { BarChart } from 'react-native-chart-kit';
import comparisonBenchmark from "../../../axios/user-api/comparisonBenchmark";

export default Stats = () => {

    const[btn1Color, setBtn1Color] = useState("#0d6efd");
    const[btn1TxtColor, setBtn1TxtColor] = useState("white");

    const[btn2Color, setBtn2Color] = useState("white");
    const[btn2TxtColor, setBtn2TxtColor] = useState("#0d6efd");

    const [levels, setLevels] = useState([]);
    const [topics, setTopics] = useState([]);
    const [skills, setSkills] = useState([]);


    const[chart, setChart] = useState(<View style={styles.chartEmptyContainer}><FontAwesome5 style={styles.chartEmpty} name="chart-bar" size={100}></FontAwesome5><Text>Do a quiz to unlock!</Text></View>)
    
    const[levelsEnabled, setLevelsEnabled] = useState(false);
    const[topicsEnabled, setTopicsEnabled] = useState(false);
    const[skillsEnabled, setSkillsEnabled] = useState(false);

    const[selectedLevel, setLevel] = useState();

    const[benchmark, setBenchMark] = useState("detailed");

    useEffect(() => {
        filter()
        .then(( data ) => {
            if(data.length < 1) {
                console.log("sry no stats available");
            }
            else {
                insertDropdownData(data);
            }
        });

        detailedBenchmark("")
        .then(( data ) => {
            if (data.recent != undefined) {
                setChart();
                extractDetailedData(data);
            }
            else {

            }
        });
    }, []);

    function btnClicked(btn) {

        setLevelsEnabled(false);
        setLevels([])
        
        filter()
        .then(( data ) => {
            if(data.length < 1) {
                console.log("sry no stats available");
            }
            else {
                insertDropdownData(data);
            }
        });

        //Change btnColor
        if (btn == "detailed") {
            setBenchMark("detailed")
            setBtn1Color("#0d6efd")
            setBtn1TxtColor("white")
            setBtn2Color("white")
            setBtn2TxtColor("#0d6efd")

            detailedBenchmark("")
            .then(( data ) => {
                if (data.recent != undefined) {
                    setChart();
                    extractDetailedData(data);
                }
                else {

                }
            });
        }
        else {
            setBenchMark("comparison")
            setBtn2Color("#0d6efd")
            setBtn2TxtColor("white")
            setBtn1Color("white")
            setBtn1TxtColor("#0d6efd")
            comparisonBenchmark("")
            .then(( data ) => {
                let title = []
                let extractedData = [];
                Object.keys(data).forEach(key => {

                    title.push(key);
                    extractedData.push(extractComparisonData(data[key]));
                });
                setChart();
                for (let i = 0; i < extractedData.length; i++) {
                    displayChart(extractedData[i], i, title[i]);
                }

                setLevelsEnabled(true);
            });
        }
    }

    function extractComparisonData(data) {
        let result = [];
    
        result.push(data.current);
        result.push(data.global);
        result.push(data.recent);
    
        return result;
    }

    function insertDropdownData(data) {
        setLevels();
        let tag = <Picker.Item label= " -" value= "" />
        setLevels(previousState => [previousState, tag])

        for (let i = 0; i < data.length; i++) {
            let string = "";
            if (data[i]._id > 6) {
                string = " Secondary " + (data[i]._id - 6);
            }
            else {
                string = " Primary " + data[i]._id;
            }
            let tag = <Picker.Item label={string} value= {"&level=" + data[i]._id} />
            setLevels(previousState => [previousState, tag])
        } 
    }

    function extractDetailedData(datasets) {
        let keyArray = ['total_average_score', 'average_time_taken', 'easy_average_score', 'medium_average_score', 'difficult_average_score'];

        for (let i = 0; i < 5; i++) {
            let data = [];
            let key = keyArray[i];

            ('current' in datasets) ? data.push(datasets.current[key]) : data.push(0);
            ('global' in datasets) ? data.push(datasets.global[key]) : data.push(0);
            ('recent' in datasets) ? data.push(datasets.recent[key]) : data.push(0);

            displayChart(data, i);
        }

        setLevelsEnabled(true);
    }

    function displayChart(data, index, title) {
        let heading = "The Percentage Scores";
        let chartName;
        let chartWidth = 320;
        if (title != undefined) {
            if (title > 6) {
                title = "Secondary " +(title-6);
            }
            else if (title < 7) {
                title = "Primary " +title;
            }
            
            chartName = title;
            chartWidth = 450;
        }
        else {
            switch (index) {
                case 0:
                    chartName="Score";
                    chartWidth = 450;
                    break;
                case 1:
                    chartName="Time Taken";
                    chartWidth = 450;
                    break;
                case 2:
                    chartName="Easy Score";
                    break;
                case 3:
                    chartName="Medium Score";
                    break;
                case 4:
                    chartName="Hard Score";
                    break;
            }    
        }
       
        const chartConfiguration = {
            labels: ['Last Quiz', 'Global Avg', 'Recent 10 Avg'],
            datasets: [
              {
                data: data,
                colors: [
                  (opacity = 1) => `#EF798A`,
                  (opacity = 1) => `#98C5FF`,
                  (opacity = 1) => `#FFCB45`,
              ]
              }
            ]
          }

        if (index == 2 && title == undefined) {
            setChart(prevState => [prevState, <View style={styles.chartHeadingContainer}><Text style={styles.chartHeading}>{heading}</Text></View>]);
        }
        setChart(prevState => [prevState, <View><Text style={{textAlign: 'center'}}>{chartName}</Text><BarChart
            data={chartConfiguration}
            width={chartWidth} // from react-native
            height={220}
            chartConfig={{
                backgroundColor: "transparent",
                backgroundGradientTo: "white",
                backgroundGradientFromOpacity: 0,
                backgroundGradientFrom: "white",
                backgroundGradientToOpacity: 0,
                decimalPlaces: 0,
                color: (opacity = 1) => `white`,
                labelColor: (opacity = 1) => `black`, 
            }}
            fromZero={true}
            withCustomBarColorFromData={true}
            flatColor={true}/></View>]);
    }

    function populateTopicDropdown(data, value) {
        setTopics(<Picker.Item label=" -" value={value} />);
        
        let id = String(value).replace("&level=","");

        setLevel(id);

        for (let i = 0; i < data.length; i++) {
            if (data[i]._id == id) {
                for (let x = 0; x < data[i].topics.length; x++) {
                    setTopics(prevState => [prevState, <Picker.Item label={data[i].topics[x].topic} value={"&topic=" + data[i].topics[x].topic}/>])
                }
            }
        }
    }

    function populateSkillsDropdown(data, value) {
        setSkills(<Picker.Item label=" -" value={value} />);
        let topic = String(value).replace("&topic=","");
        for (let l = 0; l < data.length; l++) {
            if (data[l]._id == selectedLevel) {
                for (let i = 0; i < data[l].topics.length; i++) {
                    if (data[l].topics[i].topic == topic) {
                        for (let x = 0; x < data[l].topics[i].skills.length; x++) {
                            setSkills(prevState => [prevState, <Picker.Item label={data[l].topics[i].skills[x]} value={"&skill=" + data[l].topics[i].skills[x]}/>])
                        }
                    }
                }
            }
        }
        
    }

    function displayLevelBenchmark(itemValue, itemIndex) {
        if (benchmark == "detailed") {
            detailedBenchmark(itemValue)
            .then(( data ) => {
    
                if (data.recent != undefined) {
                    setChart();
                    extractDetailedData(data);
                    if (itemIndex == 0) {
                        setTopicsEnabled(false);
                        setSkillsEnabled(false);
                        setTopics([]);
                        setSkills([]);
                    }
                    else {
                        setTopics([]);
    
                        filter().then(( data )=> {
                            populateTopicDropdown(data, itemValue);
                        })
                        setTopicsEnabled(true);
                    }
                    // setLevel(<Picker.Item label="pick1" value="value1"/>)
                }
                else {
    
                }
            })
        }
        else {
            comparisonBenchmark(itemValue)
            .then(( data ) => {
                let title = []
                let extractedData = [];
                Object.keys(data).forEach(key => {

                    title.push(key);
                    extractedData.push(extractComparisonData(data[key]));
                });
                setChart();
                for (let i = 0; i < extractedData.length; i++) {
                    displayChart(extractedData[i], i, title[i]);
                }

                if (itemIndex == 0) {
                    setTopicsEnabled(false);
                    setSkillsEnabled(false);
                    setTopics([]);
                    setSkills([]);
                }
                else {
                    setTopics([]);

                    filter().then(( data )=> {
                        populateTopicDropdown(data, itemValue);
                    })
                    setTopicsEnabled(true);
                }
                setLevelsEnabled(true);
            });
        }
        
    }

    function displayTopicBenchmark(itemValue, itemIndex) {
        if (benchmark == "detailed") {
            detailedBenchmark(itemValue)
            .then(( data ) => {
                if (data.recent != undefined) {
                    setChart();
                    console.log("topic started")
                    extractDetailedData(data);
                    if (itemIndex == 0) {
                        setSkillsEnabled(false);
                        setSkills([]);
                    }
                    else {
                        filter().then(( data )=> {
                            populateSkillsDropdown(data, itemValue);
                        })
                        setSkillsEnabled(true);
                    }
                    // setLevel(<Picker.Item label="pick1" value="value1"/>)
                }
                else {
    
                }
            })
        }
        else {
            comparisonBenchmark(itemValue)
            .then(( data ) => {
                let title = []
                let extractedData = [];
                Object.keys(data).forEach(key => {

                    title.push(key);
                    extractedData.push(extractComparisonData(data[key]));
                });
                setChart();
                for (let i = 0; i < extractedData.length; i++) {
                    displayChart(extractedData[i], i, title[i]);
                }

                if (itemIndex == 0) {
                    setSkillsEnabled(false);
                    setSkills([]);
                }
                else {
                  
                }
            });
        }
        
    }

    function displaySkillBenchmark(itemValue) {
        if (benchmark == "detailed") {
            detailedBenchmark(itemValue)
            .then(( data ) => {
                if (data.recent != undefined) {
                    setChart();
                    extractDetailedData(data);
                    
                    // setLevel(<Picker.Item label="pick1" value="value1"/>)
                }
                else {
    
                }
            })
        }
        else {
            comparisonBenchmark(itemValue)
            .then(( data ) => {
                let title = []
                let extractedData = [];
                Object.keys(data).forEach(key => {

                    title.push(key);
                    extractedData.push(extractComparisonData(data[key]));
                });
                setChart();
                for (let i = 0; i < extractedData.length; i++) {
                    displayChart(extractedData[i], i, title[i]);
                }

            });
        }
        
    }

    return (
        <View style={styles.container}>
            <SideBar></SideBar>
            <View style={styles.statsContainer}>
                <View>
                    <Text style={styles.heading}>Statistics</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <Text style={[styles.button, {backgroundColor: btn1Color, color: btn1TxtColor}]} onPress={() => btnClicked("detailed")}>Detailed</Text>
                    <Text style={[styles.button, {backgroundColor: btn2Color, color: btn2TxtColor}]} onPress={() => btnClicked("comparison")}>Comparison</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Picker
                        mode='dropdown'
                        enabled={levelsEnabled}
                        style={{ height: 50, width: 200 }}
                        onValueChange={
                            (itemValue, itemIndex) => displayLevelBenchmark(itemValue, itemIndex)
                        }
                    >
                        {levels}
                    </Picker>
                    <Picker
                        mode='dropdown'
                        enabled={topicsEnabled}
                        style={{ height: 50, width: 200 }}
                        onValueChange={
                            (itemValue, itemIndex) => displayTopicBenchmark(itemValue, itemIndex)
                        }
                    >
                        {topics}
                    </Picker>

                    <Picker
                        mode='dropdown'
                        enabled={skillsEnabled}
                        style={{ height: 50, width: 200 }}
                        onValueChange={
                            (itemValue, itemIndex) => displaySkillBenchmark(itemValue)
                        }
                    >
                        {skills}
                    </Picker>
                </View>
               
                <ScrollView style={{marginVertical: 50, elevation:-1, zIndex:-1}}>
                    <View style={styles.chartContainer}>
                        {chart}
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row'
    },
    statsContainer: {
        flex: 1,
        alignItems: 'center'
    },
    heading: {
        marginTop: 50,
        marginBottom: 15,
        fontSize: 30,
        fontWeight: '500'
    },
    buttonContainer: {
        flexDirection: 'row',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#dee2e6',
        overflow: 'hidden',
        marginVertical: 15
    },
    button: {
        padding: 10,
        width: 100,
        textAlign: 'center',
    },
    dropDownPicker: {
        width: 150,
        alignSelf: 'center',
        // position: 'absolute'
    },
    chartEmpty: {
        color: '#EF798A',
        textShadowColor: '#98c5ff',
        textShadowOffset: {width: 5, height: 5},
        textShadowRadius: 10,
        // textShadowColor: '#ffcb45',
        // textShadowOffset: {width: -5, height: -5},
        // textShadowRadius: 10,
        // text-shadow: 5px 5px 0px #98c5ff, -5px -5px 0px #ffcb45
    },
    chartEmptyContainer: {
        flex: 1,
        justifyContent: 'center',
        marginBottom: 150
    },
    chartContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        paddingVertical: 20
    },
    chartHeadingContainer: {
        width: '100%',
        marginVertical: 50
    },
    chartHeading: {
        textAlign:'center',
        fontSize: 25,
        fontWeight: '500'
    }
});

