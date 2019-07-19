# README

* Build the backend

docker-compose run web rails new . --force --no-deps --database=postgresql

* Boot the backend

docker-compose up

* Create database in other terminal

docker-compose run web rake db:create

* Stop the backend

docker-compose down

* Run Migrations

docker-compose run web rake db:migrate

