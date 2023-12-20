import React from 'react';
import './cardContainer.css';

export interface CardProps {
    title: string;
    imageSource: string;
    link: string;
}

const openInNewTab = (url: string) => {
  console.log("opening " + url)
  window.open(url, '_blank', 'noreferrer');
};

const Card :React.FC<CardProps> = ({title, imageSource, link}) => {
  return (
    <div className="card" onClick={() => openInNewTab(link)}>
      <img src={imageSource} />
      <div className="card-content">
        <h2>{title}</h2>
        <p>{link}</p>
      </div>
    </div>
  );
};

export default Card