# Relp

Relp is a web application inspired by Yelp, that allows users to search restaurants and review them.

This Project is built with:
* Python
* SQLAlchemy
* Flask
* PostgreSQL
* React
* Redux

Project Wiki
* [Feature List](https://github.com/katyky14/capstone_project/wiki/MVP-Feature-List)
* [Database Schema](https://github.com/katyky14/capstone_project/wiki/Database-Schema)
* [API Documentation](https://github.com/katyky14/capstone_project/wiki/API-Documentation)


## Features Directions:

### Home Splash Page

![Screenshot 2022-11-02 at 2 39 20 PM](https://user-images.githubusercontent.com/73508540/199607988-d658322f-fa19-4032-85e6-8e2dd359f370.png)


### Log In Page

![Screenshot 2022-11-02 at 2 40 39 PM](https://user-images.githubusercontent.com/73508540/199608042-d653eef5-80eb-4836-9b0c-3cd48d450a0a.png)


### Sign Up Page

![Screenshot 2022-11-02 at 2 40 54 PM](https://user-images.githubusercontent.com/73508540/199608075-ed1a6bcd-54d7-401c-9718-8dba0ca8c6f7.png)


### Business Home Page

![Screenshot 2022-11-02 at 2 42 59 PM](https://user-images.githubusercontent.com/73508540/199608239-3b833d60-e84c-45c6-af44-e73068c984fa.png)


### Business Detail Page

![Screenshot 2022-11-02 at 2 43 50 PM](https://user-images.githubusercontent.com/73508540/199608337-0ca4d0b5-b7d9-4c16-9589-030418583ef5.png)


### Create a Business

![Screenshot 2022-11-02 at 2 44 20 PM](https://user-images.githubusercontent.com/73508540/199608407-4f2387dc-0d40-40c9-930c-f434fcb2a942.png)


### Edit a Business

![Screenshot 2022-11-02 at 2 44 55 PM](https://user-images.githubusercontent.com/73508540/199608511-2bc0acb0-78f6-4ae2-8ae3-5d094d04da0b.png)


### Delete a Business

![Screenshot 2022-11-02 at 2 50 33 PM](https://user-images.githubusercontent.com/73508540/199609335-b36c6944-b957-4fdb-9e9f-a90eb2b1fddf.png)




### Business Reviews

![Screenshot 2022-11-02 at 2 45 48 PM](https://user-images.githubusercontent.com/73508540/199608622-16929e0c-b9d0-4a1f-b85b-9cfa9cb86a0c.png)


### Create a review

![Screenshot 2022-11-02 at 2 47 01 PM](https://user-images.githubusercontent.com/73508540/199608823-a1de0a03-e63d-4c1b-9064-89210ce91e57.png)


### Edit a Review

![Screenshot 2022-11-02 at 2 47 39 PM](https://user-images.githubusercontent.com/73508540/199608922-a17d9c22-9052-47dc-910d-e986be4435e4.png)


### Delete a Review

![Screenshot 2022-11-02 at 2 48 20 PM](https://user-images.githubusercontent.com/73508540/199609014-431d2d54-ed19-4236-939f-eccea9284610.png)



## Run this project locally

* Clone the main repository of Buy Ktsy
* Open the project root directory, cd into app and run the command pipenv install. Then cd in to react-app and npm install to install the required packages
* Create a .env file similar to the .env example located in teh app folder
* Create the database in the app by running pipenv run flask db migrate, flask upgrade, and flask seed all.
* Then enter the cammand pipenv flask run in the app folde, and npm start in the react-app folder.
