import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {CATEGORY_ROUTE} from "../utils/consts";

const CategoryItem = ({category}) => {
    const navigate = useNavigate();
    return (
        <Col
            md={3}
            className="mt-3"
            // Обработчик клика по карточке перенаправляет на страницу детальной информации
            onClick={() => navigate(CATEGORY_ROUTE + '/' + category.id)
        }>
            <Card
                style={{width: 150, cursor: "pointer"}} border={"light"}
            >
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + category.img}/>
                {/* Название категории */}
                <div>{category.name}</div>
            </Card>
        </Col>
    );
};

export default CategoryItem;