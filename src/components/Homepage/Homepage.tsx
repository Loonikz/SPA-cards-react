import React, {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from "../../store";
import { actionGetCards } from "../assets/actions/actionCards";
import { Card } from "../assets/cardsSlice";
import CardStructure from "./CardStructure";
import {Container, TextField} from "@mui/material";
import './Homepage.css'

export default function Homepage() {
    const cards = useSelector<typeof rootState, Array<Card>>((state) => state.cardsState.cards);
    const [searchText, setSearchText] = React.useState('')
    const [searchParam] = useState(['title', 'subtitle'])

    const dispatch = useDispatch()

    const filteredCards = (cards: any[]) => {
        return cards.filter((card) => {
            return searchParam.some((param) => {
                return (
                    card[param]
                        .toString()
                        .toLowerCase()
                        .indexOf(searchText.toLowerCase()) !== -1
                )
            })
        })
    }

    function showResults(searchText: string) {
        if(searchText !== '') {
            return (
                <div className={'Result-info'}>
                    Results: {filteredCards(cards).length}
                    <div className={'Result-line'}>

                    </div>
                </div>
            )
        }
    }

    React.useEffect(()=>{
        dispatch(actionGetCards())
    }, [dispatch]);

    return(
        <>
            <div className={'Form-info'}>
                <div className={'Filter-info'}>
                    Filter by keywords
                </div>
                <form className={'Search-form'}>
                    <TextField
                        sx={{
                            height: 35,
                            width: 600
                        }}
                        type={'text'}
                        placeholder={'Search...'}
                        className={'Search-input'}
                        value={searchText}
                        onChange={(event) => {
                            setSearchText(event.target.value)
                        }}
                    />
                </form>
            </div>
            <div>
                {showResults(searchText)}
            </div>
            <Container sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 400px)',
                gridGap: '24px',
                fontFamily: 'Montserrat',
            }}
                       className={"Cards-list"}
                       fixed>
                {filteredCards(cards).map(({id, title, createdAt, image, subtitle}) => (
                    <CardStructure
                        key={id}
                        id={id}
                        image={image}
                        title={title}
                        createdAt={createdAt}
                        subtitle={subtitle}
                        searchText={searchText}
                    />
                ))}
            </Container>
        </>
    )
}
