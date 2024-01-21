import request from "supertest";
import app from "../../src/app";
import { ILink } from "../../src/models/ILink";
import { IDataAccessLayer } from "../../src/models/IDataAccessLayer";
import { DataBaseModel } from "../../src/models/IDataAccessLayer";
import { dataAccessLayer } from "../../src/models/Mongoose/MongooseDataAccess";
import { model } from "mongoose";
import LinkSchema from "../../src/models/Mongoose/LinkSchema";
jest.mock("../../src/models/Mongoose/MongooseDataAccess");
const mockedDataAccessLayer = dataAccessLayer as jest.Mocked<IDataAccessLayer>;

describe("Test Link path", () => {
  test("Should return link values on GET", async () => {
    const mockLinks: [ILink] = [
      {
        name: "test",
        link: "http://test.com",
        imageSource: "http://testImage.com",
      },
    ];
    const mockModel = model("Users", LinkSchema);
    mockedDataAccessLayer.getModel.mockReturnValue(mockModel);
    mockedDataAccessLayer.find.mockReturnValue(mockLinks);

    const res = await request(app).get("/links");

    expect(res.status).toBe(200);
    expect(res.body).toBe(mockLinks);
  });
});
