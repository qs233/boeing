import React, {Component} from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    YellowBox
} from 'react-native';
YellowBox.ignoreWarnings(['Warning: ...']);

//引入底部弹窗
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'
//弹窗选项
const options = ['Cancel','Boeing737','Boeing747','Boeing757','Boeing767','Boeing777','Boeing787'];

const {height, width} = Dimensions.get('window');
console.log(height,width);

export default class SelectType extends Component{

    showActionSheet = () => {
        this.ActionSheet.show()
    };

    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        this.state = {
        };
    }

    render(){
        return (
            <View style={styles.container}>

                <Image
                    source={require('../../assets/icons/login.jpg')}
                    style={styles.logo}/>


                <Text style={styles.headerText}>
                    Ground Inspection Tool
                </Text>

                <Text style={styles.text}>
                    Welcome
                </Text>

                <TouchableOpacity
                    onPress={this.showActionSheet} //添加点击事件
                    style={styles.button}>
                    <Text
                        style={styles.btText}>Start</Text>
                </TouchableOpacity>

                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={<Text style={{color: '#000', fontSize: 18}}>Select a type of airplane</Text>}
                    options={options}
                    cancelButtonIndex={0}
                    // destructiveButtonIndex={4}
                    onPress={(index) => {
                        if (index==0){
                            this.props.navigation.navigate('DetectionPage')
                        }else{
                            this.props.navigation.navigate('SelectPlane')
                        }
                    }}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,//默认(主轴)方向为column，一个块一行
        justifyContent: 'center',//沿主轴方向上的排列方式
        alignItems: 'center',//沿次轴方向上的排列方式
        backgroundColor: '#ffffff',//背景颜色为白色
    },

    logo: {
        width: 120,
        height: 120,
        // 设置图片填充模式
        resizeMode: 'cover',
        // 设置圆角
        borderRadius: 75,
    },

    headerText: {
        fontSize:30,
        color: '#3399FF',
        fontFamily: 'Arial',
        fontStyle: 'italic',
        fontWeight: 'bold',
        textAlign:'center',
        marginTop: 20,
    },

    text: {
        fontSize:25,
        fontStyle: 'italic',
        textAlign:'center',
        margin:70,
    },

    button: {
        height: 40,
        width: 150,
        borderRadius: 40,
        backgroundColor: '#3399FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },

    btText: {
        color: '#ffffff',
        fontSize: 20,
    },

});
