import React, {useContext, useState} from 'react';
import {
    Button,
    Form, FormControl,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle
} from "react-bootstrap";
import {createCategory} from "../../http/instrumentAPI";


const CreateCategory = ({show, onHide}) => {
    // Состояние для хранения названия бренда
    const [name, setName] = useState('');
    const [file, setFile] = useState('');

    const addCategory = () => {
        const formData = new FormData();
        formData.append('name', name)
        formData.append('img', file)
        createCategory(formData)
            .then(data => onHide())
            .catch(error => console.error('Error:', error))
    }
    // Выбор файла изображения
    const selectFile = e => {
        setFile(e.target.files[0]);
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
                >Добавить категорию</ModalTitle>
            </ModalHeader>

            <ModalBody>
                <Form>
                    <Form.Control
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder = {"Введите название категории"}
                    />
                    {/* Загрузка изображения */}
                    <div className="mt-3">Выберите изображение:</div>
                    <FormControl
                        className="mt-1"
                        type="file"
                        onChange={selectFile}
                    />
                </Form>
            </ModalBody>

            <ModalFooter>
                <Button variant={"outline-danger"} onClick={onHide}>Закрыть</Button>
                <Button variant={"outline-success"} onClick={addCategory}>Добавить категорию</Button>
            </ModalFooter>
        </Modal>
    );
};

export default CreateCategory;