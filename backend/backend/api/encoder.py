from tensorflow.keras.layers import Input, Dense
from tensorflow.keras import Model
from tensorflow.keras import backend as K

import pandas as pd
import numpy as np


class Encoder(object):
    """For managing the encoder model and replacing geo_level embeddings"""

    def __init__(self, weights_path: str):
        self.model = None
        if weights_path is not None:
            self.create_model(weights_path)

    def __autoencoder(
        self,
        geo1_classes: int = 31,
        geo2_classes: int = 1418,
        geo3_classes: int = 11861,
    ):
        """
        Args:
            geo1_classes: corresponds to the number of unique ids in the
                geo_level_1_id column.
            geo2_classes: ...
            geo3_classes: ...
        """
        inp = Input((geo3_classes,))
        i1 = Dense(16, name="intermediate")(inp)
        x2 = Dense(geo2_classes, activation="sigmoid")(i1)
        x1 = Dense(geo1_classes, activation="sigmoid")(i1)

        model = Model(inp, [x2, x1])
        model.compile(loss="binary_crossentropy", optimizer="adam")
        return model

    def create_model(self, weights_path: str):
        """Creates the encoder and loads weights if provided"""
        self.model = self.__autoencoder()
        if weights_path != None:
            self.model.load_weights(weights_path)
        return self.model

    def get_embedding_layer(self):
        get_int_layer_output = K.function(
            [self.model.layers[0].input], [self.model.layers[1].output]
        )
        return get_int_layer_output

    def replace_with_new_embeds(
        self, df: pd.DataFrame, batch_size: int
    ) -> pd.DataFrame:
        """Edits the dataframe in_place"""
        # Extract GEO-Embeds for all train data points.
        # Then assign with train_data
        geo3 = np.array(pd.get_dummies(df["geo_level_3_id"]))
        get_int_layer_output = self.get_embedding_layer()

        out = []
        for i in range(0, len(df), batch_size):
            layer_output = get_int_layer_output(geo3[i : i + batch_size])[0]
            out.append(layer_output)

        out = np.array(out)
        out = np.squeeze(out)

        new_df = pd.get_dummies(df.copy)
        new_df = new_df.drop(
            ["geo_level_1_id", "geo_level_2_id", "geo_level_3_id"], axis=1
        )
        params = {f"geo_feat{idx+1}": out[:, idx] for idx in range(16)}
        augmented_df = new_df.assign(**params)
        return augmented_df
