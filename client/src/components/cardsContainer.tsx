import React, { useEffect } from 'react';
import Card, { CardProps } from './card'
import './cardContainer.css';
import ILinkData from '../data';
import { useAppContext } from '../AppContext';

const CardContainer = () => {
    const [data, setData] = React.useState<ILinkData[]>()
    const {dataUpdated, resetDataUpdated} = useAppContext();

    useEffect(() => {
        fetch("/links")
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                console.log('successfully resquested data')
                console.log(data)
            })

        resetDataUpdated();
    }, [dataUpdated, resetDataUpdated])

    return (
        <div className="card-container">
            {data ? (
                data.map((d, index) => {
                    const props: CardProps = {
                        title: d.name,
                        link: d.link,
                        imageSource: d.imageSource
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
