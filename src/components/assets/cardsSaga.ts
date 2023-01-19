import { call, put, takeLatest } from 'redux-saga/effects'
import axios, { AxiosResponse } from "axios"
import { actionGetCards } from "./actions/actionCards";
import { setCards } from "./cardsSlice"

function* getCards(){
    const url = 'https://624d5b55c172b69d6931a1c7.mockapi.io/cards'
    const {data}: AxiosResponse<Array<any>> = yield call(axios.get,url);
    yield put(setCards(data));
}

export function* cardsSaga(){
    yield takeLatest(actionGetCards.type, getCards)
}
