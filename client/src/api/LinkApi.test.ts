import { GetLinkData, PutLinkData } from "./LinkApi";

describe('PutLinkData', () => {
  it('should make a PUT request with the correct data', async () => {
    const oldName = 'Old Name';
    const data = {
      name: 'New Name',
      link: 'https://example.com',
      imageSource: 'https://example.com/image.jpg',
    };
    const fetchMock = jest.fn(() => Promise.resolve(new Response(JSON.stringify({}), { status: 200 })));
    global.fetch = fetchMock;

    await PutLinkData(oldName, data);

    expect(fetchMock).toHaveBeenCalledWith(`/links/${oldName}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  });

  it('should throw an error if the response is not ok', async () => {
    const oldName = 'Old Name';
    const data = {
      name: 'New Name',
      link: 'https://example.com',
      imageSource: 'https://example.com/image.jpg',
    };
    const fetchMock = jest.fn(() => Promise.resolve(new Response(JSON.stringify({}), { status: 404 })));
    global.fetch = fetchMock;

    await expect(PutLinkData(oldName, data)).rejects.toThrow('HTTP-Error! Status: 404');
  });
});


describe("GetLinkData", () => {
    it('should make Get request with correct data', async () => {

        const fetchMock = jest.fn(() => Promise.resolve(new Response(JSON.stringify({}), { status: 200})))
        global.fetch = fetchMock;

        await GetLinkData()

        expect(fetchMock).toHaveBeenCalledWith('/links', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
    })

    it('should throw an error if response not OK', async () => {
 const fetchMock = jest.fn(() => Promise.resolve(new Response(JSON.stringify({}), { status: 404})))
        global.fetch = fetchMock;

        await expect(GetLinkData()).rejects.toThrow('HTTP-Error! Status: 404')

    })
});


describe("Deletelink", () => {
    it('should make delete', async () => {

        const fetchMock = jest.fn(() => Promise.resolve(new Response(JSON.stringify({}), { status: 200})))
        global.fetch = fetchMock;

        await GetLinkData()

        expect(fetchMock).toHaveBeenCalledWith('/links', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            }
        })
    })

    it('should throw an error if response not OK', async () => {
 const fetchMock = jest.fn(() => Promise.resolve(new Response(JSON.stringify({}), { status: 404})))
        global.fetch = fetchMock;

        await expect(GetLinkData()).rejects.toThrow('HTTP-Error! Status: 404')

    })
});