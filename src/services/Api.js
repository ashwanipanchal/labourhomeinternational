import AsyncStorage from '@react-native-async-storage/async-storage';
import { request, requestGet, requestMultipart } from './ApiSauce';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const Api = {
    // reuriting_agentrRegister
    login: json => request('login', json),
    verfiyOtp: json => request('verfiyOtp', json),
    reuritingAgentrRegister: json => request('reuriting_agentrRegister', json),
    projectExporterRegister: json => request('project_exporterRegister', json),
    foreignRecuritingRegister: json => request('foreign_recuritingRegister', json),
    custmerRegisterStep1: json => request('custmerRegister_step1', json),
    custmerRegisterStep2: json => request('custmerRegister_step2', json),
    custmerRegisterStep3: json => request('custmerRegister_step3', json),
    custmerRegisterStep4: json => request('custmerRegister_step4', json),
    state: json => request('state', json),
    city: json => request('city', json),
    sub_category: json => request('sub_category', json),
    fetchSettings: json => request('fetch_settings', json),
    getUserProfile: json => request('get_user_profile', json),
    postedJobList: json => request('posted_job_list', json),
    postedJobDetails: json => request('posted_job_details', json),
    jobShortListAdd: json => request('job_shortlist_add', json),
    jobShortListRemove: json => request('job_shortlist_remove', json),
    jobAppliedList: json => request('candidates_apply', json),
    jobApprovedList: json => request('candidates_approve_list', json),
    jobRejectedList: json => request('candidates_reject_list', json),
    aadhaarDocUserStatus: json => request('aadher_doc_user_status', json),
    pancardDocUserStatus: json => request('pancard_doc_user_status', json),
    passportDocUserStatus: json => request('passport_doc_user_status', json),
    approveUser: json => request('approve_user_job', json),
    remainingPlan: json => request('remaining_plan', json),
    countrie: () => requestGet('countrie'),
    jobApply: json => request('job_apply', json),
    scheduleAnInterview: json => request('schedule_interview', json),
    scheduleListAgent: json => request('schedule_list_agent', json),
    rescheduleListUser: json => request('reschedule_list_user', json),
    jobDecline: json => request('job_decline', json),
    getUserHome: () => requestGet('homepage_customer'),
    shortListPage: () => requestGet('job_shortlist_list'),
    postJob: () => requestGet('post_job'),
    appliedJob: () => requestGet('job_apply_list_user'),
    declinedJob: () => requestGet('job_decline_list_user'),
    getUserDocumentsForStatus: json => request('job_user_documents_details', json),
    aadharCardUploadAgain: json => request('aadher_document_upload_user', json),
    panCardUploadAgain: json => request('pancard_document_upload_user', json),
    passportUploadAgain: json => request('passport_document_upload_user', json),
    jobStatusUser: json => request('job_status_user', json),
    getNotification: json => request('get_notifications', json),
    acceptInterview: json => request('confirm_schedule_interview', json),
    category: () => requestGet('category'),
    faq: () => requestGet('faq'),
    // fetchSettings: () => requestGet('fetch_settings'),
    // custmerRegisterStep3: formData => requestMultipart('custmerRegisterStep3', formData),

};
const LocalStorage = {
    setToken: token => AsyncStorage.setItem('authToken', token),
    getToken: () => AsyncStorage.getItem('authToken'),
    setApproval: approval => AsyncStorage.setItem('approval', approval),
    getApproval: () => AsyncStorage.getItem('approval'),
    setFcmToken: fcmToken => AsyncStorage.setItem('fcmToken', fcmToken),
    getFcmToken: () => AsyncStorage.getItem('fcmToken'),
    setUserDetail: user_detail => AsyncStorage.setItem('userdata', user_detail),
    getUserDetail: () => AsyncStorage.getItem('userdata'),
    setLanguage: language => AsyncStorage.setItem('language', language),
    getLanguage: () => AsyncStorage.getItem('language'),
    setFirstTimeOpen: () => AsyncStorage.setItem('firstTimeOpen', 'false'),
    getFirstTimeOpen: () => AsyncStorage.getItem('firstTimeOpen'),
    clear: AsyncStorage.clear,
};

// const onSearchEvent = new Subject().pipe(debounceTime(500));

export { width, height, Api, LocalStorage };
