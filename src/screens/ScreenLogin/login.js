import React, {Component} from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    TextInput,
    View,
    Text,
    Alert,
    Button,
    Image,
    ScrollView, BackHandler, ToastAndroid
} from 'react-native';
import global from '../../../src/GlobalVariable/globalVariable';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'

export default class LoginScene extends Component {

    constructor(props) {
        super(props);
        this.navigation = props.navigation;
    }

    //双击返回键退出程序
    //添加BackHandler，ToastAndroid的注册,仅执行一次，在初始化render之前执行
    componentWillMount(){
        BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
    //当组件要被从界面上移除的时候，就会调用componentWillUnmount(),在这个函数中，可以做一些组件相关的清理工作，例如取消计时器、网络请求等
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
    //监听函数的返回值不是true，则会调用默认的back键功能
    onBackAndroid = () => {
            if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
                BackHandler.exitApp();//退出整个应用
                return;
            }
            this.lastBackPressed = Date.now();//按第一次的时候，记录时间
            ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);//显示提示信息
            return true;
    };

    userId = '';  //保存用户名
    password = '';  //保存密码

    /**
     * 当用户名输入框值改变时，保存改变的值
     * @param  {[type]} newUsername [输入的用户名]
     */
    onUsernameChanged = (newUserName) => {
        console.log(newUserName);//运行后可以在输入框随意输入内容并且查看log验证！
        this.userId = newUserName;
    };

    /**
     * 当密码输入框值改变时，保存改变的值
     * @param  {[type]} newUsername [输入的密码]
     */
    onPasswordChanged = (newPassword) => {
        console.log(newPassword);//运行后可以在输入框随意输入内容并且查看log验证！
        this.password = newPassword;
    };

    /**
     * 点击空白处使输入框失去焦点
     */
    blurTextInput = () => {
        this.refs.username.blur();
        this.refs.password.blur();
    };

    /**
     * 登陆按钮，点击时验证输入的用户名和密码是否正确，正确时进入主页面，否则弹出提示
     */
    login = () => {
        console.log("login");
        let userMessage = {"id_number": this.userId, "password": this.password};
        fetch(global.url_login, {
            method: "POST",
            headers: ({
                'Accept': '*/*',
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify(userMessage)
        }).then((response) => {
            if (response.status == 200) {
                this.refs.username.blur();
                this.refs.password.blur();
                global.userId = this.username;
                var promise = response.json();
                promise.then((token) => {
                    console.log(token);
                    global.userId = this.userId;
                    global.token = 'JWT ' + token.token;
                }).then(() => {
                    this.getUserInfo();
                });
            } else {
                Alert.alert("error", "Id Or Password error");  //弹出提示框
            }
        })
    };

    /**
     * 获取用户的具体信息
     */
    getUserInfo() {
        let url = global.url_user + global.userId + '/';
        fetch(url, {
            method: "GET",
            headers: ({
                'Authorization': global.token,
            }),
        })
            .then((response) => response.json())
            .then((jsonData) => {
                global.userName = jsonData.name;
                global.position = jsonData.position;
                global.gender = jsonData.gender;
                this.navigation.navigate("Home");
        })
            .catch((error) => {
                global.userId = null;
                global.token = null;
                Alert.alert('error',error);
            });
    };


    /**
     * 渲染图形界面
     * @return {[type]} [返回所渲染的界面]
     */
    render() {
        console.log('1');
        return (

            <KeyboardAwareScrollView style={{backgroundColor: 'white'}}
                                     enableOnAndroid={true}
                                     resetScrollToCoords={{x: 0, y: 0}}
                                     contentContainerStyle={styles.container}
                                     scrollEnabled={false}
                                     extraScrollHeight={-15}  //试着改
                // keyboardShouldPersistTaps='handled'

            >

                <Image source={require('../../assets/icons/login.jpg')}
                       style={styles.imgStyle}>
                </Image>
                <Text style={styles.margintype}/>

                <Text style={{fontSize: 28, marginTop: 0}}>Ground Inspection</Text>
                <Text style={styles.margintype}/>

                <View style={styles.inputBox}>
                    <TextInput
                        ref="username"  //设置描述
                        onChangeText={this.onUsernameChanged}  //添加值改变事件
                        style={styles.input}
                        autoCapitalize='none'  //设置首字母不自动大写
                        // underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                        placeholderTextColor={'#7f7f7f'}  //设置占位符颜色
                        placeholder={'Employee ID'}  //设置占位符
                    />
                </View>

                <View style={styles.btText}>

                    <TextInput
                        ref="password"  //设置描述
                        onChangeText={this.onPasswordChanged}  //添加值改变事件
                        style={styles.input}
                        autoCapitalize='none'  //设置首字母不自动大写
                        // underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                        secureTextEntry={true}  //设置为密码输入框
                        placeholderTextColor={'#7f7f7f'}  //设置占位符颜色
                        placeholder={'Enter your password'}  //设置占位符
                        // onFocus={this.scroll.props.scrollToPosition(10, 0)}
                    />

                </View>


                <TouchableOpacity
                    onPress={this.login} //添加点击事件
                    style={styles.button}>
                    <Text
                        style={styles.btText}>Login</Text>
                </TouchableOpacity>

                <Text style={styles.margintype}/>

                <TouchableOpacity>
                    <Text
                        style={styles.btText1}>Forget Password?</Text>
                </TouchableOpacity>

            </KeyboardAwareScrollView>
        );
    }
}

/**
 * 设置界面的布局样式
 * @type {[StyleSheet]}
 */
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    input: {
        width: 200,
        height: 40,
        fontSize: 15,
        color: '#060606',
    },
    inputBox: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: 280,
        height: 60,
        borderRadius: 40,
        backgroundColor: '#ffffff',
        marginBottom: 8,
    },
    button: {
        height: 40,
        width: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        backgroundColor: '#69eb23',
        marginTop: 20,
    },
    margintype: {
        marginTop: 30,
    },
    btText: {
        color: '#ffffff',
        fontSize: 20,
    },
    btText1: {
        color: '#7f7f7f',
        fontSize: 15,
    },
    imgStyle: {
        width: 150,
        height: 150,
        // 设置图片填充模式
        resizeMode: 'cover',
        // 设置圆角
        borderRadius: 75,
        // 设置图片位置
        marginLeft: 0,
        alignItems: 'center',
        justifyContent: 'center',
        textAlignVertical: 'center',
    },

});
