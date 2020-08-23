import React, {Component} from 'react';
import {
    Image,
    View,
    YellowBox,
    StyleSheet,
    Text,
    Dimensions, TouchableOpacity
} from 'react-native';
YellowBox.ignoreWarnings(['Warning: ...']);

import global from "../../GlobalVariable/globalVariable";

let {height, width} = Dimensions.get('window');
export default class ScreenMine extends Component{

    constructor(props){
        super(props);
        this.navigation = props.navigation;

        this.state = {
            userName :[]
        }
    }

    render(){
        return(
            <View>
                <View style={styles.firstPartStyle}>
                    <Image
                        source={require('../../assets/user/avatar.jpg')}
                        style={styles.userAvatarStyle}/>
                    <Text style={styles.userNameStyle}>{global.userName}</Text>
                </View>

                <View style={styles.secondPartStyle}>
                    <View style={styles.userInfoHeaderStyle}>
                        <Image
                            source={require('../../assets/user/userInfo.jpg')}
                            style={styles.iconStyle}/>
                        <Text style={styles.textStyle}>User info</Text>
                    </View>
                    <View style={styles.userInfoStyle}>
                        <Text style={styles.textStyle}>Gender</Text>
                        <Text>{global.gender}</Text>
                    </View>
                    <View style={styles.userInfoStyle}>
                        <Text style={styles.textStyle}>Position</Text>
                        <Text>{global.position}</Text>
                    </View>
                    <View style={styles.userInfoStyle}>
                        <Text style={styles.textStyle}>Employee number</Text>
                        <Text>{global.userId}</Text>
                    </View>
                </View>
                <TouchableOpacity activeOpacity={0.5}
                                  onPress={() =>
                                      this.props.navigation.navigate('MineSetting')}>
                    <View style={styles.secondPartStyle}>
                        <View style={styles.settingsHeaderStyle}>
                            <Image
                                source={require('../../assets/user/settings.jpg')}
                                style={styles.iconStyle}/>
                            <Text style={styles.textStyle}>Settings</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    firstPartStyle: {
        height: height*0.2,
        backgroundColor: '#68ABFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userAvatarStyle: {
        height: 50,
        width: 50,
        borderRadius: 33,
        overlayColor: '#68ABFF',
    },
    userNameStyle: {
        paddingTop: 10,
        textAlign: 'center',
        fontSize: 15,
    },
    secondPartStyle: {
        backgroundColor: 'white',
        marginTop: 20,
        padding: 10,
    },
    userInfoHeaderStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 10,
    },
    settingsHeaderStyle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userInfoStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E4E7ED',
    },
    iconStyle: {
        height: 25,
        width: 25,
        borderRadius: 33,
        overlayColor: 'white',
    },
    textStyle: {
        color: 'black',
        fontSize: 15,
        marginLeft: 10,
    },
});
