import React from 'react';
import './cardContainer.css';

export interface CardProps {
    title: string;
    text: string;
    imageSource: string;
    link: string;
}

const Card :React.FC<CardProps> = ({title, text, imageSource, link}) => {
  return (
    <div className="card">
      <img src={imageSource} alt={title} />
      <div className="card-content">
        <h2>{title}</h2>
        <p>{text}</p>
        <a href={link} target="_blank" rel="noopener noreferrer">
          Link ansehen
        </a>
      </div>
    </div>
  );
};

export default Card