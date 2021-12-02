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

```
19999:	learn: 0.5616814	test: 0.5857752	best: 0.5857752 (19999)	total: 39m 23s	remaining: 0us
bestTest = 0.5857751674
bestIteration = 19999
CatBoost model is fitted: True
CatBoost model parameters:
 {'iterations': 20000, 'learning_rate': 0.005, 'loss_function': 'MultiClass', 'random_seed': 1881, 'train_dir': './train', 'task_type': 'GPU', 'max_bin': 8192, 'early_stopping_rounds': 3000}
F1:  0.7438844227854415
```

- Didn't overfit as hard, but training was EXTREMELY slow

```
Learning rate set to 0.048698
0:	learn: 1.0678344	test: 1.0677359	best: 1.0677359 (0)	total: 80.6ms	remaining: 26m 51s
1000:	learn: 0.4827748	test: 0.5694386	best: 0.5694386 (1000)	total: 1m 9s	remaining: 21m 53s
2000:	learn: 0.4168284	test: 0.5652114	best: 0.5650103 (1798)	total: 2m 18s	remaining: 20m 43s
3000:	learn: 0.3688343	test: 0.5687570	best: 0.5650103 (1798)	total: 3m 28s	remaining: 19m 42s
4000:	learn: 0.3321395	test: 0.5749655	best: 0.5650103 (1798)	total: 4m 39s	remaining: 18m 38s
bestTest = 0.565010347
bestIteration = 1798
Shrink model to first 1799 iterations.
CatBoost model is fitted: True
CatBoost model parameters:
 {'iterations': 20000, 'loss_function': 'MultiClass', 'random_seed': 1881, 'train_dir': './train', 'task_type': 'GPU', 'max_depth': 10, 'max_bin': 128, 'early_stopping_rounds': 3000}
F1:  0.7492373515473609
```

- Training was mad quick
- Overfits even quicker tho....
- LB: **0.7483**

**Same as before but with lr = 0.01.**

```
10000:	learn: 0.4136379	test: 0.5619784	best: 0.5618806 (9047)	total: 11m 32s	remaining: 11m 32s
11000:	learn: 0.4029416	test: 0.5623171	best: 0.5618806 (9047)	total: 12m 42s	remaining: 10m 23s
12000:	learn: 0.3928319	test: 0.5629097	best: 0.5618806 (9047)	total: 13m 52s	remaining: 9m 15s
bestTest = 0.5618805986
bestIteration = 9047
Shrink model to first 9048 iterations.
CatBoost model is fitted: True
CatBoost model parameters:
 {'iterations': 20000, 'learning_rate': 0.01, 'loss_function': 'MultiClass', 'random_seed': 1881, 'train_dir': './train', 'task_type': 'GPU', 'max_depth': 10, 'max_bin': 128, 'early_stopping_rounds': 3000}
F1:  0.7505947812739832
Saved model: ./train/catboost_fold5.cbm

nan_mode, Min
gpu_ram_part, 0.95
eval_metric, MultiClass
iterations, 20000
leaf_estimation_method, Newton
observations_to_bootstrap, TestOnly
od_pval, 0
grow_policy, SymmetricTree
boosting_type, Plain
feature_border_type, GreedyLogSum
bayesian_matrix_reg, 0.1000000015
devices, -1
pinned_memory_bytes, 104857600
force_unit_auto_pair_weights, False
l2_leaf_reg, 3
random_strength, 1
od_type, Iter
rsm, 1
boost_from_average, False
gpu_cat_features_storage, GpuRam
fold_size_loss_normalization, False
model_size_reg, 0.5
pool_metainfo_options, {'tags': {}}
use_best_model, True
meta_l2_frequency, 0
od_wait, 3000
class_names, [1, 2, 3]
random_seed, 1881
depth, 10
border_count, 128
min_fold_size, 100
data_partition, DocParallel
bagging_temperature, 1
classes_count, 0
auto_class_weights, None
leaf_estimation_backtracking, AnyImprovement
best_model_min_trees, 1
min_data_in_leaf, 1
add_ridge_penalty_to_loss_function, False
loss_function, MultiClass
learning_rate, 0.009999999776
meta_l2_exponent, 1
score_function, Cosine
task_type, GPU
leaf_estimation_iterations, 1
bootstrap_type, Bayesian
max_leaves, 1024
```

- Models were freaking huge (200+mb)
- **LB: 0.7485**

**Next Steps:**

- Clearly, hyperparameter tuning isn't cutting it
- Look into more regularization options?
  - I.e. bootstrap sampling a portion of the dataset
  - feature extraction?
- Reduce the number of bins (idk why I increased it -- just made everything overfit faster lol)
- Stop using Pool for training since everything numerical anyways?
  - Will supposedly speed up training
