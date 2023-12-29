#include <stdio.h>

double table[4][4] = {{0, 0, 0, 0}, {0, 0, 0, 0}, {0, 0, 0, 0}, {0, 0, 0, 0}}; // 초기 테이블

double getState(int a, int b){
    double sum = 0.0; // 최대값을 저장하기위해 처음 충분히 작은 수를 입력
    int value; // 상하좌우 이동 시의 가중치

    for(int i = 0; i < 4; i++){
        switch(i){
            case 0: // 위쪽으로 이동하는 경우
                if(a != 0){ 
                    value = -1 + table[a-1][b]; 
                    sum += value/4;
                    }
                break;
            case 1: // 아래쪽으로 이동하는 경우
                if(a != 3){ 
                    value = -1 + table[a+1][b]; 
                    sum += value/4;
                    }
                break;
            case 2: // 왼쪽으로 이동하는 경우
                if(b != 0){ 
                    value = -1 + table[a][b-1];
                    sum += value/4;
                     }
                break;
            case 3: // 오른쪽으로 이동하는 경우
                if(b != 3){ 
                    value = -1 + table[a][b+1]; 
                    sum += value/4;
                    }
                break;
            default:
                break;
        }

    }
    return sum;
} // 테이블에 가중치 중 최대값을 저장하기위해 반환

int main(){
    for(int n = 0; n < 5; n++){ // 가중치가 어느 값에 수렴하는지 확인하기위해  5번 반복
        for(int i = 0; i < 4; i++){
            for(int j = 0; j < 4; j++){
                table[i][j] = getState(i, j); // 도출된 가중치 중 최대값을 테이블에 저장
                table[0][0] = 0; // 출발점의 가중치는 0으로 고정
            }
        }

        printf("iterate %d\n", n);

        for(int i = 0; i < 4; i++){
            for(int j = 0; j< 4; j++){
                printf("%f ", table[i][j]);
            }
            printf("\n");
        }
    }

    for(int n = 0; n < 10; n++){ // 수렴값을 확실히 알기 위해 10번 반복
        for(int i = 0; i < 4; i++){
            for(int j = 0; j < 4; j++){
                table[i][j] = getState(i, j);
                table[0][0] = 0; 
            }
        }
    }
    /*printf("iterate 10 \n");
    for(int i = 0; i < 4; i++){
            for(int j = 0; j< 4; j++){
                printf("%d ", table[i][j]);
            }
            printf("\n");
    }

    for(int n = 0; n < 100; n++){ // 수렴값을 확실히 알기 위해 100번 반복
        for(int i = 0; i < 4; i++){
            for(int j = 0; j < 4; j++){
                table[i][j] = getState(i, j);
                table[0][0] = 0; 
            }
        }
    }
    printf("iterate 100 \n");
    for(int i = 0; i < 4; i++){
            for(int j = 0; j< 4; j++){
                printf("%d ", table[i][j]);
            }
            printf("\n");
    }*/
}
