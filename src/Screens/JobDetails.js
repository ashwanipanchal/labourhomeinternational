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
  useWindowDimensions,
  FlatList,
  ImageBackground
} from 'react-native';
import { StatusBarLight } from '../Custom/CustomStatusBar';
import { DisableButton, HeaderDark } from '../Custom/CustomView';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Timeline from 'react-native-timeline-flatlist';
import { launchImageLibrary } from 'react-native-image-picker';
import { BottomView, ButtonStyle, EndButton } from '../Custom/CustomView';
import Loader from '../services/Loader';
import { Api } from '../services/Api';
import { useNavigation, useRoute, useFocusEffect, useIsFocused } from '@react-navigation/native';
const { height } = Dimensions.get('window');
import Toast from 'react-native-simple-toast';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker'
import { set } from 'react-native-reanimated';

const JOBDETAILS = () => {
  const route = useRoute();
  // alert(JSON.stringify(route.params.item))
  console.log("cehckinggggggg routeee", route)
  const [newData, setNewData] = useState([])
  const [state, setState] = useState({
    isLoading: false,
  })
  const [data, setData] = useState([
    {
      title: route.params.work_exp,
      source: require('../images/portfolio.png'),
    },
    {
      title: route.params.labour_requird,
      source: require('../images/filter-manager.png'),
    },
    {
      title: route.params.job_location,
      source: require('../images/location1.png'),
    },
    {
      title: 'Not disclosed',
      source: require('../images/book.png'),
    },
    {
      title: route.params.job_description,
      source: require('../images/pen-tool.png'),
    },
    {
      title: route.params.contract_period,
      source: require('../images/book.png'),
    },
    {
      title: route.params.accommodation,
      source: require('../images/home.png'),
    },
    {
      title: route.params.food,
      source: require('../images/salad.png'),
    },
    {
      title: route.params.working_hours,
      source: require('../images/clock.png'),
    },
    {
      title: route.params.transportation,
      source: require('../images/bus.png'),
    },
    {
      title: route.params.medical_insurance,
      source: require('../images/first-aid-kit.png'),
    },
    {
      title: route.params.air_ticket,
      source: require('../images/airplane.png'),
    },
  ]);
  useEffect(()=>{
    console.log("route", route)
    // getjob()
  },[])
  const toggleLoader = isLoading => setState({ ...state, isLoading })
  const getjob = async() => {
   // toggleLoader(true)
    const body = {
      "job_id": route.params.job_id
    }
    const response = await Api.postedJobDetails(body)
   
    console.log("response in apiii===", response)
    const {status, data } = response;
    console.log("data in apiii===", data)
   // toggleLoader(false)
    alert(JSON.stringify(response,null,2))
    console.log("data in apiii===", data)
    if(status){
     
      // setNewData({
      //   title: data.work_exp,
      //   source: require('../images/portfolio.png'),
      // })
    }
  }
  // console.log("newData =====", newData)
  return (
    <View style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
      <Loader status={state.isLoading} />
      <ScrollView>
        <View style={styles.subBox}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={{
                width: 50,
                height: 50,
                marginLeft: 10,
                marginTop: 15,
              }}
              source={require('../images/images.png')}
            />
            <View>
              <Text style={styles.inText}>{route.params.name}</Text>
              <Text style={styles.insubText}>{route.params.job_location}</Text>
            </View>
            <Image
              style={{
                width: 16,
                height: 16,
                marginLeft: 'auto',
                marginHorizontal: 15,
                marginTop: 15,
              }}
              source={require('../images/star.png')}
            />
          </View>
          <Text style={styles.middleText}>
            {route.params.job_description}
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.redText}>{route.params.work_exp}</Text>
            <Text style={styles.redText}>Posted on {route.params.post_job_date}</Text>
          </View>
        </View>
        <View style={styles.subBox}>
          <FlatList
            numColumns={1}
            data={data}
            renderItem={({ item, index }) => (
              <View style={{ flexDirection: 'row' }}>
                <Image
                  style={{
                    width: 17,
                    height: 17,
                    resizeMode: 'contain',
                    marginTop: 15,
                    marginLeft: 5,
                  }}
                  source={item.source}
                />
                <Text style={styles.boxText}>{item.title}</Text>
              </View>
            )}
          />
        </View>
        <Text style={styles.job}>Job Description</Text>
        <View style={styles.subBox}>
          <Text style={styles.aboutHeading}>What you’ll do</Text>
          <Text style={styles.about}>
            {route.params.job_description}
          </Text>
        </View>
        <View style={styles.subBox}>
          <Text style={styles.text}>Industry type</Text>
          <Text style={styles.subText}>Construction Worker</Text>
          <Text style={styles.text}>Functional Area</Text>
          <Text style={styles.subText}>Other</Text>
          <Text style={styles.text}>Employment Type</Text>
          <Text style={styles.subText}>Full Time, Permanent</Text>
          <Text style={styles.text}>Education</Text>
          <Text style={styles.subText}>{route.params.qualification}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const JOBSTATUS = () => {
  const [userData, setUserData] = useState()
  const isFocused=useIsFocused();
  const [userJobStatus, setUserJobStatus] = useState()
  const [dataForReschedule, setDataForReschedule] = useState({
    "job_id": '',
    "user_id": '',
    "agency_id": '',
    "schedule_interview": "3"
  })
  const navigation = useNavigation();
  const [state, setState] = useState({
    isLoading: false,
    aadhaar_front: '',
    aadhaar_back: '',
    pancard_front: '',
    pancard_back: '',
    passport_image: '',
  })
  const route = useRoute()
  const toggleLoader = isLoading => setState({ ...state, isLoading })
  // useFocusEffect(
  //   React.useCallback(() => {
  //     getData()
  //     // getJobStatusData()
  //   }, [])
  // )
  useEffect(()=>{
    getData()
    setDataForReschedule({
      "job_id": route.params.job_id,
      "user_id": route.params.user_id,
      "agency_id": route.params.agency_id,
      "schedule_interview": "3",
    })
  },[isFocused])

  const getData = async () => {
    toggleLoader(true)
    const body = {
      "job_id": JSON.stringify(route.params.job_id),
      "user_id": JSON.stringify(route.params.user_id)
    }
    
    const response = await Api.getUserDocumentsForStatus(body)
    const response2 = await Api.jobStatusUser(body)
    const { status, user_details } = response;
    console.log(" status check for user 1" , response)
    console.log(" status check for user 2" , response2)
    setUserData(user_details)
    setUserJobStatus(response2)
    // alert(JSON.stringify(response2,null,2))
    toggleLoader(false)
    // if (status) {
    //   // toggleLoader(false)
    //   setUserData(user_details)
    // }
    // if(response2.status){
    //   toggleLoader(false)
    //   setUserJobStatus(response2)
    // }

  }

  // const getJobStatusData = async() => {
  //   const body = {
  //     "job_id": JSON.stringify(route.params.job_id),
  //     "user_id": JSON.stringify(route.params.user_id)
  //   }
  //   toggleLoader(true)
  //   const response = await Api.jobStatusUser(body)
  //   const {status} = response;
  //   console.log("jobStatus==", JSON.stringify(response))
  //   if(status){
  //     toggleLoader(false)
  //     setUserJobStatus(response)
  //   }
  // }

  const uploadAadhaar = async() => {
    const {
      aadhaar_front = '',
      aadhaar_back = '',
    } = state;

    if (!aadhaar_front) {
      Toast.show('Please select your aadhaar front');
      return;
    }
    if (!aadhaar_back) {
      Toast.show('Please select your aadhaar back');
      return;
    }

    var formData = new FormData();
    formData.append('job_id', route.params.job_id);
    formData.append('user_id', route.params.user_id+' ');
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
    toggleLoader(true)
    const response = await Api.aadharCardUploadAgain(formData)
    const {status} = response;
    if(status){
      getData()
      toggleLoader(false)
    }
    // console.log("APi response ===",response)
    // console.log("api response ==", JSON.stringify(response))
  }



  const uploadPancard = async() => {
    const {
      pancard_front = '',
      pancard_back = '',
    } = state;

    if (!pancard_front) {
      Toast.show('Please select your pancard front');
      return;
    }
    if (!pancard_back) {
      Toast.show('Please select your pancard back');
      return;
    }

    var formData = new FormData();
    formData.append('job_id', route.params.job_id);
    formData.append('user_id', route.params.user_id+' ');
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
    toggleLoader(true)
    const response = await Api.panCardUploadAgain(formData)
    const {status} = response;
    if(status){
      getData()
      toggleLoader(false)
    }
    // console.log("APi response ===",response)
    // console.log("api response ==", JSON.stringify(response))
  }

  const uploadPassport = async() => {
    const {
      passport_image = '',
    } = state;

    if (!passport_image) {
      Toast.show('Please select your passport');
      return;
    }
    

    var formData = new FormData();
    formData.append('job_id', route.params.job_id);
    formData.append('user_id', route.params.user_id+' ');
    formData.append('passport_image', {
      uri: passport_image,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    // console.log(JSON.stringify(formData))
    toggleLoader(true)
    const response = await Api.passportUploadAgain(formData)
    // console.log("APi response ===",response)
    // console.log("api response ==", JSON.stringify(response))
    const {status} = response;
    if(status){
      getData()
      toggleLoader(false)
    }
    // console.log("APi response ===",response)
    // console.log("api response ==", JSON.stringify(response))
  }


  const Adhaar = ({ aadhaar_front, aadhaar_back }) => (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image style={{ width: 58, height: 34, resizeMode: 'contain', borderColor: 'red', borderWidth: 1, borderRadius: 4 }} source={{ uri: userData.aadhaar_front }} /><Text style={{ color: 'red', marginLeft: 5, fontSize: 10 }}>Aadhaar Card Rejected</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
        {aadhaar_front ? (
          <ImageBackground
            imageStyle={{ borderRadius: 5 }}
            style={styles.certificateImage}
            source={{ uri: state.aadhaar_front }}>
            <TouchableOpacity
              style={styles.crossImageView}
              onPress={() => {
                setState({ ...state, aadhaar_front: '' });
              }}>
              <Image
                style={styles.crossImage}
                source={require('../images/close.png')}
              />
            </TouchableOpacity>
          </ImageBackground>
        ) : (
          <ImageBackground
            imageStyle={{ borderRadius: 5 }}
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
        {aadhaar_back ? (
          <ImageBackground
            imageStyle={{ borderRadius: 5 }}
            style={styles.certificateImage}
            source={{ uri: state.aadhaar_back }}>
            <TouchableOpacity
              style={styles.crossImageView}
              onPress={() => {
                setState({ ...state, aadhaar_back: '' });
              }}>
              <Image
                style={styles.crossImage}
                source={require('../images/close.png')}
              />
            </TouchableOpacity>
          </ImageBackground>
        ) : (
          <ImageBackground
            imageStyle={{ borderRadius: 5 }}
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
        <TouchableOpacity onPress={()=>  uploadAadhaar()}><Text style={{ color: '#2574FF', fontSize: 10, marginLeft: 5, fontWeight: '700', fontFamily: 'Muli' }}>Upload Again</Text></TouchableOpacity>
      </View>
    </View>
  )

  const Pancard = ({ pan_front, pan_back }) => (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image style={{ width: 58, height: 34, resizeMode: 'contain', borderColor: 'red', borderWidth: 1, borderRadius: 4 }} source={{ uri: userData.pancard_front }} /><Text style={{ color: 'red', marginLeft: 5, fontSize: 10 }}>Pancard Rejected</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
        {pan_front ? (
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
        {pan_back ? (
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
        <TouchableOpacity onPress={()=> uploadPancard()}><Text style={{ color: '#2574FF', fontSize: 10, marginLeft: 5, fontWeight: '700', fontFamily: 'Muli' }}>Upload Again</Text></TouchableOpacity>
      </View>
    </View>
  )

  const Passport = ({ passport }) => (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image style={{ width: 58, height: 34, resizeMode: 'contain', borderColor: 'red', borderWidth: 1, borderRadius: 4 }} source={{ uri: userData.passport_image }} /><Text style={{ color: 'red', marginLeft: 5, fontSize: 10 }}>Passport Rejected</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', }}>
        {passport ? (
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
        <TouchableOpacity onPress={()=> uploadPassport()}><Text style={{ color: '#2574FF', fontSize: 10, marginLeft: 5, fontWeight: '700', fontFamily: 'Muli' }}>Upload Again</Text></TouchableOpacity>
      </View>
    </View>
  )

  // const interview = "Interview Done"


  const obj = () => {
    if (userData) {
      //CHECKING IF AADHAAR CARD IS REJECTED OR NOT
      return (
      <>
        {userData.aadhaar_status === 'reject' && <Adhaar aadhaar_front={state.aadhaar_front} aadhaar_back={state.aadhaar_back} />}
        {userData.pancard_status === 'reject' && <Pancard pan_front={state.pancard_front} pan_back={state.pancard_back} />}
        {userData.passport_status === 'reject' && <Passport passport={state.passport_image} />}
      </>
      )

    }
  }

  
  const appliedFunc = () => {
      if(userJobStatus){
        if(userJobStatus.job_applied === 0){
          return {
            title: <Text style={{ color: '#8F9BB3' }}>Job Applied Pending</Text>,
            icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick2.png')}/>,
          }
        }else{
          return {
            title: <Text>Job Applied <Text style={{ color: '#8F9BB3' }}>on {userJobStatus.job_applied_date}</Text></Text>,
            icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain', marginTop:5 }} source={require('../images/tick1.png')}/>,
          }
        }
    }
  }
  const documentSubmit = () => {
    if(userJobStatus){
      return <Text>Document Submit <Text style={{ color: '#8F9BB3' }}>by {userJobStatus.document_submit_date} </Text></Text>
    }
  }

  const documentApprove = () => {
    if(userJobStatus){
      if(userJobStatus.document_approve === 0){
        return {
          title: <Text style={{ color: '#8F9BB3' }}>Document Approval Pending</Text>,
          icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick2.png')}/>,
        }
      }else{
        if(userJobStatus.schedule_interview.length === 0){
          return {
            title: <Text>Document Approved <Text style={{ color: '#8F9BB3' }}>by {userJobStatus.document_submit_date} </Text></Text>,
          icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick1.png')}/>
          }
        }
        return {
          title: <Text>Document Approved <Text style={{ color: '#8F9BB3' }}>by {userJobStatus.document_submit_date} </Text></Text>,
          icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick1.png')}/>,
          lineColor: '#00AA83'
        }
      }
      
    }
  }

  const interviewCall = () => {
    if(userJobStatus){
      if(userJobStatus.schedule_interview.length === 0){
        return {
          title: <Text style={{ color: '#8F9BB3' }}>Interview Call Schedule Pending</Text>,
          icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick2.png')}/>,
        }
      }else{
        return {
          title: <Text>Interview Call Schedule <Text style={{ color: '#8F9BB3' }}>on {userJobStatus.interview_call}</Text></Text>,
          icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick1.png')}/>,
        }
      }
      
    }
  }

  const interviewDone = () => {
    if(userJobStatus){
      if(userJobStatus.interview_done === 0){
        return {
          title: <Text style={{ color: '#8F9BB3' }}>Interview Done Pending</Text>,
          icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick2.png')}/>,
        }
      }else{
        return {
          title: <Text>Interview Done <Text style={{ color: '#8F9BB3' }}>on Mon, 19 Oct</Text></Text>,
          icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick1.png')}/>,
        }
      }
      
    }
  }

  const skillCertificate = () => {
    if(userJobStatus){
      if(userJobStatus.skill_certificate === 0){
        return {
          title: <Text style={{ color: '#8F9BB3' }}>Skill Certificate Pending</Text>,
          icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick2.png')}/>,
        }
      }else{
        return {
          title: <Text>Skill Certificate Uploaded <Text style={{ color: '#8F9BB3' }}>on {userJobStatus.skill_certificate_data}</Text></Text>,
          icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick1.png')}/>,
        }
      }
      
    }
  }

  const statusApprove = () => {
    if(userJobStatus){
      if(userJobStatus.approved === 0){
        return {
          title: <Text style={{ color: '#8F9BB3' }}>Status Approved Pending</Text>,
          icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick2.png')}/>,
        }
      }else{
        return {
          title: <Text>Status Approved <Text style={{ color: '#8F9BB3' }}>by {userJobStatus.approve_date} </Text></Text>,
          icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick1.png')}/>,
        }
      }
      
    }
  }

  const certificateVerified = () => {
    if(userJobStatus){
      if(userJobStatus.skill_certificate_verified === 'Pending'){
        return {
          title: <Text style={{ color: '#8F9BB3' }}>Certificate Verified Pending </Text>,
          icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick2.png')}/>,
        }
      }else{
        return {
          title: <Text>Certificate Verified <Text style={{ color: '#8F9BB3' }}>by {userJobStatus.skill_certificate_data} </Text></Text>,
          icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick1.png')}/>,
        }
      }
      
    }
  }
  const makePayment = () => {
    if(userJobStatus){
      if(userJobStatus.payment_received === 0){
        return {
          title: <Text style={{ color: '#8F9BB3' }}>Make Payment (min amount ₹5000/-)</Text>,
          icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick2.png')}/>,
        }
      }else{
        return {
          title: <Text>Payment Done <Text style={{ color: '#8F9BB3' }}>on  </Text></Text>,
          icon: <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick1.png')}/>,
        }
      }
      
    }
  }
  // const certificateVerified = () => {
  //   if(userJobStatus){
  //     if(userJobStatus.skill_certificate_verified == 'Pending'){
  //       return <Text style={{ color: '#8F9BB3' }}>Certificate Verified Pending </Text>
  //     }else{
  //       return <Text>Certificate Verified <Text style={{ color: '#8F9BB3' }}>by {userJobStatus.skill_certificate_data} </Text></Text>
  //     } 
  //   }
  // }
  // const certificateVerifiedIcon = () => {
  //   if(userJobStatus){
  //     if(userJobStatus.skill_certificate_verified == 'Pending'){
  //       return <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick2.png')}/>
  //     }else{
  //       return <Image style={{ width: 20, height: 20, resizeMode: 'contain' }} source={require('../images/tick1.png')}/>
  //     } 
  //   }
  // }

  
  const onImageOptionHandler = type => {
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
        if (type === 'aadhaarFront') {
          setState({ ...state, aadhaar_front: uri });
        } else if (type === 'aadhaarBack') {
          setState({ ...state, aadhaar_back: uri });
        } else if (type === 'pancardFront') {
          setState({ ...state, pancard_front: uri });
        } else if (type === 'pancardBack') {
          setState({ ...state, pancard_back: uri });
          // } else if (type === 'expCrefiticateFront') {
          //   setState({...state, exp_crefiticate_front: uri});
          // } else if (type === 'expCrefiticateBack') {
          //   setState({...state, exp_crefiticate_back: uri});
        } else if (type === 'passportImage') {
          setState({ ...state, passport_image: uri });
        }
      }
    });

  }
  const data = [
    {
      ...appliedFunc(),
      lineColor:'#00AA83'
    },
    {
      title: documentSubmit(),
      // icon: require('../images/tick1.png'),
      icon: (
        <Image
          style={{ width: 20, height: 20, resizeMode: 'contain' }}
          source={require('../images/tick1.png')}
        />
      ),
      lineColor:'#00AA83',
      // description: (
      //   <View>  
      //     <View style={{flexDirection:'row', alignItems:'center'}}>
      //       <Image style={{width:58, height:34, resizeMode:'contain', borderColor: 'red', borderWidth:1, borderRadius:4}} source={require('../images/Reruiting-agent-slice/pan-card.png')}/><Text style={{color:'red', marginLeft:5, fontSize:10}}>Aadhaar Card Rejected</Text>
      //     </View>
      //     <View style={{flexDirection:'row', marginTop:10, alignItems:'center'}}>
      //       <Image style={{width:58, height:34, resizeMode:'contain',  borderRadius:5 , borderColor: 'red', borderWidth:1,}} source={require('../images/Reruiting-agent-slice/passport.png')}/><Text style={{color:'red', marginLeft:5, fontSize:10}}>Passport Rejected</Text>
      //     </View>
      //   </View>
      // )
      description: obj()
    },
    {
      ...documentApprove()
    },
    {
      ...interviewCall()
      // description: '(Location: C-9/21 Rohini Sector-7 2nd Floor)',
    },
    {
      ...interviewDone()
    },
    {
      ...skillCertificate(),
      imageUrl: require('../images/Reruiting-agent-slice/skill.png'),
    },
    {
      ...statusApprove()
    },
    {
      ...certificateVerified()
    },
    {
      ...makePayment()
    },
  ];

  const getPdf = async() => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.doc, DocumentPicker.types.docx],
      })
        
      console.log(response)
    } catch (error) {
      console.log(error)
    }
    
  }

  const acceptInterview = async() => {
    const body = {
      "job_id": route.params.job_id,
      "user_id": route.params.user_id,
      "agency_id": route.params.agency_id,
      "schedule_interview":"1"
    }
    toggleLoader(true)
    const response = Api.acceptInterview(body);
    const {status, message} = response;
    if(status){
      toggleLoader(false)
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Loader status={state.isLoading} />
      <ScrollView>
        <View style={styles.sub2Box}>
          <Text style={styles.viewJob}>Job Status</Text>
          <View style={styles.Line} />
          <Timeline
            data={data}
            circleColor={'#00AA83'}
            // lineColor='rgb(45,156,219)'
            // isUsingFlatlist={true}
            lineColor={'lightgray'}
            // lineColor={'#007AFF'}
            listViewStyle={{ marginLeft: -25 }}
            innerCircle={'icon'}
            iconStyle={{
              height: 9,
              width: 9,
              resizeMode: 'contain',
            }}
            titleStyle={{
              color: '#00AA83',
              fontSize: 14,
              marginBottom: 30,
              marginTop: -13,
            }}
            descriptionStyle={{
              color: '#8F9BB3',
              fontSize: 12,
              marginTop: -10,
              marginBottom: 10,
            }}
          />
          <View style={{ width: '50%', marginLeft: 30, marginTop: 10, marginBottom: 10 }}>
            <ButtonStyle
              title={'PAYMENT NOW'}
              height={40}
              onPress={() => {
                // getPdf()
                // navigation.navigate('Payment');
              }}
            />
          </View>
        </View>
      
      </ScrollView>
      {route.params.schedule_interview === '2' ? (
        

        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <View style={{ width: '45%', marginTop: 20 }}>
            <EndButton
              title={'ACCEPT INTERVIEW'}
              height={40}
              txtcolor={'#fff'}
              onPress={() => {
                acceptInterview()

              }}
            />
          </View>
          <View style={{ width: '45%', marginTop: 20 }}>
            <EndButton
              title={'RESCHEDULE INTERVIEW'}
              height={40}
              bgColor={'#DA274D'}
              txtcolor={'#fff'}
              onPress={() =>
                // setModalOpen(true)
                navigation.navigate('ScheduleInterviewDate', dataForReschedule)}
            />
          </View>
        </View>
        
      ):(
        <View style={{width: '90%', marginTop: 15, alignSelf: 'center'}}>
        <DisableButton
              title={route.params.schedule_interview === '1'  ? "Interview Accepted": 'Interview Not Scheduled Yet'}
              height={45}
              fontSize={16}
              bgColor={'#cccccc'}
              txtcolor={'#fff'}
        />
        </View>
       )} 
      
      <BottomView />
    </View>
  );
};

const renderScene = SceneMap({
  first: JOBDETAILS,
  second: JOBSTATUS,
});

const JobDetails = ({ navigation, route }) => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'JOB DETAIL' },
    { key: 'second', title: 'JOB STATUS' },
  ]);
  // console.log(JSON.stringify(route.params))
  // alert(JSON.stringify(route.params),null,2)
  return (
    <View style={{ backgroundColor: '#f8f8f8', flex: 1 }}>
      <StatusBarLight />
      <HeaderDark onPress={() => navigation.goBack()} title={'Job Status'} />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={props => (
          <TabBar
            style={styles.style}
            labelStyle={styles.labelStyle}
            scrollEnabled={false}
            activeColor={'#2574FF'}
            inactiveColor={'#000000'}
            inactiveOpacity={0.5}
            {...props}
            indicatorStyle={styles.indicatorStyle}
          />
        )}
      />
    </View>
  );
};

export default JobDetails;

const styles = StyleSheet.create({
  image: {
    marginTop: height / 3,
    width: 219,
    height: 232,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  style: { backgroundColor: 'white', elevation: 5 },
  labelStyle: {
    fontSize: 16,
    fontFamily: 'Nunito',
    fontWeight: 'bold',
    color: '#ACB1C0',
  },
  indicatorStyle: {
    backgroundColor: '#2574FF',
    height: 3,
  },
  subBox: {
    padding: 10,
    marginHorizontal: 15,
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 10,
    marginTop: 20,
    // marginLeft: 25,
    marginBottom: 5,
  },
  sub2Box: {
    width: 335,
    height: 650,
    // height: 730,
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 10,
    marginTop: 20,
    // marginLeft: 25,
    marginBottom: 5,
    alignSelf: 'center',
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
  Line: {
    height: 1,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    // marginHorizontal: 20,
    marginTop: 10,
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
  Line: {
    height: 1,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    // marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },
  middleText: {
    fontFamily: 'Muli',
    fontSize: 14,
    fontWeight: '700',
    color: '#8F9BB3',
    marginLeft: 15,
    marginTop: 15,
  },
  boxText: {
    fontFamily: 'Muli',
    fontSize: 14,
    fontWeight: '700',
    color: '#1E1F20',
    marginLeft: 15,
    marginTop: 13,
  },
  job: {
    fontFamily: 'Muli',
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1F20',
    marginLeft: 20,
    marginTop: 20,
  },
  viewJob: {
    fontFamily: 'Muli',
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1F20',
    marginLeft: 30,
    marginTop: 20,
  },
  aboutHeading: {
    fontFamily: 'Muli',
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1F20',
    marginLeft: 5,
  },
  about: {
    fontFamily: 'Muli',
    fontSize: 14,
    fontWeight: '600',
    color: '#1E1F20',
    marginLeft: 5,
    marginTop: 5,
    lineHeight: 22,
    textAlign: 'justify',
    marginHorizontal: 20,
  },
  text: {
    fontFamily: 'Muli',
    fontSize: 16,
    fontWeight: '600',
    color: '#8F9BB3',
    marginLeft: 5,
    marginTop: 5,
  },
  subText: {
    fontFamily: 'Muli',
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1F20',
    marginLeft: 5,
    marginTop: 5,
  },
  certificateImage: {
    width: 60,
    height: 50,
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 5,
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
  boxImage: {
    width: 60,
    height: 50,
    marginLeft: 5,
    marginTop: 10,
    marginBottom: 5,
  },
  uploadImage: {
    width: 14,
    height: 17,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 10,
  },
  uploadText: {
    fontFamily: 'Muli',
    fontWeight: '700',
    fontSize: 8,
    color: '#1E1F20',
    textAlign: 'center',
    marginTop: 5,
  },
});
