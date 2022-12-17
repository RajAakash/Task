import { handleFavorite } from "../pages";



describe("Given handleFavorite handler", () => {
    it("When passing id that is already in favorites, it should return array without that id", () => {
      const result = handleFavorite([1, 2,3], 3);
      expect(result).toEqual([1,2]);
    });

    it("When passing id that is not in favorites, it should return array with that id", () => {
        const result = handleFavorite([1, 2], 3);
        expect(result).toEqual([1,2,3]);
      });
  });