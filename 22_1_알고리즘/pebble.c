#include <stdio.h>
typedef int bool;

bool visited[5];
int bestPath[6];

int result = 10000;

void pTemp(int curPath[]){
	for (int i=0; i<5;  i++){
		bestPath[i] = curPath[i];
	}
	bestPath[5] = curPath[0];
}

int firstBound(int w[5][5], int u){
	int min = 10000;
	for (int v=0; v<5; v++){
		if((w[u][v] < min) && (u != v)){
			min = w[u][v];
		}
	}
	return min;
}

int restBound(int w[5][5], int u){
	int first = 10000;
	int rest = 10000;

	for(int v=0; v<5; v++){
		if(u == v){continue;}

		if(w[u][v] <= first){
			rest = first;
			first = w[u][v];
		}
		else if((w[u][v] <= rest) && (w[u][v] != first)){
			rest = w[u][v];
		}
	}
	return rest;
}

void mirrorTSP(int w[5][5], int bound, int weight, int level, int curPath[]){
	if(level == 5){
		if(w[curPath[level-1]][curPath[0]] != 0){
			int res = weight + w[curPath[level-1]][curPath[0]];
			if(res < result){
				pTemp(curPath);
				result = res;
			}
		}
		return ;
	}

	for(int i=0; i<5; i++){
		if((w[curPath[level-1]][i] != 0) && (visited[i] = 0)){
			int temp = bound;
			weight += w[curPath[level-1]][i];
			
			if(level == 1){
				bound -= (firstBound(w, curPath[level-1]) + firstBound(w, i))/2;
			}
			else{
				bound -= (restBound(w, curPath[level-1]) + restBound(w,i))/2;
			}
			

			if((bound + weight) < result){
				curPath[level] = i;
				visited[i] = 1;

				mirrorTSP(w, bound, weight, level+1, curPath);
			}

			weight -= w[curPath[level-1]][i];
			bound = temp;

			for(int j=0; j<(level-1); j++){	visited[curPath[j]] = 1; }
		}
	}
}

void TSP(int w[5][5]){
	int curPath[6];
	int bound = 0;

	for(int i=0; i<5; i++){	bound += restBound(w, i);	}

	visited[0] = 1;
	curPath[0] = 0;

	mirrorTSP(w, bound, 0, 1, curPath);
}

int main(){
	int w[5][5] = {
		{0, 10, 10, 30, 25},
		{10, 0, 14, 21, 10},
		{10, 18, 0, 7, 9},
		{8, 11, 7, 0, 3},
		{14, 10, 10, 3, 0}
	};

	TSP(w);

	printf("minimun cost : %d\n", result);
	printf("path : ");
	for (int i=0; i<5; i++){
		printf("%d", bestPath[i]+1);
	}
	return 0;
}