import axios, { AxiosError } from "axios";
import cfg from "../config/config";
import { InputData } from "./data";

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
  confidences?: (number[] | null)[] | null;
  prediction?: number[] | null;
}

const postPred = async (data: InputData) => {
  try {
    return await axios.post<InputData, PredRespBody>(
      `${cfg.API_URL}/api/predict`,
      data
    );
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
