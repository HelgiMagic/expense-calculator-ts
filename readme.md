## Описание

По сути, здесь небольшой проект, и можно было просто засунуть функции рендера и обработчики событий в один-два файла. Но я решил заморочиться, и сделал на чистом TS максимально масштабируемую структуру проекта, похожую по своей сути на то, что используется в проектах на реактивных фреймворках. Плюс этой архитектуры в том, что здесь могут быть десятки страниц и компонентов, но код при этом будет оставаться структурируемым

У нас есть:

1. папка components, в ней лежат функции для рендера компонентов, а также в каждом компоненте импортируются стили для него и устанавливаются обработчики событий для этого компонента (в функции init). Благодаря новой архитектуре (добавил в конце) у каждого компонента есть доступ ко всему глобальному стейту - сделано похоже на функционал redux. Помимо глобального стейта в компонентах может быть локальный стейт. Такой используется в компонентах форм для сохранения и вывода ошибок.
2. папка state - аналог store в pinia или slices в redux. Здесь лежит глобальный стейт приложения, доступный в любом компоненте. В каждом стейте импортируются необходимые функции рендера, которые вызываются при изменении стейта через функции. В каждой из этих функций рендера есть проверка на наличие контейнера на странице, так что при масштабировании не возникнет проблем с вызовом лишних (отсутствующих на текущей странице) элементов. Также в стейтах могут инициализироваться необходимые общие для всего стейта ивенты и выполняться первичные рендеры. Основой, добавленной в новой архитектуре, является файл globalState, который связывает всё состояние между собой, и делает его доступным между компонентами
3. папка styles - классическая папка общих стилей, стилей компонентов и т.д.
4. index.html - главная страница. элементы с классами, заканчивающимися на '-js' - реактивные элементы, зависящие от стейта.
5. types - типы (конкретно здесь сделаны только типы для стейта)
6. utils - вспомогательные функции, в т.ч. валидация форм и сохранение стейта в localStorage
7. assets - шрифты, иконки, картинки

из доп. требований сделано всё: фильтрация по категориям, валидация, сохранение в localStorage и др.

также на проекте я сделал ветку old_arch. там можно посмотреть отличия в стейте до момента добавления сущности globalState. В этой архитектуре было на одну абстракцию меньше, но были свои ограничения на использование нескольких стейтов в одном компоненте

## Запуск
1. Установка зависимостей
```
npm install
```
2. Запуск в дев моде
```
npm run dev
```

или сборка

```
npm run build
```