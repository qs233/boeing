import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Alert,
    Button, Dimensions,
} from 'react-native';
import UnityView from 'react-native-unity-view';
import SelectPlane from "../SelectPlane/selectPlane";

import global from '../../../src/GlobalVariable/globalVariable';

const POSITIONS = ['please select position', 'nose', 'rightForwardFuselage', 'leftForwardFuselage', 'leftBackwardFuselage', 'rightBackwardFuselage',
    'wing', 'tail', 'backofPlane'];
const imageFolder = '../../assets/images/';

let {height, width} = Dimensions.get('window');
export default class TargetUnityView extends Component {

    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        this.state = {
            planePos: null,
            detectionId: null
            // positionImage:require(imageFolder+'tab_newdetection.png')
        }
    }

    generateUUID() {
        var d = new Date().getTime();
        if (window.performance && typeof window.performance.now === "function") {
            d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }


    sendPlaneId() {
        console.log('调用sendPlaneId');
        if (this.unity) {
            console.log('sendPlaneId');
            this.unity.postMessageToUnityManager({
                name: 'plane_id',
                data: this.navigation.state.params.plane.id,
                callBack: (data) => {
                    console.log('id sent');
                    console.log(data);
                }
            })
        }
    }

    sendDetectionId() {
        console.log('detectionId');
        if (this.unity) {
            console.log('detectionId');
            this.unity.postMessageToUnityManager({
                name: 'detection',
                data: this.state.detectionId,
                callBack: (data) => {
                    console.log('id sent');
                    console.log(data);
                }
            })
        }
    }

    sendToken() {
        console.log('sendToken');
        if (this.unity) {
            console.log('sendToken');
            this.unity.postMessageToUnityManager({
                name: 'token',
                data: global.token,
                callBack: (data) => {
                    console.log('id sent');
                    console.log(data);
                }
            })
        }
    }

    sendData(name, data) {
        if (this.unity) {
            this.unity.postMessageToUnityManager({
                name: name,
                data: data,
            })
        }
    }

    sendPlanePos(pos) {

        console.log('调用sendPlanePos');
        console.log(pos);
        if (this.unity) {
            console.log('sendPlanePos');
            this.unity.postMessageToUnityManager({
                name: 'position',
                data: pos,
                callBack: (data) => {
                    console.log('pos sent');
                    console.log(data);
                }
            })
        }
    }

    sendUsername() {

        if (this.unity) {
            console.log('调用sendUsername');
            this.unity.postMessageToUnityManager({
                name: 'operator',
                data: global.userId,
                callBack: (data) => {
                    console.log("user back");
                    console.log(data);
                }
            });
            console.log("调用结束")
        }
    }

    /*
    * 监听Unity向Rn的传参情况
    */
    onMessage(event) {

        console.log("event :" + event);
        console.log(event.nativeEvent);
        var planeMessage = event.nativeEvent.message;
        if (planeMessage != null) {
            console.log("Unity message" + planeMessage);
        }

        //Alert.alert("message missing ","please select plane position");
        //console.log('OnUnityMessage: ' + event.nativeEvent.message);
    }

    render() {
        console.log(this.state);
        return (
            <View style={styles.container}>
                <View style={styles.infoStyle}>
                    <View style={styles.planeStyle}>

                        <Text style={{fontSize: 18}}>
                            Boeing747 tail number:N999BE
                        </Text>

                    </View>
                    <View style={styles.exitStyle}>

                        <Button title='Quit' onPress={() => Alert.alert(
                            'Notice',
                            'Are you sure you want to end this inspection?',
                            [
                                {
                                    text: 'cancel', onPress: () => {
                                        console.log("cancel: 继续检测")
                                    }, style: 'cancel'
                                },
                                {
                                    text: 'OK', onPress: () => {
                                        console.log("finish this inspection");
                                        console.log("this.unity: " + this.unity);
                                        if (this.unity) {
                                            console.log("cancel this");
                                            this.unity.postMessageToUnityManager({
                                                name: 'cancel',
                                                data: 'true',
                                            })
                                        }
                                        this.props.navigation.navigate("ScreenNewDetection")      //跳转名都在route.js
                                    }
                                },
                            ],
                        )
                        }/>
                    </View>

                </View>
                <UnityView
                    ref={(ref) => this.unity = ref}
                    style={{position: 'absolute', left: 0, right: 0, top: 0, bottom: 0}}
                    onMessage={this.onMessage.bind(this)}
                />

            </View>

        );
    }

    /**
     * constructor()
     componentWillMount()
     render()
     componentDidMount()
     上面这些方法的调用是有次序的，
     由上而下，也就是当说如果你要获取外部数据并加载到组件上，
     只能在组件"已经"挂载到真实的网页上才能作这事情，其它情况你是加载不到组件的。
     componentDidMount方法中的代码，是在组件已经完全挂载到网页上才会调用被执行，所以可以保证数据的加载。
     */
    createDetection() {
        let detectionId = this.generateUUID();
        let detectionMessage = {
            "detection_id": detectionId,
            "operator": global.userId,
            "plane": this.navigation.state.params.plane.id
        };

        console.log(detectionMessage);
        fetch(global.url_detection, {
            method: "POST",
            headers: ({
                'Content-Type': 'application/json;charset=utf-8',
                'Authorization': global.token,
            }),
            body: JSON.stringify(detectionMessage)
        }).then((response) => {
            if (response.status == 201) {
                console.log("创建成功");
                this.setState({
                    detectionId: detectionId,
                });

                this.sendUsername();
                this.sendPlaneId();
                this.sendDetectionId();
                this.sendToken();
                this.sendData("cancel", "false");

            } else {
                this.navigation.navigate("ScreenNewDetection");
                Alert.alert("Error", "please retry");
            }
        });
    }

    componentDidMount() {
        this.createDetection();

    }

}
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        // flex: 1,
        position: 'absolute', top: 0, bottom: 0, left: 0, right: 0,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },

    infoStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        zIndex: 3,
        backgroundColor: 'rgba(255,255,255,0.5)'
    },

    planeStyle: {
        width: width * 0.8,
    },

    exitStyle: {

        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
    }


});
