import React, {useContext, useEffect} from 'react';
import {Card, Col, Image} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {INSTRUMENT_ROUTE} from "../utils/consts";
import {Context} from "../index";


const InstrumentItem = ({instrument}) => {
    const navigate = useNavigate();
    const {instrument: instrumentStore} = useContext(Context);

    return (
        <Col
            md={3}
            className="mt-3"
            // Обработчик клика по карточке перенаправляет на страницу детальной информации
            onClick={() => navigate(INSTRUMENT_ROUTE + '/' + instrument.id)
        }>
            <Card
                style={{width: 150, cursor: "pointer"}} border={"light"}
            >
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + instrument.img}/>
                {/* Название инструмента */}
                <div>{instrument.name}</div>
                <h2></h2>
                <div>Цена: {instrument.price} руб.</div>
            </Card>
        </Col>
    );
};

export default InstrumentItem;