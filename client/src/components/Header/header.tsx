import React from "react";
import TextModal from "../TextModal/textModal";
import "./header.css";
import ILinkData from "../../data";
import { useUpdateContext } from "../../UpdateContext";
import { useEditContext } from "../../EditContext";
import { PostLinkData } from "../../api/LinkApi";
import { Sticky, StickyContainer } from "react-sticky";

const Header = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const { updateData } = useUpdateContext();
  const { editData, editSelected, resetEditData } = useEditContext();

  const onclose = () => {
    setOpen(false);
  };

  const onSave = (data: string[]) => {
    setOpen(false);
    const linkData: ILinkData = {
      name: data[0],
      link: data[1],
      imageSource: data[2],
    };
    PostLinkData(linkData).then(() => updateData());
  };

  return (
    <div className="header-container">
      <h1>LinkView</h1>
      <button onClick={() => setOpen(true)}>Add</button>
      {editSelected ? (
        <button className="abort" onClick={() => resetEditData()}>
          End Edit
        </button>
      ) : (
        <button onClick={() => editData()}>Edit</button>
      )}
      <TextModal
        header="Enter new Link data"
        isOpen={open}
        fields={["Name", "Link", "Thumbnail"]}
        onRequestClose={onclose}
        onSave={onSave}
      />
    </div>
  );
};

export default Header;
