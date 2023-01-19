import { call, put, takeLatest } from 'redux-saga/effects'
import axios, { AxiosResponse } from "axios"
import { actionGetDescriptions } from "./actions/actionDescriptions";
import {setDescription} from "./cardsSlice";

import { ActionWithPayload } from "./actions/actionDescriptions"
import { Description } from "../DescriptionCards/Description";

function* getDescription(action: ActionWithPayload<Description>){
    const { payload } = action
    const url = `https://624d5b55c172b69d6931a1c7.mockapi.io/cards/${payload.id}/description`
    const {data}: AxiosResponse<Array<any>> = yield call(axios.get,url);
    yield put(setDescription(data));
}

export function* descriptionsSaga(){
    yield takeLatest(actionGetDescriptions.type, getDescription)
}
