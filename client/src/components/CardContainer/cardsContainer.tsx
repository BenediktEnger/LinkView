import React, { useEffect } from 'react';
import Card, { CardProps } from '../Card/card'
import './cardContainer.css';
import ILinkData from '../../data';
import { useUpdateContext } from '../../UpdateContext';

const CardContainer = () => {
    const [data, setData] = React.useState<ILinkData[]>()
    const {dataUpdated, resetDataUpdated} = useUpdateContext();

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

                    return (<Card key={index} {...props}/>);
                })
            ) : (
                <p>No Data</p>
            )}
        </div>
    );
};

export default CardContainer;
