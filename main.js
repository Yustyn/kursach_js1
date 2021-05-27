let $container = document.querySelector('.container'),
    $button = document.getElementById('spin'),
    cont = document.querySelector('div.container'),
    overlay = document.createElement('div'),
    but_again = document.createElement('div'),
    not_in_word_letter_list = document.createElement('ul'),
    letter_p = document.createElement('p')

letter_p.classList.add('letter_p')
letter_p.textContent = "Список використаних букв:"
$container.appendChild(letter_p)
not_in_word_letter_list.classList.add('not_in_word')
but_again.classList.add('play_again')
but_again.textContent = 'PLAY AGAIN'
$container.appendChild(not_in_word_letter_list)

let sektor = '',
    zekrutil = false,
    points = 0,
    prize = false,
    kluch = false,
    try_kluch = true,
    usesome = false,
    letter = false,
    another_letter = false,
    counter = 0,
    val = 0


// Масив слів для відгадування
let word = [
    'патч',
    // 'девелопер',
    // 'джаваскріпт',
    // 'курсова',
    // 'паралелепіпед'
]

// Викликає рандомне слово із масиву
asked_word = word[randomNumber(0, word.length - 1)]
word_show(asked_word)

let $word_list = document.querySelectorAll('ul.word li')

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

// Створення сторінки вибору шкатулки
function prize_auto() {
    let cont = document.querySelector('div.container'),
        img = `<img src="images/chest_closed.png" class="chest_closed" alt="closed chest"></img>`,
        close = `<i class="fas fa-times close"></i>`,
        tip_1 = `<p>Щоб відмовитись від відкриття сундука та грати далі натисніть хрестик</p>`

    cont.classList.add('d-none')
    overlay.classList.add('overlay')
    overlay.classList.add('d-block')

    document.body.append(overlay)


    let ul = document.createElement('ul')
    overlay.appendChild(ul)
    overlay.insertAdjacentHTML('beforeend', close)
    overlay.insertAdjacentHTML('afterbegin', tip_1)

    for (i = 1; i <= 4; i++) {
        ul.insertAdjacentHTML('beforeend', `<li class="chest_list">${img}</li>`)
    }

    chest_unlocked_number = randomNumber(0, 3)
    let $chest_closed = document.getElementsByClassName('chest_closed'),
        $li_item = document.getElementsByClassName('chest_list'),
        $close_icon = document.querySelector('.close')

    $close_icon.addEventListener('click', () => {
        cont.classList.remove('d-none')
        overlay.removeChild(ul)
        overlay.removeChild(unwin)
        overlay.removeChild($close_icon)
        overlay.removeChild($tip_1)
        overlay.removeChild(but_continue)
        document.body.removeChild(overlay)
    })

    for (let i = 0; i < 4; i++) {
        $chest_closed[i].addEventListener('click', () => {
            if (try_kluch) {
                if (chest_unlocked_number == i) {
                    $li_item[i].innerHTML = `<img src="images/shkatKey.png" alt="chest_prise">`
                    win = document.createElement('h3')
                    win.innerText = 'Влучний вибір! Ви виграли АВТОМОБІЛЬ!'
                    overlay.insertAdjacentElement('afterbegin', win)

                    $tip_1 = document.querySelector('.overlay > p')
                    $tip_1.classList.add('d-none')
                    $close_icon.classList.add('d-none')

                    overlay.appendChild(but_again)

                    document.querySelector('.play_again').addEventListener('click', () => {
                        window.location.reload()
                    })
                } else {
                    $li_item[i].innerHTML = `<img class="chest_opened" src="images/chest_opened.png" alt="chest_opened">`

                    unwin = document.createElement('h3')
                    unwin.innerText = 'Невдача :( Можливо пощастить наступного разу'
                    $tip_1 = document.querySelector('.overlay > p')
                    $tip_1.classList.add('d-none')

                    let but_continue = document.createElement('div')

                    but_continue.classList.add('continue')
                    but_continue.textContent = 'ПРОДОВЖИТИ ГРУ'
                    overlay.appendChild(but_continue)
                    overlay.insertAdjacentElement('afterbegin', unwin)

                    document.querySelector('.continue').addEventListener('click', () => {
                        cont.classList.remove('d-none')
                        overlay.removeChild(ul)
                        overlay.removeChild(unwin)
                        overlay.removeChild($close_icon)
                        overlay.removeChild($tip_1)
                        overlay.removeChild(but_continue)
                        document.body.removeChild(overlay)
                    })
                }
            }
            kluch = false
            try_kluch = false
        })
    }
}

// Запуск події сектора
function sektor_result() {
    // if (kluch) {
    prize_auto()
    // }

    if (letter) {
        what_letter()
    }
}

// Показує кількість очок, запускає подію відповідно до сектору барабану
function sktr(sektor) {
    setTimeout(() => {
        // alert(sektor)
        show_points.innerText = points
        sektor_slot.innerText = sektor

        sektor_result()
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

        // Додає рандомний множинник для крутіння барабанупш
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
                letter = true
                sktr(sektor)
                break
            case angle >= 15 && angle < 40:
                sektor = '900 очок'
                points += 900
                letter = true
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
                letter = true
                sktr(sektor)
                break
            case angle >= 91 && angle < 118:
                sektor = '50 очок'
                points += 50
                letter = true
                sktr(sektor)
                break
            case angle >= 118 && angle < 142:
                sektor = '0 очок'
                points += 0
                sktr(sektor)
                break
            case angle >= 142 && angle < 169:
                sektor = 'Приз'
                prize = true
                sktr(sektor)
                break
            case angle >= 169 && angle < 194:
                sektor = '600 очок'
                points += 600
                letter = true
                sktr(sektor)
                break
            case angle >= 194 && angle < 219:
                sektor = '450 очок'
                points += 450
                letter = true
                sktr(sektor)
                break
            case angle >= 219 && angle < 245:
                sektor = '700 очок'
                points += 700
                letter = true
                sktr(sektor)
                break
            case angle >= 245 && angle < 271:
                sektor = '500 очок'
                points += 500
                letter = true
                sktr(sektor)
                break
            case angle >= 271 && angle < 297:
                sektor = '200 очок'
                points += 200
                letter = true
                sktr(sektor)
                break
            case angle >= 297 && angle < 323:
                sektor = 'Ключ'
                kluch = true
                try_kluch = true
                sktr(sektor)
                break
            case angle >= 323 && angle < 348:
                sektor = '100 очок'
                points += 100
                letter = true
                sktr(sektor)
                break
            default:
                alert(`Something goes wrong`)
        }
    }
    zekrutil = false
    // alert(points)
})

// Показує пусті клітинки від кількості букв в залежності від вибраного слова
function word_show(word) {
    ul = document.createElement('ul')
    ul.classList.add('word')
    $container.appendChild(ul)

    for (char of word) {
        ul.insertAdjacentHTML('beforeend', `<li></li>`)
    }
}

// Відгадування букви
function what_letter() {
    let letter_ask = prompt('Введіть букву: ').toLowerCase()

    not_in_word_letter_list.insertAdjacentHTML('beforeend', `<li>${letter_ask}</li>`)
    counter += 1

    for (idx in asked_word) {
        if (asked_word[idx] == letter_ask) {
            $word_list[idx].textContent = asked_word[idx]
            kruti.disabled = true

            console.log(not_in_word_letter_list.length)

            setTimeout(() => {
                all_world = prompt("Ви готові ввести повне слово? ").toLowerCase()
                if (all_world == asked_word) {
                    win()
                }

            }, 1000);
            kruti.disabled = false
        }
    }

    if (counter > 2) {
        lose()
    }


    letter = false

}

function win() {
    alert('WIN!')
}

function lose() {
    alert('You lose!')
}