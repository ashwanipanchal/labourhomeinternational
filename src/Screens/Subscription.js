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
  Modal,
} from 'react-native';
import {StatusBarLight} from '../Custom/CustomStatusBar';
import AppHeader from '../Custom/CustomAppHeader';
import {
  BottomView,
  EndButton,
  ButtonStyle,
  StartButton,
} from '../Custom/CustomView';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {RadioButton} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {Api} from '../services/Api'

const {height} = Dimensions.get('window');

const Subscription = ({navigation, route}) => {
  // alert(JSON.stringify(route.params.item.id))
  const [checked, setChecked] = useState('first');

  // useEffect(()=>{
  //   checkPlan()
  // },[])

  // const checkPlan = async() => {
  //   const body = {
  //     id : route.params.item.id,
  //   }
  //   const response = await Api.remainingPlan(body)
  //   const {status , message, data} = response;
  //   if(status){
  //     if(data>0){
  //       alert("can schedule interview")
  //     }
  //   }

  // }

  return (
    <View style={{backgroundColor: '#f8f8f8', flex: 1}}>
      <StatusBarLight />
      <AppHeader
        backOnClick={() => {
          navigation.goBack();
        }}
        backIcon={require('../images/back.png')}
        title={'Subscription'}
        shareOnClick={() => {}}
        share={require('../images/Reruiting-agent-slice/support.png')}
      />
      <ScrollView>
        <Text style={styles.topText}>Choose Subscription</Text>
        <Text style={styles.topSubtext}>
          The ability to simplify means to eliminate the{`\n`}unnecessary so
          that the necessary may speak.
        </Text>
        <LinearGradient
          colors={['#6BACFF', '#151BC4']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={{
            padding: 10,
            marginHorizontal: 30,
            borderRadius: 10,
            marginTop: 40,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.rate}>Rs 1500/-</Text>
              <Text style={styles.subText}>
                50 Interview{`\n`}1 Month Subscription
              </Text>
            </View>
            <View style={{marginTop: 20}}>
              <RadioButton
                value="first"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
                uncheckedColor={'#ffffff4d'}
                color={'#ffffff4d'}
              />
            </View>
          </View>
        </LinearGradient>

        <LinearGradient
          colors={['#B44AC8', '#840E91']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={{
            padding: 10,
            marginHorizontal: 30,
            borderRadius: 10,
            marginTop: 15,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.rate}>Rs 2500/-</Text>
              <Text style={styles.subText}>
                200 Interview{`\n`}1 Month Subscription
              </Text>
            </View>
            <View style={{marginTop: 20}}>
              <RadioButton
                value="second"
                status={checked === 'second' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('second')}
                uncheckedColor={'#ffffff4d'}
                color={'#ffffff4d'}
              />
            </View>
          </View>
        </LinearGradient>

        <LinearGradient
          colors={['#FF6B9D', '#C41572']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={{
            padding: 10,
            marginHorizontal: 30,
            borderRadius: 10,
            marginTop: 15,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View>
              <Text style={styles.rate}>Rs 2500/-</Text>
              <Text style={styles.subText}>
                200 Interview{`\n`}1 Month Subscription
              </Text>
            </View>
            <View style={{marginTop: 20}}>
              <RadioButton
                value="third"
                status={checked === 'third' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('third')}
                uncheckedColor={'#ffffff4d'}
                color={'#ffffff4d'}
              />
            </View>
          </View>
        </LinearGradient>
        <View style={{width: '90%', alignSelf: 'center', marginTop: '30%'}}>
          <ButtonStyle
            title={'Proceed to payment'}
            onPress={() => {
              navigation.navigate('Payment2');
            }}
          />
        </View>
        <BottomView />
      </ScrollView>
    </View>
  );
};

export default Subscription;

const styles = StyleSheet.create({
  topText: {
    fontSize: 18,
    fontFamily: 'Muli-SemiBold',
    fontWeight: '700',
    color: '#1E1F20',
    textAlign: 'center',
    marginTop: 20,
  },
  topSubtext: {
    fontSize: 14,
    fontFamily: 'Muli-Regular',
    fontWeight: '400',
    color: '#747A8D',
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 5,
  },
  rate: {
    fontSize: 20,
    fontFamily: 'Muli-Bold',
    fontWeight: '700',
    color: '#FEFFFF',
    marginTop: 5,
    marginLeft: 15,
  },
  subText: {
    fontSize: 12,
    fontFamily: 'Muli-Regular',
    fontWeight: '400',
    color: '#FEFFFF',
    marginLeft: 15,
    marginTop: 5,
    lineHeight: 22,
  },
});
