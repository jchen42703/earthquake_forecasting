import axios from "axios";
import postPred, { PredReqBody, PredRespBody } from "../predict";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("postPred", () => {
  describe("when post data to mock", () => {
    it("should return data with confidences and argmaxed prediction", async () => {
      // given
      const exampleData: PredReqBody = {
        model_type: "lightgbm",
        data: {
          building_id: 802906,
          geo_level_1_id: 6,
          geo_level_2_id: 487,
          geo_level_3_id: 12198,
          count_floors_pre_eq: 2,
          age: 30,
          area_percentage: 6,
          height_percentage: 5,
          land_surface_condition: "t",
          foundation_type: "r",
          roof_type: "n",
          ground_floor_type: "f",
          other_floor_type: "q",
          position: "t",
          plan_configuration: "d",
          has_superstructure_adobe_mud: 1,
          has_superstructure_mud_mortar_stone: 1,
          has_superstructure_stone_flag: 0,
          has_superstructure_cement_mortar_stone: 0,
          has_superstructure_mud_mortar_brick: 0,
          has_superstructure_cement_mortar_brick: 0,
          has_superstructure_timber: 0,
          has_superstructure_bamboo: 0,
          has_superstructure_rc_non_engineered: 0,
          has_superstructure_rc_engineered: 0,
          has_superstructure_other: 0,
          legal_ownership_status: "v",
          count_families: 1,
          has_secondary_use: 0,
          has_secondary_use_agriculture: 0,
          has_secondary_use_hotel: 0,
          has_secondary_use_rental: 0,
          has_secondary_use_institution: 0,
          has_secondary_use_school: 0,
          has_secondary_use_industry: 0,
          has_secondary_use_health_post: 0,
          has_secondary_use_gov_office: 0,
          has_secondary_use_use_police: 0,
          has_secondary_use_other: 0,
        },
      };

      const exampleResp: PredRespBody = {
        confidences: [
          [0.30518331116950087, 0.36225705728816265, 0.3325596315423365],
        ],
        prediction: [2],
      };

      mockedAxios.post.mockResolvedValueOnce(exampleResp);

      // when
      const result = await postPred(exampleData);

      // then
      expect(mockedAxios.post).toHaveBeenCalled();
      expect(result).toEqual(exampleResp);
    });
  });

  //   describe("when API call fails", () => {
  //     it("should return empty users list", async () => {
  //       // given
  //       const message = "Network Error";
  //       axios.get.mockRejectedValueOnce(new Error(message));

  //       // when
  //       const result = await fetchUsers();

  //       // then
  //       expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/users`);
  //       expect(result).toEqual([]);
  //     });
  //   });
});
