from fastapi import APIRouter
from pydantic import BaseModel
from starlette.responses import JSONResponse
import pandas as pd
from backend.utils.load_yml import load_config

router = APIRouter()


class RandomData(BaseModel):
    isTrainData: bool


def initialize(config_path: str, isTrainData: bool) -> pd.DataFrame:
    """Initializes the data"""
    if isTrainData:
        df_path = load_config(config_path)["train_path"]
        label_path = load_config(config_path)["label_path"]
        df = pd.read_csv(df_path)
        label_df = pd.read_csv(label_path)
    else:
        df_path = load_config(config_path)["test_path"]
        df = pd.read_csv(df_path)
        label_df = None
    return df, label_df


@router.post("/data")
async def predict(payload: RandomData) -> JSONResponse:
    df, label_df = initialize("./config.yml", payload.isTrainData)
    row = df.sample(1).iloc[0].to_dict()
    label_row = (
        label_df.loc[label_df["building_id"] == row["building_id"]].iloc[0].to_dict()
    )
    return {"input_row": row, "label_row": label_row}
