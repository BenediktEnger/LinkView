import React, { useState } from 'react';
import './cardContainer.css';
import EditLogo from '../images/editLogo30x30.png';
import { useEditContext } from '../EditContext';
import TextModal from './textModal';
import ILinkData from '../data';
import { useUpdateContext } from '../UpdateContext';

export interface CardProps {
  title: string;
  imageSource: string;
  link: string;
}

const Card: React.FC<CardProps> = ({ title, imageSource, link }) => {
  const { editSelected, resetEditData } = useEditContext();
  const{updateData} = useUpdateContext(); 
  const[open, setOpen] = useState(false);

  const onClose = (() => {
    setOpen(false)
  });

  async function PutLinkData(oldName: string, data:ILinkData) {
    const response = await fetch(`/links/${oldName}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP-Error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log('Successful posted data:', result);
    resetEditData()
    updateData()
  };

  async function DeleteData(name: string) {
      const response = await fetch(`/links/${name}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }});

      if (!response.ok) {
        throw new Error(`HTTP-Error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Successful deleted data: ', result);
      updateData()
  }

  const onSave = ((data: string[]) => {
      const putData: ILinkData = {
        name: data[0],
        link: data[1],
        imageSource: data[2]
      }
      setOpen(false)
      PutLinkData(title, putData)
  })

  const openInNewTab = (url: string) => {
    console.log("opening " + url)
    window.open(url, '_blank', 'noreferrer');
  };

  return (<div className="card" >

    <div onClick={() => openInNewTab(link)} className="card-content">
      <img src={imageSource} />
      <h2>{title}</h2>
      <p>{link}</p>
    </div>

    {editSelected ?
      <div className='manipulator-container'>
        <div className='close-icon' onClick={() => DeleteData(title)}>
          <div className='circle'>
            <div className='line line1' />
            <div className='line line2' />
          </div>
        </div>
        <div className='edit-icon' onClick={()=>setOpen(true)}>
          <img src={EditLogo} />
        </div>
      </div>
      : null
      }

      <TextModal
       header={`Update Link data ${title}`}
       isOpen={open}
       fields={['New Name', 'Link', 'Thumbnail']}
       defaults={[title, link, imageSource]}
       onRequestClose={onClose}
       onSave={onSave}
      />
  </div>
  );
};

export default Card