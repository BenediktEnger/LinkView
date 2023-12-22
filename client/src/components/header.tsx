import React from 'react';
import TextModal from './textModal';
import './header.css';
import ILinkData from '../data';

const Header  = () => {
  const[open, setOpen] = React.useState<boolean>(false)

  const onclose = () => {
    setOpen(false)
  }

  async function postLinkData(data: ILinkData) {
    try {
      const response = await fetch('/links', {
        method: 'POST',
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
    } catch (error) {
      console.error('Error sending POST request');
    }
  }

  const onSave = (data: string[]) => {
    setOpen(false)
    const linkData: ILinkData = {
      name: data[0],
      link: data[1],
      imageSource: data[2]
    }
    postLinkData(linkData)
  }
  
  return (
    <div className='header-container'>
      <h1>LinkView</h1>
      <button onClick={() => setOpen(true)}>Add</button>
      <TextModal
       header='Enter new Link data'
       isOpen={open}
       fields={['Name', 'Link', 'Thumbnail']}
       onRequestClose={onclose}
       onSave={onSave}
      />
    </div>
  );
};

export default Header