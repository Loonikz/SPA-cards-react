import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from '../../store';
import {actionGetDescriptions} from "../assets/actions/actionDescriptions";
import {useLocation} from "react-router";
import {Button, CardMedia, Paper} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {KeyboardDoubleArrowLeft} from '@mui/icons-material';
import './Description.css'

export interface Description {
    id:string;
    cardId:string;
    text:string;
    cardContent: {
        title: string;
        image: string;
    }
}

const Description = () => {
    const {pathname} = useLocation()
    const id = pathname.substring(pathname.lastIndexOf('/') + 1)

    const navigate = useNavigate()
    const moveToCards = () => {
        navigate(`/`)
    }

    const cardDescription = useSelector<typeof rootState, Array<Description>>((state) => state.cardsState.cardDescription);

    const dispatch = useDispatch();

    React.useEffect(()=>{
        dispatch(actionGetDescriptions({id}))
    }, [dispatch]);

    return(
        <>
            <div className={"Card-info"}>
                {cardDescription.map(({text,cardContent}) => (
                    <>
                        <div className={'Description-image'}>
                            <CardMedia sx={{
                                maxHeight: 300
                            }}
                                       component="img"
                                       height="300"
                                       image={cardContent.image}
                                       alt="images"/>
                        </div>
                        <Paper className={'Description-info'}>
                            <div className={'Description-title'}>
                                {cardContent.title}
                            </div>
                            <div className={'Description-text'}>
                                {text}
                            </div>
                        </Paper>
                        <div className={'Description-BtnReturn'}>
                            <Button size="small" color="inherit" onClick={moveToCards}
                                    sx={{
                                        textTransform: 'initial',
                                        fontFamily: 'Montserrat',
                                        fontWeight: 700
                                    }}>
                                <KeyboardDoubleArrowLeft/>Back to homepage
                            </Button>
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}

export default Description;
