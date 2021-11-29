import axios, { AxiosError } from "axios";
import cfg from "../config/config";
import { InputData } from "./data";
import { AxResponse } from "./axiosTypes";

export interface PredReqBody {
  model_type: string;
  data: InputData;
}

// Example response:
//   {
//     "confidences": [
//       [
//         0.30518331116950087,
//         0.36225705728816265,
//         0.3325596315423365
//       ]
//     ],
//     "prediction": [
//       2
//     ]
//   }
export interface PredRespBody {
  confidences?: number[][];
  prediction?: number[];
  error?: string;
}

const postPred = async (payload: PredReqBody) => {
  try {
    const { data } = await axios.post<PredReqBody, AxResponse<PredRespBody>>(
      `${cfg.API_URL}/api/predict`,
      payload
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

export default postPred;
