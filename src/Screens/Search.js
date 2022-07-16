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
  FlatList,
  TextInput,
} from 'react-native';
import {StatusBarLight} from '../Custom/CustomStatusBar';
import {Header, HeaderDark} from '../Custom/CustomView';
import {BottomView, ButtonStyle} from '../Custom/CustomView';
const {height} = Dimensions.get('window');

const Search = ({navigation}) => {
  const [data, setData] = useState([
    {
      id: '1',
      title: 'Ram Construction',
      subTitle: 'Washington, United States',
      source: require('../images/images.png'),
      year: '3-6 Years',
      post: 'Posted on Sep 29',
    },
    {
      id: '2',
      title: 'Ram Construction',
      subTitle: 'Washington, United States',
      source: require('../images/Reruiting-agent-slice/images.png'),
      year: '2-4 Years',
      post: 'Posted on Sep 28',
    },
    {
      id: '3',
      title: 'Ram Construction',
      subTitle: 'Washington, United States',
      source: require('../images/images.png'),
      year: '1-2 Years',
      post: 'Posted on Sep 27',
    },
  ]);
  return (
    <View style={{backgroundColor: '#f8f8f8', flex: 1}}>
      <StatusBarLight />
      <HeaderDark onPress={() => navigation.goBack()} title={'Search'} />
      <ScrollView>
        <View style={styles.box}>
          <Text style={styles.boxText}>Search For?</Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              // value={state.name}
              //   onChangeText={name => setState({...state, name})}
              style={styles.textInput}
              placeholder={'Job Title, Company etc'}
            />
            <Image
              style={{
                width: 13,
                height: 13,
                marginTop: 20,
                marginLeft: 'auto',
                marginHorizontal: 20,
              }}
              source={require('../images/search.png')}
            />
          </View>
          <View style={styles.underLine} />
          <Text style={styles.boxText}>Where</Text>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              // value={state.name}
              //   onChangeText={name => setState({...state, name})}
              style={styles.textInput}
              placeholder={'Enter Location'}
            />
            <Image
              style={{
                width: 12,
                height: 16,
                marginTop: 10,
                marginLeft: 'auto',
                marginHorizontal: 20,
              }}
              source={require('../images/location.png')}
            />
          </View>
        </View>
        <View style={{width: '90%', marginTop: 30, alignSelf: 'center'}}>
          <ButtonStyle title={'SEARCH'} onPress={() => {}} />
        </View>
        <Text style={styles.job}>03 Jobs</Text>
        <View>
          <FlatList
            numColumns={1}
            data={data}
            renderItem={({item, index}) => (
              <View style={styles.subBox}>
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
                      marginHorizontal: 10,
                      marginTop: 15,
                    }}
                    source={require('../images/star.png')}
                  />
                </View>
                <Text style={styles.middleText}>
                  Hard Hat, Mason, Brick Layer, Maker…{' '}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.redText}>{item.year}</Text>
                  <Text style={styles.redText}>{item.post}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  image: {
    marginTop: height / 3,
    width: 219,
    height: 232,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
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
    fontFamily: 'Muli',
    fontSize: 12,
    fontWeight: '700',
    color: '#1E1F20',
    marginLeft: 15,
    marginTop: 15,
    marginBottom: 10,
  },
  middleText: {
    fontFamily: 'Muli',
    fontSize: 14,
    fontWeight: '700',
    color: '#8F9BB3',
    marginLeft: 15,
    marginTop: 15,
  },
  box: {
    padding: 5,
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 20,
  },
  boxText: {
    fontFamily: 'Muli',
    fontSize: 15,
    fontWeight: 'bold',
    color: '#1E1F20',
    marginLeft: 10,
    marginTop: 10,
  },
  textInput: {
    marginLeft: 5,
    fontSize: 12,
    fontFamily: 'Muli',
    fontFamily: '500',
    backgroundColor: '#fff',
    borderColor: 'lightgrey',
  },
  underLine: {
    height: 1,
    borderRadius: 5,
    backgroundColor: 'lightgrey',
    marginHorizontal: 10,
    marginTop: -5,
  },
  job: {
    fontFamily: 'Muli',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1E1F20',
    marginLeft: 20,
    marginTop: 20,
  },
});
