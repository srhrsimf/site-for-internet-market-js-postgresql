import React, {useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateInstrument from "../components/modals/CreateInstrument"
import CreateCategory from "../components/modals/CreateCategory";

const Admin = () => {
    const [categoryVisible, setCategoryVisible] = useState(false);
    const [instrumentVisible, setInstrumentVisible] = useState(false);
    return (
        <Container className="d-flex flex-column">
            {/* Кнопки для открытия модальных окон */}
           <Button
               variant={"outline-dark"}
               className={"mt-4"}
               onClick={() => setCategoryVisible(!categoryVisible)}
           >Добавить категорию</Button>
           <Button
               variant={"outline-dark"}
               className={"mt-4"}
               onClick={() => setInstrumentVisible(!instrumentVisible)}
           >Добавить инструмент</Button>
            {/* Модальные окна для создания сущностей. Они хранятся в компонентах*/}
            <CreateInstrument show={instrumentVisible} onHide={()=> setInstrumentVisible(false)}/>
            <CreateCategory show={categoryVisible} onHide={()=> setCategoryVisible(false)}/>
        </Container>
    );
};

export default Admin;