import React, {useContext, useEffect} from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {fetchInstruments, fetchCategories} from "../http/instrumentAPI";
import CategoryList from "../components/CategoryList";

const Shop = observer(() => {
    const { category, instrument, app } = useContext(Context);

    useEffect(() => {
        // Загружаем категории и товары при первом рендере страницы магазина
        fetchCategories().then(data => category.setCategories(data));
        fetchInstruments(null, null, 1, 2).then(data => {
            instrument.setInstruments(data.rows);
        });
    }, []);

    return (
        <Container >
            <Row className="mt-2 justify-content-center">
                {/* Основная колонка с категориями */}
                <Col md={9} className="mt-3">
                    <CategoryList/>
                </Col>
            </Row>
        </Container>
    );
});

export default Shop;