// insertion sort que processa os numeros conforme sao digitados

#include <iostream>
using namespace std;

int main() {
    int V[100], N = 0, num;

    cout << "Digite numeros (-1 para parar):\n";

    while (cin >> num && num != -1) {
        V[N] = num;
        N++;

        int atual = V[N-1];  // valor a inserir
        int j = N-1;

        // desloca os maiores para a direita
        while (j > 0 && atual < V[j-1]) {
            V[j] = V[j-1];
            j--;
        }

        V[j] = atual;  // insere na posição correta

        cout << "Apos inserir " << num << ": [ ";
        for (int i = 0; i < N; i++) cout << V[i] << " ";
        cout << "]\n";
    }

    return 0;
}