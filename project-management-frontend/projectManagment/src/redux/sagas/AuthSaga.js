import {call, put, takeLatest} from 'redux-saga/effects';

import axios from 'axios';

import{
    loginFailure,loginRequest,loginSuccess,
    registerRequest,registerSuccess,registerFailure
} from '../reducers/authSlice'


const API = 'http://localhost:5000/api/auth';

function* handleLogin(action) {
    try{

        const res = yield call(axios.post, `${API}/login`, action.payload);
        yield put(loginSuccess(res.data));

    }catch(err){
     yield put(loginFailure(err.response?.data.msg || 'Login Field'));
    }
}

function* handleRegister(action) {

    try{

        yield call(axios.post,`${API}/register`, action.payload);
        yield put(registerSuccess());
    }
    catch(err){
        yield put(registerFailure(err.response?.data?.msg || 'Registration Fieled'))
    }
}


export default function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
  yield takeLatest(registerRequest.type, handleRegister);
}