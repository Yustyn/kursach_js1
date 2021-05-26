let $container = document.querySelector('.container')
let $button = document.getElementById('spin')

let sektor = '',
    zekrutil = false,
    points = 0,
    prize = false,
    kluch = false,
    usesome = false,
    letter = false


// Генерує барабан та кнопки
function baraban() {
    var d = document.createElement('div')

    let img_jakob = `<img src="images/jakob.png" alt="Jakubovich" id='jakob'>`
    let img_baraban = `<img src="images/baraban.png" alt="baraban" id = "baraban">`
    let inp = `<input type="range" id="kruti" min="0" max="100" value="0">`
    let arrow = `<i class="fas fa-location-arrow arrow"></i>`
    let label_slot = '<div class="label_slot">СЕКТОР</div>'
    let sektor_slot = '<div id="sektor_slot"></div>'
    let show_points = '<div id=show_points></div>'

    d.insertAdjacentHTML('beforeend', img_jakob)
    d.insertAdjacentHTML('beforeend', img_baraban)
    d.insertAdjacentHTML('beforeend', inp)
    d.insertAdjacentHTML('beforeend', arrow)
    d.insertAdjacentHTML('beforeend', sektor_slot)
    d.insertAdjacentHTML('beforeend', label_slot)
    d.insertAdjacentHTML('beforeend', show_points)

    $container.appendChild(d)
}

// Показує кількість очок 
function sktr(sektor) {
    setTimeout(() => {
        // alert(sektor)
        show_points.innerText = points
        sektor_slot.innerText = sektor
    }, 10500);

}

// Генератор рандомного числа
function randomNumber(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
}

baraban()

// Відкручує колесо назад при відведенні повзунка
kruti.addEventListener('mousedown', () => {
    usesome = true
})

let val = 0

kruti.addEventListener('mousemove', () => {
    if (usesome && kruti.value < 100) {
        document.getElementById('baraban').style.transform = `rotate(${val - kruti.value}deg)`
    }
})

// Крутить колесо залежно від рівня відведення повзунка
kruti.addEventListener('mouseup', () => {
    if (kruti.value > 5) {
        zekrutil = true
    }
    if (zekrutil) {
        usesome = false

        // Додає рандомний множинник для крутіння барабану
        random_multiplier1 = randomNumber(3, 8)
        random_multiplier2 = randomNumber(10, 20)


        document.getElementById('baraban').style.transition = "10s"
        if (kruti.value > 5 && kruti.value < 15) {
            document.getElementById('baraban').style.transform = `rotate(${(val + (kruti.value + random_multiplier1) * 10) - random_multiplier1}deg)`
            val += ((kruti.value + random_multiplier1) * 10) - random_multiplier1
        } else if (kruti.value >= 15) {
            document.getElementById('baraban').style.transform = `rotate(${(val + kruti.value * random_multiplier2) - random_multiplier2}deg)`
            val = (val + kruti.value * random_multiplier2) - random_multiplier2
        }

        // Відключає можливість крутити колесо
        kruti.disabled = true


        // Включає можливість крутити колесо після того, як воно перестало крутитись
        setTimeout(() => {
            kruti.disabled = false
            document.getElementById('baraban').style.transition = "0s"
        }, 10500);

        angle = val % 360
        kruti.value = 0

        // Зчитує рівень відхилення колеса та дає підсумок в очках
        switch (zekrutil) {
            case angle <= 348 && angle < 15:
                sektor = '1000 очок'
                points += 1000
                sktr(sektor)
                break
            case angle >= 15 && angle < 40:
                sektor = '900 очок'
                points += 900
                sktr(sektor)
                break
            case angle >= 40 && angle < 66:
                sektor = 'Банкрот! Ваші очки згоріли!'
                points = 0
                sktr(sektor)
                break
            case angle >= 66 && angle < 91:
                sektor = '300 очок'
                points += 300
                sktr(sektor)
                break
            case angle >= 91 && angle < 118:
                sektor = '50 очок'
                points += 50
                sktr(sektor)
                break
            case angle >= 118 && angle < 142:
                sektor = '0 очок'
                points += 0
                sktr(sektor)
                break
            case angle >= 142 && angle < 169:
                sektor = 'Приз'
                sktr(sektor)
                break
            case angle >= 169 && angle < 194:
                sektor = '600 очок'
                points += 600
                sktr(sektor)
                break
            case angle >= 194 && angle < 219:
                sektor = '450 очок'
                points += 450
                sktr(sektor)
                break
            case angle >= 219 && angle < 245:
                sektor = '700 очок'
                points += 700
                sktr(sektor)
                break
            case angle >= 245 && angle < 271:
                sektor = '500 очок'
                points += 500
                sktr(sektor)
                break
            case angle >= 271 && angle < 297:
                sektor = '200 очок'
                points += 200
                sktr(sektor)
                break
            case angle >= 297 && angle < 323:
                sektor = 'Ключ'
                sktr(sektor)
                break
            case angle >= 323 && angle < 348:
                sektor = '100 очок'
                points += 100
                sktr(sektor)
                break
            default:
                alert(`Something goes wrong`)
        }
    }
    zekrutil = false
    // alert(points)
})

// Масив слів для відгадування
let word = [
    'девелопер',
    'джаваскріпт',
    'курсова',
    'паралелепіпед'
]

// Показує пусті клітинки від кількості букв в залежності від вибраного слова
function word_show(word) {
    ul = document.createElement('ul')
    ul.classList.add('word')
    $container.appendChild(ul)

    for (char of word) {
        ul.insertAdjacentHTML('beforeend', `<li></li>`)
    }
}

// Викликає рандомне слово із масиву
word_show(word[randomNumber(0, word.length - 1)])

