import React, {useContext, useEffect, useState} from 'react';
import {
    Button, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
    Form, FormControl,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle, Row
} from "react-bootstrap";
import {Context} from "../../index";
import {fetchCategories} from "../../http/instrumentAPI";
import {observer} from "mobx-react-lite";
import {createInstrument} from "../../http/instrumentAPI";

const CreateInstrument = observer(({show, onHide}) => {
    const {instrument} = useContext(Context);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [file, setFile] = useState('');
    const [info, setInfo] = useState('');

    // Загрузка данных при монтировании компонента
    useEffect(()=>{
        fetchCategories().then(data => instrument.setCategories(data))
    }, [])

    // Выбор файла изображения
    const selectFile = e => {
        setFile(e.target.files[0]);
    }

    // Создание нового инструмента
    const addInstrument = () => {
        const formData = new FormData();
        formData.append('name', name)
        formData.append('categoryId', instrument.selectedCategory.id.toString())
        formData.append('price', price)
        formData.append('img', file)
        formData.append('info', info)
        createInstrument(formData).then(data => onHide())

        // Отправка данных на сервер
        createInstrument(formData)
            .then(data => onHide())
            .catch(error => console.error('Error:', error))
    }

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
                >Добавить инструмент</ModalTitle>
            </ModalHeader>

            <ModalBody>
                <Form>
                    {/* Выбор категории */}
                    <Dropdown className="mt-2">
                        <DropdownToggle>{instrument.selectedCategory.name || "Выберите категорию"}</DropdownToggle>
                        <DropdownMenu>
                            {instrument.categories.map(category =>
                                <DropdownItem
                                    onClick={() => instrument.setSelectedCategory(category)}
                                    key={category.id}
                                >{category.name}</DropdownItem>
                            )}
                        </DropdownMenu>
                    </Dropdown>
                    {/* Название инструмента */}
                    <FormControl
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="mt-3"
                        placeholder="Введите название"
                    />
                    {/* Стоимость инструмента */}
                    <FormControl
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))}
                        className="mt-3"
                        placeholder="Введите стоимость"
                        type="number"
                    />
                    {/* Загрузка изображения */}
                    <div className="mt-3">Выберите изображение:</div>
                    <FormControl
                        className="mt-1"
                        type="file"
                        onChange={selectFile}
                    />
                    <FormControl
                        value={info}
                        onChange={e => setInfo(e.target.value)}
                        className="mt-3"
                        placeholder="Введите информацию о товаре"
                    />
                </Form>
            </ModalBody>

            <ModalFooter>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addInstrument}>Добавить инструмент</Button>
            </ModalFooter>
        </Modal>
    );
});

export default CreateInstrument;