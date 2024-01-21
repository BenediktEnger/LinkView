import request from "supertest";
import app from '../../src/app'

jest.mock('./dataAccessLayer');

describe("Test Link path", () => {
    test("Should return link values on GET", async () => {
        const res  = await request(app).get("/links");
        expect(res.status).toBe(200);
    });
});