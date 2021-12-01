import React, { useEffect, useState } from "react";
import { InputData } from "../services/data";
import postPred, { PredReqBody } from "../services/predict";
import { floatArr2String } from "../services/printing";

interface PredProps {
  modelType: string;
  inputData: InputData;
}

const Predictions = (props: PredProps) => {
  const [pred, setPred] = useState(0);
  const [confidences, setConf] = useState([0, 0, 0]);

  // Gets predictions whenever the props change
  useEffect(() => {
    const getPred = async () => {
      const payload: PredReqBody = {
        model_type: props.modelType,
        data: props.inputData,
      };

      const preds = await postPred(payload);
      if (preds.error !== undefined) {
        console.log("error: cannot get prediction: ", preds.error);
      } else {
        setPred(preds.prediction![0]);
        setConf(preds.confidences![0]);
      }
    };

    console.log("get prediction");
    getPred();
  }, [props.modelType, props.inputData]);

  return (
    <React.Fragment>
      <p>Prediction: {pred}</p>
      <p>Confidences: {floatArr2String(confidences)}</p>
    </React.Fragment>
  );
};

export default Predictions;
