# Authentication, Identity and Licenses with permissions Server
## After downloading the project from git
```
yarn install
```
## Postgresql server
You need a database to store user, licenses, permissions, etc.
Get the connection string with the right user credentials or create locally a Postgres docker instance with the following docker-compose.yml file :
```
# Use postgres/example user/password credentials
version: '3.1'

services:

  db:
    image: postgres
    restart: always
    environment:
      POSTGRES_PASSWORD: [put a strong password here]
    ports:
      - 5432:5432

```

then launch your docker container by typing ```docker-compose up -d``` in this file directory.
Your postgresql connection string will be : 
```postgresql://postgres:[your password]@localhost:5432/users?schema=public```

## Generate RSA key pair for JSON Wev Token
### to generate a key pair with PEM private key and public key
ssh-keygen -b 4096 -t rsa -m PEM -f [filename] 
### get the PEM public key from PEM private key
openssl rsa -in [filename].pem -pubout > [filename].pub.pem
## Create a .env file with the right values
```
DATABASE_URL=[your postgresql server connection string]

PRIVATE_KEY=[the BASE64 content of your PEM private key without beginning and ending line]

PUBLIC_KEY=[the BASE64 content of your PEM public key without beginning and ending line]
```
## Run migration script to create database
```
yarn prisma migrate dev
```
## launch the server, it will be available at http://localhost:3000
```
yarn dev
```
A Swagger describing all the endpoints is available at http://localhost:3000/documentation