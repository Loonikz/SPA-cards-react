import {all} from "redux-saga/effects"

import { cardsSaga } from '../components/assets/cardsSaga'
import { descriptionsSaga } from '../components/assets/descriptionsSaga'

export function* rootWatcher() {
    yield all([cardsSaga(), descriptionsSaga()])
}
