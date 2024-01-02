import { fireEvent, render, screen } from '@testing-library/react'
import Card from './card'
import { EditProvider } from '../../EditContext'
import { UpdateProvider } from '../../UpdateContext'
import { EditContext } from '../../EditContext'
import { UpdateContext } from '../../UpdateContext'

jest.mock('../TextModal/textModal', () => ({
    __esModule: true,
    default: jest.fn(({ onSave }) => (
        <button onClick={() => onSave(['New Title', 'https://www.newlink.com', 'new-image.png'])}>
            Save
        </button>
    )),
}));

test("callOnSave", () => {
    const putLinkData = jest.fn();
    const updateData = jest.fn();

    const title = 'Test Title';
    const imageSource = 'test-image.png';
    const link = 'https://www.example.com';

    render(<EditProvider>
        <UpdateProvider>
            <Card
                title={title}
                link={link}
                imageSource={imageSource} />
        </UpdateProvider>
    </EditProvider>)

    render(
        <Card
            title={title}
            imageSource={imageSource}
            link={link}
        />,
        {
            // Mock the useEditContext and useUpdateContext hooks
            wrapper: ({ children }) => (
                <EditContext.Provider value={{ editSelected: true, editData: () => { }, resetEditData: () => { } }}>
                    <UpdateContext.Provider value={{ updateData: () => { }, dataUpdated: false, resetDataUpdated: () => { } }}>
                        {children}
                    </UpdateContext.Provider>
                </EditContext.Provider>
            ),
        }
    );

    fireEvent.click(screen.getByTestId("editClick"))
    fireEvent.click(screen.getByText("Save"))

    expect(putLinkData).toHaveBeenCalledWith('Test Title', {
        name: 'New Title',
        link: 'https://www.newlink.com',
        imageSource: 'new-image.png',
    });
    expect(updateData).toHaveBeenCalled();
})

test("Test Card components", () => {

    const linkContent = 'LINK'
    const imageSourceContent = 'IMAGE'
    render(<EditProvider>
        <UpdateProvider>
            <Card
                title='testTitle'
                link={linkContent}
                imageSource={imageSourceContent} />
        </UpdateProvider>
    </EditProvider>)


    const title = screen.getByText(/testTitle/i)
    const link = screen.getByText(`${linkContent}`)
    const logo = document.querySelector('img') as HTMLImageElement

    expect(title).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(logo.src).toContain(imageSourceContent)
})

test("window.open called with right link", () => {

    const openSpy = jest.spyOn(window, 'open').mockImplementation()

    const linkContent = 'LINK'
    const imageSourceContent = 'IMAGE'
    render(<EditProvider>
        <UpdateProvider>
            <Card
                title='testTitle'
                link={linkContent}
                imageSource={imageSourceContent} />
        </UpdateProvider>
    </EditProvider>)

    const cardContent = screen.getByTestId('linkClick')

    fireEvent.click(cardContent)

    expect(openSpy).toHaveBeenCalledWith(linkContent, '_blank', 'noreferrer')
})
