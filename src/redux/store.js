import { combineReducers, legacy_createStore as createStore } from 'redux';
import {
	setAccessoriesReducer,
	setBasketReduser,
	setBorkHomeReducer,
	setCardReduser,
	setHealthAndBeautyReducer,
	setHomeAndClimateReducer,
	setKitchenReducer,
	setUserReducer,
} from './user/reducer';
// import { uuid } from "uuidv4";

export const store = createStore(
	combineReducers({
		user: setUserReducer,
		card: setCardReduser,
		basket: setBasketReduser,
		kitchen: setKitchenReducer,
		borkHome: setBorkHomeReducer,
		homeAndClimate: setHomeAndClimateReducer,
		accessories: setAccessoriesReducer,
		healthAndBeauty: setHealthAndBeautyReducer,
	})
);
