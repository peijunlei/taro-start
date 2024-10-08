import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
//@ts-ignore
const composeEnhancers =
  // __DEV__ &&
  typeof window === 'object' && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']
    ? window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const middlewares = [thunkMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(require('redux-logger').createLogger());
}

const middlewareEnhancer = applyMiddleware(...middlewares);
const composedEnhancers = composeEnhancers(middlewareEnhancer);

let GolbalStore = createStore(combineReducers(rootReducer), undefined, composedEnhancers);

let newReducer = {}; //保存动态新加的reducers
//动态注册reducer
export function registerReducer(reducerMap: {[name: string]: Function}) {
  //判断是否重复.
  for (let key in reducerMap) {
    if (rootReducer[key]) {
      throw new Error(`the register reducer conflict with reducer name: ${key},please modify the reducer name`);
    }
  }
  newReducer = {...newReducer, ...reducerMap}; //更新动态添加
  GolbalStore.replaceReducer(
    combineReducers({
      ...rootReducer, //以前全局注册的reducer
      ...newReducer, //动态储蓄新的reducers
    }),
  );
}

//动态解除reducer
export function deregister(reducerKeys: [string]) {
  reducerKeys.forEach((itemReduce) => {
    if (newReducer[itemReduce]) {
      //如果对应的reducerKey存在
      delete newReducer[itemReduce];
    }
  });

  GolbalStore.replaceReducer(
    combineReducers({
      ...rootReducer,
      ...newReducer,
    }),
  );
}
/**
 *
 * @param reducerKey
 * @returns {T}
 */
export function getReducerData<T>(reducerKey: string): T {
  return GolbalStore.getState()[reducerKey] as any;
}

export default GolbalStore;
