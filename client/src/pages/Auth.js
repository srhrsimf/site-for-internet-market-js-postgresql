import React, {useContext, useState} from 'react';
import {Button, Card, Container, Form, Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import { jwtDecode } from "jwt-decode";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    // Определение типа формы
    const isLogin = location.pathname === LOGIN_ROUTE;
    // Состояния для полей формы
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    //Универсальный обработчик отправки формы
    const click = async() => {
        try {
            if (isLogin) {
                const data = await login(email, password);
                localStorage.setItem('token', data.token);
                const decodedUser = jwtDecode(data.token);
                user.setUser(decodedUser);
                user.setIsAuth(true);
                navigate(SHOP_ROUTE);
            } else {
                await registration(email, password);
                navigate(LOGIN_ROUTE);
            }
        } catch (e) {
            let errorMessage = "Произошла неизвестная ошибка.";
            if (e.response) {
                // Ошибка пришла от сервера (4xx, 5xx)
                errorMessage = e.response.data.message || errorMessage;
            } else if (e.request) {
                // Запрос был сделан, но ответ не пришел (проблемы с сетью)
                errorMessage = "Сервер не отвечает. Проверьте подключение к сети.";
            } else {
                // Ошибка при настройке запроса
                errorMessage = e.message;
            }
            alert(errorMessage);
            console.error("ОШИБКА АУТЕНТИФИКАЦИИ:", e);
        }
    }

    return (
        <Container
            className="d-flex flex-column justify-content-center align-items-center"
            style={{height:window.innerHeight-200}}
        >
            <Card style={{width: "60%"}} className="p-5">
                <h2>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d=flex dlex-column">
                    {/* Поле ввода email */}
                    <Form.Control
                        className="mt-2"
                        placeholder = "Введите email..."
                        value = {email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    {/* Поле ввода пароля */}
                    <Form.Control
                        className="mt-2"
                        placeholder = "Введите пароль..."
                        value = {password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                    {/* Блок с ссылками и кнопкой */}
                    <Row className="d-flex justify-content-between align-items-center pl-3 pr-3 mt-3">
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}> Зарегистрируйтесь!</NavLink>
                            </div>
                            :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}> Войдите!</NavLink>
                            </div>
                        }
                        <Button
                            className="align-self-end"
                            variant="outline-success"

                            onClick={click}
                        >
                            {isLogin ? 'Войти' : 'Зарегестрироваться'}
                        </Button>
                    </Row>
                </Form>
            </Card>

        </Container>
    );
});

export default Auth;