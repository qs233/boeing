import React, {Component} from 'react';
import {
    YellowBox,
    View,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
    FlatList,
    TextInput,
} from 'react-native';
import global from '../../../src/GlobalVariable/globalVariable';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Warning: ...']);

var {height, width} = Dimensions.get('window');
var data = [];
var fetchData = [];
export default class SelectPlane extends Component {


    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        this.state = {
            allData:[],
            data1: [],
            isLoading: true
        }
    }



    render() {

        if (this.state.isLoading) {
            return (
                <Text>loading ...</Text>
            );
        } else {
            return (
                <View>
                    <View style={styles.topStyle}>
                        <TextInput
                            style={styles.searchStyle}
                            ref="selectPlane"  //设置描述
                            autoCapitalize='none'  //设置首字母不自动大写
                            underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                            placeholder={'  Select Plane'}  //设置占位符
                            placeholderTextColor={'#7f7f7f'}  //设置占位符颜色
                            // inlineImageLeft='search_icon'
                            // inlineImagePadding={5}
                            // clearButtonMode={true}
                            onChangeText={(searchText) => this.onChangeTextKeyword(searchText)}  //添加值改变事件
                        />
                    </View>
                    <View style={styles.mainStyle}>
                        <FlatList
                            data={this.state.data1}
                            renderItem={this.renderRow}
                        />
                    </View>
                </View>
            );
        }
    }

    onChangeTextKeyword(searchText) {
        console.log(searchText);
        this.search(searchText);
    }

    search(searchText) {
        console.log("Alldata");
        let allData = this.state.allData;
        console.log(allData);
        let data = [];
        var searchString = searchText.trim().toUpperCase();
        if(searchString.length > 0) {
            console.log(searchString);
            data = allData.filter(
                function (i) { //i是其中每个元素
                    console.log(i);
                    return i.value.plane_id.toUpperCase().match(searchString);
                }
            )
        }else {
            data = allData;
        }
        console.log("data");
        console.log(data);
        this.setState({
            data1: data
        });
    }

    //解决退出后还在继续拍照检测的问题
    componentDidMount() {
        this.loadDataFromNet();

    }

    loadDataFromNet() {
        fetch(global.url_select_plane, {
            method: "GET",
            headers: ({
                'Accept':'*/*',
                'Authorization': global.token,
            }),
        })
            .then((response) => response.json())
            .then((jsonData) => {
                console.log(jsonData);
                let data = jsonData;
                console.log("接收到"+data);
                let dataBlob = [];
                let i = 0;
                data.map(function (item) {
                    console.log(item);
                    dataBlob.push({
                        key: i,
                        value: item,
                    });
                    i++;
                });

                this.setState({
                    allData:dataBlob,
                    data1: dataBlob,
                    isLoading: false

                    //data: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(jsonData.data),
                });
                console.log(data);

            })
            .catch((error) => {
                alert(error);
            });
    }

    //单独的一个cell
    renderRow = (rowData) => {
        return (
            <TouchableOpacity  onPress={() => this.props.navigation.navigate("UnityView",{plane:rowData.item.value})}
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

    renderHeader() {
        return (
            <View>
                <Text>
                    please select plane number
                </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({

    topStyle: {
        alignItems: 'center',
        backgroundColor:'#68ABFF',
    },
    searchStyle: {
        height: 35,
        width: width * 0.9,
        backgroundColor:'white',
        borderWidth: 1,
        borderColor: '#68ABFF',
        borderRadius: 20,
        marginBottom: 10,
    },

    mainStyle:{
        backgroundColor:'white',
        paddingTop: 5,
    },
    cellViewStyle: {
        flexDirection: 'row',
        flexWrap:'wrap',//第一行放不下，自动转到下一行
        paddingLeft: width * 0.05,
        borderBottomColor: '#878787',
        borderBottomWidth: 0.5,
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

});
