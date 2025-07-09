// import { configureStore } from '@reduxjs/toolkit'; 
// import createSagaMiddleware from 'redux-saga';
// import authSlice from './reducers/authSlice'
// import rootSaga from './sagas/RootSaga';

// const sagaMiddleware = createSagaMiddleware();

// export default store = configureStore({
//     reducer :{
//         auth: authSlice,
//     },
//     middleware: (getDefaultModdleware) => 

//         getDefaultModdleware({ thunk: false}).concat(sagaMiddleware),
// } );

// sagaMiddleware.run(rootSaga);
// export { store };


import { configureStore } from '@reduxjs/toolkit'; 
import createSagaMiddleware from 'redux-saga';
import authSlice from './reducers/authSlice';
import rootSaga from './sagas/RootSaga';

const sagaMiddleware = createSagaMiddleware();

// ✅ Correct way to declare and export
const store = configureStore({
  reducer: {
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

// ✅ Start your root saga
sagaMiddleware.run(rootSaga);

// ✅ Export properly
export default store;
export { store };
