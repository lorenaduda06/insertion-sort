# Insertion Sort

O intuito desse trabalho, desenvolvido para a disciplina de **Estratégias de Programação**, é estudar, implementar e demonstrar o funcionamento do algoritmo de ordenação **Insertion Sort**.

O projeto combina uma apresentação interativa desenvolvida com HTML, CSS e JavaScript e implementações do algoritmo em C++, permitindo visualizar tanto o funcionamento conceitual quanto a sua execução prática.

## Sobre o Insertion Sort

É um algoritmo de ordenação incremental que percorre o vetor da esquerda para a direita, considerando uma região inicial como já ordenada.

A cada iteração, um novo elemento é selecionado como **chave** e comparado com os elementos anteriores. Os valores maiores que a **chave** são deslocados uma posição para a direita, criando espaço para que a chave seja inserida em sua posição correta.

### 💡 Exemplo

Considerando o vetor:

[3, 4, 2, 1, 5]

O algoritmo começa considerando o 3 como a região ordenada.

[3] 4 2 1 5

Ao processar o 4:

[3, 4] 2 1 5

Ao processar o 2, os valores maiores são deslocados:

[2, 3, 4] 1 5

Depois, ao processar o 1:

[1, 2, 3, 4] 5

Por fim:

[1, 2, 3, 4, 5]


## 📁 Estrutura do projeto
```
insertion-sort/
│
├── slides/
│   ├── index.html
│   ├── styles.css
│   └── script.js
│
├── insertion_sort.cpp
├── insertion_sort_live.cpp
│
└── README.md
```

## Arquivos e diretórios

**`slides/`**
Contém os arquivos responsáveis pela apresentação interativa sobre o Insertion Sort

- `index.html` — estrutura da apresentação, que abrange a explicação do algoritmo, exemplos, análise de complexidade, comparação com outros algoritmos e demonstração interativa.
- `styles.css` — estilização dos slides e elementos.
- `script.js` — responsável pela navegação entre os slides e pela lógica de demonstração interativa, incluindo animações, deslocamentos, comparações, controle de velocidade e geração do vetor.

**`insertion_sort.cpp`**
Implementação tradicional do Insertion Sort em C++, aplicada a um vetor previamente definido.

**`insertion_sort_live.cpp`**
Implementação do algoritmo em C++ no qual novos valores são recebidos pelo usuário e inseridos mantendo a sequência ordenada.

**`README.md`**
Documentação do projeto, contendo informações sobre o algoritmo, funcionamento, implementações e complexidade.

## Execução

### Apresentação

Abra o arquivo slides/index.html em um navegador para visualizar a apresentação e utilizar a demonstração interativa.

### C++

Os arquivos .cpp podem ser compilados utilizando um compilador C++, como o g++.

Exemplo:

g++ insertion_sort.cpp -o insertion_sort

E então:

./insertion_sort

## Integrantes da equipe
Giovanna Furlan Fernandes<br>
Iandê de Freitas Richalski<br>
João Vitor de Oliveira Pinho<br>
Lorena Eduarda Barros Martinelli<br>
Luiz Felipe Fernandes Ramos 
 
