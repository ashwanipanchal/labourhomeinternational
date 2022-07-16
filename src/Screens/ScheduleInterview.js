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
import {StatusBarLight} from '../Custom/CustomStatusBar';
import AppHeader from '../Custom/CustomAppHeader';
import {Header, HeaderDark, MainView} from '../Custom/CustomView';
import {BottomView, EndButton, HeaderLight} from '../Custom/CustomView';
const {height} = Dimensions.get('window');

const ScheduleInterview = ({navigation}) => {
  const [data, setData] = useState([
    {
      id: '1',
      name: 'Deepak Kumar',
      title: 'New Delhi, India',
      subTitle: 'RA Name : Rahul Sharma',
      source: require('../images/Reruiting-agent-slice/images.png'),
    },
    {
      id: '2',
      name: 'Deepak Kumar',
      title: 'New Delhi, India',
      subTitle: 'RA Name : Rahul Sharma',
      source: require('../images/Reruiting-agent-slice/images.png'),
    },
  ]);
  return (
    <View style={{backgroundColor: '#FFFFFF', flex: 1}}>
      <StatusBarLight />
      <AppHeader
        backOnClick={() => {
          navigation.goBack();
        }}
        backIcon={require('../images/back.png')}
        title={'Schedule Interview'}
        shareOnClick={() => {}}
        share={require('../images/Reruiting-agent-slice/support.png')}
      />
      <ScrollView>
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
                source={require('../images/Reruiting-agent-slice/images.png')}
              />
              <View>
                <Text style={styles.inText}>Deepak Kumar</Text>
                <Text style={styles.insubText}>New Delhi, India</Text>
                <Text style={styles.insubText}>RA Name : Rahul Sharma</Text>
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
            <Text style={styles.middleText}>
              Hard Hat, Mason, Brick Layer, Maker…{' '}
            </Text>
            <View style={styles.Line} />
            <View style={{flexDirection: 'row'}}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  resizeMode: 'contain',
                  marginLeft: 10,
                  marginTop: 10,
                }}
                source={require('../images/Reruiting-agent-slice/user.png')}
              />
              <View>
                <Text style={styles.inText}>Gourav Sharma</Text>
                <Text style={styles.redText}>25 Dec 2021, 2:30 PM</Text>
              </View>
              <View
                style={{
                  width: '30%',
                  marginTop: 25,
                  marginLeft: 'auto',
                }}>
                <EndButton
                  bgColor={'lightgrey'}
                  title={'Interview Call'}
                  onPress={() => {
                    navigation.navigate('CandidateApplied');
                  }}
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
                    <Text style={styles.inText}>{item.name}</Text>
                    <Text style={styles.insubText}>{item.title}</Text>
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
                <Text style={styles.middleText}>
                  Hard Hat, Mason, Brick Layer, Maker…{' '}
                </Text>
                <View style={styles.Line} />
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                      resizeMode: 'contain',
                      marginLeft: 10,
                      marginTop: 10,
                    }}
                    source={require('../images/Reruiting-agent-slice/user.png')}
                  />
                  <View>
                    <Text style={styles.inText}>Gourav Sharma</Text>
                    <Text style={styles.redText}>20 Dec 2021, 2:30 PM</Text>
                  </View>
                  <View
                    style={{
                      width: '30%',
                      marginTop: 25,
                      marginLeft: 'auto',
                    }}>
                    <EndButton
                      title={'Interview Call'}
                      onPress={() => {
                        navigation.navigate('CandidateApplied');
                      }}
                    />
                  </View>
                </View>
              </SafeAreaView>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ScheduleInterview;

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
  middleText: {
    fontFamily: 'Muli',
    fontSize: 14,
    fontWeight: '700',
    color: '#8F9BB3',
    marginLeft: 15,
    marginTop: 15,
  },
  redText: {
    fontFamily: 'Muli-SemiBold',
    fontSize: 13,
    fontWeight: '700',
    color: '#FF0000',
    marginLeft: 15,
    marginTop: 5,
  },
  Line: {
    height: 1,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    // marginHorizontal: 20,
    marginTop: 10,
  },
});
