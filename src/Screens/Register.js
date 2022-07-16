import React, { useEffect, useState } from 'react';
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
  TextInput,
  ImageBackground,
  Keyboard,
} from 'react-native';
import { StatusBarDark } from '../Custom/CustomStatusBar';
import { BottomView, ButtonStyle } from '../Custom/CustomView';
import ProjectRagister from './ProjectRagister';
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import RecruiterRagister from './RecruiterRagister';
import ForiegnRagister from './ForiegnRagister';
import { Api } from '../services/Api';
import Toast from 'react-native-simple-toast';
import { validateEmail } from '../services/utils';

const { height } = Dimensions.get('window');

const Register = ({ navigation }) => {
  const [userType, setUserType] = useState('Customer');
  const [selectJob, setSelectJob] = useState([
    { value: 'Customer' },
    { value: 'Project Exporter' },
    { value: 'Foreign Recruiting' },
    { value: 'Recruiting Agent' },
  ]);
  const [state, setState] = useState({
    user_type: '1',
    name: '',
    email: '',
    mobile: '',
    isLoading: false,
  });

  const onProjectHandler = async () => {
    // navigation.replace('Register3');
    // return
    Keyboard.dismiss()
    const {
      user_type = '',
      name = '',
      email = '',
      mobile = '',
    } = state;
    // 

    if (!name) {
      Toast.show('Please enter your name')
      return;
    }

    if (!email) {
      Toast.show('Please enter your email address');
      return;
    }

    if (!validateEmail(email)) {
      Toast.show('Please enter your valid email address');
      return;
    }

    if (!mobile) {
      Toast.show('Please enter your valid phone number');
      return;
    }

    if (mobile.length !== 10) {
      Toast.show('Mobile number must be in 10 digits');
      return;
    }

    const body = {
      user_type,
      name,
      email,
      mobile,
    };
    console.log('-----body: ', body);
    setState({ ...state, isLoading: true });
    const response = await Api.custmerRegisterStep1(body);
    const { status = false, msg, token = '', user_detail = {} } = response;
    // navigation.navigate('Register1');
    console.log('-----response: ', response);
    if (status) {
      // Toast.show(msg)
      // LocalStorage.setToken(token);
      // _SetAuthToken(token);
      // dispatch(actions.SetUserDetail(user_detail));
      // setModalOpen(true);
      
      navigation.replace('Register1', { userDetail: user_detail.id });
      // navigation.navigate('Register1', { userDetail: response.userDetail });
      setState({ ...state, isLoading: false });
    } else {
      const {
        data: { msg = 'Something went wrong' },
      } = response;
      Toast.show(msg)
      console.log('-----err: ', msg);
      setState({ ...state, isLoading: false });
    }
  };

  const onChangeDropdownUserType = (value, index, data) => {
    setUserType(data[index].value);
  };

  return (
    <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
      <StatusBarDark />
      <ScrollView>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.headerText}>
            Find the care{`\n`}job that’s right{`\n`}for you
          </Text>

          <ImageBackground
            style={styles.headerImage}
            source={require('../images/girl.png')}></ImageBackground>
        </View>
        <View style={styles.container}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.hireText}>Register to hire!</Text>
            <View
              style={{ marginTop: 5, marginLeft: 'auto', marginHorizontal: 20 }}>
              <AnimatedCircularProgress
                size={55}
                width={3}
                fill={30}
                rotation={10}
                tintColor="#2574FF">
                {fill => (
                  <TouchableOpacity onPress={() => changehandler()}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: '#2574FF',
                        fontWeight: '700',
                        // marginHorizontal: 20,
                      }}>
                      {'1/4'}
                    </Text>
                  </TouchableOpacity>
                )}
              </AnimatedCircularProgress>
            </View>
          </View>
          <TextLabel title={'Select User Type'} />
          <View style={{ marginTop: 10 }}>
            <Dropdown
              value="Customer"
              style={styles.drops}
              itemColor={'rgba(0, 0, 0, .54)'}
              underlineColor="transparent"
              // label={'Select User Type'}
              // icon="cheveron-down"
              iconColor="rgba(0, 0, 0, 1)"
              icon={require('../images/down-arrow.png')}
              dropdownOffset={{ top: 32, left: 0 }}
              dropdownMargins={{ min: 8, max: 16 }}
              pickerStyle={{ width: '76%', left: '12%', marginTop: 20 }}
              dropdownPosition={-4.5}
              shadeOpacity={0.12}
              rippleOpacity={0.4}
              baseColor={'white'}
              data={selectJob}
              onChangeText={(value, index, data) => {
                onChangeDropdownUserType(value, index, data);
              }}
            />
          </View>
          {userType === 'Customer' ? (
            <>
              <TextLabel title={'First Name'} />
              <TextInput
                value={state.name}
                onChangeText={name => setState({ ...state, name })}
                style={styles.textInput}
                placeholder={'Enter As Mentioned On Passport'}
                placeholderTextColor={'lightgray'}
              />
              <TextLabel title={'Middle Name (Optional)'} />
              <TextInput
                value={state.name}
                onChangeText={name => setState({ ...state, name })}
                style={styles.textInput}
                placeholder='Middle Name'
                placeholderTextColor={'lightgray'}
              />
              <TextLabel title={'Last Name (Optional)'} />
              <TextInput
                value={state.name}
                onChangeText={name => setState({ ...state, name })}
                style={styles.textInput}
                placeholder={'Last Name'}
                placeholderTextColor={'lightgray'}
              />
              <TextLabel title={'Email Address'} />
              <TextInput
                value={state.email}
                onChangeText={email => setState({ ...state, email })}
                style={styles.textInput}
                autoCapitalize="none"
                placeholder={'Email Address'}
                placeholderTextColor={'lightgray'}
              />
              <TextLabel title={'Mobile Number'} />
              <TextInput
                value={state.mobile}
                onChangeText={text => setState({ ...state, mobile: text.replace(/[^0-9]/g, '') })}
                style={styles.textInput}
                placeholder={'Mobile No.'}
                placeholderTextColor={'lightgray'}
                keyboardType={'number-pad'}
                maxLength={10}
              />
              <View style={{ width: '100%', marginTop: 30 }}>
                <ButtonStyle
                  title={'SAVE & NEXT'}
                  loader={state.isLoading}
                  onPress={() => {
                    onProjectHandler();
                  }}
                />
              </View>
              <BottomView />
            </>
          ) : userType === 'Project Exporter' ? (
            // <Text>I am a contractor</Text>
            <ProjectRagister />
          ) : userType === 'Foreign Recruiting' ? (
            <ForiegnRagister />
          ) : userType === 'Recruiting Agent' ? (
            // <Text style={{color:'black'}}>RRR</Text>
            <RecruiterRagister />
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;
const TextLabel = ({ title }) => <Text style={styles.textLabel}>{title}</Text>;
const styles = StyleSheet.create({
  headerImage: {
    marginTop: height / 9,
    width: 175,
    height: 327,
    resizeMode: 'contain',
    marginLeft: 'auto',
    marginHorizontal: 20,
  },
  headerText: {
    fontFamily: 'Muli-SemiBold',
    fontSize: 24,
    fontWeight: '700',
    color: '#222B45',
    marginTop: height / 6,
    marginLeft: 35,
    lineHeight: 32,
  },
  container: {
    padding: 10,
    marginHorizontal: 25,
    backgroundColor: '#fff',
    elevation: 5,
    marginTop: -170,
    borderRadius: 12,
    marginBottom: 20,
  },
  hireText: {
    fontFamily: 'Muli',
    fontSize: 20,
    fontWeight: '700',
    color: '#222B45',
    marginLeft: 20,
    marginTop: 15,
  },
  drops: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'lightgrey',
    marginHorizontal: 15,
    // elevation: 2,
  },
  textInput: {
    borderRadius: 6,
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    marginTop: 10,
    marginBottom: 0,
    fontSize: 16,
    fontFamily: 'Muli-SemiBold',
    fontWeight: '600',
    backgroundColor: '#fff',
    borderColor: 'lightgrey',
    color:'#000'
  },
  textLabel: {
    fontFamily: 'Muli-Regular',
    fontWeight: '400',
    fontSize: 16,
    color: '#8F9BB3',
    marginHorizontal: 15,
    marginTop: 30,
    marginBottom: 0,
  },
});
