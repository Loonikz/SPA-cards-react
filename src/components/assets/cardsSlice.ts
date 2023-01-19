import {createSlice} from '@reduxjs/toolkit';
import {Description} from '../DescriptionCards/Description'

export type Card = {
    id:string;
    title:string;
    createdAt:string;
    image:string;
    subtitle:string,
}

export interface CardsState{
    cards: Array<Card>,
    cardDescription: Array<Description>
}

export const initialState: CardsState = {
    cards:[],
    cardDescription:[]
}

export const cardsSlice = createSlice(
    {
        name:'cards',
        initialState,
        reducers:{
            setCards(state, {payload}){
                state.cards = payload;
                for (let i = 0; i < state.cards.length; i++) {
                    payload[i].subtitle = payload[i].subtitle.slice(0, 100).trimEnd() + '...'
                }
            },
            setDescription(state, {payload}){
                state.cardDescription = payload
            }
        }
    }
)

export const { setCards, setDescription } = cardsSlice.actions
