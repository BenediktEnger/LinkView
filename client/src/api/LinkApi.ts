 import ILinkData from "../data";
 
 async function PutLinkData(oldName: string, data: ILinkData) {
    const response = await fetch(`/links/${oldName}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP-Error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Successful posted data:", result);
  }

async function DeleteLinkData(name: string) {
    const response = await fetch(`/links/${name}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP-Error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Successful deleted data: ", result);
  }

  async function GetLinkData(): Promise<ILinkData[]> {
      const response = await fetch("/links", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
      });
           

    if (!response.ok) {
        throw new Error(`HTTP-Error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log('successfully resquested data')
    console.log(result)

    return result
  }

  async function PostLinkData(data: ILinkData) {
      const response = await fetch("/links", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP-Error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Successful posted data:", result);
  }


  export {PutLinkData, DeleteLinkData, GetLinkData, PostLinkData}