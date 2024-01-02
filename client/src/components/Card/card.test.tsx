import { render, screen } from '@testing-library/react'
import Card from './card'
import { EditProvider } from '../../EditContext'
import { UpdateProvider } from '../../UpdateContext'

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
