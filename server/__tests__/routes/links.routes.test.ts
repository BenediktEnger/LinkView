import request from "supertest";
import app from "../../src/app";
import { ILink } from "../../src/models/ILink";
import { dataAccessLayer } from "../../src/models/Mongoose/MongooseDataAccess";

jest.mock("../../src/models/Mongoose/MongooseDataAccess");

describe("Test GET Link path", () => {
  test("Should return all links", async () => {
    var mockLinks: ILink[] = [
      {
        name: "test",
        link: "http://test.com",
        imageSource: "http://testImage.com",
      },
    ];

    (dataAccessLayer.find as jest.Mock).mockResolvedValue(mockLinks);

    const res = await request(app).get("/links");

    expect(res.status).toBe(200);
    expect(res.body).toEqual(mockLinks);
  });

  test("Should return 404", async () => {
    (dataAccessLayer.find as jest.Mock).mockResolvedValue(null);

    const res = await request(app).get("/links");

    expect(res.status).toBe(404);
  });
});

describe("Test POST Link path", () => {
  test("Should posted link", async () => {
    var mockLinks: ILink = {
      name: "test",
      link: "http://test.com",
      imageSource: "http://testImage.com",
    };

    const res = await request(app).post("/links").send(mockLinks);

    expect(res.status).toBe(201);
    expect(dataAccessLayer.insertMany).toHaveBeenCalledWith(undefined, [
      mockLinks,
    ]);
  });

  test("Should return 400", async () => {
    const res = await request(app)
      .post("/links")
      .set("Content-Type", "application/json");

    expect(res.status).toBe(400);
  });

  test("Should return 500 after exception", async () => {
    var mockLinks: ILink = {
      name: "test",
      link: "http://test.com",
      imageSource: "http://testImage.com",
    };

    (dataAccessLayer.insertMany as jest.Mock).mockImplementation(() => {
      throw new Error("Mock Error");
    });

    const res = await request(app).post("/links").send(mockLinks);

    expect(res.status).toBe(500);
    expect(res.body.error).toEqual("Internal Server Error");
  });
});
