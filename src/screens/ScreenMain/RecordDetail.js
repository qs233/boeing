import React, {Component} from 'react';
import {
    YellowBox,
    View,
    StyleSheet,
    Text,
    Image,
    Dimensions,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImageZoom from 'react-native-image-pan-zoom';
import global from '../../../src/GlobalVariable/globalVariable';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Warning: ...']);

let {height, width} = Dimensions.get('window');
let id;

export default class RecordDetail extends Component {

    constructor(props) {
        super(props);
        this.navigation = props.navigation;
        id = this.navigation.state.params.recordID;
        this.state = {
            showAll: true,
            isLoading: false,
            picture: [],
            position: '',
            posPic: [],
            change1:true,
            change2:true,
            change3:true,
            change4:true,
            change5:true,
        }
    }

    onPress(PosName) {

        const posPicList = this.state.picture.filter(e => e.value.position === PosName);
        this.setState({
            showAll:false,
            position: PosName,
            posPic: posPicList,
        });

        switch(PosName){
            case 'FrontFuselage':
                this.setState({
                    change1:false,
                    change2:true,
                    change3:true,
                    change4:true,
                    change5:true,
                });
                break;
            case 'LeftWing':
                this.setState({
                    change1:true,
                    change2:false,
                    change3:true,
                    change4:true,
                    change5:true,
                });
                break;
            case 'Tail':
                this.setState({
                    change1:true,
                    change2:true,
                    change3:false,
                    change4:true,
                    change5:true,
                });
                break;
            case 'BackFuselage':
                this.setState({
                    change1:true,
                    change2:true,
                    change3:true,
                    change4:false,
                    change5:true,
                });
                break;
            case 'RightWing':
                this.setState({
                    change1:true,
                    change2:true,
                    change3:true,
                    change4:true,
                    change5:false,
                });
                break;
        }

    }

    clickShowAll = () =>  {
        this.setState({
            showAll:true,
            change1:true,
            change2:true,
            change3:true,
            change4:true,
            change5:true,
        });
    };

    render() {

        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Text style={styles.loading}>Loading ...</Text>
                </View>
            );
        } else {

            return (
                <View style={styles.container}>
                    {/*自定义顶部导航栏*/}
                    <View style={styles.headerStyle}>
                        <Icon
                            containerStyle={{backgroundColor:'#68ABFF'}}
                            name = 'angle-left'
                            type = 'font-awesome'
                            color = 'white'
                            size={30}
                            onPress={() => {this.props.navigation.navigate('ScreenMain')}} />
                        <View>
                            <Text style={styles.topTextStyle}>Detail</Text>
                        </View>
                        <TouchableOpacity onPress={this.clickShowAll}>
                            <Text style={styles.topTextStyle}>All</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonStyle}>
                        <TouchableOpacity activeOpacity={0.5}
                                          style={this.state.change1 ? styles.button : styles.buttonChange}
                                          onPress={this.onPress.bind(this, 'FrontFuselage')}>
                            <Image
                                source={require('../../assets/images/plane1.jpg')}
                                style={this.state.change1 ? styles.image : styles.imageChange}/>
                            <Text> FrontFuselage </Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5}
                                          style={this.state.change2 ? styles.button : styles.buttonChange}
                                          onPress={this.onPress.bind(this, 'LeftWing')}>
                            <Image
                                source={require('../../assets/images/plane2.jpg')}
                                style={this.state.change2 ? styles.image : styles.imageChange}/>
                            <Text> LeftWing </Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5}
                                          style={this.state.change3 ? styles.button : styles.buttonChange}
                                          onPress={this.onPress.bind(this, 'Tail')}>
                            <Image
                                source={require('../../assets/images/plane3.jpg')}
                                style={this.state.change3 ? styles.image : styles.imageChange}/>
                            <Text> Tail </Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5}
                                          style={this.state.change4 ? styles.button : styles.buttonChange}
                                          onPress={this.onPress.bind(this, 'BackFuselage')}>
                            <Image
                                source={require('../../assets/images/plane4.jpg')}
                                style={this.state.change4 ? styles.image : styles.imageChange}/>
                            <Text> BackFuselage </Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5}
                                          style={this.state.change5 ? styles.button : styles.buttonChange}
                                          onPress={this.onPress.bind(this, 'RightWing')}>
                            <Image
                                source={require('../../assets/images/plane5.jpg')}
                                style={this.state.change5 ? styles.image : styles.imageChange}/>
                            <Text> RightWing </Text>
                        </TouchableOpacity>
                    </View>

                    {
                        this.state.showAll ?
                            <View style={styles.text2Style}>
                                <Text>
                                    All Images
                                </Text>
                            </View> :

                            <View style={styles.text2Style}>
                                <Text>
                                    Images of {this.state.position}
                                </Text>
                            </View>
                    }

                    <View style={styles.imageContainer}>
                        <FlatList
                            data={this.state.showAll ? this.state.picture : this.state.posPic}
                            renderItem={this.renderRow}
                        />
                    </View>
                </View>
            );
        }
    }

    renderRow = (rowData) => {

        return (
            <View>
                <ImageZoom cropWidth={Dimensions.get('window').width}
                           cropHeight={Dimensions.get('window').height}
                           imageWidth={width}
                           imageHeight={height}>
                    <Image style={{width: width * 0.95, height: height * 0.95}}
                           resizeMode={'contain'}
                           source={{uri: rowData.item.value.predict_picture}}/>
                </ImageZoom>
            </View>

        )
    };

    componentDidMount() {

        this.loadDataFromNet();
    }

    loadDataFromNet() {
        console.log(this.props.url);
        fetch(global.url_detection + id +'/', {
            method: "GET",
            headers: ({
                'Content-Type': 'application/json',
                'Authorization': global.token,
            }),
        })
            .then((response) => {
                console.log(global.token);
                console.log(response);
                return response.json()
            })
            .then((jsonData) => {

                console.log("jsonData2:",jsonData);
                let data = jsonData.pictures;
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
                    picture: dataBlob,
                    isLoading: false,
                });

                console.log('picture2',this.state.picture)

            })
            .catch((error) => {
                alert(error);
            });
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
    },
    loading: {
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 25,
    },

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

    text1Style: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    buttonStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
        paddingLeft: 8,
        paddingRight: 8,
    },
    button: {
        height: 55,
        width: width * 0.31,
        alignItems: 'center',
        paddingTop: 5,
    },
    buttonChange: {
        height: 55,
        width: width * 0.31,
        alignItems: 'center',
        paddingTop: 5,
        backgroundColor: '#F0F0F0'
    },
    image: {
        height: 22,
        width: 22,
        overlayColor:'white',
        borderRadius:11,
    },
    imageChange: {
        height: 22,
        width: 22,
        overlayColor:'#F0F0F0',
        borderRadius:11,
    },
    text2Style: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30,
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center",
        paddingLeft: 8,
        paddingRight: 8,
    }
});

