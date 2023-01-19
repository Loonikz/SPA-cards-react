import {Action, createAction} from "@reduxjs/toolkit";

export interface ActionWithPayload<T> extends Action {
    payload: T;
}

export const actionGetDescriptions = createAction<any>('cards/description/getById')
