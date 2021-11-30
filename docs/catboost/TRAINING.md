# Catboost Training Notes

## 1. Using `cat_train_values.csv`

F1 Scores would cap around 0.55 (?, refers to initial tree and not final)

## 2. Using `train_data_embeds.csv` and `train_data_embeds_no_leak.csv`

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

**SIKE, this had data leakage because I forgot to drop `building_id` and `Unnamed: 0`.**

- So the LB score was 0.09

Note: Errors typically dropped to ~0.423081195 but test errors capped around ~0.5709540858

Fixing that data leakage led to:

```
1st fold

14000:	learn: 0.4323802	test: 0.5630178	best: 0.5625021 (11106)	total: 4m 8s	remaining: 1m 46s
bestTest = 0.5625020985
bestIteration = 11106
Shrink model to first 11107 iterations.
CatBoost model is fitted: True
CatBoost model parameters:
 {'iterations': 20000, 'loss_function': 'MultiClass', 'random_seed': 1881, 'train_dir': './train', 'task_type': 'GPU', 'bootstrap_type': 'Bernoulli', 'max_bin': 63, 'early_stopping_rounds': 3000}
F1:  0.7514629420003454
```

Cleaned up the thresholding function (uses `.predict_proba` instead of `.predict`) for catboost and now the LB is **0.7486**.

**Next Steps:**

- Increase size of max bins
- Regularization
- Better Bootstrapping...?
- Decrease learning rate
