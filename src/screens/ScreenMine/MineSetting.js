import React, {Component} from 'react';
import {
    YellowBox,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Warning: ...']);

import global from "../../GlobalVariable/globalVariable";
// import App from "../../../App";
import LoginScene from "../ScreenLogin/login";

export default class MineSetting extends Component {
    constructor(props){
        super(props);
        this.navigation = props.navigation;

        this.state = {

        }
    }

    /**
     * 登出函数
     * 登录至登录页
     * 清空global
     */
    logout(){
        console.log("this的指向：",this)
        global.userId = null;
        global.gender = null;
        global.position = null;
        global.userName = null;
        global.token = null;
        this.props.navigation.navigate("LoginScene");
    }
    render(){
        return(
            <View>
                <TouchableOpacity activeOpacity={0.5}
                                  onPress={() =>
                                      this.props.navigation.navigate('password')}>
                    <View style={styles.PartStyle}>
                        <Text style={styles.textStyle}>Change password</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5}
                                  onPress={() =>
                                      this.props.navigation.navigate('introduction')}>
                    <View style={styles.PartStyle}>
                        <Text style={styles.textStyle}>Introduction</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5}
                                  onPress={this.logout.bind(this)}>
                    <View style={styles.PartStyle}>
                        <Text style={styles.textStyle}>Log out</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    PartStyle: {
        backgroundColor: 'white',
        marginTop: 10,
        padding: 10,
    },
    textStyle: {
        color: 'black',
        fontSize: 15,
    }
});
