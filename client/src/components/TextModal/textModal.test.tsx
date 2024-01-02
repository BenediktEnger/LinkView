import {fireEvent, getByLabelText, getByText, render, screen} from '@testing-library/react'
import TextModal from './textModal'

test("Text Modal with 3 values", () => {
    const onClose = () => {

    }
    const onSave = () => {

    }

    render(<TextModal
            header=''
            isOpen= {true}
            fields={['Test1', 'Test2', 'Test3']}
            onRequestClose={onClose}
            onSave={onSave}
            defaults={['default1', 'default2', 'default3']}
            />)

    const test1 = screen.getByText(/Test1/i)
    const test2 = screen.getByText(/Test2/i)
    const test3 = screen.getByText(/Test3/i)
    const default1 = screen.getByDisplayValue(/default1/i)

    expect(test1).toBeInTheDocument();
    expect(test2).toBeInTheDocument();
    expect(test3).toBeInTheDocument();
    expect(default1).toBeInTheDocument();
})
test("click save button", () => {
    const onClose = () => {
    }

    const onSave = jest.fn()

    render(<TextModal
            header=''
            isOpen= {true}
            fields={['Test1', 'Test2', 'Test3']}
            onRequestClose={onClose}
            onSave={onSave}
            defaults={['default1', 'default2', 'default3']}
            />)

    fireEvent.change(screen.getByDisplayValue(/default1/i), { target: { value: 'Input 1' } });
    fireEvent.change(screen.getByDisplayValue(/default2/i), { target: { value: 'Input 2' } });
    fireEvent.change(screen.getByDisplayValue(/default3/i), { target: { value: 'Input 3' } });    
    const saveButton = screen.getByText('Speichern');

    fireEvent.click(saveButton);

    expect(onSave).toHaveBeenCalledWith(['Input 1', 'Input 2', 'Input 3']);
})

test("click abort button", () => {
    const onClose = jest.fn()

    const onSave = jest.fn()

    render(<TextModal
            header=''
            isOpen= {true}
            fields={['Test1', 'Test2', 'Test3']}
            onRequestClose={onClose}
            onSave={onSave}
            defaults={['default1', 'default2', 'default3']}
            />)

    const abortButton = screen.getByText('Abbrechen');

    fireEvent.click(abortButton);

    expect(onClose).toHaveBeenCalledTimes(1)
})

test("Check modal closed", () => {
    const onClose = jest.fn()
    const onSave = jest.fn()

    render(<TextModal
            header=''
            isOpen= {false}
            fields={['Test1', 'Test2', 'Test3']}
            onRequestClose={onClose}
            onSave={onSave}
            defaults={['default1', 'default2', 'default3']}
            />)

    const modal = screen.queryByLabelText('Eingabefelder Modal')
    expect(modal).not.toBeInTheDocument()
})

test("Check modal opened", () => {
    const onClose = jest.fn()
    const onSave = jest.fn()

    render(<TextModal
            header=''
            isOpen= {true}
            fields={['Test1', 'Test2', 'Test3']}
            onRequestClose={onClose}
            onSave={onSave}
            defaults={['default1', 'default2', 'default3']}
            />)
            
    const modal = screen.queryByLabelText('Eingabefelder Modal')
    expect(modal).toBeInTheDocument()
})