import lightgbm as lgb
import numpy as np


class ModelWrapper(object):
    """Wrapper for LightGBM/Catboost models for prediction."""

    def __init__(self, model_type: str, model_path: str = None) -> None:
        # supported_models = ["lightgbm", "catboost"]
        # add this back when catboost is supported
        supported_models = [
            "lightgbm",
        ]
        assert (
            model_type.lower() in supported_models
        ), f"{model_type} is not one of: {supported_models}"

        if model_path is not None:
            self.load_model(model_path)

    def load_model(self, path: str):
        if self.model_type == "lightgbm":
            self.model = lgb.Booster(model_file=path)
        else:
            raise NotImplementedError
        return self.model

    def num_features(self):
        """Number of input features that the model expects"""
        if self.model_type == "lightgbm":
            return self.model.num_feature()
        else:
            raise NotImplementedError

    def predict(self, x: np.ndarray) -> np.ndarray:
        """Predicts for an array, x

        Args:
            x: Should be an array of shape (batch_size, 81) for the models
                using the data with embeds

        Returns:
            An array with the damage grade predictions
                Ex:
                    array([3, 2])
        """
        y_pred = self.model.predict(x, num_threads=1)

        return y_pred.argmax(axis=1) + 1
