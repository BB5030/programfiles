import React from "react";
import PropTypes from "prop-types";
import './Clothes.css'


function Cloth({title, lprice, image, link}){
    return(
        <div className="cloth">
            <div className="cloth_wrap">
                <img src={image} alt={title} title={title} width="275" height="345"/>
                <h3 className="cloth_title">{title}</h3>
                <p className="cloth_lprice">{lprice}</p>
                <a href={link} className="cloth_link">쇼핑 바로가기</a>
            </div>
        </div>
    );

    Cloth.propTypes={
title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    lprice: PropTypes.number.isRequired,
    }
    }

export default Cloth;
