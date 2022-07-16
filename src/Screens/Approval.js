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
import {Header3} from '../Custom/CustomView';
import {BottomView, ButtonStyle} from '../Custom/CustomView';

const {height} = Dimensions.get('window');

const Approval = ({navigation}) => {

  useEffect(()=>{
    
  },[])

  return (
    <View style={{backgroundColor: '#f8f8f8', flex: 1}}>
      <StatusBarLight />
      <Header3 />
      <ScrollView>
        <View style={styles.box}>
          <View style={{flexDirection: 'row'}}>
            <Image
              style={styles.image}
              source={require('../images/Reruiting-agent-slice/clock.png')}
            />
            <Text style={styles.ApprovalText}>Approval Pending !</Text>
          </View>
        </View>
        {/* <View style={styles.subBox}>
          <Image
            style={styles.subImage}
            source={require('../images/Reruiting-agent-slice/post-job.png')}
          />
          <View style={{width: '100%', marginTop: 30}}>
            <ButtonStyle
              title={'POST A JOB'}
              onPress={() => {
                navigation.navigate('PostJob');
              }}
            />
          </View>
          <BottomView />
        </View> */}
      </ScrollView>
    </View>
  );
};

export default Approval;

const styles = StyleSheet.create({
  image: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginLeft: 5,
    marginTop: 2,
  },
  box: {
    padding: 10,
    marginHorizontal: 30,
    backgroundColor: '#ffffff',
    elevation: 5,
    borderWidth: 1,
    borderColor: '#F2AE2E',
    borderRadius: 6,
    marginTop: 30,
  },
  ApprovalText: {
    fontFamily: 'Muli-SemiBold',
    fontWeight: '700',
    fontSize: 16,
    color: '#39393C',
    marginLeft: 10,
  },
  subBox: {
    padding: 10,
    marginHorizontal: 30,
    backgroundColor: '#ffffff',
    elevation: 5,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 6,
    marginTop: 50,
    marginBottom: 20,
  },
  subImage: {
    width: 280,
    height: 290,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
});
