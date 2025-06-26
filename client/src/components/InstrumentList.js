import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import InstrumentItem from "./InstrumentItem";

const InstrumentList = observer(() => {
    // Получаем доступ к хранилищу инструментов через контекст
    const {instrument} = useContext(Context)
    return (
        // Используем компонент Row из react-bootstrap для создания сетки
        <Row className="d-flex">
            {instrument.instruments.map(instrument =>
                // key - уникальный идентификатор (обязательный для списков в React)
                // instrument - объект с данными инструмента
                <InstrumentItem key={instrument.id} instrument={instrument} />
            )}
        </Row>
    );
});

export default InstrumentList;