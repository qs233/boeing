import React, {Component} from 'react';
import {YellowBox, StyleSheet, View, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
// import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Echarts from "native-echarts";
import global from '../../../src/GlobalVariable/globalVariable';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Warning: ...']);

const { height, width} = Dimensions.get('window'); // 获取屏幕的宽度和高度

export default class PieChartDetail extends Component {
    constructor(props){
        super(props);
        this.navigation = props.navigation;

        let tail_number = this.navigation.state.params.tail_number;
        let LineNumber = this.navigation.state.params.LineNumber;
        let ASN = this.navigation.state.params.ASN;
        let Variable = this.navigation.state.params.Variable;
        let plane_type = this.navigation.state.params.plane_type;
        let planeId = this.navigation.state.params.planeId;

        this.state = {
            currentMonth: '',
            planeInfo: {
                tail_number: tail_number,
                LineNumber: LineNumber,
                ASN: ASN,
                Variable: Variable,
                plane_type: plane_type,
            },
            pieData: {},
            planeId:planeId,
        }
    }
    render(){
        return(
            <View>

                {/*自定义顶部导航栏*/}
                <View style={styles.headerStyle}>
                    <Icon
                        containerStyle={{backgroundColor:'#68ABFF'}}
                        name = 'angle-left'
                        type = 'font-awesome'
                        color = 'white'
                        size={30}
                        onPress={() => {this.props.navigation.navigate('Analysis')}} />
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.topTextStyle}>Select Month</Text>
                    </View>
                    <View style={styles.blankStyle}/>
                </View>

                {/*选择月份*/}
                <View style={styles.headerInfoStyle}>
                    <TouchableOpacity activeOpacity={0.5}
                                      onPress={this.LastMonth}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.text1Style}>Last month</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.dateStyle}>
                        <Text style={styles.text2Style}>{this.state.currentMonth}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.5}
                                      onPress={this.NextMonth}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.text1Style}>Next month</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/*飞机信息*/}
                <View style={styles.mainStyle}>
                    <Text style={styles.textStyle}>INFO</Text>
                </View>
                <View style={styles.cellViewStyle}>
                    <Text
                        style={styles.titleStyle}>
                        TailNumber: {this.state.planeInfo.tail_number}
                    </Text>
                    <Text style={styles.titleStyle}>
                        LineNumber: {this.state.planeInfo.LineNumber}
                    </Text>
                    <Text style={styles.titleStyle}>
                        A/C ASN: {this.state.planeInfo.ASN}
                    </Text>
                    <Text style={styles.titleStyle}>
                        A/C Variable: {this.state.planeInfo.Variable}
                    </Text>
                    <Text style={styles.title1Style}>
                        planeId: {this.state.planeId}
                    </Text>
                </View>

                {/*饼状图*/}
                <View style={styles.chartStyle}>
                    <Echarts option={this.state.pieData} height={height*0.4} width={width}/>
                </View>

            </View>
        )
    }
    componentDidMount () {
        let url_default_month = global.url_default_month + 'keyword=' + this.state.planeId;
        this.currentMonth();
        this.loadDataFromNet(url_default_month);
    }
    loadDataFromNet (url) {
        fetch(url, {
            method: "GET",
            headers: ({
                'Accept': '*/*',
                'Content-Type': 'application/json',
                'Authorization': global.token,
            }),
        }).then((response) => response.json())
            .then((jsonData) =>{
                console.log("jsonData:",jsonData)
                let data = jsonData;

                let pieChartLegend = [];
                let pieSeries = [];

                data.map(function (item) {
                    pieSeries.push({
                        value:item.count,
                        name:item.name
                    });
                    pieChartLegend.push(item.name)
                });

                this.setState({
                    pieData: {
                        title : {
                            text: '',
                            subtext: '',
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        legend: {
                            top: 'top',
                            data: pieChartLegend,
                        },
                        grid: {
                            top: '40%',
                            bottom: '20%',
                        },
                        series : [
                            {
                                name: 'Type',
                                type: 'pie',
                                radius : '55%',
                                center: ['50%', '60%'],
                                data:pieSeries,
                                itemStyle: {
                                    emphasis: {
                                        shadowBlur: 10,
                                        shadowOffsetX: 0,
                                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                                    }
                                }
                            }
                        ]
                    },

                });
            }).catch((error) => {
            alert(error);
        });
    }
    currentMonth () {
        let fullDate = new Date();
        let year = fullDate.getFullYear();
        let month = this.checkMonth(fullDate.getMonth() + 1);

        let currentMonth = year + '-' + month;

        this.setState({
            currentMonth: currentMonth
        });

    };
    LastMonth = () => {
        let lastDate = new Date(this.state.currentMonth);
        console.log(lastDate); // Fri Feb 01 2019 00:00:00 GMT+0800 (中国标准时间)
        lastDate = lastDate.setMonth(lastDate.getMonth() - 1);

        let newDate = new Date(lastDate);
        let newYear = newDate.getFullYear();
        console.log('newYear:',newYear);
        let newMonth = this.checkMonth(newDate.getMonth() + 1);
        console.log('newMonth:',newMonth);

        newDate = newYear + '-' + newMonth;
        console.log(newDate)

        this.setState({
            currentMonth: newDate
        });

        let url_month = global.url_default_month + 'keyword=' + this.state.planeId + "&date=" + newDate;
        this.loadDataFromNet(url_month);

    };
    NextMonth = () => {
        let nextDate = new Date(this.state.currentMonth);
        console.log(nextDate); // Fri Feb 01 2019 00:00:00 GMT+0800 (中国标准时间)
        nextDate = nextDate.setMonth(nextDate.getMonth() + 1);

        let newDate = new Date(nextDate);
        let newYear = newDate.getFullYear();
        let newMonth = this.checkMonth(newDate.getMonth() + 1);

        newDate = newYear + '-' +newMonth;

        this.setState({
            currentMonth: newDate
        });

        let url_month = global.url_default_month + 'keyword=' + this.state.planeId + "&date=" + newDate;
        this.loadDataFromNet(url_month);

    };
    checkMonth (i) {
        if (i<10){
            i="0" + i;
        }
        return i;
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor:'#68ABFF',
        // marginTop: 15,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
    },
    blankStyle: {
        height: 17,
        width: 17,
        backgroundColor:'#68ABFF',
    },
    headerInfoStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor:'#68ABFF',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: width * 0.05,
        paddingRight: width * 0.05,
        borderBottomWidth: 1,
        borderBottomColor: '#E4E7ED',
    },
    dateStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 5,
        width: 100
    },
    mainStyle: {
        alignItems: 'center',
        backgroundColor:'white',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomColor: '#878787',
        borderBottomWidth: 0.5,
    },
    cellViewStyle: {
        flexDirection: 'row',
        flexWrap:'wrap',//第一行放不下，自动转到下一行
        paddingLeft: width * 0.05,
        backgroundColor: 'white',
        marginBottom: 10,
    },
    titleStyle: {
        width:width * 0.45,
        fontSize: 16,
        color: 'black',
        marginTop:5,
    },
    title1Style: {
        fontSize: 14,
        color: 'gray',
        marginTop:5,
        marginBottom: 5,
    },
    topTextStyle:{
        color: 'white',
        fontSize: 17,
    },
    textStyle: {
        color: 'black',
        fontSize: 15,
    },
    text1Style: {
        color: 'white',
        fontSize: 15,
    },
    text2Style: {
        color: '#68ABFF',
        fontSize: 15,
    },
    chartStyle: {
        alignItems: 'center',
        backgroundColor:'white',
        marginBottom: 10,
    }
});
