import { configureStore, combineReducers,  } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'reduxjs-toolkit-persist';
import storage from './storage';

const persistConfig = {
  key: 'root',
  storage
}

 const rootReducer = combineReducers({ 
   auth: authSlice.reducer, // AQUI SE PUEDEN AÑAdIR LOS DEMAS REDUCERS
 })

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})
 
export const persistor = persistStore(store)
