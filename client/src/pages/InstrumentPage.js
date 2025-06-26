import React, {useContext, useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import {useParams} from 'react-router-dom';
import {fetchOneInstrument} from "../http/instrumentAPI";
import { toast } from 'react-toastify';
import {Context} from "../index";
import {addToBasket} from "../http/basketAPI";


// Компонент страницы с подробной информацией о музыкальном инструменте
const InstrumentPage = () => {
    // Состояние для хранения данных об инструменте
    const [instrument, setInstrument] = useState({info:[]});
    // Получаем параметр id из URL
    const {id} = useParams();
    const { user } = useContext(Context);

    useEffect(()=>{
        fetchOneInstrument(id).then(data => setInstrument(data))
    }, [])

    const addItemToBasket = () => {
        // Если пользователь не авторизован, отправляем его на страницу логина
        if (!user.isAuth) {
            toast.warn('Чтобы добавить товар, необходимо авторизоваться');
            return;
        }

        // Передаем ID пользователя и ID инструмента
        addToBasket(user.user.id, instrument.id)
            .then(response => {
                toast.success(`Товар "${instrument.name}" добавлен в корзину!`);
            })
            .catch(e => {
                const message = e.response?.data?.message || 'Не удалось добавить товар';
                toast.error(message);
            });
    };
        return (
        <Container className="mt-3">
            <Row>
                {/* Колонка с изображением инструмента */}
                <Col mad={4} className="d-flex flex-column align-items-center">
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + instrument.img}/>
                </Col>
                {/* Колонка с описанием инструмента */}
                <Col mad={4}>
                    <Row className="d-flex flex-column">
                        <h2>{instrument.name}</h2>
                    </Row>
                </Col>
                <Col mad={4} >
                    <Card>
                        <h3>{instrument.price} руб.</h3>
                        <Button
                            variant={"outline-dark"}
                                onClick={addItemToBasket}
                        >Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column align-items-center">
                <h3>Информация:</h3>{instrument.info}
            </Row>
        </Container>
    );
};

export default InstrumentPage;