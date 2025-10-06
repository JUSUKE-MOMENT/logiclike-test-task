# LogicLike EdTech — Публичная страница идей

Тестовое задание для LogicLike.
Приложение отображает список идей и позволяет пользователям голосовать за понравившиеся.
С одного IP можно проголосовать максимум за **10 разных идей**.

---

## Функциональность

* Просмотр всех идей, отсортированных по количеству голосов
* Голосование за идею (лимит — 10 голосов на IP)
* Мгновенное обновление интерфейса при голосовании
* Реальное время: обновление голосов через **SSE (Server-Sent Events)**
* Бэкенд на **Node.js + Express + TypeScript + Prisma + PostgreSQL**
* Контейнеризация бэкенда через **Docker + docker-compose**
* Фронтенд на **React + Vite + TypeScript + MUI**

## Запуск проекта

### Требования

* [Docker](https://www.docker.com/) и [Docker Compose](https://docs.docker.com/compose/)
* [Node.js 20+](https://nodejs.org/en/) и npm

---

### 1. Клонирование репозитория

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

---

### 2. Запуск базы и сервера

В папке /server

Создайте файл `.env`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/logiclike_db"
```

Вместо username подставьте свой

```bash
docker-compose up --build
```

Эта команда:

* Поднимет контейнер **PostgreSQL**
* Соберёт и запустит контейнер **Node.js-сервера**
* Выполнит автоматическую миграцию и сидирование данных через Prisma

После запуска сервер будет доступен по адресу:
 **[http://localhost:3000](http://localhost:3000)**

---

### 3. Запуск фронтенда

В папке /client

```bash
cd frontend
npm install
npm run dev
```

После запуска открой:
 **[http://localhost:5432](http://localhost:5432)**

## 💬 Примечание

> Проект выполнен в рамках тестового задания LogicLike.
> Реализовано корректное взаимодействие фронта и бэка, работа SSE и Docker-среда для быстрой проверки.

---
