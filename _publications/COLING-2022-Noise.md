---
title: "Noise-injected Consistency Training and Entropy-constrained Pseudo Labeling for Semi-supervised Extractive Summarization<span style='display:inline-block; background:#5cb85c; color:#fff; font-size:0.7em; font-weight:bold; padding:2px 5px; border-radius:3px; margin-left:6px; vertical-align:middle;'>CCF-B</span>"
authors: "Yiming Wang, Qianren Mao†, Junnan Liu, Weifeng Jiang, Hongdong Zhu, Jianxin Li"
collection: publications
category: conference
permalink: /publication/COLING-2022-Noise
venue: "Proceedings of the 29th International Conference on Computational Linguistics (COLING)"
paperurl: "http://qianrenmao.github.io/files/2022-COLING-Noise.pdf"
excerpt: ""
date: 2022-08-01
---


<div style="text-align: justify;">
Labeling large amounts of extractive summarization data is often prohibitive expensive due to time, financial, and expertise constraints, which poses great challenges to incorporating summarization system in practical applications. This limitation can be overcome by semi-supervised approaches: consistency-training and pseudo-labeling to make full use of unlabeled data. Researches on the two, however, are conducted independently, and very few works try to connect them. In this paper, we first use the noise-injected consistency training paradigm to regularize model predictions. Subsequently, we propose a novel entropy-constrained pseudo labeling strategy to obtain high-confidence labels from unlabeled predictions, which can obtain high-confidence labels from unlabeled predictions by comparing the entropy of supervised and unsupervised predictions. By combining consistency training and pseudo-labeling, this framework enforce a low-density separation between classes, which decently improves the performance of supervised learning over an insufficient labeled extractive summarization dataset.
</div>
