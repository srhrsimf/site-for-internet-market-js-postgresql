import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import InstrumentList from "../components/InstrumentList";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchInstruments} from "../http/instrumentAPI";
import {useParams} from "react-router-dom";

const Shop = observer(() => {
    const {instrument} = useContext(Context)

    const { id } = useParams();

    useEffect(()=>{
        // Загрузка всех необходимых данных при монтировании
        fetchInstruments(id,1, 10).then(data => instrument.setInstruments(data.rows))
    }, [])

    return (
        <Container >
            <Row className="mt-2 justify-content-center">
                {/* Основная колонка с инструментами */}
                <Col md={9} className="mt-3">
                    <InstrumentList/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;