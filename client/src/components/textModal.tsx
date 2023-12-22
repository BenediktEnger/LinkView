import React, { useEffect } from 'react';
import Modal from 'react-modal';
import './textModal.css';
import '../index.css'
interface IModal {
  header: string
  isOpen: boolean;
  fields: string[];
  onRequestClose: () => void;
  onSave: (data: string[]) => void;
}

const TextModal: React.FC<IModal> = ({ header, isOpen, fields, onRequestClose, onSave }) => {

  const [inputData, setInputData] = React.useState<string[]>(new Array(fields.length).fill(''));

  useEffect(() =>{
    if (isOpen) {
      setInputData((prevData) => {
      const newData = new Array(fields.length).fill('')
      return newData
      })
    }
  }, [isOpen])
  const handleSave = () => {
    onSave(inputData);
  };

  const onInputChange = (input: string, index: number) => {
    setInputData((prevData) => {
      const newData = [...prevData];
      newData[index] = input;
      return newData;
    })
  }

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Eingabefelder Modal"
        className='modal-container'
      >
        <div className='modal-content'>
          <h2>{header}</h2>
          {inputData.map((item, index) => {
            return (
              <div>
                <p>{fields[index]}</p>
                <input type="text" value={item} onChange={(e) => onInputChange(e.target.value, index)} />
              </div>
            )
          })}
          <div className='button-container'>
            <button onClick={handleSave}>Speichern</button>
            <button onClick={onRequestClose}>Abbrechen</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TextModal