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
  TextInput,
  ImageBackground,
  Modal,
} from 'react-native';
import {StatusBarDark} from '../Custom/CustomStatusBar';
import {BottomView, ButtonStyle} from '../Custom/CustomView';
import {launchImageLibrary} from 'react-native-image-picker';
import {Dropdown} from 'react-native-material-dropdown-v2-fixed';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import DocumentPicker, { types } from 'react-native-document-picker';
import moment from 'moment';
import {Api} from '../services/Api';
import Toast from 'react-native-simple-toast';
import RNFS from 'react-native-fs';
import {RotateInUpLeft} from 'react-native-reanimated';

const {height} = Dimensions.get('window');

const Register3 = ({navigation, route}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modal, setModal] = useState({modalVisible: false});
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [userType, setUserType] = useState('');
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [state, setState] = useState({
    user_id: route.params?.userDetail,
    work_Experience: '',
    passport_Number: '',
    passport_ValidityDate: '',
    foreign_Experience: '',
    categoryId: '',
    subCategoryId: '',
    isLoading: false,
    aadhaar_front: '',
    aadhaar_back: '',
    pancard_front: '',
    pancard_back: '',
    exp_crefiticate_front: '',
    exp_crefiticate_back: '',
    passport_image: '',
    resume_image: '',
  });

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

  const onProjectHandlerSubmit = async () => {
    const {
      user_id = '',
      work_Experience = '',
      passport_Number = '',
      passport_ValidityDate = '',
      foreign_Experience = '',
      categoryId = '',
      subCategoryId = '',
      aadhaar_front = '',
      aadhaar_back = '',
      pancard_front = '',
      pancard_back = '',
      exp_crefiticate_front = '',
      exp_crefiticate_back = '',
      passport_image = '',
      resume_image = '',
    } = state;

    if (!work_Experience) {
      Toast.show('Please enter your work experience');
      return;
    }
    if (!passport_Number) {
      Toast.show('Please enter your passport number');
      return;
    }
    if (!passport_ValidityDate) {
      Toast.show('Please enter your passport validity');
      return;
    }
    if (!foreign_Experience) {
      Toast.show('Please enter your foreign experience');
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
    if (!aadhaar_front) {
      Toast.show('Please select your aadhaar front');
      return;
    }
    if (!aadhaar_back) {
      Toast.show('Please select your aadhaar back');
      return;
    }
    if (!pancard_front) {
      Toast.show('Please select your pancard front');
      return;
    }
    if (!pancard_back) {
      Toast.show('Please select your pancard back');
      return;
    }
    if (!passport_image) {
      Toast.show('Please select your passport upload');
      return;
    }
    if (!resume_image) {
      Toast.show('Please select your resume upload');
      return;
    }
    if (!exp_crefiticate_front) {
      Toast.show('Please select your experience crefiticate');
      return;
    }

    var formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('work_exp', work_Experience);
    formData.append('passport_number', passport_Number);
    formData.append('foreign_exp', foreign_Experience);
    formData.append('category', categoryId);
    formData.append('sub_category', subCategoryId);
    formData.append('passport_validity', passport_ValidityDate+" ");
    formData.append('aadhaar_front', {
      uri: aadhaar_front,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    formData.append('aadhaar_back', {
      uri: aadhaar_back,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    formData.append('pancard_front', {
      uri: pancard_front,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    formData.append('pancard_back', {
      uri: pancard_back,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    formData.append('passport_image', {
      uri: passport_image,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    
    formData.append('exp_crefiticate', {
      uri: exp_crefiticate_front,
      type: 'image/jpeg',
      name: 'image.jpg',
    });

    formData.append('resume_image', 
    {
      // uri: resume_image+" ",
      // type: 'application/pdf',
      // name: 'file.pdf',
      uri: resume_image,
      type: 'image/jpeg',
      name: 'image.jpg',
    }
    );
    console.log('-----formData: ', JSON.stringify(formData));
    console.log(state)
    setState({...state, isLoading: true});
    const response = await Api.custmerRegisterStep4(formData);
    const {status = false, msg, token = '', user_detail = {}} = response;
    console.log('-------------response: ', response);
    if (status) {
      setModalOpen(true);
      navigation.replace('Login');
      setState({...state, isLoading: false});
      
    } else {
      // const {
      //   data: { msg = 'Something went wrong' },
      // } = response;
      Toast.show(msg);
      console.log('------err: ', msg);
      setState({...state, isLoading: false});
    }
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setState({...state, passport_ValidityDate: date});
    hideDatePicker();
  };

  const toggleModal = modalVisible => setModal({...modal, modalVisible});
  const onImageOptionHandler = type => {
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
        const {uri} = response.assets[0];
        if (type === 'aadhaarFront') {
          setState({...state, aadhaar_front: uri});
        } else if (type === 'aadhaarBack') {
          setState({...state, aadhaar_back: uri});
        } else if (type === 'pancardFront') {
          setState({...state, pancard_front: uri});
        } else if (type === 'pancardBack') {
          setState({...state, pancard_back: uri});
        } else if (type === 'expCrefiticateFront') {
          setState({...state, exp_crefiticate_front: uri});
        } else if (type === 'expCrefiticateBack') {
          setState({...state, exp_crefiticate_back: uri});
        } else if (type === 'passportImage') {
          setState({...state, passport_image: uri});
        } else if (type === 'resumeImage') {
          setState({...state, resume_image: uri});
        }
      }
    });

    
    
  };

  const getPDF = async() => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.docx, DocumentPicker.types.images],
      })
        
      let destPath = response.uri
      console.log("document picker response ==", response.uri)
      if (response.uri.startsWith('content://')) {
        console.log("inside ")
        const uriComponents = response.uri.split('/')
        const fileNameAndExtension = uriComponents[uriComponents.length - 1]
        destPath = `${RNFS.TemporaryDirectoryPath}/${fileNameAndExtension}`
        await RNFS.copyFile(response.uri, destPath)
        destPath = "file://"+destPath+".pdf"
        
    }
      // alert(destPath)
       setState({...state, resume_image: destPath})
      // setState({...state, resume_image:  decodeURI(
      //   response.fileCopyUri.replace('content://', 'file:///data/user/0/'),
      // ) })
      // formData.append('resume_Image', response);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View style={{backgroundColor: '#FFFFFF', flex: 1}}>
      <StatusBarDark />
      <ScrollView>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.headerText}>
            Find the care{`\n`}job that’s right{`\n`}for you
          </Text>
          <ImageBackground
            style={styles.headerImage}
            source={require('../images/girl.png')}></ImageBackground>
        </View>
        <View style={styles.container}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.hireText}>Register to hire!</Text>
            <View
              style={{marginTop: 5, marginLeft: 'auto', marginHorizontal: 20}}>
              <AnimatedCircularProgress
                size={55}
                width={3}
                fill={100}
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
                      {'4/4'}
                    </Text>
                  </TouchableOpacity>
                )}
              </AnimatedCircularProgress>
            </View>
          </View>
          <TextLabel title={'Work Experience'} />
          <TextInput
            value={state.work_Experience}
            onChangeText={text =>
              setState({...state, work_Experience: text.replace(/[^0-9]/g, '')})
            }
            style={styles.textInput}
            placeholder={'Enter Experience'}
            keyboardType={'numeric'}
          />
          <TextLabel title={'Passport Number'} />
          <TextInput
            value={state.passport_Number}
            onChangeText={text =>
              setState({...state, passport_Number: text.replace(/[^0-9]/g, '')})
            }
            style={styles.textInput}
            keyboardType={'numeric'}
            placeholder={'Enter Passport Number'}
          />
          <TextLabel title={'Passport Validity'} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            minimumDate={new Date()}
          />
          <TouchableOpacity activeOpacity={0.8} onPress={showDatePicker}>
            {state.passport_ValidityDate == '' ? (
              <Text
                style={[styles.textInput, {padding: 14, color: '#00000050'}]}>
                Enter Passport Validity
              </Text>
            ) : (
              <Text style={styles.textInput}>
                {moment(state.passport_ValidityDate).format('DD/MM/YYYY')}
              </Text>
            )}
          </TouchableOpacity>
          <TextLabel title={'Foreign Experience'} />
          <TextInput
            value={state.foreign_Experience}
            onChangeText={text =>
              setState({
                ...state,
                foreign_Experience: text.replace(/[^0-9]/g, ''),
              })
            }
            style={styles.textInput}
            keyboardType={'numeric'}
            placeholder={'Enter Foreign Experience'}
            placeholderTextColor={'lightgray'}
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
          <TextLabel title={'Upload Aadhar Card'} />
          <View style={{flexDirection: 'row'}}>
            {state.aadhaar_front ? (
              <ImageBackground
                imageStyle={{borderRadius: 5}}
                style={styles.certificateImage}
                source={{uri: state.aadhaar_front}}>
                <TouchableOpacity
                  style={styles.crossImageView}
                  onPress={() => {
                    setState({...state, aadhaar_front: ''});
                  }}>
                  <Image
                    style={styles.crossImage}
                    source={require('../images/close.png')}
                  />
                </TouchableOpacity>
              </ImageBackground>
            ) : (
              <ImageBackground
                imageStyle={{borderRadius: 5}}
                style={styles.boxImage}
                source={require('../images/box.png')}>
                <TouchableOpacity
                  onPress={() => onImageOptionHandler('aadhaarFront')}>
                  <Image
                    style={styles.uploadImage}
                    source={require('../images/upload.png')}
                  />
                  <Text style={styles.uploadText}>Upload</Text>
                </TouchableOpacity>
              </ImageBackground>
            )}
            {state.aadhaar_back ? (
              <ImageBackground
                imageStyle={{borderRadius: 5}}
                style={styles.certificateImage}
                source={{uri: state.aadhaar_back}}>
                <TouchableOpacity
                  style={styles.crossImageView}
                  onPress={() => {
                    setState({...state, aadhaar_back: ''});
                  }}>
                  <Image
                    style={styles.crossImage}
                    source={require('../images/close.png')}
                  />
                </TouchableOpacity>
              </ImageBackground>
            ) : (
              <ImageBackground
                imageStyle={{borderRadius: 5}}
                style={styles.boxImage}
                source={require('../images/box.png')}>
                <TouchableOpacity
                  onPress={() => onImageOptionHandler('aadhaarBack')}>
                  <Image
                    style={styles.uploadImage}
                    source={require('../images/upload.png')}
                  />
                  <Text style={styles.uploadText}>Upload</Text>
                </TouchableOpacity>
              </ImageBackground>
            )}
          </View>
          <TextLabel title={'Upload Pan Card'} />
          <View style={{flexDirection: 'row'}}>
            {state.pancard_front ? (
              <ImageBackground
                imageStyle={{borderRadius: 5}}
                style={styles.certificateImage}
                source={{uri: state.pancard_front}}>
                <TouchableOpacity
                  style={styles.crossImageView}
                  onPress={() => {
                    setState({...state, pancard_front: ''});
                  }}>
                  <Image
                    style={styles.crossImage}
                    source={require('../images/close.png')}
                  />
                </TouchableOpacity>
              </ImageBackground>
            ) : (
              <ImageBackground
                imageStyle={{borderRadius: 5}}
                style={styles.boxImage}
                source={require('../images/box.png')}>
                <TouchableOpacity
                  onPress={() => onImageOptionHandler('pancardFront')}>
                  <Image
                    style={styles.uploadImage}
                    source={require('../images/upload.png')}
                  />
                  <Text style={styles.uploadText}>Upload</Text>
                </TouchableOpacity>
              </ImageBackground>
            )}
            {state.pancard_back ? (
              <ImageBackground
                imageStyle={{borderRadius: 5}}
                style={styles.certificateImage}
                source={{uri: state.pancard_back}}>
                <TouchableOpacity
                  style={styles.crossImageView}
                  onPress={() => {
                    setState({...state, pancard_back: ''});
                  }}>
                  <Image
                    style={styles.crossImage}
                    source={require('../images/close.png')}
                  />
                </TouchableOpacity>
              </ImageBackground>
            ) : (
              <ImageBackground
                imageStyle={{borderRadius: 5}}
                style={styles.boxImage}
                source={require('../images/box.png')}>
                <TouchableOpacity
                  onPress={() => onImageOptionHandler('pancardBack')}>
                  <Image
                    style={styles.uploadImage}
                    source={require('../images/upload.png')}
                  />
                  <Text style={styles.uploadText}>Upload</Text>
                </TouchableOpacity>
              </ImageBackground>
            )}
          </View>
          <TextLabel title={'Experience Certificate'} />
          <View style={{flexDirection: 'row'}}>
            {state.exp_crefiticate_front ? (
              <ImageBackground
                imageStyle={{borderRadius: 5}}
                style={styles.certificateImage}
                source={{uri: state.exp_crefiticate_front}}>
                <TouchableOpacity
                  style={styles.crossImageView}
                  onPress={() => {
                    setState({...state, exp_crefiticate_front: ''});
                  }}>
                  <Image
                    style={styles.crossImage}
                    source={require('../images/close.png')}
                  />
                </TouchableOpacity>
              </ImageBackground>
            ) : (
              <ImageBackground
                imageStyle={{borderRadius: 5}}
                style={styles.boxImage}
                source={require('../images/box.png')}>
                <TouchableOpacity
                  onPress={() => onImageOptionHandler('expCrefiticateFront')}>
                  <Image
                    style={styles.uploadImage}
                    source={require('../images/upload.png')}
                  />
                  <Text style={styles.uploadText}>Upload</Text>
                </TouchableOpacity>
              </ImageBackground>
            )}
            {state.exp_crefiticate_back ? (
              <ImageBackground
                imageStyle={{borderRadius: 5}}
                style={styles.certificateImage}
                source={{uri: state.exp_crefiticate_back}}>
                <TouchableOpacity
                  style={styles.crossImageView}
                  onPress={() => {
                    setState({...state, exp_crefiticate_back: ''});
                  }}>
                  <Image
                    style={styles.crossImage}
                    source={require('../images/close.png')}
                  />
                </TouchableOpacity>
              </ImageBackground>
            ) : (
              <ImageBackground
                imageStyle={{borderRadius: 5}}
                style={styles.boxImage}
                source={require('../images/box.png')}>
                <TouchableOpacity
                  onPress={() => onImageOptionHandler('expCrefiticateBack')}>
                  <Image
                    style={styles.uploadImage}
                    source={require('../images/upload.png')}
                  />
                  <Text style={styles.uploadText}>Upload</Text>
                </TouchableOpacity>
              </ImageBackground>
            )}
          </View>
          <TextLabel title={'Passport Upload'} />
          {state.passport_image ? (
            <ImageBackground
              imageStyle={{borderRadius: 5}}
              style={styles.certificateImage}
              source={{uri: state.passport_image}}>
              <TouchableOpacity
                style={styles.crossImageView}
                onPress={() => {
                  setState({...state, passport_image: ''});
                }}>
                <Image
                  style={styles.crossImage}
                  source={require('../images/close.png')}
                />
              </TouchableOpacity>
            </ImageBackground>
          ) : (
            <ImageBackground
              imageStyle={{borderRadius: 5}}
              style={styles.boxImage}
              source={require('../images/box.png')}>
              <TouchableOpacity
                onPress={() => onImageOptionHandler('passportImage')}>
                <Image
                  style={styles.uploadImage}
                  source={require('../images/upload.png')}
                />
                <Text style={styles.uploadText}>Upload</Text>
              </TouchableOpacity>
            </ImageBackground>
          )}
          <TextLabel title={'Resume Upload'} />
          {state.resume_image ? (
            <ImageBackground
              imageStyle={{borderRadius: 5}}
              style={styles.certificateImage}
              source={{uri: state.resume_image}}>
              <TouchableOpacity
                style={styles.crossImageView}
                onPress={() => {
                  setState({...state, resume_image: ''});
                }}>
                <Image
                  style={styles.crossImage}
                  source={require('../images/close.png')}
                />
              </TouchableOpacity>
            </ImageBackground>
            // <View style={{ flexDirection:'row', alignItems:'center'}}>
            // <ImageBackground
            //   imageStyle={{borderRadius: 5}}
            //   style={styles.boxImage}
            //   source={require('../images/box.png')}>
            //   <TouchableOpacity
            //     // style={styles.crossImageView}
            //     onPress={() => {
            //       setState({...state, resume_image: ''});
            //     }}>
            //     <Image
            //       style={styles.uploadImage}
            //       source={require('../images/upload.png')}
            //     />
            //     <Text style={styles.uploadText}>Upload</Text>
            //   </TouchableOpacity>
            // </ImageBackground>
            // <Text style={{color:'black', marginLeft:10}}>Resume Uploaded Succesfully</Text>
            // </View>
          ) : (
            <ImageBackground
              imageStyle={{borderRadius: 5}}
              style={styles.boxImage}
              source={require('../images/box.png')}>
              <TouchableOpacity
                onPress={() => 
                onImageOptionHandler('resumeImage')
                // getPDF()
                }>
                <Image
                  style={styles.uploadImage}
                  source={require('../images/upload.png')}
                />
                <Text style={styles.uploadText}>Upload</Text>
              </TouchableOpacity>
            </ImageBackground>
          )}
          <View style={{width: '100%', marginTop: 30}}>
            <ButtonStyle
              title={'SUBMIT'}
              loader={state.isLoading}
              onPress={() => {
                onProjectHandlerSubmit();
              }}
            />
          </View>
          <BottomView />
        </View>
        <Modal
          visible={modalOpen}
          transparent={true}
          onRequestClose={() => {
            setModalOpen(false);
            navigation.replace('Login');
          }}>
          <View style={styles.modal_View}>
            <View
              // activeOpacity={0.8}
              style={styles.mdtop}
              // onPress={() => {
              //   setModalOpen(false);
              //   navigation.replace('DrawerNavigator');
              // }}
            >
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
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default Register3;
const TextLabel = ({title}) => <Text style={styles.textLabel}>{title}</Text>;
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
  certificateImage: {
    width: 110,
    height: 80,
    marginLeft: 20,
    marginTop: 10,
    resizeMode: 'cover',
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
});
