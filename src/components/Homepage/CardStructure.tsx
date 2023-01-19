import React, {useCallback} from 'react';
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@mui/material";
import {ArrowRightAlt, CalendarToday} from '@mui/icons-material';
import {useNavigate} from "react-router-dom";
import './CardStructure.css'

const Highlight = (props: any) => {

    const { searchText, str } = props

    if(!searchText) {
        return str
    }

    const regexp = new RegExp(searchText, 'ig' )
    const matchValue = str.match(regexp)

    if(matchValue) {
        return str.split(regexp).map((defaultText: any, index: number, array: string | any[]) => {
            if (index < array.length - 1) {
                const colorText = matchValue.shift()
                return <>{defaultText}<span className={'Highlight'}>{colorText}</span></>
            }
            return defaultText
        })
    }
    return str
}

const CardStructure = ({id, title, image, createdAt, subtitle, searchText}: any) => {

    const navigate = useNavigate()
    const moveToDescription = () => {
        navigate(`/${id}`)
    }

    const date = new Date (createdAt)

    const lighter = useCallback((str: any) => {
        return <Highlight searchText={searchText} str={str}/>
    }, [searchText])

    return (
        <Card sx={{ maxWidth: 400, maxHeight: 800, boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)'}} className={'Card-info'}
              onClick={() =>
            moveToDescription()
        }>
            <CardActionArea className={'Card-action'}>
                <CardMedia
                    component="img"
                    height="180"
                    image={image}
                    alt="images"
                    className={'Card-img'}
                />
                <CardContent className={'Card-content'}>
                    <Typography gutterBottom variant="inherit" component="div" className={'Card-date'}>
                        <CalendarToday sx={{ fontSize: 13.5, paddingRight: 1 }} className={'Card-DateIcon'}/>
                        {date.toDateString()}
                    </Typography>
                    <Typography sx={{ fontSize: 22 }} gutterBottom variant="h5" component="div" className={'Card-title'}>
                        {lighter(title)}
                    </Typography>
                    <Typography sx={{ fontSize: 17 }} variant="body2" color="text.secondary" className={'Card-subtitle'}>
                        {lighter(subtitle)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size='small' color="inherit" className={'Card-Btn'}
                            sx={{
                                left: 3,
                                textTransform: 'initial',
                                marginBottom: 1,
                                fontFamily: 'Montserrat',
                                fontWeight: 700
                            }}>
                            Read more<ArrowRightAlt/>
                    </Button>
                </CardActions>
            </CardActionArea>
        </Card>
    );
};

export default CardStructure;
