import React, { useContext, useEffect, useState, useMemo } from 'react';
import {
    Button,
    Col,
    Image,
    ListGroup,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
    Row
} from "react-bootstrap";
import { Context } from "../../index";
import { fetchBasketItems, deleteBasketItem, updateBasketItemCount } from "../../http/basketAPI"; // Импортируем наши функции
import 'react-toastify/dist/ReactToastify.css'; // Стили для уведомлений
import { toast } from 'react-toastify'; // <-- Добавьте этот импорт


const Basket = ({show, onHide}) => {
    // Состояние для хранения названия бренда
    const {user} = useContext(Context)

    // Локальное состояние для хранения товаров в корзине
    const [basketItems, setBasketItems] = useState([]);

    // Получаем товары из корзины при открытии модального окна
    useEffect(() => {
        if (show) { // Запрос отправляется только когда модальное окно видимо
            fetchBasketItems(user.user.id)
                .then(data => {
                    setBasketItems(data);
                })
                .catch(e => alert(e.response.data.message))
        }
    }, [show, user.user.id]); // Зависимости: сработает при изменении show или user.id

    const handleUpdateCount = (itemId, newCount) => {
        // Если пользователь уменьшил количество до нуля, удаляем товар

        updateBasketItemCount(itemId, newCount).then(updatedItem => {
            setBasketItems(prevItems =>
                prevItems.map(item =>
                    item.id === itemId ? { ...item, count: updatedItem.count } : item
                )
            );
        }).catch(e =>{
            const message = e.response?.data?.message || 'Вы не можете выбрать 0 товаров';
            toast.error(message);
        });
    };

    const handleRemoveItem = (itemId) => {
        deleteBasketItem(itemId).then(() => {
            // Обновляем список товаров в корзине после удаления
            setBasketItems(prevItems => prevItems.filter(item => item.id !== itemId));
        }).catch(e => alert(e.response.data.message));
    };

    // Рассчитываем общую стоимость с помощью useMemo для оптимизации
    const totalCost = useMemo(() => {
        return basketItems.reduce((sum, item) => {
            // Убедимся, что все данные на месте, чтобы избежать ошибок
            if (item.instrument && item.instrument.price) {
                return sum + (item.instrument.price * item.count);
            }
            return sum;
        }, 0);
    }, [basketItems]); // Пересчет только при изменении корзины

    return (
        <Modal
            show={show}
            onHide={onHide}
            size = "lg"
            centered
            backdrop="static" // Модальное окно не закроется при клике вне его области
        >
            <ModalHeader closeButton>
                <ModalTitle id="contained-modal-title"
                >Корзина</ModalTitle>
            </ModalHeader>

            <ModalBody>
                {basketItems.length > 0 ? (
                    <ListGroup>
                        {basketItems.map(item => (
                            <ListGroup.Item key={item.id} className="mt-2">
                                <Row className="align-items-center">
                                    <Col md={2}>
                                        <Image width={80} height={80} src={process.env.REACT_APP_API_URL + item.instrument.img} />
                                    </Col>
                                    <Col md={3}>
                                        {item.instrument.name}
                                    </Col>
                                    <Col md={3} className="d-flex align-items-center justify-content-center">
                                        <Button variant="outline-secondary" size="sm" onClick={() => handleUpdateCount(item.id, item.count - 1)}>-</Button>
                                        <div className="mx-2">{item.count}</div>
                                        <Button variant="outline-secondary" size="sm" onClick={() => handleUpdateCount(item.id, item.count + 1)}>+</Button>
                                    </Col>
                                    <Col md={2} className="text-center">
                                        <b>{item.instrument.price * item.count} руб.</b>
                                    </Col>
                                    <Col md={2} className="text-end">
                                        <Button
                                            variant="outline-danger"
                                            size="sm"
                                            onClick={() => handleRemoveItem(item.id)}
                                        >
                                            Удалить
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                ) : (
                    <div className="text-center">Корзина пуста</div>
                )}
            </ModalBody>

            <ModalFooter>
                Общая стоимость: {totalCost} руб.
            </ModalFooter>
        </Modal>
    );

};

export default Basket;