import React, { useState } from "react";
import "./card.css";
import EditLogo from "../../images/editLogo30x30.png";
import { useEditContext } from "../../EditContext";
import TextModal from "../TextModal/textModal";
import ILinkData from "../../data";
import { useUpdateContext } from "../../UpdateContext";
import { PutLinkData, DeleteLinkData } from "../../api/LinkApi";

export interface CardProps {
  title: string;
  imageSource: string;
  link: string;
}

const Card: React.FC<CardProps> = ({ title, imageSource, link }) => {
  const { editSelected, resetEditData } = useEditContext();
  const { updateData } = useUpdateContext();
  const [openModal, setOpenModal] = useState(false);

  const onClose = () => {
    setOpenModal(false);
  };

  const onSave = (data: string[]) => {
    const putData: ILinkData = {
      name: data[0],
      link: data[1],
      imageSource: data[2],
    };
    setOpenModal(false);
    PutLinkData(title, putData);
    resetEditData();
    updateData();
  };

  const openInNewTab = (url: string) => {
    console.log("opening " + url);
    window.open(url, "_blank", "noreferrer");
  };

  const onDelete = () => {
    updateData();
    DeleteLinkData(title);
  };

  return (
    <div className="card">
      <div
        onClick={() => openInNewTab(link)}
        className="card-content"
        data-testid="linkClick"
      >
        <img src={imageSource} alt="service" />
        <h2>{title}</h2>
        <p>{link}</p>
      </div>

      {editSelected ? (
        <div className="manipulator-container">
          <div
            className="close-icon"
            onClick={() => onDelete()}
            data-testid="delete"
          >
            <div className="circle">
              <div className="line line1" />
              <div className="line line2" />
            </div>
          </div>
          <div
            className="edit-icon"
            onClick={() => setOpenModal(true)}
            data-testid="editClick"
          >
            <img src={EditLogo} alt="edit Logo" />
          </div>
        </div>
      ) : null}

      <TextModal
        header={`Update Link data ${title}`}
        isOpen={openModal}
        fields={["New Name", "Link", "Thumbnail"]}
        defaults={[title, link, imageSource]}
        onRequestClose={onClose}
        onSave={onSave}
      />
    </div>
  );
};

export default Card;
