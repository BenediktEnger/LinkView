import { fireEvent, render, screen } from "@testing-library/react";
import Card from "./card";
import { EditProvider } from "../../EditContext";
import { UpdateProvider } from "../../UpdateContext";
import { EditContext } from "../../EditContext";
import { UpdateContext } from "../../UpdateContext";
import { IModal } from "../TextModal/textModal";
import * as api from "../../api/LinkApi";

const mockTextModal = jest.fn();
jest.mock("../TextModal/textModal", () => (props: IModal) => {
  const onSaveData: string[] = ["OnSave1", "OnSave2", "OnSave3"];
  mockTextModal(props);
  return (
    <button
      data-testid="mockSaveButton"
      onClick={() => props.onSave(onSaveData)}
    />
  );
});

jest.mock("../../api/LinkApi", () => ({
  PutLinkData: jest.fn(),
  DeleteLinkData: jest.fn(),
}));

test("Edit not visible", () => {
  const title = "Test Title";
  const imageSource = "test-image.png";
  const link = "https://www.example.com";
  render(<Card title={title} imageSource={imageSource} link={link} />, {
    // Mock the useEditContext and useUpdateContext hooks
    wrapper: ({ children }) => (
      <EditContext.Provider
        value={{
          editSelected: false,
          editData: () => {},
          resetEditData: () => {},
        }}
      >
        <UpdateContext.Provider
          value={{
            updateData: () => {},
            dataUpdated: false,
            resetDataUpdated: () => {},
          }}
        >
          {children}
        </UpdateContext.Provider>
      </EditContext.Provider>
    ),
  });
  const editButton = screen.queryByTestId("editClick");
  expect(editButton).toBeNull();
});

test("Delete Card", () => {
  const title = "Test Title";
  const imageSource = "test-image.png";
  const link = "https://www.example.com";
  render(<Card title={title} imageSource={imageSource} link={link} />, {
    // Mock the useEditContext and useUpdateContext hooks
    wrapper: ({ children }) => (
      <EditContext.Provider
        value={{
          editSelected: true,
          editData: () => {},
          resetEditData: () => {},
        }}
      >
        <UpdateContext.Provider
          value={{
            updateData: () => {},
            dataUpdated: false,
            resetDataUpdated: () => {},
          }}
        >
          {children}
        </UpdateContext.Provider>
      </EditContext.Provider>
    ),
  });

  fireEvent.click(screen.getByTestId("delete"));

  expect(api.DeleteLinkData).toHaveBeenCalledWith(title);
});

test("Call OnSave Method to perform update", () => {
  const title = "Test Title";
  const imageSource = "test-image.png";
  const link = "https://www.example.com";
  render(<Card title={title} imageSource={imageSource} link={link} />, {
    // Mock the useEditContext and useUpdateContext hooks
    wrapper: ({ children }) => (
      <EditContext.Provider
        value={{
          editSelected: true,
          editData: () => {},
          resetEditData: () => {},
        }}
      >
        <UpdateContext.Provider
          value={{
            updateData: () => {},
            dataUpdated: false,
            resetDataUpdated: () => {},
          }}
        >
          {children}
        </UpdateContext.Provider>
      </EditContext.Provider>
    ),
  });

  fireEvent.click(screen.getByTestId("editClick"));
  fireEvent.click(screen.getByTestId("mockSaveButton"));

  expect(api.PutLinkData).toHaveBeenCalledWith(title, {
    name: "OnSave1",
    link: "OnSave2",
    imageSource: "OnSave3",
  });
});

test("Modal is getting opened", () => {
  const title = "Test Title";
  const imageSource = "test-image.png";
  const link = "https://www.example.com";

  render(<Card title={title} imageSource={imageSource} link={link} />, {
    // Mock the useEditContext and useUpdateContext hooks
    wrapper: ({ children }) => (
      <EditContext.Provider
        value={{
          editSelected: true,
          editData: () => {},
          resetEditData: () => {},
        }}
      >
        <UpdateContext.Provider
          value={{
            updateData: () => {},
            dataUpdated: false,
            resetDataUpdated: () => {},
          }}
        >
          {children}
        </UpdateContext.Provider>
      </EditContext.Provider>
    ),
  });

  fireEvent.click(screen.getByTestId("editClick"));
  expect(screen.getByTestId("mockSaveButton")).toBeInTheDocument();
});

test("Test Card components", () => {
  const linkContent = "LINK";
  const imageSourceContent = "IMAGE";
  render(
    <EditProvider>
      <UpdateProvider>
        <Card
          title="testTitle"
          link={linkContent}
          imageSource={imageSourceContent}
        />
      </UpdateProvider>
    </EditProvider>
  );

  const title = screen.getByText(/testTitle/i);
  const link = screen.getByText(`${linkContent}`);
  const logo = document.querySelector("img") as HTMLImageElement;

  expect(title).toBeInTheDocument();
  expect(link).toBeInTheDocument();
  expect(logo.src).toContain(imageSourceContent);
});

test("window.open called with right link", () => {
  const openSpy = jest.spyOn(window, "open").mockImplementation();

  const linkContent = "LINK";
  const imageSourceContent = "IMAGE";
  render(
    <EditProvider>
      <UpdateProvider>
        <Card
          title="testTitle"
          link={linkContent}
          imageSource={imageSourceContent}
        />
      </UpdateProvider>
    </EditProvider>
  );

  const cardContent = screen.getByTestId("linkClick");

  fireEvent.click(cardContent);

  expect(openSpy).toHaveBeenCalledWith(linkContent, "_blank", "noreferrer");
});
