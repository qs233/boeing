import React, {Component} from 'react';
import {
    YellowBox,
    View,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
    RefreshControl,
    FlatList,
    TextInput,
    Image,
    ImageStyle as tintColor,
    ActivityIndicator,
} from 'react-native';
import global from '../../../src/GlobalVariable/globalVariable';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Warning: ...']);

let {height, width} = Dimensions.get('window');

export default class ScreenTab2 extends Component {

    constructor(props) {
        super(props);
        this.navigation = props.navigation;

        this.page = 1;
        this.state = {

            isLoading: false,

            data: [],     //列表数据

            isRefreshing: false,
            isLoadMore: false, // false表示数据还未全部加载
            animating: true,

            date: "",        //检测日期
            inspector: "",   //检测人
            planeId: "",     //飞机编号

            show:false,
            notice:"",
        }
    }

    render() {

        if (this.state.isLoading) {
            return (
                <View style={styles.LoadContentStyle}>
                    <Text style={styles.textStyle}>Loading ...</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.allStyle}>
                    <View style={styles.inputStyle}>
                        <TextInput
                            ref="plane id"  //设置描述
                            onChangeText={this.onPlaneIdChanged}  //添加值改变事件
                            style={styles.searchStyle}
                            autoCapitalize='none'  //设置首字母不自动大写
                            underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                            placeholderTextColor={'#7f7f7f'}  //设置占位符颜色
                            placeholder={'plane ID'}  //设置占位符

                            value={this.state.planeId}
                        />

                        <TextInput
                            ref="inspector"  //设置描述
                            onChangeText={this.onInspectorChanged}  //添加值改变事件
                            style={styles.searchStyle}
                            autoCapitalize='none'  //设置首字母不自动大写
                            underlineColorAndroid={'transparent'}  //将下划线颜色改为透明
                            placeholderTextColor={'#7f7f7f'}  //设置占位符颜色
                            placeholder={'Inspector'}  //设置占位符

                            value={this.state.inspector}
                        />

                        <DatePicker
                            style={{width: width * 0.3}}
                            date={this.state.date}
                            mode="date"
                            placeholder="select date"
                            format="YYYY-MM-DD"
                            // minDate="2018-01-01"
                            // maxDate="2019-12-31"
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
                                this.setState({date: date})
                            }}
                        />

                        <View style={styles.cleanStyle}>
                            <TouchableOpacity
                                onPress={this.onClean} //添加点击事件
                                style={styles.button}>
                                <Image
                                    source={require('../../assets/images/refresh.png')}
                                    style={styles.image}/>
                            </TouchableOpacity>
                        </View>


                    </View>

                    <View style={styles.lineStyle}>

                        <TouchableOpacity
                            onPress={this.onSearch} //添加点击事件
                            style={styles.button}>

                            <View style={styles.searchStyleBorder}>
                                <Text style={{color: 'white',fontSize:19}}>SEARCH</Text>
                            </View>

                        </TouchableOpacity>

                    </View>

                    {
                        this.state.show ?

                            <View style={styles.noticeContentStyle}>
                                <Text style={styles.textStyle}>{this.state.notice}</Text>
                            </View> :

                            <View style={styles.listStyle}>

                                <FlatList
                                    data={this.state.data}
                                    renderItem={this.renderRow}
                                    refreshControl={this._renderRefreshControl()}
                                    onEndReached={() => this._onLoadMore()}
                                    ListFooterComponent={this.ListFooterComponent}
                                    onEndReachedThreshold={0.1}
                                />

                            </View>
                    }

                </View>
            );
        }
    }
    onClean = () => {
        this.page = 1;
        this.setState({
            data: [],

            date: "",        //检测日期
            inspector: "",   //检测人
            planeId: "",     //飞机编号

            show: true,
            notice:'Waiting...',

        });
        setTimeout(() => {
            this.setState({
                data: [],
                show: false,
                notice:"",
            });
            this.loadDataFromNet();
        }, 500)
    };

    onSearch = () => {
        this.page = 1;
        this.setState({
            data: [],

            show: true,
            notice:'Searching...',

        });
        setTimeout(() => {
            this.setState({
                data: [],
                show: false,
                notice:"",
            });
            this.loadDataFromNet();
        }, 500);
    };

    onPlaneIdChanged = (planeId) => {
        this.setState({
            planeId: planeId,
        })
    };

    onInspectorChanged = (inspector) => {
        this.setState({
            inspector: inspector,
        })
    };

    _onLoadMore() {
        if (!(this.state.isLoadMore && this.onEndReachedCalled) ) {

            this.page = this.page + 1;
            this.loadDataFromNet();
        }
        this.onEndReachedCalled=true;
    };

    ListFooterComponent = () => {
        return (
            <View style={styles.bottomFoot}>
                {
                    this.state.data.length != 0 ?
                        (
                            this.state.isLoadMore ? (
                                <Text style={styles.footText}>- END -</Text>
                            ) : (
                                <View style={styles.activeLoad}>
                                    <ActivityIndicator size="small" animating={this.state.animating} />
                                    <Text style={[styles.footText, styles.ml]}> Loading...</Text>
                                </View>
                            )
                        )
                        :
                        null
                }
            </View>
        );
    };

    componentDidMount() {
        this.onEndReachedCalled = false;
        this.loadDataFromNet();
    }

    loadDataFromNet() {

        let baseUrl = global.url_main;
        if (this.page != null) {
            baseUrl = baseUrl + 'page=' + this.page + "&plane=" + this.state.planeId +
                "&created_max=" + this.state.date + "&created_min=" + this.state.date + "&operator=" + this.state.inspector;
        }
        console.log("baseUrl",baseUrl);

        fetch(baseUrl, {
            method: "GET",
            headers: ({
                'Content-Type': 'application/json',
                'Authorization': global.token,
            }),
        })
            .then((response) => response.json())
            .then((jsonData) => {
                console.log("jsonData:",jsonData.results);
                let next = jsonData.next;
                let data = jsonData.results;
                let dataBlob = [];
                let i = 0;
                data.map(function (item) {
                    dataBlob.push({
                        key: i,
                        value: item,
                    });
                    i++;
                });

                if (this.page === 1) {
                    this.setState({
                        data: dataBlob,
                        isLoading: false,
                        refreshing: false,
                    });
                } else {
                    this.setState({
                        data: this.state.data.concat(dataBlob),
                        isLoading: false,
                        refreshing: false,
                    });
                }
                if (this.state.data.length === 0){
                    this.setState({
                        show: true,
                        notice:'No Results',
                    })
                } else {
                    this.setState({
                        show: false,
                        notice: " ",
                    })
                }
                if (next === null){
                    this.setState({
                        isLoadMore:true,
                    });
                }else {
                    this.setState({
                        isLoadMore:false,
                    });
                }
                // console.log(jsonData.results);
                // console.log(data);
            })
            .catch((error) => {
                alert(error);
            });
    }

    //单独的一个cell
    renderRow = (rowData) => {
        return (
            <TouchableOpacity activeOpacity={0.5}
                              onPress={() =>
                                  this.props.navigation.navigate('RecordDetail', {recordID: rowData.item.value.detection_id})}>

                <View style={styles.cellViewStyle}>

                    <View style={styles.rightViewStyle}>
                        <Text
                            style={styles.titleStyle}>
                            AirPlane: {rowData.item.value.plane} has {rowData.item.value.pictures.length} inspection results
                        </Text>

                        <Text style={styles.contentStyle}>
                            Inspector: {rowData.item.value.operator}
                        </Text>
                        <Text style={styles.dateStyle}>
                            {moment(rowData.item.value.create_time).format("YYYY-MM-DD HH:mm:ss")}
                        </Text>
                    </View>
                </View>

            </TouchableOpacity>
        );
    };

    _renderRefreshControl() {
        return (
            <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this._onRefresh}
                colors={['#ddd', '#0398ff']}
                progressBackgroundColor='#fff'
            >
            </RefreshControl>
        )
    }

    _onRefresh = () => {
        this.setState({isRefreshing: true});
        setTimeout(() => {
            this.loadDataFromNet();
            this.setState({isRefreshing: false});
        }, 500)
    };

}

const styles = StyleSheet.create({

    allStyle: {
        flex:1,
        backgroundColor: 'white',
    },

    inputStyle: {
        height: height * 0.08,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
    },

    searchStyle: {
        height: 35,
        width: width * 0.27,
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        marginLeft: 3,
    },

    cleanStyle: {
        height: 30,
        marginLeft: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },

    lineStyle: {
        height: height * 0.05,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    listStyle: {
        height: height * 0.76,
    },

    noticeContentStyle:{
        height: height * 0.76,
        alignItems: 'center',
        justifyContent: 'center',
    },

    LoadContentStyle:{
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    footContentStyle:{
        alignItems: 'center',
        justifyContent: 'center',
    },

    textStyle:{
        fontSize: 18,
        color: 'black',
    },

    searchStyleBorder: {
        height: 35,
        width: width * 0.95,
        backgroundColor: '#46A3FF',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 7,
    },


    rightViewStyle: {
        width: width - 20
    },

    cellViewStyle: {

        //主轴
        flexDirection: 'row',
        //侧轴
        alignItems: "center",
        padding: 10,
        borderBottomColor: '#878787',
        borderBottomWidth: 0.5
    },

    titleStyle: {
        fontSize: 18,
        marginBottom: 6,
        color: 'black',
    },

    contentStyle: {
        color: 'gray'
    },

    dateStyle: {
        position: 'absolute',
        right: 20,
        bottom: 0,
        color: 'gray'
    },

    image: {
        height: 30,
        width: 30,
        tintColor: tintColor,
    },

    img: {
        height: 55,
        width: 100,
    },
    bottomFoot: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    footText: {
        marginTop: 5,
        fontSize: 12,
        color: '#999999',
    },

    activeLoad: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    ml: {
        marginLeft: 10,
    }
});
