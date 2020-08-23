import React, {Component} from 'react';
import {
    YellowBox,
    ListView,
    View,
    StyleSheet,
    Text,
    Dimensions,
    TouchableOpacity,
    FlatList,
    TextInput,
    Image

} from 'react-native';
import moment from 'moment';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Warning: ...']);

var {height, width} = Dimensions.get('window');
var data = null;
export default class ScreenTab1 extends Component {

    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        this.state = {
            data: null,
        }
    }

    static defaultProps = {
        url: 'http://10.112.32.109:8080/plane/info',

    };

    render() {

        if (!this.state.data) {
            return (
                <Text>loading ...</Text>
            );
        } else {
            return (

                <ListView
                    dataSource={this.state.data}
                    renderRow={(rowData) => this.renderRow(rowData)}
                    renderHeader={(rowData) => this.renderHeader(rowData)}
                />

            );
        }
    }

    componentDidMount() {
        this.loadDataFromNet();

    }

    loadDataFromNet() {
        fetch(this.props.url, {
            method: "GET",
            headers: ({
                'Content-Type': 'application/json',
                //'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6InJlYm9ybiIsImV4cCI6MTUzODk4ODIwMywiZW1haWwiOiIxMjM0NTZ3d0BnbWFpbC5jb20ifQ.FAZCi6Kw2HRfic9OvvZ2DHd1bWFvT7pjW-_GzXA8F5Q'
            }),
        })
            .then((response) => response.json())
            .then((jsonData) => {
                this.setState({
                    data: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}).cloneWithRows(jsonData.data),
                });
            })
            .catch((error) => {
                alert(error);
            });
    }

    //单独的一个cell
    renderRow = (rowData) => {

        return (

            <TouchableOpacity activeOpacity={0.5}>

                <View style={styles.cellViewStyle}>

                    <View style={styles.rightViewStyle}>
                        <Text
                            style={styles.titleStyle}>
                            AirPlane: {rowData.plane_id} has {rowData.scar_num} inspection results
                        </Text>

                        <Text style={styles.contentStyle}>
                            Inspector: {rowData.user_name}
                        </Text>
                        <Text style={styles.dateStyle}>
                            {moment(rowData.inspect_date).format("YYYY-MM-DD HH:mm:ss")}
                        </Text>
                    </View>

                </View>

            </TouchableOpacity>
        );
    };


    renderHeader() {
        return (
            <View>
                <Text>
                    最新巡检记录

                </Text>
            </View>
        )

    }


}

const styles = StyleSheet.create({

    searchStyle: {},
    rightViewStyle: {
        width: width - 20
    },
    cellViewStyle: {
        color: "white",
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
        marginBottom: 6

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

    img: {
        height: 55,
        width: 100,
    }
});

