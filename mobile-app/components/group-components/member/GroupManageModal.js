import React, {useEffect, useState} from "react";
import { StyleSheet, TouchableOpacity, View, ScrollView, Text,  Image, TextInput } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'; 
import Modal from "react-native-modal";
import searchUser from "../../../axios/user-api/searchUser";
import addGroup from "../../../axios/group-api/createGroup";
import addMemberToGroup from "../../../axios/group-api/addMemberToGroup";
import SelectDropdown from 'react-native-select-dropdown'
import rmGroupAdmin from "../../../axios/group-api/rmGroupAdmin";
import makeGroupAdmin from "../../../axios/group-api/makeGroupAdmin";
import removeMemberFromGroup from "../../../axios/group-api/removeMemberFromGroup";
import * as ImagePicker from 'expo-image-picker';
import editGroupImg from "../../../axios/group-api/editGroupImg";

const GroupManageModal = ({groupId, group_name, setUpdate, groupImg, setGroupImg}) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [groupName, setGroupName] = useState(group_name);
    const [email, setEmail] = useState("");
    const [emailList, setEmailList] = useState();
    const [selectedList, setSelectedList] = useState();
    const [selectedListIndex, setSelectedListIndex] = useState([]);
    const [selectedId, setSelectedId] = useState([]);
    const [updateNeeded, updating] = useState(0);
    const [ownerName, setOwner] = useState();
    const [groupMembers, setMembers] = useState();
    const [image, setImage] = useState();
    const [imageURI, setImageURI] = useState(null);
    const [imgFeedback, setImgFeedback] = useState();
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
            setImageURI(result.uri);
            setImage(<Image style={styles.groupImg} source={{uri: result.uri}}></Image>);
        }
      };
  
    const icon = <FontAwesome5 name="ellipsis-v" size={15} color="black"/>;

    useEffect(() => {
        console.log("groupimg is");
        console.log(groupImg)
        if (groupImg != undefined) {
            setImage(<Image style={styles.groupImg} source={{uri: groupImg}}></Image>);
        }
        else {
            setImage(<Image style={styles.groupImg} source={require("../../../assets/profile.png")}></Image>);
        }
        
        getGroupMembers(groupId)
        .then((data) => {
            setMembers(data);
            setOwner(data.owner.first_name+ " " +data.owner.last_name)
            displayExistingMembers(data);
        })        
    }, [updateNeeded])

    function displayExistingMembers(groupMembers) {
        setSelectedList();
        setSelectedId();
        let isAdmin;
        let editOptions;

        for (let i = 0; i < groupMembers.members.length; i++) {
            if (i == 0) {
                setSelectedId([groupMembers.members[i].user_id]);
            }
            else {
                setSelectedId(prevState => [...prevState, groupMembers.members[i].user_id]);
            }
            if (groupMembers.members[i].is_admin) {                
                isAdmin = <View style={{alignSelf: 'center', borderWidth: 1, borderRadius: 15, borderColor: '#ffcb45', flex: 2, alignItems:'center', paddingVertical: 3}}>
                        <Text style={{color: '#ffcb45'}}>Admin</Text>
                    </View>
                editOptions = ["Remove Admin", "Remove Member"]
            }
            else {
                isAdmin = null;
                editOptions = ["Make Admin", "Remove Member"]
            }
            setSelectedList(prevState => [prevState, 
                <View style={styles.selectedEmailList}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <View style={{flexDirection: 'row', flex: 9}}>
                            <View style={{alignSelf: 'center'}}>
                                <Image style={styles.emailListImg} source={require("../../../assets/profile.png")}></Image>
                            </View>
                            <View style={{marginLeft: 10}}>
                                <Text style={styles.listName}>{groupMembers.members[i].user_name}</Text>
                                <Text>{groupMembers.members[i].email}</Text>
                            </View>
                        </View>
                        {isAdmin}
                        <SelectDropdown data={editOptions} 
                            buttonStyle={{width: 40, backgroundColor: '#E9E7FA'}} 
                            defaultButtonText={icon} dropdownStyle={{width: 180, borderRadius: 7}} 
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return icon
                            }}
                            rowTextStyle={{textAlign: 'left', marginHorizontal: 15}} 
                            onSelect={(selectedItem, index) => {manageMember(selectedItem, index, groupMembers.members[i].user_id)}} />
                    </View>
                </View>]
            )
        }
    }

    function manageMember(selectedItem, index, userId) {
        if (index == 0) {
            if (selectedItem == "Remove Admin") {
                rmGroupAdmin(groupId, userId)
                .then(() => {
                    updating(prevState => prevState + 1);
                })
            }
            else {
                makeGroupAdmin(groupId, userId)
                .then(() => {
                    updating(prevState => prevState + 1);
                })
            }
        }
        else {
            removeMemberFromGroup(groupId, userId)
            .then(() => {
                updating(prevState => prevState + 1);
            })
        }
    }

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
                <TouchableOpacity style={styles.emailList} onPress={() => addMember(data[i], i)}>
                    <View style={{flexDirection: 'row'}}>
                        <View style={{alignSelf: 'center'}}>
                            {image}
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

    function addMember(data) {
        setEmailList();
        setSelectedId(prevState => [...prevState, data._id])  
        addMemberToGroup(groupMembers._id, data._id)
        .then(() => {
            updating(prevState => prevState + 1)
        })
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
        .then(() => {
            setNeedsUpdate(prevState => prevState + 1)
            setModalVisible(false);
        })
        .finally(() => {
            setLoading(false)
        })
    }

    function editGroupPic() {

        let formData = new FormData();
        formData.append("image", {uri: imageURI, name: 'groupimg.jpg', type: 'image/jpeg'});

        editGroupImg(groupId, formData)
        .then((data) => {
            setUpdate(prevState => prevState + 1);
        }) 
    }

    return (
        <View>
            <TouchableOpacity style={styles.iconContainer} onPress={() => {setModalVisible(true), setTimeout(() => updating(prevState => prevState + 1), 1000)}}>
                <FontAwesome5 style={styles.manageGroupIcon} name="pen" size={30}></FontAwesome5>
            </TouchableOpacity>
             <Modal isVisible={modalVisible}>
                <ScrollView nestedScrollEnabled={true}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={{width: 40, alignSelf: 'flex-end', alignItems:'center'}} onPress={() => {setModalVisible(false), setEmailList(), setTimeout(() => setUpdate(prevState => prevState + 1), 1000)}}>
                        <FontAwesome5 name="times" size={40} color="black"/>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.modalHeader}>Manage Group</Text>
                    </View>
                        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
                            <FontAwesome5 name="camera" style={{zIndex: 100, opacity: 0.8}} size={50} color="#b3b3b3"/>
                            {image}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.editGroupPicBtn} onPress={() => editGroupPic()}>
                            <Text style={styles.editGroupBtnText}>Edit Group Picture</Text>
                        </TouchableOpacity>
                        {imgFeedback}
                        <View>
                            <Text style={styles.inputLabel}>Group Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Give the group a name"
                                onChangeText={(e) => setGroupName(e)}
                                value={groupName} onFocus={() => setEmailList()}
                            />
                            <Text style={styles.inputLabel}>Group Owner</Text>
                            <Text style={styles.ownerName}>{ownerName}</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="+ Add new members"
                                onChangeText={(e) => {setEmail(e), searchMembers(e)}}
                                value={email} onFocus={() => searchMembers("")}
                            />
                            {emailList}
                            <Text style={styles.inputLabel}>Members</Text>
                        </View>
                    <View>
                        <View style={{borderRadius: 10, backgroundColor: '#E9E7FA', marginTop: 20, maxHeight: 160 }}>
                            <ScrollView nestedScrollEnabled={true}>
                                {selectedList}
                            </ScrollView>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.deleteBtn} onPress={() => createGroup()}>
                        <Text style={styles.deleteBtnText}>Delete</Text>
                    </TouchableOpacity>
                </View>
                </ScrollView>
            </Modal>
        </View>
    )
};

const styles = StyleSheet.create({
    manageGroupIcon: {
        margin: 20,
        color: 'white'
    },
    iconContainer: {
        backgroundColor: '#ffcb45',
        width: 70,
        borderRadius: 100,
        alignSelf: 'flex-end',
        position: 'absolute',
        right: 30,
        bottom: 30
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
    deleteBtn: {
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
    deleteBtnText: {
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
    ownerName: {
        marginVertical: 15,
        marginHorizontal: 10,
        fontSize: 20
    },
    selectedEmailList: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    listName: {
        fontWeight: 'bold',
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
        borderRadius: 250,
        zIndex: 1
    },
    editGroupPicBtn: {
        backgroundColor: '#83cfff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: 20,
        alignSelf: 'center',
        borderRadius: 8
    },
    editGroupBtnText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25
    }
});

export default GroupManageModal;