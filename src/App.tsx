/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  TrendingUp, 
  Heart, 
  GraduationCap, 
  Coins, 
  MapPin, 
  ArrowRight, 
  RefreshCcw,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Situation, MetricType, GameState, Goal } from './types';

const SITUATIONS: Situation[] = [
  {
    id: 1,
    title: "Культурна спадщина",
    description: "У громаді є старий занедбаний будинок культури. Громада чекає на ваше рішення як голови.",
    options: [
      {
        id: '1a',
        text: "Відкрити сучасний центр позашкільної освіти",
        consequence: "Діти отримали місце для розвитку талантів та хобі після школи. Якість життя зросла!",
        changes: { economy: -10, comfort: 10, education: 25 },
        question: "Який це вид освіти: формальна, позашкільна чи інклюзивна?",
        answer: "Позашкільна освіта."
      },
      {
        id: '1b',
        text: "Зробити ремонт і відкрити інклюзивний хаб для всіх",
        consequence: "Громада стала доступною для людей з інвалідністю та літніх людей. Це значний крок до рівності.",
        changes: { economy: -15, comfort: 25, education: 10 },
        question: "Чому інклюзивність важлива для якості життя громади?",
        answer: "Вона забезпечує рівний доступ до послуг для всіх категорій населення."
      },
      {
        id: '1c',
        text: "Продати будівлю інвестору, щоб поповнити бюджет",
        consequence: "Бюджет громади зріс, але мешканці втратили місце для спілкування. Рівень життя згодом підніметься через податки.",
        changes: { economy: 30, comfort: -5, education: -5 },
        question: "Продаж будівлі — це про 'рівень життя' чи про 'якість життя'?",
        answer: "Це насамперед про рівень життя (доходи бюджету)."
      }
    ]
  },
  {
    id: 2,
    title: "Екологія та добробут",
    description: "На околиці Доброграда розростається стихійне сміттєзвалище. Це загрожує здоров'ю мешканців.",
    options: [
      {
        id: '2a',
        text: "Побудувати сміттєсортувальну станцію",
        consequence: "З'явилися нові робочі місця, а довкілля стало чистішим. Це стратегічне рішення.",
        changes: { economy: 10, comfort: 15, education: 5 },
        question: "Як переробка відходів впливає на екологію як складову якості життя?",
        answer: "Зменшує забруднення ґрунтів та води, покращуючи здоров'я мешканців."
      },
      {
        id: '2b',
        text: "Перетворити територію на парк та зону відпочинку",
        consequence: "Мешканці отримали прекрасне місце для прогулянок. Комфорт у місті значно зріс.",
        changes: { economy: -15, comfort: 30, education: 0 },
        question: "До якого показника відноситься наявність зелених зон у громаді?",
        answer: "До показника якості життя (комфорт та екологія)."
      },
      {
        id: '2c',
        text: "Залишити як є, а кошти виділити на ремонт доріг",
        consequence: "Дороги стали кращими, але екологічна проблема залишилася. Це може вплинути на здоров'я в майбутньому.",
        changes: { economy: 15, comfort: 10, education: 0 },
        question: "Чи може бути життя якісним при поганій екології, навіть якщо доходи високі?",
        answer: "Ні, екологічна безпека є фундаментом якості життя."
      }
    ]
  },
  {
    id: 3,
    title: "Освіта майбутнього",
    description: "Світ змінюється, і Доброград має адаптуватися. Який напрямок розвитку освіти обрати?",
    options: [
      {
        id: '3a',
        text: "Обладнати класи для дистанційного навчання",
        consequence: "Тепер навчання не переривається навіть під час карантинів чи негод. Громада цифровізована.",
        changes: { economy: -5, comfort: 5, education: 30 },
        question: "Назви одну перевагу дистанційної форми освіти.",
        answer: "Доступність навчання з будь-якої точки та гнучкість графіку."
      },
      {
        id: '3b',
        text: "Побудувати сучасне укриття для школи",
        consequence: "Безпека учнів — понад усе. Тепер батьки спокійні за дітей під час занять.",
        changes: { economy: -10, comfort: 30, education: 10 },
        question: "Яку складову добробуту забезпечує наявність надійного укриття?",
        answer: "Безпекову складову якості життя."
      },
      {
        id: '3c',
        text: "Відкрити курси перекваліфікації для дорослих",
        consequence: "Дорослі мешканці змогли знайти кращу роботу. Це підняло економіку громади.",
        changes: { economy: 25, comfort: 5, education: 15 },
        question: "Як освіта протягом життя впливає на рівень життя людей?",
        answer: "Вона дозволяє отримувати актуальні навички для вищого заробітку."
      }
    ]
  },
  {
    id: 4,
    title: "Безпечна громада",
    description: "Увечері вулиці Доброграда стають небезпечними через відсутність світла. Що запропонуєте?",
    options: [
      {
        id: '4a',
        text: "Встановити освітлення на сонячних батареях",
        consequence: "Вулиці світлі, а громада не платить за електрику. Це екологічно та вигідно.",
        changes: { economy: 15, comfort: 20, education: 0 },
        question: "Чому сонячні батареї — це приклад сталого розвитку громади?",
        answer: "Бо вони використовують відновлювану енергію і зберігають бюджет."
      },
      {
        id: '4b',
        text: "Створити Центр безпеки та муніципальну варту",
        consequence: "Патрулювання зробило вулиці спокійними. Рівень правопорушень знизився.",
        changes: { economy: -10, comfort: 25, education: 5 },
        question: "Як відчуття безпеки впливає на психологічний добробут мешканців?",
        answer: "Зменшує стрес та тривожність, покращуючи загальне самопочуття."
      },
      {
        id: '4c',
        text: "Видати всім мешканцям флікери (світловідбивачі)",
        consequence: "Це дешеве рішення, яке врятує багато життів на дорозі. Бюджет збережено.",
        changes: { economy: 20, comfort: 10, education: 10 },
        question: "Як саме флікери допомагають безпеці пішоходів?",
        answer: "Вони роблять людину помітною для водіїв у темний час доби."
      }
    ]
  },
  {
    id: 5,
    title: "Здоров'я та дозвілля",
    description: "Фінальне рішення: як використати центральну площу міста для здоров'я людей?",
    options: [
      {
        id: '5a',
        text: "Відкрити сучасну амбулаторію сімейної медицини",
        consequence: "Медична допомога стала ближчою до людей. Це основа здоров'я громади.",
        changes: { economy: -5, comfort: 25, education: 5 },
        question: "До якої складової якості життя (фізичної чи соціальної) відноситься медицина?",
        answer: "До обох, але насамперед до фізичного здоров'я та безпеки."
      },
      {
        id: '5b',
        text: "Побудувати спорткомплекс та басейн",
        consequence: "Мешканці агітують за здоровий спосіб життя. Кожне тренування — це крок до довголіття.",
        changes: { economy: -10, comfort: 20, education: 10 },
        question: "Як активний спосіб життя впливає на працездатність громади?",
        answer: "Здорові люди менше хворіють і працюють продуктивніше."
      },
      {
        id: '5c',
        text: "Створити молодіжний коворкінг з вільним інтернетом",
        consequence: "Молодь залишається в громаді, створюючи нові проекти. Це інвестиція в майбутнє.",
        changes: { economy: 10, comfort: 10, education: 25 },
        question: "Який вид освіти найчастіше реалізується в коворкінгах?",
        answer: "Неформальна та самоосвіта."
      }
    ]
  },
  {
    id: 6,
    title: "Цифрова громада",
    description: "Чи готова ваша громада до цифрової трансформації? Оберіть пріоритет цифровізації.",
    options: [
      {
        id: '6a',
        text: "Створити мобільний додаток 'Мій Доброград'",
        consequence: "Мешканці тепер можуть повідомляти про проблеми та голосувати за ініціативи прямо зі смартфона.",
        changes: { economy: 5, comfort: 20, education: 15 },
        question: "Як цифрові інструменти допомагають громаді в управлінні?",
        answer: "Вони роблять управління прозорим та залучають громадян до прийняття рішень."
      },
      {
        id: '6b',
        text: "Запровадити безкоштовний Wi-Fi у парках та на зупинках",
        consequence: "Місто стало зручнішим для молоді та туристів. Доступ до інформації став рівнішим.",
        changes: { economy: -5, comfort: 15, education: 20 },
        question: "Чому доступ до інтернету в громадських місцях важливий для освіти?",
        answer: "Він забезпечує рівний доступ до онлайн-ресурсів для всіх мешканців."
      },
      {
        id: '6c',
        text: "Організувати курси комп'ютерної грамотності для літніх людей",
        consequence: "Бабусі та дідусі тепер можуть користуватися держпослугами онлайн. Якість їхнього життя зросла.",
        changes: { economy: 0, comfort: 10, education: 30 },
        question: "До якої форми освіти відносяться такі курси?",
        answer: "Зазвичай це неформальна освіта для дорослих."
      }
    ]
  },
  {
    id: 7,
    title: "Бюджет участі",
    description: "Ви вирішили виділити частину коштів на проекти, які запропонують самі мешканці. Що підтримаєте?",
    options: [
      {
        id: '7a',
        text: "Проект вуличного мистецтва та арт-об'єктів",
        consequence: "Доброград став яскравим та туристично привабливим. Громада пишається красою вулиць.",
        changes: { economy: 10, comfort: 20, education: 5 },
        question: "Як естетика міста впливає на психологічний комфорт людей?",
        answer: "Гарне середовище знижує рівень агресії та підвищує задоволеність життям."
      },
      {
        id: '7b',
        text: "Облаштування майданчиків для вигулу та тренування собак",
        consequence: "Конфліктів між мешканцями поменшало, а двори стали чистішими та безпечнішими.",
        changes: { economy: -5, comfort: 25, education: 5 },
        question: "Чому наявність спеціальних зон для тварин — це ознака добробуту?",
        answer: "Це свідчить про культуру співжиття та повагу до потреб усіх членів громади."
      },
      {
        id: '7c',
        text: "Створення громадської майстерні зі спільним інструментом",
        consequence: "Люди почали разом щось ремонтувати та створювати. Це зміцнило сусідські зв'язки.",
        changes: { economy: 5, comfort: 10, education: 15 },
        question: "До якого виду ресурсів відноситься така майстерня (економічних чи соціальних)?",
        answer: "Насамперед це соціальний капітал — довіра та співпраця між людьми."
      }
    ]
  },
  {
    id: 8,
    title: "Місцеві продукти",
    description: "Як стимулювати економіку громади та забезпечити людей якісною їжею?",
    options: [
      {
        id: '8a',
        text: "Відкрити фермерський ринок з еко-продуктами",
        consequence: "Місцеві фермери отримали прибуток, а мешканці — свіжі та корисні продукти.",
        changes: { economy: 20, comfort: 15, education: 0 },
        question: "Як споживання місцевих продуктів впливає на екологію?",
        answer: "Зменшується 'транспортний слід' (менше перевезень = менше викидів)."
      },
      {
        id: '8b',
        text: "Створити шкільний город та міні-теплиці",
        consequence: "Діти на практиці вивчають біологію та засади здорового харчування. Врожай іде в їдальню.",
        changes: { economy: -5, comfort: 10, education: 30 },
        question: "Це приклад формальної чи неформальної освіти?",
        answer: "Це може бути частиною формальної освіти (урок біології або праці) з практичним елементом."
      },
      {
        id: '8c',
        text: "Залучити велику мережу фаст-фуду (податки)",
        consequence: "До бюджету надійшло багато коштів, але рівень здоров'я молоді може погіршитися.",
        changes: { economy: 30, comfort: -10, education: -5 },
        question: "Чи завжди зростання доходів громади означає зростання її добробуту?",
        answer: "Ні, якщо це шкодить здоров'ю чи екології (якості життя)."
      }
    ]
  },
  {
    id: 9,
    title: "Соціальна підтримка",
    description: "У громаді є люди, які потребують особливої уваги. Як організувати допомогу?",
    options: [
      {
        id: '9a',
        text: "Створити волонтерський штаб при школі",
        consequence: "Учні допомагають самотнім літнім людям. Це вчить емпатії та соціальній відповідальності.",
        changes: { economy: 0, comfort: 20, education: 25 },
        question: "Яку компетентність розвиває волонтерство в учнів?",
        answer: "Громадянську та соціальну відповідальність."
      },
      {
        id: '9b',
        text: "Побудувати сучасний центр денного перебування для людей з інвалідністю",
        consequence: "Родини отримали підтримку, а люди з особливими потребами — якісний догляд та спілкування.",
        changes: { economy: -15, comfort: 30, education: 5 },
        question: "Як такий проект впливає на рівень інклюзивності громади?",
        answer: "Він робить громаду відкритою для всіх, незалежно від стану здоров'я."
      },
      {
        id: '9c',
        text: "Організувати соціальні їдальні з безкоштовними обідами",
        consequence: "Жодна людина в Доброграді не залишиться голодною. Це базовий гуманітарний добробут.",
        changes: { economy: -10, comfort: 25, education: 0 },
        question: "З якою складовою 'рівня життя' бореться цей проект?",
        answer: "З бідністю та нестачею базових ресурсів для існування."
      }
    ]
  },
  {
    id: 10,
    title: "Інклюзивний транспорт",
    description: "Старі автобуси громади зовсім не пристосовані для людей на візках та батьків з колясками. Що робити?",
    options: [
      {
        id: '10a',
        text: "Закупити низькопідлогові автобуси",
        consequence: "Тепер кожен мешканець може вільно пересуватися містом. Громада стала справді європейською.",
        changes: { economy: -15, comfort: 25, education: 0 },
        question: "Яку форму добробуту забезпечує доступний транспорт?",
        answer: "Соціальну інклюзію та рівність прав усіх громадян."
      },
      {
        id: '10b',
        text: "Облаштувати всі зупинки зручними пандусами",
        consequence: "Це полегшило очікування та посадку, але самі автобуси залишилися старими. Часткове рішення.",
        changes: { economy: -5, comfort: 15, education: 0 },
        question: "Чому універсальний дизайн важливий для кожного (навіть без інвалідності)?",
        answer: "Пандуси зручні також для людей з валізами, важкими сумками чи травмами."
      },
      {
        id: '10c',
        text: "Запустити службу 'Соціальне таксі'",
        consequence: "Адресна допомога працює добре, але вона не вирішує проблему загальної доступності міста.",
        changes: { economy: -10, comfort: 15, education: 5 },
        question: "До якої складової якості життя відноситься мобільність?",
        answer: "До показників комфорту та особистої свободи пересування."
      }
    ]
  },
  {
    id: 11,
    title: "Туристичний Доброград",
    description: "У вашої громади багата історія. Як привабити відвідувачів та дати роботу місцевим?",
    options: [
      {
        id: '11a',
        text: "Створити інтерактивний музейний маршрут",
        consequence: "Туристи їдуть до вас за враженнями. Місцеве кафе та готелі процвітають.",
        changes: { economy: 20, comfort: 10, education: 15 },
        question: "Як розвиток туризму впливає на рівень життя громади?",
        answer: "Він створює нові робочі місця та приносить кошти від послуг."
      },
      {
        id: '11b',
        text: "Організувати щорічний фестиваль народних ремесел",
        consequence: "Громада зблизилася, а старі традиції отримали нове життя. Чудове дозвілля!",
        changes: { economy: 10, comfort: 15, education: 20 },
        question: "Відродження традицій — це про освіту, економіку чи комфорт?",
        answer: "Насамперед про освіту (знання предків) та соціальний комфорт."
      },
      {
        id: '11c',
        text: "Вкласти кошти в рекламу громади на телебаченні",
        consequence: "Про Доброград почули всі, але інфраструктура поки не готова прийняти таку кількість гостей.",
        changes: { economy: -10, comfort: 5, education: 5 },
        question: "Чи достатньо лише реклами для реального добробуту?",
        answer: "Ні, реклама має підкріплюватися реальною якістю послуг та комфортом."
      }
    ]
  },
  {
    id: 13,
    title: "Енергетична незалежність",
    description: "Громада потребує більше електроенергії. Яке джерело оберете для Доброграда?",
    options: [
      {
        id: '13a',
        text: "Встановити вітрову електростанцію",
        consequence: "Чиста енергія назавжди! Високі початкові витрати, але екологія в нормі.",
        changes: { economy: 5, comfort: 20, education: 10, budget: -40 },
        question: "До яких ресурсів відноситься енергія вітру?",
        answer: "Відновлювані природні ресурси."
      },
      {
        id: '13b',
        text: "Відновити стару вугільну ТЕЦ",
        consequence: "Дешева енергія та багато робочих місць, проте повітря стало значно бруднішим.",
        changes: { economy: 25, comfort: -15, education: 0, budget: -10 },
        question: "Як забруднення повітря впливає на якість життя?",
        answer: "Збільшує ризик захворювань та знижує тривалість життя."
      },
      {
        id: '13c',
        text: "Купувати енергію в сусідів",
        consequence: "Жодних екологічних проблем у себе, але бюджет громади постійно витрачається на оплату рахунків.",
        changes: { economy: -5, comfort: 10, education: 0, budget: -25 },
        question: "Чому енергоефективність важлива для добробуту?",
        answer: "Вона дозволяє витрачати менше коштів на ту саму кількість послуг."
      }
    ]
  },
  {
    id: 14,
    title: "Малий бізнес",
    description: "Місцеві підприємці просять підтримки. Як стимулювати розвиток бізнесу?",
    options: [
      {
        id: '14a',
        text: "Скасувати місцеві податки для стартапів",
        consequence: "Бюджет тимчасово просів, але місто наповнилося кав'ярнями та новими сервісами.",
        changes: { economy: 30, comfort: 15, education: 5, budget: -20 },
        question: "Чому малий бізнес важливий для громади?",
        answer: "Він створює робочі місця та робить послуги доступнішими."
      },
      {
        id: '14b',
        text: "Збудувати сучасний критий ринок",
        consequence: "Торгівля впорядкувалася, а бюджет отримує стабільну оренду.",
        changes: { economy: 15, comfort: 10, education: 0, budget: -30 },
        question: "Як цивілізована торгівля впливає на рівень життя?",
        answer: "Забезпечує якість товарів та стабільність цін."
      },
      {
        id: '14c',
        text: "Надавати кредити лише великим заводам",
        consequence: "Великі податки в майбутньому, але малий бізнес почав занепадати.",
        changes: { economy: 20, comfort: -5, education: 0, budget: -15 },
        question: "Яка небезпека залежності громади від одного великого підприємства?",
        answer: "Якщо завод закриється, вся громада опиниться в кризі."
      }
    ]
  },
  {
    id: 15,
    title: "Водна безпека",
    description: "Стара система водопостачання часто виходить з ладу. Мешканці скаржаться на якість води.",
    options: [
      {
        id: '15a',
        text: "Повна заміна труб на пластикові",
        consequence: "Якісна вода у кожному домі. Дуже дорого, але вистачить на 50 років.",
        changes: { economy: 5, comfort: 30, education: 0, budget: -50 },
        question: "Чи є якісна питна вода складовою добробуту?",
        answer: "Так, це базова потреба для здоров'я та безпеки."
      },
      {
        id: '15b',
        text: "Будівництво станції доочищення води",
        consequence: "Вода стала безпечною, але мережі все ще часто проривають.",
        changes: { economy: 0, comfort: 20, education: 5, budget: -25 },
        question: "Як бактеріальне забруднення води впливає на якість життя?",
        answer: "Своєю чергою це призводить до епідемій та хвороб."
      },
      {
        id: '15c',
        text: "Роздати мешканцям фільтри-глечики",
        consequence: "Швидко і дешево, але глобально проблема іржавих труб не вирішена.",
        changes: { economy: -5, comfort: 10, education: 10, budget: -5 },
        question: "Чому фільтрація води — це лише тимчасовий захід?",
        answer: "Бо вона не усуває причину забруднення в самій системі."
      }
    ]
  },
  {
    id: 16,
    title: "Професійна орієнтація",
    description: "Випускники школи не знають, куди вступати. Громада має допомогти їм обрати шлях.",
    options: [
      {
        id: '16a',
        text: "Створити лабораторію робототехніки та IT",
        consequence: "Молодь готується до професій майбутнього. Це найвищий рівень освіти.",
        changes: { economy: 15, comfort: 5, education: 35, budget: -25 },
        question: "До якої форми освіти можна віднести заняття в такій лабораторії?",
        answer: "Це позашкільна або неформальна освіта."
      },
      {
        id: '16b',
        text: "Організувати практику на місцевих фермах",
        consequence: "Учні бачать реальну роботу. Громада отримує молодих аграріїв.",
        changes: { economy: 20, comfort: 5, education: 15, budget: -5 },
        question: "Яка перевага практичного навчання?",
        answer: "Воно дозволяє спробувати професію 'на дотик' і зрозуміти свої вподобання."
      },
      {
        id: '16c',
        text: "Запросити відомих лекторів з успішними історіями",
        consequence: "Велика мотивація для учнів почати власну справу в Доброграді.",
        changes: { economy: 10, comfort: 10, education: 20, budget: -10 },
        question: "Що таке самоосвіта?",
        answer: "Це процес самостійного отримання знань без вчителів."
      }
    ]
  },
  {
    id: 17,
    title: "Медіаграмотність",
    description: "В інтернеті про вашу громаду ширяться фейки. Як захистити Доброград?",
    options: [
      {
        id: '17a',
        text: "Провести тренінги з перевірки фактів для всіх",
        consequence: "Мешканці навчилися розрізняти правду від маніпуляцій. Безпека в соцмережах зросла.",
        changes: { economy: 0, comfort: 10, education: 30, budget: -10 },
        question: "Що таке критичне мислення?",
        answer: "Здатність глибоко аналізувати інформацію та ставити її під сумнів."
      },
      {
        id: '17b',
        text: "Створити офіційний медіа-центр громади",
        consequence: "Тепер є надійне джерело новин, якому довіряють. Комфортне інфо-середовище.",
        changes: { economy: 5, comfort: 15, education: 10, budget: -20 },
        question: "Як наявність перевірених новин впливає на психологічний спокій?",
        answer: "Зменшує тривожність та паніку від неперевірених чуток."
      },
      {
        id: '17c',
        text: "Заборонити використання певних соцмереж у школі",
        consequence: "Навчання стало зосередженішим, але учні незадоволені обмеженням свободи.",
        changes: { economy: -5, comfort: -5, education: 15, budget: 0 },
        question: "Чи є цензура шляхом до справжнього добробуту?",
        answer: "Зазвичай ні, адже добробут передбачає також свободу слова та вибору."
      }
    ]
  }
];

const GOALS: Goal[] = [
  {
    id: 'eco',
    title: "Еко-Громада Майбутнього",
    description: "Пріоритет: чиста енергія та високий комфорт.",
    targets: { comfort: 150, budget: 20 }
  },
  {
    id: 'edu',
    title: "Освітній Хаб",
    description: "Пріоритет: знання та інновації.",
    targets: { education: 180, comfort: 120 }
  },
  {
    id: 'eco_tiger',
    title: "Економічний Тигр",
    description: "Пріоритет: доходи, бізнес та бюджет.",
    targets: { economy: 180, budget: 50 }
  }
];

export default function App() {
  const [state, setState] = useState<GameState>({
    userName: '',
    stepIndex: 0,
    activeSituations: [],
    currentGoal: null,
    metrics: {
      economy: 100,
      comfort: 100,
      education: 100,
      budget: 100
    },
    history: []
  });

  const [isWelcome, setIsWelcome] = useState(true);
  const [nameInput, setNameInput] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const totalStepsPerGame = 8;
  const currentSituationId = state.activeSituations[state.stepIndex];
  const currentSituation = SITUATIONS.find(s => s.id === currentSituationId) || SITUATIONS[0];
  const isGameOver = state.stepIndex >= totalStepsPerGame || (state.activeSituations.length > 0 && state.stepIndex >= state.activeSituations.length);

  const handleStart = () => {
    if (nameInput.trim()) {
      // Shuffling situations and selecting 8 random ones
      const shuffled = [...SITUATIONS].sort(() => Math.random() - 0.5).slice(0, totalStepsPerGame);
      const randomGoal = GOALS[Math.floor(Math.random() * GOALS.length)];
      
      setState(prev => ({ 
        ...prev, 
        userName: nameInput.trim(),
        activeSituations: shuffled.map(s => s.id),
        currentGoal: randomGoal,
        stepIndex: 0,
        metrics: { economy: 100, comfort: 100, education: 100, budget: 100 },
        history: []
      }));
      setIsWelcome(false);
    }
  };

  const handleSelect = (optionId: string) => {
    const option = currentSituation.options.find(o => o.id === optionId)!;
    // Check if player has enough budget
    if (state.metrics.budget + (option.changes.budget || 0) < 0) {
      alert("Недостатньо бюджету для цього рішення!");
      return;
    }
    setSelectedOption(optionId);
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    const option = currentSituation.options.find(o => o.id === selectedOption)!;
    
    setState(prev => ({
      ...prev,
      stepIndex: prev.stepIndex + 1,
      metrics: {
        economy: Math.max(0, prev.metrics.economy + (option.changes.economy || 0)),
        comfort: Math.max(0, prev.metrics.comfort + (option.changes.comfort || 0)),
        education: Math.max(0, prev.metrics.education + (option.changes.education || 0)),
        budget: Math.max(0, prev.metrics.budget + (option.changes.budget || 0))
      },
      history: [...prev.history, {
        situationTitle: currentSituation.title,
        selectedOption: option.text,
        consequence: option.consequence
      }]
    }));

    setShowFeedback(false);
    setSelectedOption(null);
    setShowAnswer(false);
  };

  const currentMetricAccent = (type: MetricType) => {
    switch (type) {
      case 'economy': return 'text-[#10B981]';
      case 'comfort': return 'text-[#F97316]';
      case 'education': return 'text-[#6366F1]';
      case 'budget': return 'text-[#0EA5E9]';
    }
  };

  const getFinalVerdict = () => {
    // Check if goal met
    const goalMet = state.currentGoal && Object.entries(state.currentGoal.targets).every(([metric, target]) => {
      return state.metrics[metric as MetricType] >= (target || 0);
    });

    const total = state.metrics.economy + state.metrics.comfort + state.metrics.education;
    
    if (goalMet) return {
      title: "Супер-Голова: Ціль досягнута!",
      desc: `Ви не просто розвинули громаду, а й виконали план: ${state.currentGoal?.title}. Доброград пишається вами!`,
      icon: <Trophy className="w-16 h-16 text-yellow-500" />
    };

    if (total > 500) return {
      title: "Громада Процвітання",
      desc: "Ваш Доброград став взірцем для всієї України! Хоч спец-ціль не виконана на 100%, ви досягли вражаючих результатів.",
      icon: <CheckCircle2 className="w-16 h-16 text-emerald-500" />
    };
    return {
      title: "Громада в Розвитку",
      desc: "Ви на шляху до успіху. Спробуйте наступного разу краще збалансувати бюджет та потреби людей.",
      icon: <TrendingUp className="w-16 h-16 text-blue-500" />
    };
  };

  return (
    <div className="min-h-screen bg-[#F0F9FF] font-sans text-[#1E293B] selection:bg-blue-100 p-4 md:p-8 flex flex-col items-center">
      <div className="w-full max-w-5xl space-y-8 flex-1 flex flex-col">
        
        {/* Header Section: Stats Dashboard */}
        <header className="flex flex-col md:flex-row justify-between items-center bg-white rounded-3xl p-6 shadow-xl border-4 border-[#38BDF8] gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-[#38BDF8] rounded-2xl flex items-center justify-center text-white text-3xl shadow-inner">🏙️</div>
            <div>
              <h1 className="text-2xl font-black text-[#0369A1] uppercase tracking-tight">Доброград</h1>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Голова Громади: {state.userName || 'Учень'}</p>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <MetricCard 
              label="Бюджет" 
              value={state.metrics.budget} 
              color="#0EA5E9"
              bg="#F0F9FF"
              textColor="text-[#0EA5E9]"
            />
            <MetricCard 
              label="Економіка" 
              value={state.metrics.economy} 
              color="#10B981"
              bg="#ECFDF5"
              textColor="text-emerald-500"
            />
            <MetricCard 
              label="Комфорт" 
              value={state.metrics.comfort} 
              color="#F97316"
              bg="#FFF7ED"
              textColor="text-orange-500"
            />
            <MetricCard 
              label="Освіта" 
              value={state.metrics.education} 
              color="#6366F1"
              bg="#EEF2FF"
              textColor="text-indigo-500"
            />
          </div>
        </header>

        <main className="relative flex-1 flex flex-col">
          <AnimatePresence mode="wait">
            {isWelcome ? (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white p-10 rounded-[60px] shadow-2xl border-b-[12px] border-slate-200 text-center space-y-8 my-auto"
              >
                <div className="space-y-4">
                  <div className="w-24 h-24 bg-[#38BDF8] rounded-3xl mx-auto flex items-center justify-center text-white shadow-lg rotate-6 overflow-hidden border-8 border-white">
                    <MapPin className="w-12 h-12" />
                  </div>
                  <h2 className="text-5xl font-black text-[#0369A1] uppercase tracking-tight">
                    Вітаємо, Голово!
                  </h2>
                  <p className="text-xl text-slate-600 max-w-lg mx-auto font-medium">
                    Сьогодні ви берете відповідальність за розвиток громади <span className="text-[#0EA5E9] font-black">"Доброград"</span>.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                  <div className="p-6 bg-[#ECFDF5] rounded-3xl border-2 border-[#10B981] space-y-2">
                    <Coins className="w-8 h-8 text-[#10B981] mx-auto" />
                    <h4 className="font-black text-[#1E293B] uppercase text-sm">Економіка</h4>
                    <p className="text-xs text-emerald-700 font-bold uppercase tracking-tighter">Рівень життя та доходи</p>
                  </div>
                  <div className="p-6 bg-[#FFF7ED] rounded-3xl border-2 border-[#F97316] space-y-2">
                    <Heart className="w-8 h-8 text-[#F97316] mx-auto" />
                    <h4 className="font-black text-[#1E293B] uppercase text-sm">Комфорт</h4>
                    <p className="text-xs text-orange-700 font-bold uppercase tracking-tighter">Безпека та екологія</p>
                  </div>
                  <div className="p-6 bg-[#EEF2FF] rounded-3xl border-2 border-[#6366F1] space-y-2">
                    <GraduationCap className="w-8 h-8 text-[#6366F1] mx-auto" />
                    <h4 className="font-black text-[#1E293B] uppercase text-sm">Освіта</h4>
                    <p className="text-xs text-indigo-700 font-bold uppercase tracking-tighter">Знання та розвиток</p>
                  </div>
                </div>

                {state.currentGoal && (
                  <div className="max-w-3xl mx-auto p-6 bg-blue-50 rounded-3xl border-4 border-dashed border-blue-200 text-center">
                    <h4 className="font-black text-blue-600 uppercase tracking-widest mb-1">Ваша мета на цей термін:</h4>
                    <p className="text-xl font-bold text-blue-900 mb-2">{state.currentGoal.title}</p>
                    <div className="flex justify-center gap-4 text-sm font-black uppercase">
                      {Object.entries(state.currentGoal.targets).map(([m, t]) => (
                        <div key={m} className={`px-3 py-1 rounded-full ${state.metrics[m as MetricType] >= (t || 0) ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-400'}`}>
                          {m === 'economy' ? 'Економіка' : m === 'comfort' ? 'Комфорт' : m === 'education' ? 'Освіта' : 'Бюджет'} &gt; {t}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="bg-[#0F172A] p-8 rounded-3xl text-white space-y-4">
                  <p className="font-bold italic text-lg text-slate-300">
                    "У вас є 100 балів. Чи зможете ви побудувати <span className="text-[#38BDF8] font-black">ідеальну громаду</span>?"
                  </p>
                  <div className="space-y-2">
                    <label className="block text-xs font-black uppercase text-slate-400 tracking-widest">Ваше ім'я:</label>
                    <input 
                      type="text" 
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="Введіть ваше ім'я..."
                      className="w-full bg-slate-800 border-2 border-slate-700 rounded-2xl p-4 text-white font-bold focus:outline-none focus:border-[#38BDF8] transition-all"
                    />
                  </div>
                </div>

                <button
                  onClick={handleStart}
                  disabled={!nameInput.trim()}
                  className="group relative w-full md:w-auto px-16 py-6 bg-[#38BDF8] text-white rounded-[40px] font-black text-2xl hover:bg-[#0EA5E9] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-sky-200 overflow-hidden uppercase tracking-widest"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Почати керування <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                  </span>
                </button>
              </motion.div>
            ) : !isGameOver ? (
              <motion.div
                key={state.stepIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start py-8 flex-1"
              >
                {/* Assistant Column */}
                <div className="lg:col-span-5 flex flex-col items-center">
                  <div className="relative w-full">
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={showFeedback ? 'feedback' : 'situation'}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-8 rounded-[40px] shadow-xl border-b-8 border-slate-200 relative z-10"
                      >
                        {!showFeedback ? (
                          <div className="text-[#0F172A] leading-relaxed">
                            <p className="font-black text-2xl mb-4 text-[#0369A1] uppercase tracking-tight">Ситуація {state.stepIndex + 1}</p>
                            <p className="text-xl leading-snug font-medium">
                              {currentSituation.description}
                            </p>
                            <p className="mt-4 font-black text-[#F43F5E] uppercase tracking-wider">Що обереш?</p>
                          </div>
                        ) : (
                          <div className="text-[#0F172A] leading-relaxed">
                            <div className="flex items-center gap-3 mb-4">
                              <CheckCircle2 className="text-emerald-500 w-8 h-8" />
                              <h3 className="text-2xl font-black text-emerald-600 uppercase tracking-tight">Ваше рішення</h3>
                            </div>
                            <p className="text-xl leading-snug font-medium">
                              {currentSituation.options.find(o => o.id === selectedOption)?.consequence}
                            </p>
                          </div>
                        )}
                        {/* Triangle Tail */}
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white rotate-45 border-b-8 border-r-8 border-slate-200"></div>
                      </motion.div>
                    </AnimatePresence>
                    
                    {/* Assistant Character */}
                    <div className="mt-12 flex justify-center">
                      <div className="w-40 h-40 bg-[#38BDF8] rounded-full border-8 border-white shadow-2xl flex items-center justify-center relative overflow-hidden">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-inner">
                          <div className="text-5xl drop-shadow-sm">🤖</div>
                        </div>
                        <div className="absolute bottom-0 w-full h-8 bg-[#0369A1] opacity-20"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Choices/Feedback Column */}
                <div className="lg:col-span-7 space-y-6">
                  {!showFeedback ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-black text-slate-400 tracking-widest uppercase">Крок {state.stepIndex + 1} з {SITUATIONS.length}</span>
                        <h2 className="text-lg font-black text-[#1E293B] uppercase">{currentSituation.title}</h2>
                      </div>

                      {currentSituation.options.map((option, idx) => (
                        <button
                          key={option.id}
                          onClick={() => handleSelect(option.id)}
                          className={`w-full bg-white p-6 rounded-3xl border-4 border-transparent transition-all flex items-center gap-6 shadow-md text-left group
                            ${idx === 0 ? 'hover:border-[#6366F1]' : idx === 1 ? 'hover:border-[#10B981]' : 'hover:border-[#F97316]'}`}
                        >
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black group-hover:scale-110 transition-transform flex-shrink-0
                            ${idx === 0 ? 'bg-[#EEF2FF] text-[#6366F1]' : idx === 1 ? 'bg-[#ECFDF5] text-[#10B981]' : 'bg-[#FFF7ED] text-[#F97316]'}`}>
                            {idx === 0 ? 'А' : idx === 1 ? 'Б' : 'В'}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-black text-[#1E293B] text-lg mb-1 leading-tight">{option.text}</h3>
                            <p className="text-sm text-slate-500 font-medium">Впливає на {Object.keys(option.changes).filter(k => (option.changes[k as MetricType] || 0) !== 0).join(', ')}</p>
                          </div>
                          <div className="flex flex-col items-end gap-1">
                            {option.changes.budget !== undefined && (
                              <div className={`text-xs font-black px-2 py-1 rounded-lg ${option.changes.budget < 0 ? 'bg-rose-100 text-rose-500' : 'bg-emerald-100 text-emerald-500'}`}>
                                {option.changes.budget > 0 ? `+${option.changes.budget}` : option.changes.budget} БЮДЖЕТ
                              </div>
                            )}
                            <div className={`font-black text-xl flex-shrink-0 ${option.changes.economy >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                              {option.changes.economy > 0 ? `+${option.changes.economy}` : option.changes.economy} б.
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-6">
                       <div className="bg-[#FFF7ED] p-8 rounded-[40px] border-4 border-[#F97316] shadow-xl space-y-6">
                        <div className="flex items-center gap-3 text-[#F97316] font-black uppercase tracking-widest">
                          <AlertCircle className="w-6 h-6" />
                          Перевірка знань
                        </div>
                        <p className="text-2xl text-slate-800 font-bold leading-tight italic">
                          "{currentSituation.options.find(o => o.id === selectedOption)?.question}"
                        </p>
                        
                        <div className="bg-white/60 p-6 rounded-2xl border-2 border-orange-200">
                          {!showAnswer ? (
                            <button 
                              onClick={() => setShowAnswer(true)}
                              className="w-full text-center py-3 bg-[#F97316] text-white rounded-xl font-black uppercase tracking-widest hover:bg-[#EA580C] transition-colors"
                            >
                              Показати відповідь
                            </button>
                          ) : (
                            <div className="animate-in fade-in slide-in-from-top-2">
                              <p className="text-xs font-black text-slate-400 uppercase mb-2">Правильна відповідь:</p>
                              <p className="text-2xl text-emerald-600 font-black leading-tight">
                                {currentSituation.options.find(o => o.id === selectedOption)?.answer}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={handleNext}
                        className="w-full flex items-center justify-center gap-3 bg-[#0EA5E9] text-white p-6 rounded-[32px] font-black text-2xl hover:bg-[#0284C7] transition-all shadow-xl shadow-sky-200 uppercase tracking-widest"
                      >
                        Наступна ситуація <ArrowRight className="w-8 h-8" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-10 rounded-[60px] shadow-2xl border-b-[12px] border-slate-200 text-center space-y-8 my-auto"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="p-6 bg-yellow-50 rounded-full border-4 border-yellow-400 shadow-lg">
                    {getFinalVerdict().icon}
                  </div>
                  <h2 className="text-5xl font-black text-[#0369A1] uppercase tracking-tight">{getFinalVerdict().title}</h2>
                  <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-bold">
                    {getFinalVerdict().desc}
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8 border-y-4 border-slate-100">
                  <div className="flex flex-col items-center bg-blue-50 p-4 rounded-3xl border-4 border-blue-400">
                    <span className="text-[10px] font-black text-blue-600 uppercase mb-1 tracking-widest">Бюджет</span>
                    <span className="text-3xl font-black text-blue-600">{state.metrics.budget}</span>
                  </div>
                  <div className="flex flex-col items-center bg-[#ECFDF5] p-4 rounded-3xl border-4 border-[#10B981]">
                    <span className="text-[10px] font-black text-emerald-600 uppercase mb-1 tracking-widest">Економіка</span>
                    <span className="text-3xl font-black text-[#10B981]">{state.metrics.economy}</span>
                  </div>
                  <div className="flex flex-col items-center bg-[#FFF7ED] p-4 rounded-3xl border-4 border-[#F97316]">
                    <span className="text-[10px] font-black text-orange-600 uppercase mb-1 tracking-widest">Комфорт</span>
                    <span className="text-3xl font-black text-[#F97316]">{state.metrics.comfort}</span>
                  </div>
                  <div className="flex flex-col items-center bg-[#EEF2FF] p-4 rounded-3xl border-4 border-[#6366F1]">
                    <span className="text-[10px] font-black text-indigo-600 uppercase mb-1 tracking-widest">Освіта</span>
                    <span className="text-3xl font-black text-[#6366F1]">{state.metrics.education}</span>
                  </div>
                </div>

                <div className="space-y-4 text-left max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
                  <h4 className="font-black text-[#0369A1] text-xl uppercase tracking-tight">Ваш шлях в Доброграді:</h4>
                  <div className="space-y-4">
                    {state.history.map((h, i) => (
                      <div key={i} className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-100 relative overflow-hidden transition-all hover:bg-white hover:border-blue-200">
                        <div className="absolute top-0 left-0 w-2 h-full bg-blue-500"></div>
                        <span className="font-black text-[#1E293B] block text-lg mb-1">{h.situationTitle}</span>
                        <p className="text-slate-600 font-bold mb-2">Обрано: <span className="text-blue-600 italic">"{h.selectedOption}"</span></p>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">{h.consequence}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 pt-4">
                   <button
                    onClick={() => {
                      setIsWelcome(true);
                      setNameInput('');
                      setState({
                        userName: '',
                        stepIndex: 0,
                        activeSituations: [],
                        currentGoal: null,
                        metrics: { economy: 100, comfort: 100, education: 100, budget: 100 },
                        history: []
                      });
                    }}
                    className="flex-1 flex items-center justify-center gap-3 bg-[#0F172A] text-white px-10 py-6 rounded-[32px] font-black text-xl hover:bg-black transition-all shadow-xl shadow-slate-200 uppercase tracking-widest"
                  >
                    <RefreshCcw className="w-6 h-6" /> Спробувати знову
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex-1 flex items-center justify-center gap-3 bg-white text-[#0F172A] px-10 py-6 rounded-[32px] border-4 border-[#0F172A] font-black text-xl hover:bg-slate-50 transition-all uppercase tracking-widest"
                  >
                    ЗБЕРЕГТИ ЗВІТ
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="mt-8 bg-[#0F172A] text-white p-6 rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="bg-[#F43F5E] text-white px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest whitespace-nowrap">СЛОВНИК ГРОМАДИ</span>
            <p className="text-sm italic text-slate-300 font-medium leading-tight">
               "<span className="text-white font-black">Стратегія</span> — це план дій для досягнення ваших цілей у Доброграді."
            </p>
          </div>
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest text-center md:text-right">
            Здоров'я, Безпека та Добробут • 7-8 Клас • 2026
          </div>
        </footer>
      </div>
    </div>
  );
}

function MetricCard({ label, value, color, bg, textColor }: { label: string, value: number, color: string, bg: string, textColor: string }) {
  const percentage = Math.min(100, (value / 300) * 100);
  
  return (
    <div className={`flex flex-col items-center p-3 rounded-2xl border-2 min-w-[120px]`} style={{ backgroundColor: bg, borderColor: color }}>
      <span className={`text-[10px] font-black uppercase mb-1 tracking-widest ${textColor}`}>{label}</span>
      <div className="flex items-end gap-1">
        <span className="text-2xl font-black text-slate-800 leading-none">{value}</span>
        <span className="text-xs font-bold text-slate-400 mb-0.5">б.</span>
      </div>
      <div className="w-full h-3 bg-slate-200/50 rounded-full mt-2 overflow-hidden border border-slate-200">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          className="h-full rounded-full" 
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}
