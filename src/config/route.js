/**
 * created by CstRita on
 * Function: 路由配置文件
 * Desc:配置了这个文件，要在app.js中对接路由文件
 */
//引入依赖
import React, {Component} from 'react';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import {
    Dimensions,
    Image,
    View,
    YellowBox,
} from 'react-native';//;qs

//屏蔽黄屏警告qs
YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

//引入页面组件 (screens文件夹里)
import SelectType from "../screens/SelectPlane/selectType";
import SelectPlane from "../screens/SelectPlane/selectPlane";

import MyUnityView from '../screens/ScreenUnity/unityView';

import ScreenMain from '../screens/ScreenMain/mainService';
import RecordDetail from '../screens/ScreenMain/RecordDetail';

import Analysis from '../screens/ScreenAnalysis/Analysis';
import PieChartDetail from "../screens/ScreenAnalysis/PieChartDetail";
import BarChartDetail from "../screens/ScreenAnalysis/BarChartDetail";

import ScreenMine from '../screens/ScreenMine/ScreenMine';
import MineSetting from '../screens/ScreenMine/MineSetting';
import password from '../screens/ScreenMine/password';
import introduction from '../screens/ScreenMine/introduction';

let {height, width} = Dimensions.get('window'); //获取屏幕宽高

// 配置路由
const Tab = createBottomTabNavigator({
    //RouteConfigs:a mapping from route name to a route config, which tells the navigator what to present for that route
    ScreenNewDetection: {
        screen: SelectType,
        navigationOptions: {
            title: 'detection',
            tabBarIcon: ({tintColor}) => ( //箭头函数qs
                <Image
                    source={require('../assets/tab_icons/detection.png')}
                    style={[{height: 24, width: 24}, {tintColor: tintColor}]}/>
            ),
            mode: 'modal',
        },
    },
    ScreenMain: {
        screen: ScreenMain,
        selectedTab: ScreenMain,
        navigationOptions: {
            title: 'Record',
            //tab 的属性
            tabBarLabel: 'record',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('../assets/tab_icons/record.png')}
                    style={[{height: 24, width: 24}, {tintColor: tintColor}]}/>
            ),

        },
    },
    Analysis: {
        screen: Analysis,
        selectedTab: Analysis,
        navigationOptions: {
            // header: null,
            title: 'analysis',
            //tab 的属性
            // tabBarLabel: 'ScreenMine',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('../assets/tab_icons/analysis.png')}
                    style={[{height: 24, width: 24}, {tintColor: tintColor}]}/>
            ),

        },
    },
    ScreenMine: {
        screen: ScreenMine,
        selectedTab: ScreenMine,
        navigationOptions: {
            title: 'mine',
            //tab 的属性
            // tabBarLabel: 'ScreenMine',
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('../assets/tab_icons/mine.png')}
                    style={[{height: 24, width: 24}, {tintColor: tintColor}]}/>
            ),

        },
    },
}, {//TabNavigatorConfig:
    initialRouteName: 'ScreenNewDetection', // 设置默认的页面
    tabBarPosition: 'bottom', //设置TabNavigator的位置 top/bottom
    backBehavior: "none", //按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    animationEnabled: false, // 是否在更改标签时显示动画
    swipeEnabled: false,  //是否允许在标签之间进行滑动

    //这个属性在react-navigation2.x的createTabNavigator和2345的createMaterialTopTabNavigator里的，应该在下面tabBarOptions的android属性里
    pressColor: '#1296db', //Color for material ripple (Android >= 5.0 only)

    // 设置Tab标签的属性
    // tabBarOnPress:({navigation,defaultHandler}) => {
    //     StatusBar.setBarStyle('dark-content',true);
    //     Platform.OS === 'android' ? StatusBar.setBackgroundColor('rgba(0,0,0,0)',true): ''; // 背景颜色是透明           
    //     Platform.OS === 'android' ? StatusBar.setTranslucent(true): ''; // 设置状态栏透明           
    //     defaultHandler(); // 导航的默认行为，比如说标签导航下面的图标与颜色选中与未选中颜色的不同
    // },

    tabBarOptions: {
        //Android属性
        upperCaseLabel: false,//是否使标签大写，默认为true

        //共有属性
        showIcon: true,//是否显示图标，默认关闭
        showLabel: true,//是否显示label，默认开启
        activeTintColor: '#1296db',//label和icon的前景色 活跃状态下（选中）
        inactiveTintColor: 'gray',//label和icon的前景色 活跃状态下（未选中）

        style: { //TabNavigator 的背景颜色
            backgroundColor: 'white',
            height: height * 0.08, //占屏幕高度0.08
        },
        indicatorStyle: {//标签指示器的样式对象（选项卡底部的线）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题
            height: 0,
        },
        labelStyle: {//文字的样式
            fontSize: 13,
            marginTop: -5,
            marginBottom: 5,
        },
        iconStyle: {//图标的样式
            marginBottom: 3,
        }
    },
});

//stackNavigator是头顶有悬浮窗的那种
const Stack = createStackNavigator({
    //RouteConfigs:
    Tab: {
        screen: Tab,
        navigationOptions: {
            header: null, // 隐藏顶部导航栏
            title: 'Boeing', //可以用作headerTitle的回退的字符串。此外，将用作tabBarLabel（如果嵌套在TabNavigator中）或drawerLabel（如果嵌套在DrawerNavigator中）的后备。
            //导航栏的样式
            visible: false,//是否可见 qs:没找到这个
            gestureResponseDistance: {horizontal: 200}, //（触摸起始点）从屏幕边缘开始的触摸距离 以识别（滑动）手势
            headerBackTitle: null, //iOS上后退按钮使用的标题字符串,默认为上一个场景的headerTitle。
            headerStyle: {backgroundColor: '#1296db'},//导航栏的样式 qs:header不是null了吗？
            headerTitleStyle: {//导航栏文字的样式 Style object for the title
                color: 'white',
                //设置标题的大小
                fontSize: 16,
                //居中显示
                alignSelf: 'center',
            },

            //返回箭头重写
            // headerLeft:() => {
            //     return <Icon name="chevron-left" onPress={()=>navigation.goBack()}  style={styles.icon}/>;
            // }
        }
    },

    SelectPlane: {
        screen: SelectPlane,
        navigationOptions: {
            title: 'Select plane',
            headerStyle: {
                backgroundColor: '#68ABFF',
                height: 50,
            },
            headerTitleStyle: {//导航栏文字的样式
                //设置标题的大小
                fontSize: 16,
            },
            gesturesEnabled: true, //支持手势左滑返回 Whether you can use gestures to dismiss this screen

        }
    },

    UnityView: {
        screen: MyUnityView,
        navigationOptions: {
            header: null,

        }
    },

    RecordDetail: {
        screen: RecordDetail,
        navigationOptions: {
            header: null,
        }
    },

    PieChartDetail: {
        screen: PieChartDetail,
        navigationOptions: {
            // title: 'PieChartDetail'
            header: null,
        }
    },

    BarChartDetail: {
        screen: BarChartDetail,
        navigationOptions: {
            // title: 'BarChartDetail'
            header: null,
        }
    },

    MineSetting: {
        screen: MineSetting,
        navigationOptions: {
            title: 'Settings',
            headerStyle: {
                height: 50,
            },
            headerTitleStyle: {//导航栏文字的样式
                //设置标题的大小
                fontSize: 16,
            },
            gesturesEnabled: true, //支持手势左滑返回
        }
    },

    password: {
        screen: password,
        navigationOptions: {
            title: 'Change password',
            headerStyle: {
                height: 50,
            },
            headerTitleStyle: {//导航栏文字的样式
                //设置标题的大小
                fontSize: 16,
            },
            gesturesEnabled: true, //支持手势左滑返回
        }
    },

    introduction: {
        screen: introduction,
        navigationOptions: {
            title: 'Introduction',
            headerStyle: {
                height: 50,
            },
            headerTitleStyle: {//导航栏文字的样式
                //设置标题的大小
                fontSize: 16,
            },
            gesturesEnabled: true, //支持手势左滑返回
        }
    },


});

class Home extends Component { //定义class组件
    onMessage(event) {
    }

    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        this.state = {
            selectedTab: ScreenMain // 默认是第一个
        };
    }

    render() {
        return (
            <View style={[{flex: 1}]}>
                <Stack/>
            </View>
        );
    }

}
export {Home, Stack}; //导出

//=> 箭头函数 相当于function
//一个参数 x => x+4
//无参数或者多个参数需要括号 () =>

