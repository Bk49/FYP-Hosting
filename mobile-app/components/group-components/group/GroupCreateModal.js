import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, Button } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'
import Modal from "react-native-modal";
import searchUser from "../../../axios/user-api/searchUser";
import addGroup from "../../../axios/group-api/createGroup";
import * as ImagePicker from 'expo-image-picker';
import addGroupImg from "../../../axios/group-api/addGroupImg";

const GroupCreateModal = ({setNeedsUpdate, setLoading}) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [groupName, setGroupName] = useState("");
    const [email, setEmail] = useState("");
    const [emailList, setEmailList] = useState();
    const [selectedList, setSelectedList] = useState();
    const [selectedListIndex, setSelectedListIndex] = useState([]);
    const [selectedId, setSelectedId] = useState([]);

    const [image, setImage] = useState(null);

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    };


    function searchMembers(query) {
        searchUser(query)
        .then(( data ) => {
            displayEmailList(data);
        })

    }

    function displayEmailList(data) {

        setEmailList();
        
        for (let i = 0; i < data.length; i++) {

            setEmailList(prevState => [prevState, 
                <TouchableOpacity style={styles.emailList} onPress={() => displaySelectedMember(data[i], i)}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{alignSelf: 'center'}}>
                            <Image style={styles.emailListImg} source={require("../../../assets/profile.png")}></Image>
                        </View>
                        <View style={{marginLeft: 10}}>
                            <Text style={styles.listName}>{data[i].first_name + " " + data[i].last_name}</Text>
                            <Text>{data[i].email}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            ])
        }
    }

    function displaySelectedMember(data, index) {

        setEmailList();
        setSelectedId(prevState => [...prevState, data._id])
        setSelectedList(prevState => [prevState, 
            <View style={styles.selectedEmailList}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{alignSelf: 'center'}}>
                            <Image style={styles.emailListImg} source={require("../../../assets/profile.png")}></Image>
                        </View>
                        <View style={{marginLeft: 10}}>
                            <Text style={styles.listName}>{data.first_name+ " " +data.last_name}</Text>
                            <Text>{data.email}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={{alignSelf: 'center', justifyContent: 'center'}} onPress={() => removeMember(index)}>
                        <FontAwesome5 name="times" size={20} color="black"/>
                    </TouchableOpacity>
                </View>
            </View>
        ])    
                        
    }

    function removeMember(index) {
        setSelectedId(selectedId.splice(index, 1));
    }

    function createGroup() {
        setLoading(true);
        let memberArray = [];
        for (let i = 0; i < selectedId.length; i++) {
            memberArray.push({user_id: selectedId[i]})     
        }

        let data = {
            groupName: groupName,
            members: memberArray
        }
        
        addGroup(data)
        .then((data) => {
            let formdata = new FormData();
            formdata.append("image", {uri: image, name: 'groupimg.jpg', type: 'image/jpeg'});

            addGroupImg(data, formdata)
            .then((result) => {
            })
            .finally(() => {
                setNeedsUpdate(prevState => prevState + 1)
                setModalVisible(false);
                setLoading(false)
            })
        })
        .finally(() => {
            setLoading(false)
        })
    }


    return (
        <View>
            <TouchableOpacity style={styles.createGroupBtn} onPress={() => setModalVisible(true)}>
                <Text style={styles.createGroupBtnText}>Create Group</Text>
            </TouchableOpacity>
            <Modal isVisible={modalVisible}>
                <ScrollView>
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={{width: 40, alignSelf: 'flex-end', alignItems:'center'}} onPress={() => {setModalVisible(false), setEmailList(), setSelectedList(), setSelectedListIndex([]), setSelectedId([])}}>
                        <FontAwesome5 name="times" size={40} color="black"/>
                    </TouchableOpacity>
                    <View style={{alignSelf: 'center'}}>
                        <Text style={styles.modalHeader}>Create Group</Text>
                    </View>
                        <View>
                            <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                                <FontAwesome5 name="camera" size={50} color="#b3b3b3"/>
                                {image && <Image source={{ uri: image }} style={styles.groupImg} />}
                            </TouchableOpacity>
                            {image && <Image source={{ uri: image }} />}
                            <Text style={styles.inputLabel}>Group Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Give the group a name"
                                onChangeText={(e) => setGroupName(e)}
                                value={groupName} onFocus={() => setEmailList()}
                            />
                            <Text style={styles.inputLabel}>Add Members</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Search email here"
                                onChangeText={(e) => {setEmail(e), searchMembers(e)}}
                                value={email} onFocus={() => searchMembers("")}
                            />
                           
                        </View>
                    <View>
                        {emailList}
                        <View style={{borderRadius: 10, backgroundColor: '#E9E7FA', marginTop: 20 }}>
                            {selectedList}
                        </View>
                    </View>
                    <TouchableOpacity style={styles.createBtn} onPress={() => createGroup()}>
                        <Text style={styles.createBtnText}>Create</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
            </Modal>
        </View>
        
    );
};

const styles = StyleSheet.create({
    createGroupBtn: {
        backgroundColor: '#B1DBFF',
        padding: 10,
        paddingHorizontal: 30,
        borderRadius: 7,
        marginVertical: 15
    },
    createGroupBtnText: {
        color: '#2A2A72',
        fontWeight: 'bold',
        fontSize: 20
    },
    modalContainer: {
        display: 'flex',
        backgroundColor: "white",
        width: '50%',
        alignSelf:'center',
        borderRadius: 5,
        padding: 30,
    },
    modalHeader: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    input: {
        borderRadius: 6,
        backgroundColor: "#E1F1FF",
        borderColor: "#A7BFE8",
        borderWidth: 1,
        width: '100%',
        marginTop: 10,
        padding: 10,
        alignSelf: 'center',
        fontSize: 20
    },
    inputLabel: {
        fontWeight: 'bold',
        color: '#3F5C94',
        fontSize: 20,
        marginTop: 20
    },
    createBtn: {
        backgroundColor: '#FFC83C',
        width: 100,
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 40,
        paddingVertical: 10,
        borderRadius: 7,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 10
        },
        elevation: 10,
        shadowRadius: 100,
        shadowOpacity: 1,
        marginBottom: 20
    },

    createBtnText: {
        color: 'white',
        fontSize: 20
    },
    emailList: {
        backgroundColor: '#E9E7FA',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    emailListImg: {
        width: 40,
        height: 40
    },
    listName: {
        fontWeight: 'bold'
    },
    selectedEmailList: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    imagePicker: {
        alignSelf: 'center',
        borderRadius: 250,
        width: 250,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        borderWidth: 1,
        borderColor: "#b3b3b3",
    },
    groupImg: {
        width: 250, 
        height: 250,
        position: 'absolute',
        borderRadius: 250
    }
})

export default GroupCreateModal;