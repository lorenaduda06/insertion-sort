// insertion sort que ordena o array inteiro de uma vez, ja com todos os numeros

#include <iostream>
using namespace std;

void insertionSort(int V[], int N) {
    for (int i = 1; i < N; i++) {
        int atual = V[i];  // valor a inserir
        int j = i;

        // desloca os maiores para a direita
        while (j > 0 && atual < V[j-1]) {
            V[j] = V[j-1];
            j--;
        }

        V[j] = atual;  // insere na posição correta
    }
}

int main() {
    int V[] = {12, 11, 13, 5, 6};
    int N = sizeof(V) / sizeof(V[0]);

    cout << "Antes: ";
    for (int i = 0; i < N; i++) cout << V[i] << " ";
    cout << "\n";

    insertionSort(V, N);

    cout << "Depois: ";
    for (int i = 0; i < N; i++) cout << V[i] << " ";
    cout << "\n";

    return 0;
}