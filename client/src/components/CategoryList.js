import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import CategoryItem from "./CategoryItem";

const CategoryList = observer(() => {
    // Получаем доступ к хранилищу категорий
    const { category } = useContext(Context);

    return (
        <Row className="d-flex">
            {category.categories?.map(cat => ( // Переименовал переменную в 'cat', чтобы избежать путаницы
                // В проп 'category' передаем ТЕКУЩИЙ ЭЛЕМЕНТ ИТЕРАЦИИ - 'cat'
                <CategoryItem key={cat.id} category={cat} />
            ))}
        </Row>
    );
});

export default CategoryList;