# Monkeypox Detection React Native Web App

## Model Results

### Dataset

[Monkeypox Skin Image Dataset](https://www.kaggle.com/datasets/dipuiucse/monkeypoxskinimagedataset)

### Metrics

| Metric    | Value  |
| --------- | ------ |
| F1 Score  | 0.9623 |
| Accuracy  | 0.9613 |
| Precision | 0.9628 |
| Recall    | 0.9628 |

### Confusion Matrix

![Confusion Matrix](/images/confusion-matrix.png)

### AUC ROC Scores

![AUC ROC Scores](/images/auc-roc-scores.png)

## React Native Web App

[![Netlify Status](https://api.netlify.com/api/v1/badges/241f756d-c01a-49b7-9835-9e7cfcc461f1/deploy-status)](https://app.netlify.com/sites/monkeypox-detection-app/deploys)

### [Live Demo](https://monkeypox-detection-app.netlify.app)

|  Iphone 12 Pro Max Capture   |  Iphone 14 Pro Max Emulator  |
| :--------------------------: | :--------------------------: |
| ![](/images/thumbnail-1.png) | ![](/images/thumbnail-2.png) |

### h5 model to json

```bash
!pip install tensorflowjs

!tensorflowjs_converter --input_format=keras --output_format=tfjs_layers_model /models/saved_model.h5 /models/tfjs
```

### Installation

```
  git clone https://github.com/felixlopz/monkeypox-detection-app.git
  cd mda
  yarn install
  yarn start
```
