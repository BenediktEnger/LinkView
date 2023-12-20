import React from 'react';
import './cardContainer.css';

export interface CardProps {
    title: string;
    text: string;
    imageSource: string;
    link: string;
}

const openInNewTab = (url: string) => {
  console.log("opening " + url)
  window.open(url, '_blank', 'noreferrer');
};

const Card :React.FC<CardProps> = ({title, text, imageSource, link}) => {
  return (
    <div className="card" onClick={() => openInNewTab(link)}>
      <img src={imageSource} alt={title} />
      <div className="card-content">
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Card