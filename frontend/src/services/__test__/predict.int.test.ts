import postPred, { PredReqBody } from "../predict";

describe("postPred api", () => {
  describe("when post data with lightgbm", () => {
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

      // when
      const result = await postPred(exampleData);
      console.log(result);
      // then
      expect(result.confidences).toBeDefined();
      expect(result.confidences![0]).toHaveLength(3);
      expect(result.prediction!).toHaveLength(1);
    });
  });

  describe("when post data with catboost", () => {
    it("should return data with confidences and argmaxed prediction", async () => {
      // given
      const exampleData: PredReqBody = {
        model_type: "catboost",
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

      // when
      const result = await postPred(exampleData);
      console.log(result);
      // then
      expect(result.confidences).toBeDefined();
      expect(result.confidences![0]).toHaveLength(3);
      expect(result.prediction!).toHaveLength(1);
    });
  });

  describe("when post data with unsupported model_type", () => {
    it("should return error out", async () => {
      // given
      const exampleData: PredReqBody = {
        model_type: "cccaTBOOST",
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

      // when
      const result = await postPred(exampleData);
      console.log(result);
      // then
      expect(result.confidences).toBeUndefined();
      expect(result.prediction).toBeUndefined();
      expect(result.error!).toBe("Request failed with status code 400");
    });
  });
});
