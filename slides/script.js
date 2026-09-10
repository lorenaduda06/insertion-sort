/* =========================================================
   Navegação dos slides
   ========================================================= */

const slides = [...document.querySelectorAll('.slide')]

let current = 0

function showSlide(index) {

    current = Math.max(0, Math.min(slides.length - 1, index))

    slides.forEach((slide, slideIndex) => {
        slide.classList.toggle(
            'active',
            slideIndex === current
        )
    })

    const progress = document.getElementById('progress')

    const counter = document.getElementById('counter')

    if (progress) {
        progress.style.width = `${((current + 1) / slides.length) * 100}%`
    }

    if (counter) {
        counter.textContent = `${current + 1} / ${slides.length}`
    }
}

window.addEventListener('keydown', (event) => {
    if (event.target && (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA')) {
        return
    }

    if (
        event.key === 'ArrowRight' ||
        event.key === ' ' ||
        event.key === 'Enter' ||
        event.key === 'PageDown'
    ) {

        event.preventDefault()

        showSlide(current + 1)

        return

    }


    if (
        event.key === 'ArrowLeft' ||
        event.key === 'PageUp'
    ) {

        event.preventDefault()

        showSlide(current - 1)

        return

    }


    if (event.key === 'Home') {

        showSlide(0)

        return

    }


    if (event.key === 'End') {

        showSlide(slides.length - 1)

        return

    }


    if (event.key.toUpperCase() === 'F') {

        document.documentElement.requestFullscreen?.()

    }

})

showSlide(0)

const sortContainer = document.getElementById('sort-container')

const sortStartButton = document.getElementById('sort-start-button')

const sortButton = document.getElementById('sort-button')

const sortSpeedInput = document.getElementById('sort-speed')

const sortSpeedLabel = document.getElementById('sort-speed-label')

const sortStatus = document.getElementById('sort-status')

let sortRows = []

let isSorting = false

let sortSpeed = 1


/* =========================================================
   Velocidade
   ========================================================= */

function setSortSpeed(value) {

    if (
        !Number.isNaN(value) &&
        value > 0
    ) {

        sortSpeed = value

        if (sortSpeedLabel) {

            sortSpeedLabel.textContent =
                `Velocidade: ${sortSpeed.toFixed(1)}x`

        }

    }

}


if (sortSpeedInput) {

    sortSpeedInput.addEventListener(
        'input',
        (event) => {

            setSortSpeed(
                parseFloat(event.target.value)
            )

        }
    )

    setSortSpeed(
        parseFloat(sortSpeedInput.value)
    )

}

const sortSizeInput = document.getElementById('sort-size')

let sortSize = 10


function getSortSize() {

    const value =
        Math.floor(
            Number(sortSizeInput?.value)
        )

    if (
        !Number.isFinite(value) ||
        value < 2
    ) {

        return 10

    }

    return value

}


/* =========================================================
   Sleep respeitando velocidade
   ========================================================= */

function sortSleep(ms) {

    return new Promise((resolve) => {

        setTimeout(
            resolve,
            ms / sortSpeed
        )

    })

}


/* =========================================================
   Status
   ========================================================= */

function setSortStatus(message) {

    if (sortStatus) {

        sortStatus.textContent = message

    }

}


/* =========================================================
   Controles
   ========================================================= */

function setSortControlsDisabled(disabled) {

    if (sortStartButton) {

        sortStartButton.disabled = disabled

    }

    if (sortButton) {

        sortButton.disabled = disabled

    }

}


/* =========================================================
   Criação das barras
   ========================================================= */

function createSortColumns(sizeOrArray) {

    if (
        isSorting ||
        !sortContainer
    ) {
        return
    }


    sortContainer.innerHTML = ''

    sortRows = []


    let numbers = []


    if (Array.isArray(sizeOrArray)) {

        numbers = [...sizeOrArray]

    } else {

        const size =
            sizeOrArray !== undefined
                ? Math.max(
                    2,
                    Math.floor(Number(sizeOrArray))
                )
                : getSortSize()


        sortSize = size


        numbers = Array.from(
            { length: size },
            () =>
                Math.floor(
                    Math.random() * 100
                ) + 1
        )

    }


    if (sortSizeInput) {

        sortSizeInput.value =
            String(numbers.length)

    }


    updateSortColumnSize(
        numbers.length
    )


    const maxValue =
        Math.max(...numbers) || 1


    numbers.forEach(
        (value, index) => {

            const heightPercentage =
                Math.round(
                    (value / maxValue) * 70
                ) + 15


            const row =
                document.createElement('div')

            row.classList.add('sort-row')

            row.dataset.value = value

            row.dataset.index = index


            const column =
                document.createElement('div')

            column.classList.add(
                'sort-column'
            )

            column.style.height =
                `${heightPercentage}%`


            const valueLabel =
                document.createElement('span')

            valueLabel.classList.add(
                'sort-value'
            )

            valueLabel.textContent =
                value


            /*
             * Esconde números quando houver
             * muitas colunas.
             */

            if (numbers.length > 40) {

                valueLabel.style.display =
                    'none'

            }


            row.appendChild(column)

            row.appendChild(valueLabel)

            sortContainer.appendChild(row)


            sortRows.push({

                element: row,

                column,

                valueLabel,

                value

            })

        }
    )


    setSortControlsDisabled(false)


    setSortStatus(
        `${numbers.length} elementos gerados. ` +
        'Clique em “Ordenar” para iniciar.'
    )

}

function updateSortColumnSize(count) {

    if (!sortContainer) {
        return
    }


    const containerWidth =
        sortContainer.clientWidth


    const horizontalPadding = 36


    const availableWidth =
        Math.max(
            50,
            containerWidth -
            horizontalPadding
        )


    /*
     * Quanto mais elementos,
     * menor o espaço entre eles.
     */

    let gap

    if (count <= 12) {

        gap = 9

    } else if (count <= 25) {

        gap = 5

    } else if (count <= 50) {

        gap = 3

    } else if (count <= 100) {

        gap = 1

    } else {

        gap = 0

    }


    const totalGap =
        gap * Math.max(0, count - 1)


    let width =
        (
            availableWidth -
            totalGap
        ) / count


    /*
     * Não limita a quantidade.
     * Apenas deixa as barras cada vez
     * menores conforme necessário.
     */

    width =
        Math.min(
            58,
            Math.max(0.25, width)
        )


    let fontSize = 14

    if (count > 15) {

        fontSize = 12

    }

    if (count > 25) {

        fontSize = 10

    }


    const radius =
        width >= 20
            ? 7
            : width >= 8
                ? 4
                : width >= 3
                    ? 2
                    : 0


    sortContainer.style.setProperty(
        '--column-width',
        `${width}px`
    )

    sortContainer.style.setProperty(
        '--column-gap',
        `${gap}px`
    )

    sortContainer.style.setProperty(
        '--value-font-size',
        `${fontSize}px`
    )

    sortContainer.style.setProperty(
        '--column-radius',
        `${radius}px`
    )

}

/* =========================================================
   FLIP Animation
   ========================================================= */

async function animateSortShift(
    fromIndex,
    toIndex
) {

    const leftElement =
        sortRows[fromIndex].element

    const keyElement =
        sortRows[toIndex].element


    /* FIRST */

    const leftBefore =
        leftElement.getBoundingClientRect()

    const keyBefore =
        keyElement.getBoundingClientRect()


    /* LAST */

    sortContainer.insertBefore(
        keyElement,
        leftElement
    )


    const leftAfter =
        leftElement.getBoundingClientRect()

    const keyAfter =
        keyElement.getBoundingClientRect()


    /* INVERT */

    const leftDelta =
        leftBefore.left - leftAfter.left

    const keyDelta =
        keyBefore.left - keyAfter.left


    leftElement.style.transition = 'none'

    keyElement.style.transition = 'none'


    leftElement.style.transform =
        `translateX(${leftDelta}px)`

    keyElement.style.transform =
        `translate(${keyDelta}px, -30px)`


    /*
     * Força o navegador a calcular o layout
     * antes de iniciar a transição.
     */

    void leftElement.offsetWidth

    void keyElement.offsetWidth


    /* PLAY */

    leftElement.style.transition =
        'transform 350ms ease'

    keyElement.style.transition =
        'transform 350ms ease'


    leftElement.style.transform = ''

    keyElement.style.transform =
        'translateY(-30px)'


    await sortSleep(350)


    /* Limpeza */

    leftElement.style.transition = ''

    leftElement.style.transform = ''

    keyElement.style.transition = ''

    keyElement.style.transform = ''

}


/* =========================================================
   Insertion Sort animado
   ========================================================= */

async function runInsertionSort() {

    if (
        isSorting ||
        sortRows.length <= 1
    ) {

        if (sortRows.length === 1) {

            sortRows[0]
                .element
                .classList
                .add('sorted')

        }

        return

    }


    isSorting = true

    setSortControlsDisabled(true)


    try {

        const length = sortRows.length

        sortRows[0]
            .element
            .classList
            .add('sorted')


        setSortStatus(
            'O primeiro elemento é considerado ordenado.'
        )


        await sortSleep(500)


        /*
         * Começamos no segundo elemento.
         */

        for (let i = 1; i < length; i++) {
            const keyItem =
                sortRows[i]

            const keyElement =
                keyItem.element


            keyElement
                .classList
                .remove('sorted')

            keyElement
                .classList
                .add('key')


            setSortStatus(
                `Chave selecionada: ${keyItem.value}.`
            )


            await sortSleep(650)


            let j = i - 1


            /* =============================================
               2. Comparações
               ============================================= */

            while (j >= 0) {

                const currentItem =
                    sortRows[j]

                const currentElement =
                    currentItem.element


                currentElement
                    .classList
                    .add('comparing')


                setSortStatus(
                    `Comparando ${keyItem.value} com ${currentItem.value}.`
                )


                await sortSleep(550)


                /*
                 * Se o valor da esquerda é maior,
                 * precisa ser deslocado.
                 */

                if (
                    currentItem.value >
                    keyItem.value
                ) {

                    currentElement
                        .classList
                        .remove('comparing')

                    currentElement
                        .classList
                        .add('shifting')


                    setSortStatus(
                        `${currentItem.value} > ${keyItem.value}: ` +
                        `${currentItem.value} é deslocado para a direita.`
                    )


                    /*
                     * Anima fisicamente a troca
                     * de posições no DOM.
                     */

                    await animateSortShift(
                        j,
                        j + 1
                    )


                    /*
                     * Sincroniza a estrutura JavaScript
                     * com a nova ordem visual.
                     */

                    sortRows[j + 1] =
                        sortRows[j]

                    sortRows[j] =
                        keyItem


                    currentElement
                        .classList
                        .remove('shifting')

                    currentElement
                        .classList
                        .add('sorted')


                    j--

                } else {

                    /*
                     * Encontramos um elemento menor
                     * ou igual à chave.
                     */

                    currentElement
                        .classList
                        .remove('comparing')


                    setSortStatus(
                        `${currentItem.value} ≤ ${keyItem.value}: ` +
                        `posição encontrada.`
                    )


                    await sortSleep(350)

                    break

                }

            }


            /* =============================================
               3. Inserção
               ============================================= */

            keyElement
                .classList
                .remove('key')

            keyElement
                .classList
                .add('inserted')


            setSortStatus(
                `${keyItem.value} foi inserido na posição correta.`
            )


            await sortSleep(500)


            keyElement
                .classList
                .remove('inserted')


            /*
             * Toda a região 0...i agora está ordenada.
             */

            for (let k = 0; k <= i; k++) {
                sortRows[k]
                    .element
                    .classList
                    .add('sorted')
            }

            await sortSleep(350)

        }


        /* =============================================
           Finalização
           ============================================= */

        for (let index = 0; index < length; index++) {
            sortRows[index]
                .element
                .classList
                .add('sorted')
        }


        setSortStatus(
            'Vetor completamente ordenado.'
        )

    } finally {
        setSortControlsDisabled(false)

        isSorting = false
    }

}


createSortColumns([
    72,
    28,
    91,
    45,
    63,
    17,
    84,
    39,
    56,
    31
])