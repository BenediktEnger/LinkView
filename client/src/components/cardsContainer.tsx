import React, { useEffect } from 'react';
import Card, { CardProps } from './card'
import './cardContainer.css';

interface IReceiveLink {
    name: string;
    path: string;
}

const CardContainer = () => {
    const [data, setData] = React.useState<IReceiveLink[]>()

    useEffect(() => {
        fetch("/links")
            .then((res) => res.json())
            .then((data) => setData(data))
    })

    return (
        <div className="card-container">
            {data ? (
                data.map((d, index) => {
                    const props: CardProps = {
                        title: d.name,
                        link: d.path,
                        text: '',
                        imageSource: ''
                    };

                    return <Card key={index} {...props} />;
                })
            ) : (
                <p>No Data</p>
            )}
        </div>
    );
};

export default CardContainer;
