import {createStore, combineReducers, applyMiddleware} from "redux"
import {taskReducer} from "./task_reducer"
import {userReducer} from "./user_reducer"
import {appReducer} from "./app_reducer"
import thunk from 'redux-thunk'

const reducer = combineReducers({
    taskReducer,
    userReducer,
    appReducer
})

export const store = createStore(reducer, applyMiddleware(thunk))


