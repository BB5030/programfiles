#include <stdio.h>

int main(){
    int arr[10]={1, 5, 6, 6, 7, 3, 4, 9, 2, 7}; // 정렬되지 않은 배열 생성
    int length = sizeof(arr)/sizeof(int); // 배열의 길이
    int temp = 0; // 스왑을 위한 변수

   printf("Unsorted array : ");
   for(int i=0; i<length; i++){printf("%d ", arr[i]);}
   printf("\n");

  // 완전 이진 트리의 최대 힙을 만드는 과정 
   for(int i=1;i<length;i++){
      int child = i;
      while(child != 0){
         int parent = (child-1)/2; // 이진 트리에서 부모노드의 인덱스 값
         if(arr[parent] < arr[child]){
            temp = arr[parent];
            arr[parent] = arr[child];
            arr[child] = temp;
         } // 자식 노드의 크기가 부모 노드보다 크다면 두 값을 스왑한다.
         child = parent; // 자식 노드를 검사한 뒤 부모 노드로 이동해 검사를 반복한다.
      }; // 자식 노드가 인덱스 0까지 올라간 경우는 부모노드가 없는 경우이므로 불가능해 반복 탈출.
   } 

   // 정렬 과정
   for(int i = length-1; i >= 0; i--){
      temp = arr[0];
      arr[0] = arr[i];
      arr[i] = temp; // 배열의 맨 뒤 인덱스 노드와 루트 노드를 교환하고 마지막 노드를 잘라 힙의 크기를 줄이고 최대 힙을 구성하는 것을 반복한다.
      for(int j=0; j<i; j++){
         int child=j;
         while(child != 0){
            int parent = (child-1)/2;
            if(arr[parent] < arr[child]){
               temp = arr[parent];
               arr[parent] = arr[child];
               arr[child] = temp;
            }
            child = parent;
         }
      }
   } // 각 최대 힙을 구한 뒤 최댓값이 맨 뒤 인덱스로 이동하고 결국 최솟값이 루트 노드로 이동
   
   printf("Sorted array : ");
   for(int j=0;j<10;j++){printf("%d ", arr[j]);}


    return 0;
}