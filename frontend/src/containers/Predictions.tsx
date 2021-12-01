import React, { useEffect, useState } from "react";
import { InputData } from "../services/data";
import postPred, { PredReqBody } from "../services/predict";
import { floatArr2String } from "../services/printing";
import Dropdown from "react-bootstrap/Dropdown";

interface PredProps {
  inputData: InputData;
}

type ModelType = "lightgbm" | "catboost";

const Predictions = (props: PredProps) => {
  const [pred, setPred] = useState(0);
  const [confidences, setConf] = useState([0, 0, 0]);
  const [modelType, setModelType] = useState<ModelType>("lightgbm");
  // Gets predictions whenever the props change
  useEffect(() => {
    const getPred = async () => {
      const payload: PredReqBody = {
        model_type: modelType,
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
  }, [modelType, props.inputData]);

  return (
    <React.Fragment>
      <Dropdown key={modelType}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Model Type: {modelType}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              setModelType("lightgbm");
            }}
          >
            lightgbm
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setModelType("catboost");
            }}
          >
            Catboost
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <p>Prediction: {pred}</p>
      <p>Confidences: {floatArr2String(confidences)}</p>
    </React.Fragment>
  );
};

export default Predictions;
