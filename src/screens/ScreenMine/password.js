import React, {Component} from 'react';
import {
    YellowBox,
    View,
    StyleSheet,
    Text,
    Button,
    TextInput,
    Alert
} from 'react-native';

import global from "../../GlobalVariable/globalVariable";

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Warning: ...']);

export default class password extends Component {
    constructor(props){
        super(props);
        this.navigation = props.navigation;

        this.state = {
            currentPassword: '',
            newPassword:  '',
            confirmPassword:  ''
        }
    }

    /**
     * 修改密码
     * 1 验证原始密码是否正确
     * 2 验证两次密码是否相符
     * 3 验证密码是否符合规范 （8-16位）
     * 4 修改密码
     * 5 修改密码是否成功 成功返回登录重新登录
     */
    ValidateNewPassword = () => {
        if(this.state.newPassword.length > 16 || this.state.newPassword.length < 8 ) {
            Alert.alert("error ","Password does not confirm to specifications");
            return;
        }
        if(this.state.newPassword !== this.state.confirmPassword) {
            Alert.alert("error ","Two inconsistent password input");
            return;
        }
        // 重新登录验证密码
        let userMessage = {"id_number":global.userId,"password":this.state.currentPassword};
        fetch(global.url_login, {
            method: "POST",
            headers: ({
                'Accept':'*/*',
                'Content-Type': 'application/json',
            }),
            body:JSON.stringify(userMessage)
        }).then((response) =>{
            if(response.status == 200){
                // 修改密码
                this.changePassWord();
            }else {
                Alert.alert("error","CurrentPassword Error");
            }
        })
    };

    /**
     * 修改密码
     * PATCH
     */
    changePassWord() {
        let url = global.url_user + global.userId + "/";
        let userMessage = {"password": this.state.newPassword};
        fetch(url, {
            method: "PATCH",
            headers: ({
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': global.token,
            }),
            body: JSON.stringify(userMessage)
        }).then((response) => {
            if (response.status == 200) {
                Alert.alert("Success","Successful password modification");
            }else {
                Alert.alert("error","Failed to change password, please try again");
            }
        });
    }

    render(){
        return(
            <View>
                <View style={styles.firstPartStyle}>
                    <Text style={styles.textStyle}>Current password：</Text>
                    <TextInput
                        style={styles.textInputStyle}
                        underlineColorAndroid={'transparent'}
                        onChangeText={(currentPassword) => this.setState({currentPassword})}
                        value={this.state.currentPassword}
                        secureTextEntry={true}  //设置为密码输入框
                    />
                </View>

                <View style={styles.firstPartStyle}>
                    <Text style={styles.textStyle}>New password ( 8-16 characters, case-sensitive )：</Text>
                    <TextInput
                        style={styles.textInput2Style}
                        underlineColorAndroid={'transparent'}
                        onChangeText={(newPassword) => this.setState({newPassword})}
                        value={this.state.newPassword}
                        secureTextEntry={true}  //设置为密码输入框
                    />
                    <Text style={styles.textStyle}>Confirm new password：</Text>
                    <TextInput
                        style={styles.textInputStyle}
                        underlineColorAndroid={'transparent'}
                        onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                        value={this.state.confirmPassword}
                        secureTextEntry={true}  //设置为密码输入框
                    />
                </View>

                <View style={styles.secondPartStyle}>
                    <View style={{width:200}}>
                        <Button
                            onPress={this.ValidateNewPassword}
                            title="Change password"
                            color="#68ABFF"
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    firstPartStyle: {
        backgroundColor: 'white',
        marginTop: 10,
        padding: 10,
    },
    textStyle: {
        color: 'black',
        fontSize: 15,
        marginBottom: 10,
    },
    textInputStyle: {
        height: 40,
        borderColor: '#DCDFE6',
        borderWidth: 1,
    },
    textInput2Style: {
        height: 40,
        borderColor: '#DCDFE6',
        borderWidth: 1,
        marginBottom: 10,
    },
    secondPartStyle: {
        marginTop: 15,
        alignItems: 'center',
    }
});
