import { conformsTo } from "lodash";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo, FontAwesome5, Feather } from '@expo/vector-icons';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { CheckBox, Icon } from 'react-native-elements';
import Modal from "react-native-modal";
import {
    Button,
    TextInput,
    Image,
    View,
    Text,
    Switch,
    ScrollView,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    KeyboardAvoidingView,
    KeyboardAwareScrollView,
} from "react-native";
import logout from "../../../axios/user-api/logout";
// import { styles } from "react-native-element-dropdown/src/TextInput/styles";

const AccountSettings = () => {
    const [isSelected, setSelection] = useState(false);
    let navigate = useNavigate();

    const getUserData = async () => {
        const data = await AsyncStorage.getItem("userInfo");
        return JSON.parse(data)
    };
    const genderButtons = [
        { label: 'M', value: 0 },
        { label: 'F', value: 1 },
    ];

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [gender, setGender] = useState();
    const [radio, setRadio] = useState();
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        getUserData()
            .then((data) => {
                console.log(data)
                setFirstName(data.first_name)
                setLastName(data.last_name)
                setName(<Text style={styles.name}>{data.first_name} {data.last_name}</Text>)
                setEmail(<Text style={styles.email}>{data.email}</Text>)
                if (data.gender == 'M') {
                    setGender(0)
                    setRadio(
                        <RadioForm
                            style={styles.radioButtonContainer}
                            formHorizontal={true}
                            animation={true}
                            radio_props={genderButtons}
                            initial={0}
                            onPress={(value) => setGender(value)}
                            buttonSize={13}
                            labelStyle={{ fontSize: 15, color: 'black', marginRight: 20, }}
                        />

                    )
                }
                else {
                    setGender(1)
                    setRadio(
                        <RadioForm
                            style={styles.radioButtonContainer}
                            formHorizontal={true}
                            animation={true}
                            radio_props={genderButtons}
                            initial={1}
                            onPress={(value) => setGender(value)}
                            buttonSize={13}
                            labelStyle={{ fontSize: 15, color: 'black', marginRight: 20, }}
                        />

                    )
                }
                // setGender(data.gender)
                // console.log(data.gender)

                if (data.role == "student") {

                }
            });
    }, [])

    return (
        <SafeAreaView>
            <ScrollView>
                <Text style={styles.title}>Profile</Text>
                <View style={styles.nameContainer} behavior="padding">
                    {name}
                    <View>
                        <FontAwesome5
                            name="edit"
                            style={styles.editIcon}
                            onPress={() => setModalVisible(true)}>
                        </FontAwesome5>
                        <Modal isVisible={modalVisible}>
                            <View style={styles.modalContainer} behavior="padding">
                                <View style={{ alignSelf: 'flex-start' }}>
                                    <Text style={styles.modalHeader}>Edit Name</Text>
                                </View>
                                <TouchableOpacity style={{ width: 740, alignSelf: 'flex-end', alignItems: 'center' }} onPress={() => { setModalVisible(false) }}>
                                    <FontAwesome5 name="times" size={30} color='black' />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalContainer2} behavior="padding">
                                <TextInput
                                    style={styles.firstName}
                                    initial={firstName}
                                    onChangeText={(e) => setFirstName(e)}
                                    value={firstName}
                                />
                                <TextInput
                                    style={styles.lastName}
                                    initial={lastName}
                                    onChangeText={(e) => setLastName(e)}
                                    value={lastName}
                                />
                            </View>
                            <View style={styles.modalContainer3} behavior="padding">
                                <TouchableOpacity style={styles.editBtn} onPress={() => setName(<Text style={styles.name}>{firstName} {lastName}</Text>)}>
                                    <Text style={styles.editBtnText}>Confirm</Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>

                    </View>
                </View>
                {email}
                <Text style={styles.genderTitle}>Gender</Text>
                {radio}
                <Text>{gender}</Text>
                <TouchableHighlight
                    style={styles.submit}
                    onPress={() => {
                        // signup({
                        //     first_name: firstName,
                        //     last_name: lastName,
                        //     gender: gender,
                        //     email: email,
                        //     password: password,
                        //     role: dropdown,
                        // })
                        //     .then((res) => {
                        //         // const { role } = user;
                        //         // if (role === "admin") navigate("/control");
                        //         // else navigate("/overview");
                        //         navigate("/login")
                        //         console.log(res)
                        //     })
                        //     .catch((e) => {
                        //         // if (Array.isArray(e)) setErrorMsg(e.error[0]);
                        //         // else setErrorMsg(e.error);
                        //         console.log(e)
                        //     });

                    }}
                    underlayColor='#fff'>
                    <Text style={styles.submitBtn}>Submit Changes</Text>
                </TouchableHighlight>
                <Text style={styles.title}>Notifications</Text>
                <View style={styles.tncContainer}>
                    <View style={styles.checkboxContainer} behavior="padding">
                        <Text style={styles.checkboxText}>Allow Email Notifications</Text>
                        <View style={styles.checkbox}>
                            <CheckBox
                                checked={isSelected}
                                onPress={() => setSelection(!isSelected)}
                                size={22}
                            />
                        </View>
                    </View>
                </View>
                <Text style={styles.title}>Others</Text>
                <TouchableHighlight
                    style={styles.submit}
                    onPress={() => { navigate("/resetPassword") }}
                    underlayColor='#fff'>
                    <Text style={styles.changePwd}>Change Password</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.submit}
                    onPress={() => {
                        logout()
                            .then(() => {
                                navigate("/login")
                            })
                    }}
                    underlayColor='#fff'>
                    <Text style={styles.logoutBtn}>Logout</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={styles.submit}
                    onPress={() => { }}
                    underlayColor='#fff'>
                    <Text style={styles.deleteBtn}>Delete Account</Text>
                </TouchableHighlight>


            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 35,
        marginTop: 40,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    nameContainer: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    name: {
        marginTop: 50,
        fontSize: 25,
    },
    editIcon: {
        fontSize: 20,
        justifyContent: 'flex-end',
        alignContent: 'flex-end',
        alignItems: 'flex-end',
        width: '100%',
        marginLeft: 12,
        top: 58,
    },
    modalHeader: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    modalContainer: {
        display: 'flex',
        backgroundColor: "white",
        width: '50%',
        alignSelf: 'center',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        padding: 30,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#D8D0CE'
    },
    modalContainer2: {
        display: 'flex',
        backgroundColor: "white",
        width: '50%',
        alignSelf: 'center',
        padding: 30,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#D8D0CE'
    },
    modalContainer3: {
        display: 'flex',
        backgroundColor: "white",
        width: '50%',
        alignSelf: 'center',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        padding: 30,
        flexDirection: 'row',
    },
    firstName: {
        justifyContent: 'flex-start',
        borderRadius: 5,
        backgroundColor: 'white',
        width: 250,
        height: 40,
        padding: 10,
        marginRight: 15,
        borderColor: '#D8D0CE',
        borderWidth: 1,
    },
    lastName: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        backgroundColor: 'white',
        width: 250,
        height: 40,
        padding: 10,
        borderColor: '#D8D0CE',
        borderWidth: 1,
    },
    editBtn: {
        backgroundColor: '#83CFFF',
        width: '100%',
        alignSelf: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 7,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 10
        },
        elevation: 8,
        shadowRadius: 100,
        shadowOpacity: 1,
        marginBottom: 20
    },
    editBtnText: {
        color: 'white',
        fontSize: 20
    },
    email: {
        marginTop: 5,
        fontSize: 15,
        textAlign: 'center',
    },
    genderTitle: {
        marginTop: 50,
        fontSize: 22,
        textAlign: 'center',
    },
    radioButtonContainer: {
        marginTop: 10,
        marginLeft: 40,
        alignSelf: 'center'
    },
    buttonContainer: {
        width: 350,
        marginTop: 20,
        backgroundColor: 'white',
        borderRadius: 30,
        overflow: 'hidden',
        alignSelf: 'center',
    },
    tncContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    checkbox: {
        right: 25,
        alignSelf: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 1,
    },
    checkboxText: {
        color: 'black',
        fontSize: 16,
        right: 16,
    },
    checkboxContainer: {
        width: 180,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    submitBtn: {
        marginTop: 15,
        paddingTop: 12,
        paddingBottom: 12,
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
        backgroundColor: '#83CFFF',
        borderRadius: 10,
        width: 350,
    },
    changePwd: {
        marginTop: 15,
        paddingTop: 12,
        paddingBottom: 12,
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
        backgroundColor: '#83CFFF',
        borderRadius: 10,
        width: 350,
    },
    logoutBtn: {
        marginTop: 15,
        paddingTop: 12,
        paddingBottom: 12,
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
        backgroundColor: '#FCC168',
        borderRadius: 10,
        width: 350,
    },
    deleteBtn: {
        marginTop: 15,
        paddingTop: 12,
        paddingBottom: 12,
        color: '#fff',
        textAlign: 'center',
        fontSize: 18,
        backgroundColor: '#FB7D7D',
        borderRadius: 10,
        width: 350,
    },
    submit: {
        width: 350,
        alignSelf: 'center'
    }
})
export default AccountSettings;