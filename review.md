## Review на 3ю лабораторную работу Мартиновича Павла

- Необходимо было написать приложение/веб-приложение, иллюстрирующее работу базовых
растровых алгоритмов (4 алгоритма).
- На проверку сдаются: exe, который должен работать на любом ПК под
Windows XP /веб-приложение, выложенное в общий доступ; исходный код;
сопроводительная документация.

Рассмотрим вариант выполнения лабораторной работы как веб-приложения

Для выполнения лабораторной работы с использованием FastAPI и веб-технологий, следуйте этим рекомендациям:

1. Установка и настройка FastAPI
Создайте виртуальное окружение:
```
python -m venv venv
source venv/bin/activate  # Активировать окружение на Linux/Mac
.\venv\Scripts\activate  # Активировать окружение на Windows
```

Установите необходимые зависимости:
```
pip install fastapi uvicorn
```

Создайте структуру проекта:
```
project/
├── app/
│   ├── main.py
│   ├── static/
│   │   ├── css/
│   │   └── js/
│   └── templates/
├── venv/
└── requirements.txt
```

2. Разработка серверной части
- Создайте FastAPI приложение: Настройте маршруты для обработки запросов.
- Используйте шаблоны `Jinja2`: Для динамической генерации HTML страниц.

3. Разработка клиентской части
- HTML: Использовать \<canvas\> для отображения контента, а также форму для ввода полей и кнопки для выбора нужного алгоритма.
- JavaScript: Реализуйте алгоритмы растеризации на элементе \<canvas\>.

Общие рекомендации:
- Придерживаться модульной архитектуры
- Понятные имена переменных в snake case
- Писать документирующие комментарии к функциям
