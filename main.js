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
    val = 0,
    true_letter = 0,
    good_letter = false


// Масив слів для відгадування
let word = [
    'патч',
    'девелопер',
    'джаваскріпт',
    'курсова',
    'паралелепіпед'
]

// Масив призів
let prize_list = [
    'степлер',
    "мікрохвильовка",
    "клавіатура"
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
                    auto_pull[randomNumber(0, auto_pull.length - 1)].getAuto()
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
    if (kluch) {
        prize_auto()
    }

    if (letter) {
        what_letter()
    }
    if (prize) {
        prize_func()
    }
}

// Показує кількість очок, запускає подію відповідно до сектору барабану
function sktr(sektor) {
    setTimeout(() => {
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
        random_angle = randomNumber(1, 360)

        document.getElementById('baraban').style.transition = "10s"
        if (kruti.value > 5 && kruti.value < 15) {
            document.getElementById('baraban').style.transform = `rotate(${(val + (kruti.value + random_multiplier1) * 10) + random_angle}deg)`
            val += ((kruti.value + random_multiplier1) * 10) + random_angle
        } else if (kruti.value >= 15) {
            document.getElementById('baraban').style.transform = `rotate(${(val + kruti.value * random_multiplier2) + random_angle}deg)`
            val = (val + kruti.value * random_multiplier2) + random_angle
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
                console.log(angle)
        }
    }
    zekrutil = false
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

// Відгадування букви, слова
function what_letter() {
    let letter_ask = prompt('Введіть букву: ').toLowerCase()


    not_in_word_letter_list.insertAdjacentHTML('beforeend', `<li>${letter_ask}</li>`)
    counter += 1

    // Введення букви в квадратик, в разі відгадання
    for (idx in asked_word) {
        if (asked_word[idx] == letter_ask) {
            $word_list[idx].textContent = asked_word[idx]
            kruti.disabled = true
            true_letter += 1
            good_letter = true
            console.log(good_letter)
        }
    }

    // Введення повного слова після правильно вказаної букви
    if (good_letter) {
        setTimeout(() => {
            all_world = prompt("Ви готові ввести повне слово? ").toLowerCase()
            if (all_world == asked_word) {
                win()
            }
        }, 1000);

    }
    kruti.disabled = false
    if (true_letter == asked_word.length) {
        win()
    }

    if (counter > 20) {
        lose()
    }

    letter = false
    good_letter = false
}

function win() {
    for (idx in asked_word) {
        $word_list[idx].textContent = asked_word[idx]
    }
    alert('Вітаю, Ви виграли!')
}

function lose() {
    alert('You lose!')
}


// Подія сектору приз 

function prize_func() {
    let cont = document.querySelector('div.container'),
        close = `<i class="fas fa-times close_prize"></i>`,
        money_value = 100,
        tip_1 = `<p class="tip_prize">Ви можете вибрати ПРИЗ або гроші - ${money_value}$. </p>`,
        img = `<img src="./images/chest_closed.png" class="prize" alt="prize"></img>`,
        money = `<img src="./images/money.png" class="money" alt="money"></img>`

    let repeat = true,
        repeat_value = 1,
        prize_id = prize_list[randomNumber(0, prize_list.length - 1)],
        prize_select = true


    cont.classList.add('d-none')
    overlay.classList.add('overlay')
    overlay.classList.add('d-block')

    document.body.append(overlay)

    overlay.insertAdjacentHTML('beforeend', close)
    overlay.insertAdjacentHTML('beforeend', img)
    overlay.insertAdjacentHTML('beforeend', tip_1)
    overlay.insertAdjacentHTML('beforeend', money)


    let $close_prize = document.querySelector('.close_prize')
    $tip_1 = document.querySelector('.overlay > p')
    $prize = document.querySelector('.overlay> img')
    $money = document.querySelector('.overlay> .money')
    $close_prize.classList.add('d-none')



    $prize.addEventListener('click', () => {
        if (prize_select) {
            repeat_scale = randomNumber(0, 100)

            if (repeat) {
                repeat_value += 1
                if (repeat_value >= 5 && repeat_scale < 50) {
                    repeat = false
                }
                console.log('repeat_scale = ', repeat_scale, "repeat value = " + repeat_value, 'repeat = ', repeat)
            } else {
                overlay.insertAdjacentHTML('beforeend', `<img class="chest_opened_prize" src="images/chest_opened.png" alt="chest_opened">`)
                overlay.insertAdjacentHTML('beforeend', `<p class="opys">Ваш приз ${prize_id} </p>`)
                $tip_1.classList.add('d-none')
                $prize.classList.add('d-none')
                $money.style.cursor = 'unset'
                $close_prize.classList.remove('d-none')
                prize_select = false
            }
            $tip_1.innerHTML = `Ви можете вибрати ПРИЗ або гроші - ${money_value * repeat_value}$.`
        }
    })

    $money.addEventListener('click', () => {
        if (prize_select) {
            $tip_1.innerHTML = `Вітаю! Ви виграли ${money_value * repeat_value}$`
            $close_prize.classList.remove('d-none')
            prize_select = false
        }
    })

    $close_prize.addEventListener('click', () => {
        cont.classList.remove('d-none')
        overlay.removeChild($close_icon)
        overlay.removeChild($tip_1)
        overlay.removeChild($prize)
        overlay.removeChild($money)
        overlay.removeChild(document.querySelector('.opys'))
        overlay.removeChild(document.querySelector('.chest_opened_prize'))
        document.body.removeChild(overlay)
    })
}

// Класс машина
class PrizeAuto {
    constructor(model, color) {
        this.model = model
        this.color = color
    }
    getAuto() {
        let url = `https://pixabay.com/api/?key=17057678-b4c4954d8c62e2cb084b2680c&q=${this.model}+${this.color}&image_type=photo`
        let GET_Server = new XMLHttpRequest()

        GET_Server.open("GET", url)
        GET_Server.send()
        GET_Server.onload = function () {
            if (GET_Server.status !== 200) {
                console.log("Error loading data!")
            } else {
                let data = JSON.parse(GET_Server.response).hits
                createImg(data)
            }
        }
    }
}

// Допомагаюча функція для класу
function createImg(images) {
    let i = 0
    for (image of images) {
        i++
        if (i <= 1) {
            const $LI = document.createElement('LI')
            $imageList = document.createElement('UL')
            $imageList.classList.add('image-list')
            overlay.insertAdjacentElement('afterbegin', $imageList)
            $LI.style.backgroundImage = `url(${image.webformatURL})`
            $imageList.appendChild($LI)
        }
    }
}


let audi = new PrizeAuto('audi', 'black')
let bmw = new PrizeAuto('bmw', 'red')
let vw = new PrizeAuto('volkswagen', 'blue')
let skoda = new PrizeAuto('skoda', 'black')

// Масив з назвами класів для рандомного вибору призу авто
let auto_pull = [
    audi,
    bmw,
    vw,
    skoda
]




