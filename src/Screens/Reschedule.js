import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  useWindowDimensions,
  ImageBackgroundBase,
  ImageBackground,
  FlatList,
} from 'react-native';
import {Api} from '../services/Api';
import {StatusBarLight} from '../Custom/CustomStatusBar';
import {Header, HeaderDark, MainView} from '../Custom/CustomView';
import {BottomView, EndButton, HeaderLight} from '../Custom/CustomView';
const {height} = Dimensions.get('window');

const Reschedule = ({navigation}) => {
  const [rescheduleData, setRescheduleData] = useState([])
  const [data, setData] = useState([
    {
      id: '1',
      title: 'Ram Construction',
      subTitle: 'Washington, United States',
      source: require('../images/Reruiting-agent-slice/images.png'),
    },
  ]);

  useEffect(()=>{
    getProfile()
  },[]);

  const getProfile = async ()=>{
    const response = await Api.getUserHome()
    const {status} = response;
    if(status){
      console.log("sch",response.schedule_interview)
      // setschduleInterview(response.schedule_interview)
    }    
  }
  return (
    <View style={{backgroundColor: '#FFFFFF', flex: 1}}>
      <StatusBarLight />
      <HeaderDark onPress={() => navigation.goBack()} title={'Reschedule'} />
      <View>
        <SafeAreaView style={styles.subBox}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{
                width: 50,
                height: 50,
                marginLeft: 10,
                marginTop: 15,
              }}
              source={require('../images/images.png')}
            />
            <View>
              <Text style={styles.inText}>Ram Construction</Text>
              <Text style={styles.insubText}>Washington, United States</Text>
            </View>
            <Image
              style={{
                width: 16,
                height: 16,
                marginLeft: 'auto',
                marginTop: 15,
                marginHorizontal: 15,
              }}
              source={require('../images/star.png')}
            />
          </View>
          <View style={styles.Line} />
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.redText}>26 Dec 2021, 1:30 PM</Text>
            <View
              style={{
                width: '30%',
                marginTop: 10,
                marginLeft: 'auto',
              }}>
              <EndButton
                bgColor={'lightgrey'}
                title={'Interview Call'}
                onPress={() => {}}
              />
            </View>
          </View>
        </SafeAreaView>
        <FlatList
          numColumns={1}
          keyExtractor={item => item.id}
          data={data}
          renderItem={({item, index}) => (
            <SafeAreaView style={styles.subBox}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    marginLeft: 10,
                    marginTop: 15,
                  }}
                  source={item.source}
                />
                <View>
                  <Text style={styles.inText}>{item.title}</Text>
                  <Text style={styles.insubText}>{item.subTitle}</Text>
                </View>
                <Image
                  style={{
                    width: 16,
                    height: 16,
                    marginLeft: 'auto',
                    marginTop: 15,
                    marginHorizontal: 15,
                  }}
                  source={require('../images/star.png')}
                />
              </View>
              <View style={styles.Line} />
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.redText}>26 Dec 2021, 1:30 PM</Text>
                <View
                  style={{
                    width: '30%',
                    marginTop: 10,
                    marginLeft: 'auto',
                  }}>
                  <EndButton title={'Interview Call'} onPress={() => {}} />
                </View>
              </View>
            </SafeAreaView>
          )}
        />
      </View>
    </View>
  );
};

export default Reschedule;

const styles = StyleSheet.create({
  subBox: {
    padding: 10,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 5,
  },
  inText: {
    fontFamily: 'Muli',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1E1F20',
    marginLeft: 15,
    marginTop: 15,
  },
  insubText: {
    fontFamily: 'Muli',
    fontSize: 12,
    fontWeight: '600',
    color: '#8F9BB3',
    marginLeft: 15,
    marginTop: 5,
  },
  redText: {
    fontFamily: 'Muli-SemiBold',
    fontSize: 13,
    fontWeight: '700',
    color: '#FF0000',
    marginLeft: 15,
    marginTop: 15,
  },
  Line: {
    height: 1,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    // marginHorizontal: 20,
    marginTop: 10,
  },
});
