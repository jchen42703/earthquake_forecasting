# Catboost Training Notes

## Using `cat_train_values.csv`

F1 Scores would cap around 0.55 (?, refers to initial tree and not final)

## Using `train_data_embeds.csv`

```
params = {
    "export_dir": "./train",
    "train_embeds_path": "train_data_embeds.csv",
    "train_labels_path": "train_labels.csv",
    "num_folds": 5,
    "seed": 1881,
    "num_epochs": 20000,
    "early_stopping_rounds": 3000,
    "cpu_only": False,
    "cat_model_params": {
        "max_bin": 63,
        "bootstrap_type": "Bernoulli"
    },
    "fit_params": {
        "verbose_eval": 1000
    }
}
pipeline = TrainPipeline(**params)
pipeline.train_kfold()
```

- F1 Scores would cap around 0.748

SIKE, this had data leakage because I forgot to drop `building_id` and `Unnamed: 0`.

- So the LB score was 0.09
