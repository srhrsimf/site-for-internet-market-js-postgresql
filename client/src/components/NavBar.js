import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {Nav, Navbar, Button, Container} from "react-bootstrap";
import {ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE} from "../utils/consts";
import {useNavigate} from "react-router-dom";
import {observer} from "mobx-react-lite";
import Basket from "./modals/Basket";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const logo="http://localhost:5000/static/logo.jpg"
    const navigate = useNavigate();

    const [basketVisible, setBasketVisible] = useState(false);

    //функция перехода на страницу авторзации
    const goLoginPage = () => { navigate(LOGIN_ROUTE); };
    //функция перехода на страницу админ панели
    const goAdminPage = () => { navigate(ADMIN_ROUTE); };

    //функция перехода на главную страницу
    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token');
    };

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <div
                    style={{ cursor: 'pointer' }}
                    onClick={() => navigate(SHOP_ROUTE)}
                >
                    <img
                        src={logo}
                        alt="Логотип"
                        style={{
                            width: '70px',
                            height: '70px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                        }}
                    />
                </div>
                <span
                    style={{ color: 'white', cursor: 'pointer', marginLeft: '10px' }}
                    onClick={() => navigate(SHOP_ROUTE)}
                >
                    ГеоMusic
                </span>

                <Nav className="ml-auto" style = {{color: 'white'}}>
                    {user.isAuth?
                        <Nav className="ml-auto" style = {{color: 'white'}}>
                            {user.user.role === "ADMIN" ?
                                <>
                                        <Button
                                            variant={"outline-light"}
                                            className={"m-2"}
                                            onClick={() => goAdminPage()}
                                        >Админ панель</Button>
                                        <Button
                                            variant={"outline-light"}
                                            className={"m-2"}
                                            onClick={() => setBasketVisible(!basketVisible)}
                                        >Корзина</Button>
                                        <Button
                                            variant={"outline-light"}
                                            onClick={()=> logOut()}
                                            className={"m-2"}
                                        >Выйти</Button>
                                </>
                                :
                                <>
                                        <Button
                                            variant={"outline-light"}
                                            className={"m-2"}
                                            onClick={() => setBasketVisible(!basketVisible)}
                                        >Корзина</Button>
                                        <Button
                                            variant={"outline-light"}
                                            onClick={()=> logOut()}
                                            className={"m-2"}
                                        >Выйти</Button>
                                </>
                                }
                        </Nav>
                        :
                        <Nav className="ml-auto" style = {{color: 'white'}}>
                            <Button
                                variant={"outline-light"}
                                onClick={()=> goLoginPage()}
                            >Авторизация</Button>
                        </Nav>
                    }
                </Nav>
                <Navbar.Text style={{ color: 'white', marginRight: '15px' }}>
                    {user.user.email}
                </Navbar.Text>
                <Basket show={basketVisible} onHide={()=> setBasketVisible(false)}/>
            </Container>
        </Navbar>
    );
});

export default NavBar;