import React, { Component } from 'react';
import {
    // AppRegistry,
    ScrollView,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Picker,
    FlatList,
    // StatusBar,
} from 'react-native';
import Echarts from 'native-echarts'; // 引入Echarts图表组件
// import {Button, SearchBar} from "react-native-elements";
import global from "../../GlobalVariable/globalVariable";
const {height, width} = Dimensions.get('window'); // 获取屏幕的宽度和高度

export default class ScreenTab3 extends Component {

    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        this.state = {
            pieData: {},
            barData: {},
            planeInfo: {
                tail_number: '',
                LineNumber: '',
                ASN: '',
                Variable: '',
                plane_type: '',
            },
            planeText: '',
            numberType: 'line_number',
            planeId: 1,
            show: true,
            selectData: [],
        }
    }
    render() {
        return (
            <ScrollView>
                <View>
                    {/*状态栏*/}
                    {/*<StatusBar*/}
                        {/*translucent={true} // 指定状态栏是否透明。设置为true时，应用会延伸到状态栏之下绘制（即所谓“沉浸式”——被状态栏遮住一部分）。常和带有半透明背景色的状态栏搭配使用。*/}
                        {/*animated={true} // 指定状态栏的变化是否应以动画形式呈现,目前支持这几种样式：backgroundColor, barStyle和hidden。*/}
                        {/*backgroundColor={'#68ABFF'} // 状态栏的背景色*/}
                        {/*barStyle={'default'} // 设置状态栏文本的颜色,默认是白色*/}
                        {/*hidden={false} // 是否隐藏状态栏，默认是否，即显示状态栏*/}
                        {/*showHideTransition={'fade'} // 通过hidden属性来显示或隐藏状态栏时所使用的动画效果。默认值为'fade'。*/}
                        {/*networkActivityIndicatorVisible={true} // 指定是否显示网络活动提示符*/}
                    {/*/>*/}

                    {/*搜索飞机*/}
                    <View style={styles.topStyle}>
                        <Picker
                            selectedValue={this.state.numberType}
                            style={styles.input1Style}
                            onValueChange={(itemValue, itemIndex) => this.setState({numberType: itemValue})}>
                            <Picker.Item label="line_number" value="line_number" />
                            <Picker.Item label="tail_number" value="tail_number" />
                            <Picker.Item label="variable" value="variable" />
                            <Picker.Item label="asn" value="asn" />
                        </Picker>
                        <TextInput
                            style={styles.input2Style}
                            ref="selectPlane"  //设置描述
                            autoCapitalize='none'  //设置首字母不自动大写
                            underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                            placeholder={' '}  //设置占位符
                            placeholderTextColor={'#7f7f7f'}  //设置占位符颜色
                            onChangeText={(searchText) => this.onPlaneIdChanged(searchText)}  //添加值改变事件
                        />
                        <TouchableOpacity activeOpacity={0.5}
                                          onPress={() => this.search1()}>
                            <View style={styles.searchStyle}>
                                <Text style={styles.text1Style}>Search</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    {
                        this.state.show ?
                            <View>
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
                                <View>
                                    <TouchableOpacity activeOpacity={0.5}
                                                      onPress={() =>
                                                          this.props.navigation.navigate('PieChartDetail', {
                                                              tail_number: this.state.planeInfo.tail_number,
                                                              LineNumber: this.state.planeInfo.LineNumber,
                                                              ASN: this.state.planeInfo.ASN,
                                                              Variable: this.state.planeInfo.Variable,
                                                              plane_type: this.state.planeInfo.plane_type,
                                                              planeId:this.state.planeId
                                                          })
                                                      }>
                                        <View style={styles.headerInfoStyle}>
                                            <View style={{flexDirection: 'row'}}>
                                                <Image
                                                    source={require('../../assets/analysis/pie.jpg')}
                                                    style={styles.iconStyle}/>
                                                <Text style={styles.textStyle}>This month</Text>
                                            </View>
                                            <View style={{flexDirection: 'row'}}>
                                                <Text>More</Text>
                                                <Image
                                                    source={require('../../assets/analysis/RightArrow.jpg')}
                                                    style={styles.iconStyle}/>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.chartStyle}>
                                        <Echarts option={this.state.pieData} height={height*0.4} width={width}/>
                                    </View>
                                </View>

                                {/*柱状图*/}
                                <View>
                                    <TouchableOpacity activeOpacity={0.5}
                                                      onPress={() =>
                                                          this.props.navigation.navigate('BarChartDetail', {
                                                              tail_number: this.state.planeInfo.tail_number,
                                                              LineNumber: this.state.planeInfo.LineNumber,
                                                              ASN: this.state.planeInfo.ASN,
                                                              Variable: this.state.planeInfo.Variable,
                                                              plane_type: this.state.planeInfo.plane_type,
                                                              planeId:this.state.planeId
                                                          })
                                                      }>
                                        <View style={styles.headerInfoStyle}>
                                            <View style={{flexDirection: 'row'}}>
                                                <Image
                                                    source={require('../../assets/analysis/bar.png')}
                                                    style={styles.icon1Style}/>
                                                <Text style={styles.textStyle}>Last seven days</Text>
                                            </View>
                                            <View style={{flexDirection: 'row'}}>
                                                <Text>More</Text>
                                                <Image
                                                    source={require('../../assets/analysis/RightArrow.jpg')}
                                                    style={styles.iconStyle}/>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.chartStyle}>
                                        <Echarts option={this.state.barData} height={height*0.4} width={width}/>
                                    </View>
                                </View>

                                {/*结束标志*/}
                                <View style={styles.endStyle}>
                                    <Text style={{fontSize: 12}}>- END -</Text>
                                </View>
                            </View>
                            :
                            <View>
                                <View style={styles.main2Style}>
                                    <FlatList
                                        data={this.state.selectData}
                                        renderItem={this.renderRow}
                                    />
                                </View>
                                {/*结束标志*/}
                                <View style={styles.endStyle}>
                                    <Text style={{fontSize: 12}}>- END -</Text>
                                </View>
                            </View>
                    }
                </View>
            </ScrollView>
        );
    }

    componentDidMount() {
        let url_default_month = global.url_default_month;
        let url_default_date = global.url_default_date;
        this.loadDataFromNet1(url_default_month);
        this.loadDataFromNet2(url_default_date);
    }
    loadDataFromNet1 (url) {
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
                let airInfo = data[0].airplane

                let tail_number = airInfo.tail_number;
                let LineNumber = airInfo.line_number;
                let ASN = airInfo.asn;
                let Variable = airInfo.variable;
                let plane_type = airInfo.plane_type;

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
                    planeInfo: {
                        tail_number: tail_number,
                        LineNumber: LineNumber,
                        ASN: ASN,
                        Variable: Variable,
                        plane_type: plane_type,
                    },
                });
        }).catch((error) => {
            alert(error);
        });
    }
    loadDataFromNet2 (url) {
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
    onPlaneIdChanged(searchText) {
        this.setState({
            planeText: searchText
        });
    }
    search1() {
        this.setState({
            show: false
        });
        let type = this.state.numberType;
        console.log(type);
        let planeText = this.state.planeText;
        if(planeText !== ""){
            let url_month = global.url_select_plane + type + '=' + planeText;
            fetch(url_month, {
                method: "GET",
                headers: ({
                    'Accept': '*/*',
                    'Content-Type': 'application/json',
                    'Authorization': global.token,
                }),
            }).then((response) => response.json())
                .then((jsonData) =>{

                    let data = jsonData;
                    let dataBlob = [];
                    let i = 0;
                    data.map(function (item) {
                        dataBlob.push({
                            key: i,
                            value: item,
                        });
                        i++;
                    });
                    this.setState({
                        selectData:dataBlob,
                    });
                }).catch((error) => {
                alert(error);
            });
        }
    }
    search2(id) {
        let planeId = id;
        if(planeId !== ""){
            let url_month = global.url_default_month + 'keyword=' + planeId;
            let url_date = global.url_default_date + "keyword=" + planeId;
            this.loadDataFromNet1(url_month);
            this.loadDataFromNet2(url_date);
        }
        this.setState({
            planeId: planeId,
            show: true
        })
    }
    renderRow = (rowData) => {
        return (
            <TouchableOpacity  onPress={() => this.search2(rowData.item.value.id)}
                               activeOpacity={0.5}>

                <View style={styles.cellViewStyle}>
                    <Text
                        style={styles.titleStyle}>
                        Tail Number: {rowData.item.value.tail_number}
                    </Text>
                    <Text style={styles.titleStyle}>
                        LineNumber: {rowData.item.value.line_number}
                    </Text>
                    <Text style={styles.titleStyle}>
                        ASN: {rowData.item.value.asn}
                    </Text>
                    <Text style={styles.titleStyle}>
                        Variable: {rowData.item.value.variable}
                    </Text>
                    <Text style={styles.title1Style}>
                        AirPlaneType: {rowData.item.value.plane_type}
                    </Text>
                </View>

            </TouchableOpacity>
        );
    };
}

// 注册应用(registerComponent)后才能正确渲染。注意：只把应用作为一个整体注册一次，而不是每个组件/模块都注册
// AppRegistry.registerComponent(
//     'ScreenTab3',
//     () => ScreenTab3);

const styles = StyleSheet.create({
    topStyle: {
        backgroundColor:'#68ABFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft:10,
        paddingRight: 10,
        height:45,
    },
    input1Style: {
        height: 35,
        width: width * 0.4,
        backgroundColor:'white',
        borderWidth: 1,
        borderColor: '#68ABFF',
        borderRadius: 10,
    },
    input2Style: {
        height: 35,
        width: width * 0.4,
        backgroundColor:'white',
        borderWidth: 1,
        borderColor: '#68ABFF',
        // borderRadius: 10,
        // marginTop: StatusBar.currentHeight+5,
        marginTop:5,
        marginBottom: 5,
    },
    text1Style: {
        color: 'white',
        fontSize: 15,
    },
    searchStyle: {
        flexDirection: 'row',
        backgroundColor:'#68ABFF',
        // marginTop: StatusBar.currentHeight+5,
        marginTop:5,
        marginBottom: 5,
        textAlign: 'center',
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
    headerInfoStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor:'white',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E4E7ED',
    },
    iconStyle: {
        height: 25,
        width: 25,
        borderRadius: 33,
        overlayColor: 'white',
    },
    icon1Style: {
        height: 25,
        width: 25,
        overlayColor: 'white',
    },
    chartStyle: {
        alignItems: 'center',
        backgroundColor:'white',
        marginBottom: 10,
    },
    textStyle: {
        color: 'black',
        fontSize: 15,
    },
    endStyle:{
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 15,
    },
    main2Style:{
        backgroundColor:'white',
        paddingTop: 5,
    }
});

