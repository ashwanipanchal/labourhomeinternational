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
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
// import CountryPicker from 'react-native-country-picker-modal';
import SelectList from 'react-native-dropdown-select-list'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Api } from '../services/Api';
import Toast from 'react-native-simple-toast';

const { height } = Dimensions.get('window');

const Register1 = ({ navigation, route }) => {
  // const [userType, setUserType] = useState('Male');
  const [selectJob, setSelectJob] = useState([
    { value: 'Male' },
    { value: 'Female' },
  ]);
  const [language, setLanguage] = useState([
    { value: 'English' },
    { value: 'Hindi' },
  ]);

  const [countryCode, setCountryCode] = useState([]);
  const [stateValue, setStateValue] = useState([]);
  const [cityValue, setCityValue] = useState([]);
  const [state, setState] = useState({
    user_id: route.params?.userDetail,
    age: '',
    gender: '',
    language: '',
    country: '',
    states: '',
    city: '',
    isLoading: false,
  });
  // console.log('----data: ', route.params?.userDetail.id);
  const onProjectHandler = async () => {
    Keyboard.dismiss()
    const {
      user_id = '',
      age = '',
      gender = '',
      language = '',
      country = '',
      states = '',
      city = '',
    } = state;
    // 

    if (!age) {
      Toast.show('Please enter your age')
      return;
    }

    if (!gender) {
      Toast.show('Please select your gender');
      return;
    }

    if (!language) {
      Toast.show('Please select your language');
      return;
    }

    if (!country) {
      Toast.show('Please select your country');
      return;
    }

    if (!states) {
      Toast.show('Please select your states');
      return;
    }

    if (!city) {
      Toast.show('Please select your city');
      return;
    }

    const body = {
      user_id,
      age,
      gender,
      language,
      country,
      state: states,
      city,
    };
    console.log('-----body: ', body);
    setState({ ...state, isLoading: true });
    const response = await Api.custmerRegisterStep2(body);
    const { status = false, msg, token = '', user_detail = {} } = response;
    console.log('-------------response: ', response);
    if (status) {
      navigation.replace('Register2', { userDetail: user_detail.id });
      setState({ ...state, isLoading: false });
    } else {
      const {
        data: { msg = 'Something went wrong' },
      } = response;
      Toast.show(msg)
      setState({ ...state, isLoading: false });
    }
  };

  //Get country list
  useEffect(() => {
    getCountryList();
  }, [])

  //Get state list
  useEffect(() => {
    if (state.country) {
      setState({ ...state, states: '', city: '' });
      getStateList();
    }
  }, [state.country]);

  //Get city list
  useEffect(() => {
    if (state.states) {
      setState({ ...state, city: '' });
      getCityList();
    }
  }, [state.states]);

  //Get country list api
  const getCountryList = async () => {
    const response = await Api.countrie();
    const { status, data } = response;
    if (status) {
      let tempArray = [];
      for (let value of data) {
        tempArray.push({ label: value.name, value: value.id });
      }
      setCountryCode(tempArray);
    }
  }

  //Get state list api
  const getStateList = async () => {
    const body = {
      country_id: state.country
    }
    const response = await Api.state(body);
    const { status, data } = response;
    if (status) {
      let tempArray = [];
      for (let value of data) {
        tempArray.push({ label: value.state_name, value: value.id });
      }
      setStateValue(tempArray);
    }
  }

  //Get city list api
  const getCityList = async () => {
    const body = {
      state_id: state.states
    }
    const response = await Api.city(body);
    const { status, data } = response;
    if (status) {
      let tempArray = [];
      for (let value of data) {
        tempArray.push({ label: value.city_name, value: value.id });
      }
      setCityValue(tempArray);
    }
  }

  const onChangeDropdownGender = (value, index, data) => {
    if (data[index].value == 'Male') {
      setState({ ...state, gender: 'male' })
    } else if (data[index].value == 'Female') {
      setState({ ...state, gender: 'female' })
    }
  };

  const onChangeDropdownLanguage = (value, index, data) => {
    setState({ ...state, language: data[index].value })
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
                fill={50}
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
                      {'2/4'}
                    </Text>
                  </TouchableOpacity>
                )}
              </AnimatedCircularProgress>
            </View>
          </View>
          <TextLabel title={'Age'} />
          <TextInput
            value={state.age}
            onChangeText={age => setState({ ...state, age })}
            style={styles.textInput}
            placeholder={'Age'}
            placeholderTextColor={'lightgray'}
            keyboardType={'number-pad'}
            maxLength={2}
          />
          <TextLabel title={'Select Gender'} />
          <View style={{ marginTop: 10 }}>
            <Dropdown
              // label={'Select Gender'}
              style={styles.drops}
              itemColor={'rgba(0, 0, 0, .54)'}
              underlineColor="transparent"
              // label={'Select User Type'}
              // icon="cheveron-down"
              iconColor="rgba(0, 0, 0, 1)"
              icon={require('../images/down-arrow.png')}
              dropdownOffset={{ top: 32, left: 0 }}
              dropdownMargins={{ min: 8, max: 16 }}
              pickerStyle={{ width: '80%', left: '10%' }}
              dropdownPosition={-3.0}
              shadeOpacity={0.12}
              rippleOpacity={0.4}
              baseColor={'white'}
              data={selectJob}
              onChangeText={(value, index, data) => {
                onChangeDropdownGender(value, index, data);
              }}
            />
          </View>
          <TextLabel title={'Select Language'} />
          <View style={{ marginTop: 10 }}>
            <Dropdown
              // value="English"
              // label={'Select Language'}
              style={styles.drops}
              itemColor={'rgba(0, 0, 0, .54)'}
              underlineColor="transparent"
              // label={'Select User Type'}
              // icon="cheveron-down"
              iconColor="rgba(0, 0, 0, 1)"
              icon={require('../images/down-arrow.png')}
              dropdownOffset={{ top: 32, left: 0 }}
              dropdownMargins={{ min: 8, max: 16 }}
              pickerStyle={{ width: '80%', left: '10%' }}
              dropdownPosition={-3.0}
              shadeOpacity={0.12}
              rippleOpacity={0.4}
              baseColor={'white'}
              data={language}
              onChangeText={(value, index, data) => {
                onChangeDropdownLanguage(value, index, data);
              }}
            />
          </View>
          <TextLabel title={'Select Country'} />
          <View style={{ marginTop: 10 }}>
            <Dropdown
              value={state.country}
              style={styles.drops}
              itemColor={'rgba(0, 0, 0, .54)'}
              underlineColor="transparent"
              // label={'Select Country'}
              // icon="cheveron-down"
              iconColor="rgba(0, 0, 0, 1)"
              icon={require('../images/down-arrow.png')}
              dropdownOffset={{ top: 32, left: 0 }}
              dropdownMargins={{ min: 8, max: 16 }}
              pickerStyle={{ width: '80%', left: '10%' }}
              dropdownPosition={-3.0}
              shadeOpacity={0.12}
              rippleOpacity={0.4}
              baseColor={'white'}
              data={countryCode}
              onChangeText={(value, index, data) => {
                setState({ ...state, country: data[index].value });
              }}
            />
            {/* <SelectList 
              data={countryCode}
              setSelected={state.country}
            /> */}
          </View>
          {/* <View
            style={{
              borderRadius: 6,
              borderWidth: 1,
              padding: 10,
              backgroundColor: '#ffffff',
              borderColor: 'lightgrey',
              marginTop: 10,
              flexDirection: 'row',
              width: '90%',
              justifyContent: 'space-between',
              alignContent: 'center',
              alignSelf: 'center',
              // marginBottom: 20,
            }}>
            <CountryPicker
              countryCode={countryCode}
              withFilter
              withFlag
              withCountryNameButton
              withAlphaFilter={false}
              withCallingCode
              onSelect={country => {
                console.log('--------select country :: ', country);
                const { cca2, callingCode } = country;
                setCountryCode(cca2);
                // setCallingCode(callingCode[0]);
                setState({ ...state, country: callingCode[0] })
              }}
              containerButtonStyle={{ alignItems: 'center' }}
            />
            <Image
              style={{
                width: 25,
                height: 12,
                // resizeMode: 'contain',
                marginTop: 10,
              }}
              source={require('../images/down-arrow.png')}
            />
          </View> */}
          <TextLabel title={'Select State'} />
          <View style={{ marginTop: 10 }}>
            <Dropdown
              value={state.states}
              style={styles.drops}
              itemColor={'rgba(0, 0, 0, .54)'}
              underlineColor="transparent"
              // label={'Select State'}
              // icon="cheveron-down"
              iconColor="rgba(0, 0, 0, 1)"
              icon={require('../images/down-arrow.png')}
              dropdownOffset={{ top: 32, left: 0 }}
              dropdownMargins={{ min: 8, max: 16 }}
              pickerStyle={{ width: '80%', left: '10%' }}
              dropdownPosition={-3.0}
              shadeOpacity={0.12}
              rippleOpacity={0.4}
              baseColor={'white'}
              data={stateValue}
              onChangeText={(value, index, data) => {
                setState({ ...state, states: data[index].value });
              }}
            />
          </View>
          <TextLabel title={'Select City'} />
          <View style={{ marginTop: 10 }}>
            <Dropdown
              value={state.city}
              style={styles.drops}
              itemColor={'rgba(0, 0, 0, .54)'}
              underlineColor="transparent"
              // label={'Select City'}
              // icon="cheveron-down"
              iconColor="rgba(0, 0, 0, 1)"
              icon={require('../images/down-arrow.png')}
              dropdownOffset={{ top: 32, left: 0 }}
              dropdownMargins={{ min: 8, max: 16 }}
              pickerStyle={{ width: '76%', left: '12%' }}
              dropdownPosition={-3.0}
              shadeOpacity={0.12}
              rippleOpacity={0.4}
              baseColor={'white'}
              data={cityValue}
              onChangeText={(value, index, data) => {
                // onChangeDropdownCity(value, index, data);
                setState({ ...state, city: data[index].value });
              }}
            />
          </View>
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
        </View>
      </ScrollView>
    </View>
  );
};

export default Register1;
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
    fontFamily: 'Muli',
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
