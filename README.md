# SalesScreen

Development of a Sales Screen Prototype

# Server

```
    composer create-project --prefer-dist laravel/laravel server
```

# View

```
    npx create-react-app view

    npm install react-router-dom --save

    npm install react-bootstrap bootstrap

    npm install axios

    npm install react-icons --save

    sudo sysctl -w fs.inotify.max_user_watches=100000
```

# Database

```
    psql --user postgres --host 127.0.0.1

    CREATE DATABASE alfa;

    CREATE USER alfa with encrypted password 'P@ssw0rd';

    GRANT ALL PRIVILEGES ON DATABASE alfa to alfa;
```

# Run

```
    cp .env.example .env
```