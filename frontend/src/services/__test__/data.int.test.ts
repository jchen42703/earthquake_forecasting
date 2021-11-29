import fetchData from "../data";

describe("fetchData api", () => {
  describe("when ask for train data", () => {
    it("should return data with input row and non-null label row", async () => {
      // when
      const result = await fetchData(true);
      console.log(result);
      // then
      expect(result.input_row!).toBeDefined();
      expect(result.label_row!).toBeDefined();
    });
  });

  describe("when ask for test data", () => {
    it("should return data with input row and a null label row", async () => {
      // when
      const result = await fetchData(false);
      console.log(result);
      // then
      expect(result.input_row!).toBeDefined();
      expect(result.label_row!).toBeNull();
    });
  });
});
