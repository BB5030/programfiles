import numpy as np
import matplotlib.pyplot as plt
import mglearn

from sklearn.datasets import make_moons
from sklearn import cluster
from sklearn.cluster import KMeans, AgglomerativeClustering, DBSCAN
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import adjusted_rand_score

x, y = make_moons(n_samples = 400, noise = 0.1, random_state = np.random.RandomState(seed=0))

scaler = StandardScaler().fit(x)
x_scaled = scaler.transform(x)

kmeans = KMeans(n_clusters = 2).fit(x_scaled)
kmeans_pred = kmeans.fit_predict(x_scaled)
kmeans_ARI = adjusted_rand_score(y, kmeans_pred)

plt.scatter(x[:,0], x[:,1], c=kmeans_pred, s=60, edgecolors='black', cmap=mglearn.cm2)
print('KMeans - ARI : ', round(kmeans_ARI, 3))
plt.show()

agg = AgglomerativeClustering(n_clusters=2).fit(x_scaled)
agg_pred = agg.fit_predict(x_scaled)
agg_ARI = adjusted_rand_score(y, agg_pred)

plt.scatter(x[:,0], x[:,1], c=agg_pred, s=60, edgecolors='black', cmap=mglearn.cm2)
print('Agglomerative Clustering - ARI : ', round(agg_ARI, 3))
plt.show()

dbscan = DBSCAN()
db_pred = dbscan.fit_predict(x_scaled)
db_ARI = adjusted_rand_score(y, db_pred)

plt.scatter(x[:,0], x[:,1], c=db_pred, s=60, edgecolors='black', cmap=mglearn.cm2)
print('DBSCAN - ARI', round(db_ARI, 3))
plt.show()