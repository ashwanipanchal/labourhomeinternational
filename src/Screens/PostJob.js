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
  Modal,
  Option,
  Keyboard,
} from 'react-native';
import {StatusBarLight} from '../Custom/CustomStatusBar';
import {Header, HeaderDark} from '../Custom/CustomView';
import {Dropdown} from 'react-native-material-dropdown-v2-fixed';
import {Api, LocalStorage} from '../services/Api';
import CountryPicker from 'react-native-country-picker-modal';
import Toast from 'react-native-simple-toast';
import {BottomView, ButtonStyle, StartButton} from '../Custom/CustomView';
const {height} = Dimensions.get('window');

const PostJob = ({navigation}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [userType, setUserType] = useState('');
  const [userId, setUserId] = useState('');
  const [selectJob, setSelectJob] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [countryCode, setCountryCode] = useState([]);
  const [callingCode, setCallingCode] = useState('91');
  const [state, setState] = useState({
    name: '',
    country: '',
    job_location: '',
    work_exp: '',
    qualification: '',
    labour_require: '',
    categoryId: '',
    subCategoryId: '',
    job_description: '',
    contract_period: '',
    accommodation: '',
    food: '',
    working_hours: '',
    transportation: '',
    medical_insurance: '',
    annual_leave: '',
    air_ticket: '',
  });
  useEffect(() => {
    navigationHandler();
  }, []);

  const navigationHandler = async () => {
    const type = (await LocalStorage.getUserDetail()) || '{}';
    console.log('Line --- 63', type);
    const user = JSON.parse(type);
    console.log(user.id, ' === ', user.user_type);
    setUserId(user.id);
    setUserType(user.user_type);
  };

  useEffect(() => {
    getCountryList();
  }, []);

  const getCountryList = async () => {
    const response = await Api.countrie();
    const {status, data} = response;
    if (status) {
      let tempArray = [];
      for (let value of data) {
        tempArray.push({label: value.name, value: value.id});
      }
      setCountryCode(tempArray);
    }
  };

  useEffect(() => {
    getCategoryList();
  }, []);

  //Get sub Category  list
  useEffect(() => {
    if (state.categoryId) {
      setState({...state, subCategoryId: ''});
      getSubCategoryList();
    }
  }, [state.categoryId]);

  const getCategoryList = async () => {
    const response = await Api.category();
    const {status, data} = response;
    if (status) {
      let tempArray = [];
      for (let value of data) {
        tempArray.push({label: value.name, value: value.id});
      }
      setCategory(tempArray);
    }
  };

  const getSubCategoryList = async () => {
    const body = {
      cat_id: state.categoryId,
    };
    const response = await Api.sub_category(body);
    console.log('-----res: ', response);
    const {status, data} = response;
    if (status) {
      let tempArray = [];
      for (let value of data) {
        tempArray.push({label: value.name, value: value.id});
      }
      setSubCategory(tempArray);
    }
  };

  const onProjectHandler = async () => {
    Keyboard.dismiss();
    const {
      name = '',
      country = '',
      job_location = '',
      work_exp = '',
      qualification = '',
      labour_requird = '',
      categoryId = '',
      subCategoryId = '',
      job_description = '',
      contract_period = '',
      accommodation = '',
      food = '',
      working_hours = '',
      transportation = '',
      medical_insurance = '',
      annual_leave = '',
      air_ticket = '',
    } = state;
    //

    if (!name) {
      Toast.show('Please enter your name');
      return;
    }

    if (!country) {
      Toast.show('Please select your country');
      return;
    }

    if (!job_location) {
      Toast.show('Please select your location');
      return;
    }

    if (!work_exp) {
      Toast.show('Please select your work experience');
      return;
    }

    if (!qualification) {
      Toast.show('Please select your qualification');
      return;
    }

    if (!labour_requird) {
      Toast.show('Please select your labour_require');
      return;
    }
    if (!categoryId) {
      Toast.show('Please select your category');
      return;
    }
    if (!subCategoryId) {
      Toast.show('Please select your sub category');
      return;
    }
    if (!job_description) {
      Toast.show('Please select your job description');
      return;
    }
    if (!contract_period) {
      Toast.show('Please select your contract period');
      return;
    }
    if (!accommodation) {
      Toast.show('Please select your accommodation');
      return;
    }
    if (!food) {
      Toast.show('Please select your food');
      return;
    }
    if (!working_hours) {
      Toast.show('Please select your working hours');
      return;
    }
    if (!transportation) {
      Toast.show('Please select your transportation');
      return;
    }
    if (!medical_insurance) {
      Toast.show('Please select your medical Insurance');
      return;
    }
    if (!annual_leave) {
      Toast.show('Please select your annual leava');
      return;
    }
    if (!air_ticket) {
      Toast.show('Please select your airticket');
      return;
    }
    const body = {
      user_id: userId,
      user_type: userType,
      name,
      country,
      latitude: '12.25555',
      longitude: '52.5555',
      job_location,
      work_exp,
      qualification,
      labour_requird,
      category:categoryId,
      sub_category:subCategoryId,
      job_description,
      contract_period,
      accommodation,
      food,
      working_hours,
      transportation,
      medical_insurance,
      annual_leave,
      air_ticket,
    };
    console.log('-----body: ', body);
    setState({...state, isLoading: true});
    const token = (await LocalStorage.getToken()) || '';
    const btoken = `Bearer ${token}`;
    const response = await fetch(
      'http://139.59.67.166/Labour-Home-Job/public/api/post_job',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'x-api-key': 'e2cfe1ebab87981db56aa5aea4448701',
          Authorization: btoken,
        },
        body: JSON.stringify(body),
      },
    );
    const postjobresultresponse = await response.json();
    console.log('postjobresultresponse ==', postjobresultresponse);
    setModalOpen(true)
  };
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <StatusBarLight />
      <HeaderDark onPress={() => navigation.goBack()} title={'Post Job'} />
      <ScrollView>
        <TextLabel title={'Employer Name'} />
        <TextInput
          value={state.name}
          onChangeText={name => setState({...state, name})}
          style={styles.textInput}
          placeholder={'Employer Name'}
        />
        <TextLabel title={'Select Country'} />
        {/* <View
          style={{
            borderRadius: 6,
            borderWidth: 1,
            padding: 10,
            backgroundColor: '#ffffff',
            borderColor: 'lightgrey',
            marginTop: 10,
            flexDirection: 'row',
            width: '85%',
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
              console.log('country Line ==281', country);
              const {cca2, callingCode} = country;
              setCountryCode(cca2);
              setCallingCode(callingCode[0]);
            }}
            containerButtonStyle={{alignItems: 'center'}}
          />
          <Image
            style={{
              width: 25,
              height: 12,
              resizeMode: 'contain',
              marginTop: 10,
            }}
            source={require('../images/down-arrow.png')}
          />
        </View> */}
        <View style={{marginTop: 10}}>
          <Dropdown
            value={state.country}
            style={styles.drops}
            itemColor={'rgba(0, 0, 0, .54)'}
            underlineColor="transparent"
            // label={'Select Country'}
            // icon="cheveron-down"
            iconColor="rgba(0, 0, 0, 1)"
            icon={require('../images/down-arrow.png')}
            dropdownOffset={{top: 32, left: 0}}
            dropdownMargins={{min: 8, max: 16}}
            pickerStyle={{width: '80%', left: '10%'}}
            dropdownPosition={-3.0}
            shadeOpacity={0.12}
            rippleOpacity={0.4}
            baseColor={'white'}
            data={countryCode}
            onChangeText={(value, index, data) => {
              setState({...state, country: data[index].value});
            }}
          />
        </View>
        <TextLabel title={'Job Location'} />
        <TextInput
          value={state.job_location}
          onChangeText={job_location => setState({...state, job_location})}
          style={styles.textInput}
          placeholder={'Job Location'}
        />
        <TextLabel title={'Work Experience'} />
        <TextInput
          value={state.work_exp}
          onChangeText={work_exp => setState({...state, work_exp})}
          style={styles.textInput}
          placeholder={'Work Experience'}
          // keyboardType={'number-pad'}
        />
        <TextLabel title={'Qualification'} />
        <TextInput
          value={state.qualification}
          onChangeText={qualification => setState({...state, qualification})}
          style={styles.textInput}
          placeholder={'Qualification'}
        />
        <TextLabel title={'Labour Required'} />
        <TextInput
          value={state.labour_requird}
          onChangeText={labour_requird => setState({...state, labour_requird})}
          style={styles.textInput}
          placeholder={'Labour Required'}
        />
        <TextLabel title={'Select Category'} />
        <View style={{marginTop: 10}}>
          <Dropdown
            value={state.categoryId}
            style={styles.drops}
            itemColor={'rgba(0, 0, 0, .54)'}
            underlineColor="transparent"
            // label={'Select User Type'}
            // icon="cheveron-down"
            iconColor="rgba(0, 0, 0, 1)"
            icon={require('../images/down-arrow.png')}
            dropdownOffset={{top: 32, left: 0}}
            dropdownMargins={{min: 8, max: 16}}
            pickerStyle={{width: '80%', left: '10%'}}
            dropdownPosition={-1.9}
            shadeOpacity={0.12}
            rippleOpacity={0.4}
            baseColor={'white'}
            data={category}
            onChangeText={(value, index, data) => {
              console.log('-------res data: ', data[index].value);
              setState({...state, categoryId: data[index].value});
              // getSubCategoryList(data[index].value)
              // onChangeDropdownUserType(value, index, data);
            }}
          />
        </View>
        <TextLabel title={'Select Sub Category'} />
        <View style={{marginTop: 10}}>
          <Dropdown
            value={state.subCategoryId}
            style={styles.drops}
            itemColor={'rgba(0, 0, 0, .54)'}
            underlineColor="transparent"
            // label={'Select User Type'}
            // icon="cheveron-down"
            iconColor="rgba(0, 0, 0, 1)"
            icon={require('../images/down-arrow.png')}
            dropdownOffset={{top: 32, left: 0}}
            dropdownMargins={{min: 8, max: 16}}
            pickerStyle={{width: '76%', left: '12%'}}
            dropdownPosition={-1.9}
            shadeOpacity={0.12}
            rippleOpacity={0.4}
            baseColor={'white'}
            data={subCategory}
            onChangeText={(value, index, data) => {
              console.log('-------res data: ', data[index].value);
              setState({...state, subCategoryId: data[index].value});
              // onChangeDropdownUserType(value, index, data);
            }}
          />
        </View>
        <TextLabel title={'Job Description'} />
        <TextInput
          value={state.job_description}
          onChangeText={job_description =>
            setState({...state, job_description})
          }
          style={styles.textInput}
          placeholder={'Job Description'}
        />
        <TextLabel title={'Contract Period'} />
        <TextInput
          value={state.contract_period}
          onChangeText={contract_period =>
            setState({...state, contract_period})
          }
          style={styles.textInput}
          placeholder={'Contract Period'}
        />
        <TextLabel title={'Accommodation'} />
        <TextInput
          value={state.accommodation}
          onChangeText={accommodation => setState({...state, accommodation})}
          style={styles.textInput}
          placeholder={'Accommodation'}
        />
        <TextLabel title={'Food'} />
        <TextInput
          value={state.food}
          onChangeText={food => setState({...state, food})}
          style={styles.textInput}
          placeholder={'Food'}
        />
        <TextLabel title={'Working Hours'} />
        <TextInput
          value={state.working_hours}
          onChangeText={working_hours => setState({...state, working_hours})}
          style={styles.textInput}
          placeholder={'Working Hours'}
        />
        <TextLabel title={'Transportation'} />
        <TextInput
          value={state.transportation}
          onChangeText={transportation => setState({...state, transportation})}
          style={styles.textInput}
          placeholder={'Transportation'}
        />
        <TextLabel title={'Medical & Insurance'} />
        <TextInput
          value={state.medical_insurance}
          onChangeText={medical_insurance =>
            setState({...state, medical_insurance})
          }
          style={styles.textInput}
          placeholder={'Medical & Insurance'}
        />
        <TextLabel title={'Annual Leave'} />
        <TextInput
          value={state.annual_leave}
          onChangeText={annual_leave => setState({...state, annual_leave})}
          style={styles.textInput}
          placeholder={'Annual Leave'}
        />
        <TextLabel title={'Air Ticket'} />
        <TextInput
          value={state.air_ticket}
          onChangeText={air_ticket => setState({...state, air_ticket})}
          style={styles.textInput}
          placeholder={'Air Ticket'}
        />
        <View style={{width: '90%', alignSelf: 'center', marginTop: 30}}>
          <ButtonStyle title={'SUBMIT'} onPress={() => onProjectHandler()} />
        </View>
        <BottomView />
        <Modal
          visible={modalOpen}
          transparent={true}
          onRequestClose={() => setModalOpen(false)}>
          <View style={styles.modal_View}>
            <View activeOpacity={0.8} style={styles.mdtop}>
              <Image
                style={{
                  width: 50,
                  height: 50,
                  alignSelf: 'center',
                  marginTop: 20,
                }}
                source={require('../images/tick.png')}
              />
              <Text style={styles.text}>
                Job Post{`\n`}
                Successfully
              </Text>
              <View style={{width: '35%', alignSelf: 'center', marginTop: 20}}>
                <StartButton
                  title={'OK'}
                  onPress={() => {
                    navigation.navigate('ProjectorHome');
                  }}
                />
              </View>
              <BottomView />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default PostJob;
const TextLabel = ({title}) => <Text style={styles.textLabel}>{title}</Text>;
const styles = StyleSheet.create({
  textInput: {
    borderRadius: 6,
    borderWidth: 1,
    padding: 10,
    paddingHorizontal: 15,
    marginHorizontal: 30,
    marginTop: 10,
    marginBottom: 0,
    fontSize: 16,
    fontFamily: 'Muli-SemiBold',
    fontWeight: '600',
    backgroundColor: '#fff',
    borderColor: 'lightgrey',
    color: '#000',
  },
  textLabel: {
    fontFamily: 'Nunito',
    fontWeight: '900',
    fontSize: 14,
    color: '#8F9BB3',
    marginHorizontal: 30,
    marginTop: 30,
    marginBottom: 0,
  },
  drops: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'lightgrey',
    marginHorizontal: 30,
    // elevation: 2,
  },
  modal_View: {
    backgroundColor: '#000000aa',
    flex: 1,
  },
  mdtop: {
    backgroundColor: '#FFFFFF',
    marginTop: height / 3,
    marginHorizontal: 20,
    borderRadius: 20,
  },
  text: {
    fontFamily: 'Muli-Bold',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#1E1F20',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 25,
  },
});
