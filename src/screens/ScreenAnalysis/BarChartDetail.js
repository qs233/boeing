import React, {Component} from 'react';
import {YellowBox, View, StyleSheet, Text, Dimensions, TouchableOpacity} from 'react-native';
// import { Icon } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Echarts from "native-echarts";
import global from '../../../src/GlobalVariable/globalVariable';
import DatePicker from "react-native-datepicker";

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Warning: ...']);

const { height, width} = Dimensions.get('window'); // 获取屏幕的宽度和高度

export default class BarChartDetail extends Component {
    constructor(props){
        super(props);
        this.navigation = props.navigation;

        let tail_number = this.navigation.state.params.tail_number;
        let LineNumber = this.navigation.state.params.LineNumber;
        let ASN = this.navigation.state.params.ASN;
        let Variable = this.navigation.state.params.Variable;
        let plane_type = this.navigation.state.params.plane_type;
        let planeId = this.navigation.state.params.planeId;

        let today = new Date();
        today = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        this.state = {
            startDay: '',
            endDay: '',
            today: today,

            planeInfo: {
                tail_number: tail_number,
                LineNumber: LineNumber,
                ASN: ASN,
                Variable: Variable,
                plane_type: plane_type,
            },
            barData: {},
            planeId: planeId,
        };
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
                        <Text style={styles.topTextStyle}>Select Day</Text>
                    </View>
                    <View style={styles.blankStyle}/>
                </View>

                {/*选择天数*/}
                <View style={styles.headerInfoStyle}>
                    <DatePicker
                        style={{width: width * 0.35}}
                        date={this.state.startDay}
                        mode="date"
                        placeholder="Start Date"
                        format="YYYY-MM-DD"
                        minDate="2019-01-01"
                        maxDate={this.state.today}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={
                            {
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 3,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 34,
                                    borderRadius: 5,
                                    height: 30,

                                    width: width * 0.26,
                                    borderWidth: 1,
                                    borderColor: 'grey',
                                }
                                // ... You can check the source to find the other keys.
                            }}
                        onDateChange={(date) => {
                            this.setState({startDay: date})
                        }}
                    />
                    <DatePicker
                        style={{width: width * 0.35}}
                        date={this.state.endDay}
                        mode="date"
                        placeholder="End Date"
                        format="YYYY-MM-DD"
                        minDate={this.state.startDay}
                        maxDate={this.state.today}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={
                            {
                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 3,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 34,
                                    borderRadius: 5,
                                    height: 30,

                                    width: width * 0.26,
                                    borderWidth: 1,
                                    borderColor: 'grey',
                                }
                                // ... You can check the source to find the other keys.
                            }}
                        onDateChange={(date) => {
                            this.setState({endDay: date})
                        }}
                    />
                    <TouchableOpacity activeOpacity={0.5}
                                      onPress={this.searchDays}>
                        <View style={styles.searchStyle}>
                            <Text style={styles.text1Style}>Search</Text>
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

                {/*折线图*/}
                <View style={styles.chartStyle}>
                    <Echarts option={this.state.barData} height={height*0.4} width={width}/>
                </View>

            </View>
        )
    }
    componentDidMount () {
        let url_default_date = global.url_default_date + "keyword=" + this.state.planeId;
        this.loadDataFromNet(url_default_date);
    };
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

                let xAxis = [];
                let barChartLegend = [];
                let barSeries = [];

                data.map(function (item) {
                    let value = [];
                    let barItem = item.data;
                    barItem.map(function (ir){
                        let date = [ir.date.split("-")[1],ir.date.split("-")[2]];
                        let dateAxis = date.join("/");
                        value.push(ir.count);
                        xAxis.push(dateAxis);
                    });
                    barChartLegend.push(item.name);
                    barSeries.push({
                        name:item.name,
                        type:'bar',
                        barGap: 0,
                        data:value,
                    })
                });

                this.setState({
                    barData:{
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow'
                            },
                            position: ['10', '10']
                        },
                        legend: {
                            data: barChartLegend
                        },
                        grid: {
                            top: '35%',
                            bottom: '20%',
                        },
                        calculable: true,
                        xAxis: [
                            {
                                type: 'category',
                                axisTick: {show: false},
                                data: xAxis
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        series: barSeries
                    }
                });
            }).catch((error) => {
            alert(error);
        });
    }

    sevenDays () {
        let xAxis = [];
        let today = new Date();

        for (let i = 6; i > -1; i-- ) {
            let time = new Date(today.getFullYear() + '/' + (today.getMonth()+1) + '/' + today.getDate());
            time = time.setDate(time.getDate() - i);
            time = new Date(time);
            time = time.getDate();
            xAxis.push(time)
        }
        return xAxis
    };
    searchDays = () => {
        let start = this.state.startDay;
        let end = this.state.endDay;

        let url_date = global.url_default_date + 'start=' + start + "&stop=" + end + "&keyword=" + this.state.planeId;

        let startSplit = start.split('-');
        let startYear = startSplit[0];
        let startMonth = startSplit[1];
        let startDay = startSplit[2];

        let addStartDay = new Date(startYear + '/' + startMonth + '/' + startDay);
        addStartDay = addStartDay.setDate(addStartDay.getDate() + 6);
        console.log('addStartDay:',addStartDay);

        let endSplit = end.split('-');
        let endYear = endSplit[0];
        let endMonth = endSplit[1];
        let endDay = endSplit[2];

        let addendDay = new Date(endYear + '/' + endMonth + '/' + endDay);
        addendDay = addendDay.setDate(addendDay.getDate());
        console.log('addendDay:',addendDay);

        if ( start === '' || end === '' ) {
            alert('Please select the start date or end date!')
        } else if (addendDay > addStartDay) {
            alert('Date range should not be greater than 7 days!')
        } else {
            this.loadDataFromNet (url_date);
        }

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
    topTextStyle:{
        color: 'white',
        fontSize: 17,
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
        backgroundColor:'white',
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: width * 0.04,
        paddingRight: width * 0.04,
        borderBottomWidth: 1,
        borderBottomColor: '#E4E7ED',
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
    textStyle: {
        color: 'black',
        fontSize: 15,
    },
    text1Style: {
        color: 'white',
        fontSize: 15,
    },
    chartStyle: {
        alignItems: 'center',
        backgroundColor:'white',
        marginBottom: 10,
    },
    searchStyle: {
        flexDirection: 'row',
        backgroundColor:'#68ABFF',
        borderRadius: 5,
        height: 30,
        padding: 5
    }
});
