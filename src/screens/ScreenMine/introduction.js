import React, {Component} from 'react';
import {
    YellowBox,
    View,
    StyleSheet,
    Text,
    ScrollView,
} from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);
YellowBox.ignoreWarnings(['Warning: ...']);

export default class introduction extends Component {
    constructor(props){
        super(props);
        this.navigation = props.navigation;
        this.state = {};
    }

    render(){
        return(
            <ScrollView>
                <View style={styles.container}>

                    <Text style={styles.text}>
                        <Text style={styles.boldText}>
                            1. Damage Detection{'\n'}
                        </Text>
                        <Text style={styles.paddingText}>
                            On the "detection" menu, you can detect the damage on the surface of the airplane by clicking the "Start" button. Before you start detecting, you have to choose the type and number of the airplane in turn. After entering the detection page, App will automatically and continuously detect and present the  detection results, including the location and type of damage, on the mobile phone interface. If you want to save the current detection result, you can click the "Photo" button and select the airplane position through the airplane model.
                        </Text>
                    </Text>

                    <Text style={styles.text}>
                        <Text style={styles.boldText}>
                            2. Inspection Record{'\n'}
                        </Text>
                        <Text>
                            On the "record" menu, there are all detection records. You can search for the detection records you want through conditional queries, including plane id, inspector and date. In addition, all details of the detection results are stored in the form of photographs in each record.
                        </Text>
                    </Text>

                    <Text style={styles.text}>
                        <Text style={styles.boldText}>
                            3. Damage Analysis{'\n'}
                        </Text>
                        <Text>
                            On the "anaysis" menu, a specific airplane's damage analysis is presented, including the total number and proportion of each type of damage in the last month, and the specific number of each type of damage in the last seven days. You can search for a specific plane through the top search bar. If you want to know more about the statistical analysis of damage, you can enter the secondary menu, where you can choose the date to get what you want.
                        </Text>
                    </Text>

                    <Text style={styles.text}>
                        <Text style={styles.boldText}>
                            4. User Information{'\n'}
                        </Text>
                        <Text>
                            On the "mine" menu, some user information is displayed here. And by "settings", you can change password and log out.
                        </Text>
                    </Text>

                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginTop: 10,
    },

    text: {
        color: 'black',
        fontSize: 15,
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E4E7ED',
        textAlign: 'justify',
    },

    boldText: {
        fontWeight: 'bold',
    },

    paddingText: {
        paddingLeft: 20
    }

});
