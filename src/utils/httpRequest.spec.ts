describe("fetchFallback()", () => {
  beforeEach(() => {
    jest.resetModules();
    delete process.env.NOT_NODE;
  });

  describe("fetchFallback() with invalid node", () => {
    let notNodeHttpRequest: any;

    beforeEach(async () => {
      process.env.NOT_NODE = "true";
      notNodeHttpRequest = (await import("./httpRequest")).httpRequest;
    });

    it("should throw error when not isn't detected", async () => {
      expect.assertions(1);
      try {
        await notNodeHttpRequest("");
      } catch (e) {
        expect(e.message).toBe("No NodeJs nor fetch support was found.");
      }
    });
  });

  describe("valid import", () => {
    let httpRequest: any;

    beforeEach(() => {
      httpRequest = require("./httpRequest").httpRequest;
    });

    it("should get rejection", async () => {
      expect.assertions(1);
      try {
        await httpRequest("https://localhost:13000");
      } catch (e) {
        expect(e.message).toBe("connect ECONNREFUSED 127.0.0.1:13000");
      }
    });
  });

  describe("fetch package loading", () => {
    let httpRequest: any;

    beforeEach(() => {
      (global as any).fetch = () => "test";
      httpRequest = require("./httpRequest").httpRequest;
    });

    it("should load fetch when available", () => {
      expect(httpRequest()).toBe("test");
    });
  });
});
