import axios, { AxiosError } from "axios";
import cfg from "../config/config";
import { AxResponse } from "./axiosTypes";

// Structure of the input data without the embeds
export interface InputData {
  building_id: number;
  geo_level_1_id: number;
  geo_level_2_id: number;
  geo_level_3_id: number;
  count_floors_pre_eq: number;
  age: number;
  area_percentage: number;
  height_percentage: number;
  land_surface_condition: string;
  foundation_type: string;
  roof_type: string;
  ground_floor_type: string;
  other_floor_type: string;
  position: string;
  plan_configuration: string;
  has_superstructure_adobe_mud: number;
  has_superstructure_mud_mortar_stone: number;
  has_superstructure_stone_flag: number;
  has_superstructure_cement_mortar_stone: number;
  has_superstructure_mud_mortar_brick: number;
  has_superstructure_cement_mortar_brick: number;
  has_superstructure_timber: number;
  has_superstructure_bamboo: number;
  has_superstructure_rc_non_engineered: number;
  has_superstructure_rc_engineered: number;
  has_superstructure_other: number;
  legal_ownership_status: string;
  count_families: number;
  has_secondary_use: number;
  has_secondary_use_agriculture: number;
  has_secondary_use_hotel: number;
  has_secondary_use_rental: number;
  has_secondary_use_institution: number;
  has_secondary_use_school: number;
  has_secondary_use_industry: number;
  has_secondary_use_health_post: number;
  has_secondary_use_gov_office: number;
  has_secondary_use_use_police: number;
  has_secondary_use_other: number;
}

export interface LabelRow {
  building_id: number;
  damage_grade: number;
}

export interface FetchDataResp {
  input_row?: InputData;
  label_row?: LabelRow | null;
  error?: string;
}

export const defaultData = {
  input_row: {
    building_id: 730015,
    geo_level_1_id: 3,
    geo_level_2_id: 1387,
    geo_level_3_id: 6175,
    count_floors_pre_eq: 4,
    age: 60,
    area_percentage: 3,
    height_percentage: 8,
    land_surface_condition: "t",
    foundation_type: "r",
    roof_type: "n",
    ground_floor_type: "f",
    other_floor_type: "q",
    position: "o",
    plan_configuration: "d",
    has_superstructure_adobe_mud: 1,
    has_superstructure_mud_mortar_stone: 0,
    has_superstructure_stone_flag: 0,
    has_superstructure_cement_mortar_stone: 0,
    has_superstructure_mud_mortar_brick: 1,
    has_superstructure_cement_mortar_brick: 0,
    has_superstructure_timber: 1,
    has_superstructure_bamboo: 1,
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
    building_id: 730015,
    damage_grade: 2,
  },
};

// gets the data from the specified dataset with a POST request.
const fetchData = async (isTrainData: boolean) => {
  try {
    const { data } = await axios.get<FetchDataResp>(
      `${cfg.API_URL}/api/data?getTrainData=${isTrainData}`
    );
    return data;
  } catch (err: AxiosError | any) {
    if (axios.isAxiosError(err)) {
      // Access to config, request, and response
      return {
        error: err.message,
      };
    } else {
      // Just a stock error
      return {
        error: "An internal error occurred. post for predictions failed.",
      };
    }
  }
};

export default fetchData;
