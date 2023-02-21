import { combineReducers, legacy_createStore as createStore } from 'redux';
import {
	setAccessoriesReducer,
	setBasketReduser,
	setBorkHomeReducer,
	setCardReduser,
	setFavouriteReducer,
	setCheckoutReducer,
	setHealthAndBeautyReducer,
	setHomeAndClimateReducer,
	setKitchenReducer,
	setUserReducer,
	setSearchReducer,
} from './user/reducer';
// import { uuid } from "uuidv4";

export const store = createStore(
	combineReducers({
		user: setUserReducer,
		card: setCardReduser,
		basket: setBasketReduser,
		favourite: setFavouriteReducer,
		kitchen: setKitchenReducer,
		borkHome: setBorkHomeReducer,
		homeAndClimate: setHomeAndClimateReducer,
		accessories: setAccessoriesReducer,
		healthAndBeauty: setHealthAndBeautyReducer,
		checkout: setCheckoutReducer,
		search: setSearchReducer,
	})
);
