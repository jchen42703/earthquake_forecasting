import axios from "axios";
import fetchData, { FetchDataResp } from "../data";
import cfg from "../../config/config";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("fetchData", () => {
  describe("when isTrainData is true and succeeds", () => {
    it("should return data in the form of FetchDataResp", async () => {
      // given
      const exampleResp: FetchDataResp = {
        input_row: {
          building_id: 821728,
          geo_level_1_id: 3,
          geo_level_2_id: 1387,
          geo_level_3_id: 10130,
          count_floors_pre_eq: 4,
          age: 150,
          area_percentage: 4,
          height_percentage: 7,
          land_surface_condition: "t",
          foundation_type: "r",
          roof_type: "n",
          ground_floor_type: "f",
          other_floor_type: "q",
          position: "o",
          plan_configuration: "d",
          has_superstructure_adobe_mud: 0,
          has_superstructure_mud_mortar_stone: 0,
          has_superstructure_stone_flag: 0,
          has_superstructure_cement_mortar_stone: 0,
          has_superstructure_mud_mortar_brick: 1,
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
        label_row: {
          building_id: 821728,
          damage_grade: 2,
        },
      };

      mockedAxios.post.mockResolvedValueOnce(exampleResp);

      // when
      const result = await fetchData(true);

      // then
      expect(mockedAxios.post).toHaveBeenCalled();
      expect(result).toEqual(exampleResp);
    });
  });

  describe("when isTrainData is false and succeeds", () => {
    it("should return data in the form of FetchDataResp", async () => {
      // given
      const exampleResp: FetchDataResp = {
        input_row: {
          building_id: 821728,
          geo_level_1_id: 3,
          geo_level_2_id: 1387,
          geo_level_3_id: 10130,
          count_floors_pre_eq: 4,
          age: 150,
          area_percentage: 4,
          height_percentage: 7,
          land_surface_condition: "t",
          foundation_type: "r",
          roof_type: "n",
          ground_floor_type: "f",
          other_floor_type: "q",
          position: "o",
          plan_configuration: "d",
          has_superstructure_adobe_mud: 0,
          has_superstructure_mud_mortar_stone: 0,
          has_superstructure_stone_flag: 0,
          has_superstructure_cement_mortar_stone: 0,
          has_superstructure_mud_mortar_brick: 1,
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
        label_row: null,
      };

      mockedAxios.post.mockResolvedValueOnce(exampleResp);

      // when
      const result = await fetchData(false);

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
