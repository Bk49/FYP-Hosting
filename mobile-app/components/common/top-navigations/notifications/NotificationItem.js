import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity} from 'react-native-gesture-handler'

export default NotificationItem = ({data}) => {

    const [img, setImg] = useState();

    function getTimeDiff(time){
        const difference = new Date() - time;
        if (difference / 604600000 > 1)
            return Math.floor(difference / 604600000) + "w";
        if (difference / 86400000 > 1)
            return Math.floor(difference / 86400000) + "d";
        if (difference / 3600000 > 1) return Math.floor(difference / 3600000) + "h";
        if (difference / 60000 > 1) return Math.floor(difference / 60000) + "m";

        return Math.floor(difference / 1000) + "s";
    };

    function displayImg() {
        if (data.teacher[0].pfp != undefined) {
            setImg(
                <Image
                    style={styles.image}
                    source={{uri: data.teacher[0].pfp}}
                ></Image>
            )
        }
        else {
            setImg(
                <Image
                    style={styles.image}
                    source={require("../../../../assets/avatars/frog.png")}
                ></Image>
            )
        }
    }

    return (
        <TouchableOpacity onLayout={() => displayImg()} style={{padding: 10, justifyContent: 'space-between', flexDirection: 'row'}}>                
            <View style={{flexDirection: 'row'}}>
                {img}
                <Text style={{width: 300, textAlignVertical: 'center'}}>{data.content}</Text>
            </View>
            <View>
                <Text>{getTimeDiff(new Date(data.created_at))}</Text>
            </View>
        </TouchableOpacity>

    );
};

const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10
    }
});
