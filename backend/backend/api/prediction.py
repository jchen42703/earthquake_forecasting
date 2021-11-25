import numpy as np
import os
import numpy as np
import pandas as pd
import lightgbm as lgb

from .model import ModelWrapper
from .encoder import Encoder


class PredictionPipeline(object):
    """Controls the prediction process from creating embeds to generating the
    damage grades.

    Workflow:
        1. Preprocess df for Encoder
        2. Run Encoder and replace the df with new embeds
        3. Preprocess df with embeds
        4. Feed df converted to npy array to model
        5. post process predictions
    """

    def __init__(
        self, encoder_path: str, model_type: str, model_path: str = None
    ) -> None:
        self.model: ModelWrapper = ModelWrapper(model_type, model_path)
        self.encoder: Encoder = Encoder(encoder_path)

    def predict(self, df: pd.DataFrame) -> np.ndarray:
        """Runs the full prediction pipeline with a batch size of 1"""
        new_df: pd.DataFrame = self.encoder.replace_with_new_embeds(df, batch_size=1)
        data: np.ndarray = preprocess_embeds_df(new_df)
        if data.shape[1] != self.model.num_features():
            raise ValueError(
                f"data not correct shape. Is {data.shape}, but should be "
                + f"{(data.shape[0], self.model.num_features())}"
            )

        y_pred = self.model.predict(data)
        return y_pred


def preprocess_embeds_df(df: pd.DataFrame) -> np.ndarray:
    """Assumes that df already contains the embeds. Processes the df and
    converts it to a numpy array to be used in self.predict.
    """
    if "building_id" in df.columns:
        df = df.drop(["building_id"], axis=1)

    if "Unnamed: 0" in df.columns:
        df = df.drop(["Unnamed: 0"], axis=1)

    return np.array(df)
