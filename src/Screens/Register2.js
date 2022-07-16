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
} from 'react-native';
import { StatusBarDark } from '../Custom/CustomStatusBar';
import { BottomView, ButtonStyle } from '../Custom/CustomView';
import { launchImageLibrary } from 'react-native-image-picker';
import { Dropdown } from 'react-native-material-dropdown-v2-fixed';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Api } from '../services/Api';
import Toast from 'react-native-simple-toast';

const { height } = Dimensions.get('window');

const Register2 = ({ navigation, route }) => {
  const [state, setState] = useState({
    user_id: route.params?.userDetail,
    modalVisible: false,
    isLoading: false,
  });
  const toggleModal = modalVisible => setState({ ...state, modalVisible });
  const [tenCertificate, setTenCertificate] = useState('');
  const [twelveCertificate, setTwelveCertificate] = useState('');
  const [graduationCertificate, setGraduationCertificate,] = useState('');

  const onProjectHandler = async () => {
    if (!tenCertificate) {
      Toast.show('Please select your 10th certificate');
      return;
    }
    if (!twelveCertificate) {
      Toast.show('Please select your 12th certificate');
      return;
    }
    if (!graduationCertificate) {
      Toast.show('Please select your graduation certificate');
      return;
    }
    var formData = new FormData()
    formData.append("ten_certificate", {
      uri: tenCertificate,
      type: "image/jpeg",
      name: "image.jpg",
    })
    formData.append('user_id', route.params?.userDetail)
    formData.append("graduation_certificate", {
      uri: graduationCertificate,
      type: "image/jpeg",
      name: "image.jpg",
    })
    formData.append("twelve_certificate", {
      uri: twelveCertificate,
      type: "image/jpeg",
      name: "image.jpg",
    })

    // console.log('-----formData: ', JSON.stringify(formData));
    setState({ ...state, isLoading: true });
    const response = await Api.custmerRegisterStep3(formData);
    console.log('-------------response: 71 ', response);
    const { status = false, msg, token = '', user_detail = {} } = response;
    setState({ ...state, isLoading: false });
    if (status) {
      navigation.replace('Register3', { userDetail: route.params?.userDetail });
      setState({ ...state, isLoading: false });
    } else {
      const {
        data: { msg = 'Something went wrong' },
      } = response;
      Toast.show(msg)
      setState({ ...state, isLoading: false });
    }
  };

  const onImageOptionHandler = (type) => {
    toggleModal(false);
    const options = {
      title: 'Select and Take Profile Picture',
      cameraType: 'front',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const { uri } = response.assets[0];
        if (type === '10th') {
          setTenCertificate(uri);
        } else if (type === '12th') {
          setTwelveCertificate(uri);
        } else if (type === 'Graduation') {
          setGraduationCertificate(uri);
        }
      }
    });
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
                fill={70}
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
                      {'3/4'}
                    </Text>
                  </TouchableOpacity>
                )}
              </AnimatedCircularProgress>
            </View>
          </View>
          <TextLabel title={'10th Certificate'} />
          {tenCertificate ?
            <ImageBackground
              imageStyle={{ borderRadius: 5 }}
              style={styles.certificateImage}
              source={{ uri: tenCertificate }}>
              <TouchableOpacity
                style={styles.crossImageView}
                onPress={() => { setTenCertificate('') }}>
                <Image
                  style={styles.crossImage}
                  source={require('../images/close.png')}
                />
              </TouchableOpacity>
            </ImageBackground>
            :
            <ImageBackground
              imageStyle={{ borderRadius: 5 }}
              style={styles.boxImage}
              source={require('../images/box.png')}>
              <TouchableOpacity
                onPress={() => onImageOptionHandler('10th')}>
                <Image
                  style={styles.uploadImage}
                  source={require('../images/upload.png')}
                />
                <Text style={styles.uploadText}>Upload</Text>
              </TouchableOpacity>
            </ImageBackground>
          }
          <TextLabel title={'12th Certificate'} />
          {twelveCertificate ?
            <ImageBackground
              imageStyle={{ borderRadius: 5 }}
              style={styles.certificateImage}
              source={{ uri: twelveCertificate }}>
              <TouchableOpacity
                style={styles.crossImageView}
                onPress={() => { setTwelveCertificate('') }}>
                <Image
                  style={styles.crossImage}
                  source={require('../images/close.png')}
                />
              </TouchableOpacity>
            </ImageBackground>
            :
            <ImageBackground
              imageStyle={{ borderRadius: 5 }}
              style={styles.boxImage}
              source={require('../images/box.png')}>
              <TouchableOpacity
                onPress={() => onImageOptionHandler('12th')}>
                <Image
                  style={styles.uploadImage}
                  source={require('../images/upload.png')}
                />
                <Text style={styles.uploadText}>Upload</Text>
              </TouchableOpacity>
            </ImageBackground>
          }

          <TextLabel title={'Graduation Certificate'} />
          {graduationCertificate ?
            <ImageBackground
              imageStyle={{ borderRadius: 5 }}
              style={styles.certificateImage}
              source={{ uri: graduationCertificate }}>
              <TouchableOpacity
                style={styles.crossImageView}
                onPress={() => { setGraduationCertificate('') }}>
                <Image
                  style={styles.crossImage}
                  source={require('../images/close.png')}
                />
              </TouchableOpacity>
            </ImageBackground>
            :
            <ImageBackground
              imageStyle={{ borderRadius: 5 }}
              style={styles.boxImage}
              source={require('../images/box.png')}>
              <TouchableOpacity
                onPress={() => onImageOptionHandler('Graduation')}>
                <Image
                  style={styles.uploadImage}
                  source={require('../images/upload.png')}
                />
                <Text style={styles.uploadText}>Upload</Text>
              </TouchableOpacity>
            </ImageBackground>
          }

          <View style={{ width: '100%', marginTop: 30 }}>
            <ButtonStyle
              title={'SAVE & NEXT'}
              loader={state.isLoading}
              onPress={() => {
                // navigation.navigate('Register3');
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

export default Register2;
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
  certificateImage: {
    width: 110,
    height: 80,
    marginLeft: 20,
    marginTop: 10,
    resizeMode: 'cover'
    // width: 88,
    // height: 88,
    // resizeMode: 'contain',
    // marginLeft: 20,
    // marginTop: 10,
  },
  textLabel: {
    fontFamily: 'Muli',
    fontWeight: '400',
    fontSize: 16,
    color: '#8F9BB3',
    marginHorizontal: 15,
    marginTop: 30,
    marginBottom: 0,
  },
  crossImageView: {
    marginLeft: 'auto',
    marginVertical: 5,
    marginHorizontal: 5,
  },
  crossImage: {
    width: 16,
    height: 16,
  },
  boxImage: {
    width: 110,
    height: 80,
    marginLeft: 20,
    marginTop: 10,
  },
  uploadImage: {
    width: 24,
    height: 30,
    alignSelf: 'center',
    marginTop: 10,
  },
  uploadText: {
    fontFamily: 'Muli',
    fontWeight: '700',
    fontSize: 14,
    color: '#1E1F20',
    textAlign: 'center',
    marginTop: 5,
  },
});
