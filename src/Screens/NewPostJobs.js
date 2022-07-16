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
} from 'react-native';
import {StatusBarLight} from '../Custom/CustomStatusBar';
import AppHeader from '../Custom/CustomAppHeader';
import JobList from '../Custom/JobList';
const {height} = Dimensions.get('window');

const NewPostJobs = ({navigation, route}) => {
  const [loading, setLoading] = useState(false);
  console.log("REcommanded Job Page", JSON.stringify(route.params))
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
      post: 'Posted on Sep 29',
    },
    {
      id: '3',
      title: 'Ram Construction',
      subTitle: 'Washington, United States',
      source: require('../images/images.png'),
      year: '1-2 Years',
      post: 'Posted on Sep 29',
    },
    {
      id: '4',
      title: 'Ram Construction',
      subTitle: 'Washington, United States',
      source: require('../images/Reruiting-agent-slice/images.png'),
      year: '2-3 Years',
      post: 'Posted on Sep 29',
    },
  ]);

  useEffect(()=>{
    startLoading()
    // setData(route.params)
  },[])

  const startLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setData(route.params)
      setLoading(false);
    }, 500);
  };

  return (
    <View style={{backgroundColor: '#f8f8f8', flex: 1}}>
      <StatusBarLight />
      <AppHeader
        backOnClick={() => {
          navigation.goBack();
        }}
        backIcon={require('../images/back.png')}
        title={'New Job Post'}
        searchOnClick={() => {
          navigation.navigate('Search');
        }}
        search={require('../images/search1.png')}
        filterOnClick={() => {
          navigation.navigate('Filter');
        }}
        filter={require('../images/filter.png')}
      />
      {loading ? <JobList/>: (
        <ScrollView>
        <View>
          <FlatList
            numColumns={1}
            data={data}
            renderItem={({item, index}) => (
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.subBox}
                onPress={() => navigation.navigate('JobDetails1', {item,item})}
                >
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
                    <Text style={styles.inText}>{item.name}</Text>
                    <Text style={styles.insubText}>{item.job_location}</Text>
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
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.redText}>{item.work_exp}</Text>
                  <Text style={styles.redText}>Posted on {item.post_job_date}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
      )}  
    </View>
  );
};

export default NewPostJobs;

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
});
