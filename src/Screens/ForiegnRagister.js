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
  Modal,
  Keyboard,
} from 'react-native';
import { StatusBarDark } from '../Custom/CustomStatusBar';
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BottomView, ButtonStyle } from '../Custom/CustomView';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';
import { Api, LocalStorage } from '../services/Api';
import moment from 'moment';
import Toast from 'react-native-simple-toast';
import { validateEmail } from '../services/utils';
import { useDispatch } from 'react-redux';
import { _SetAuthToken } from '../services/ApiSauce';
import * as actions from '../redux/actions';

const { height } = Dimensions.get('window');

const ForiegnRagister = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isDatePickerExpiry, setDatePickerExpiry] = useState(false);
  const navigation = useNavigation();
  const [state, setState] = useState({
    user_type: '3',
    name: '',
    email: '',
    mobile: '',
    license_number: '',
    date_issue: '',
    expiry_date: '',
    isLoading: false,
  });

  const dispatch = useDispatch();

  const onForiegnHandler = async () => {
    Keyboard.dismiss()
    const {
      user_type = '',
      name = '',
      email = '',
      mobile = '',
      license_number = '',
      date_issue = '',
      expiry_date = ''
    } = state;
    // 

    if (!name) {
      Toast.show('Please enter your name')
      return;
    }

    if (!email) {
      Toast.show('Please enter your email address')
      return;
    }

    if (!validateEmail(email)) {
      // setState({ ...state, setValidation: true });
      Toast.show('Please enter your valid email address')
      return;
    }

    if (!mobile) {
      // setState({ ...state, setValidation: true });
      Toast.show('Please enter your valid phone number')
      return;
    }

    if (mobile.length !== 10) {
      // setState({ ...state, setValidation: true });
      Toast.show('Mobile number must be in 10 digits')
      return;
    }

    if (!license_number) {
      Toast.show('Please enter your license number')
      return;
    }

    if (!date_issue) {
      Toast.show('Please enter your date issue')
      return;
    }

    if (!expiry_date) {
      Toast.show('Please enter your expiry date')
      return;
    }

    const body = {
      user_type,
      name,
      email,
      mobile,
      license_number,
      date_issue,
      expiry_date,
    };
    // console.log('-----body: ', body);
    setState({ ...state, isLoading: true });
    const response = await Api.foreignRecuritingRegister(body);
    const { status = false, msg, token = '', user_detail = {} } = response;
    // consolejson(response);
    console.log('-----response: ', response);
    if (status) {
      // Toast.show(msg)
      LocalStorage.setToken(token);
      _SetAuthToken(token);
      dispatch(actions.SetUserDetail(user_detail));
      setModalOpen(true);
      setState({ ...state, isLoading: false });
    } else {
      const {
        data: { msg = 'Something went wrong' },
      } = response;
      Toast.show(msg)
      setState({ ...state, isLoading: false });
    }
  };

  // const ragistercheckout = () => {
  //   setTimeout(() => {
  //     navigation.navigate('ProjectOtp');
  //   }, 300);
  // };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setState({ ...state, date_issue: date })
    console.warn('A date has been picked: ', date);
    hideDatePicker();
  };

  const showDatePickerExpiry = () => {
    setDatePickerExpiry(true);
  };

  const hideDatePickerExpiry = () => {
    setDatePickerExpiry(false);
  };

  const handleConfirmExpiry = date => {
    setState({ ...state, expiry_date: date })
    console.warn('A date has been picked: ', date);
    hideDatePickerExpiry();
  };

  const approvalModalFuncation = () => {
    return (
      <Modal
        visible={modalOpen}
        transparent={true}
        onRequestClose={() => {
          setModalOpen(false);
          navigation.reset({
            index: 0,
            routes: [
              { name: 'OnBoarding' },
            ],
          })
        }}>
        <View style={styles.modal_View}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.mdtop}
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [
                  { name: 'Approval' },
                ],
              })
            }}>
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
              Registration submitted for{`\n`}approval.
            </Text>

            <Text style={styles.subText}>
              After approval from admin you{`\n`}can use the app.
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }

  return (
    <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
      <StatusBarDark />

      <KeyboardAwareScrollView>
        <TextLabel title={'Your Name'} />
        <TextInput
          value={state.name}
          onChangeText={name => setState({ ...state, name })}
          style={styles.textInput}
          placeholder={'Your Name'}
        />
        <TextLabel title={'Email Address'} />
        <TextInput
          value={state.email}
          onChangeText={email => setState({ ...state, email })}
          style={styles.textInput}
          autoCapitalize="none"
          placeholder={'Email Address'}
        />
        <TextLabel title={'Mobile Number'} />
        <TextInput
          value={state.mobile}
          onChangeText={text => setState({ ...state, mobile: text.replace(/[^0-9]/g, '') })}
          style={styles.textInput}
          placeholder={'Mobile No.'}
          keyboardType={'number-pad'}
          maxLength={10}
        />
        <TextLabel title={'License Number'} />
        <TextInput
          value={state.license_number}
          onChangeText={license_number => setState({ ...state, license_number })}
          style={styles.textInput}
          placeholder={'License No.'}
        />
        <TextLabel title={'Date of Issue'} />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <TouchableOpacity activeOpacity={0.8} onPress={showDatePicker}>
          {state.date_issue == '' ?
            <Text style={[styles.textInput, { padding: 14, color: '#00000050', }]}>Enter Date</Text>
            :
            <Text style={[styles.textInput, { padding: 14, color: '#000000', }]}>{moment(state.date_issue).format("DD-MM-YYYY")}</Text>
          }
        </TouchableOpacity>
        <TextLabel title={'Expiry Date'} />
        <DateTimePickerModal
          isVisible={isDatePickerExpiry}
          mode="date"
          onConfirm={handleConfirmExpiry}
          onCancel={hideDatePickerExpiry}
        />
        <TouchableOpacity activeOpacity={0.8} onPress={showDatePickerExpiry}>
          {state.expiry_date == '' ?
            <Text style={[styles.textInput, { padding: 14, color: '#00000050', }]}>Enter Expiry Date</Text>
            :
            <Text style={[styles.textInput, { padding: 14, color: '#000000', }]}>{moment(state.expiry_date).format("DD-MM-YYYY")}</Text>
          }
        </TouchableOpacity>
        <View style={{ width: '100%', marginTop: 30 }}>
          <ButtonStyle title={'SUBMIT'} loader={state.isLoading} onPress={() => { onForiegnHandler(); }} />
        </View>
        <BottomView />
        {approvalModalFuncation()}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default ForiegnRagister;
const TextLabel = ({ title }) => <Text style={styles.textLabel}>{title}</Text>;
const styles = StyleSheet.create({
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
    fontFamily: 'Muli',
    fontWeight: '700',
    fontSize: 18,
    color: '#1E1F20',
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 25,
  },
  subText: {
    fontFamily: 'Muli',
    fontWeight: '600',
    fontSize: 15,
    color: '#6F6F7B',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 20,
    lineHeight: 22,
  },
});
