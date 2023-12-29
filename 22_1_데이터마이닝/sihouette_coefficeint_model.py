import numpy as np
import mglearn
import matplotlib.pyplot as plt

from sklearn.datasets import make_moons
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans, AgglomerativeClustering, DBSCAN
from sklearn.metrics.cluster import adjusted_rand_score
from sklearn.metrics.cluster import silhouette_score

x, y = make_moons(n_samples=300, noise=0.05, random_state=0)

scaler = StandardScaler().fit(x)
x_scaled = scaler.transform(x)

kmeans = KMeans(n_clusters=2)
kmeans_pred = kmeans.fit_predict(x_scaled)
kmeans_silscore = silhouette_score(x_scaled,kmeans_pred)
print('KMEANS Silhouette Score : ',round(kmeans_silscore, 3))
plt.scatter(x[:,0], x[:,1], c=kmeans_pred, s=60, edgecolors='black', cmap=mglearn.cm2)
plt.show()

agg = AgglomerativeClustering(n_clusters=2)
agg_pred = agg.fit_predict(x_scaled)
agg_silscore = silhouette_score(x_scaled,agg_pred)
print('Agglomerative Clustering Silhouette Score : ',round(agg_silscore, 3))
plt.scatter(x[:,0], x[:,1], c=agg_pred, s=60, edgecolors='black', cmap=mglearn.cm2)
plt.show()

dbscan = DBSCAN()
dbscan_pred = dbscan.fit_predict(x_scaled)
dbscan_silscore = silhouette_score(x_scaled,dbscan_pred)
print('DBSCAN Silhouette Score : ',round(dbscan_silscore, 3))
plt.scatter(x[:,0], x[:,1], c=dbscan_pred, s=60, edgecolors='black', cmap=mglearn.cm2)
plt.show()