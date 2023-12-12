# proservices-backend
Trabajo practico de la UTN Desarrollo Web Avanzado

Guia paso a paso para ejecutar el proyecto

## Instalacion

- asumimos que esta utilizando la ultima versión de `NodeJS` y `Npm`
- ir al root del proyecto

```sh
$ git clone https://github.com/rchramirez/proservices-backend.git
$ cd proservices-backend
$ npm install
```
### Configurar proyecto
Luego configurar las variables de entorno

```env
#CREDENTIALS DATABASE MYSQL
DB_USER=myuser
DB_PASSWORD=mypassword
DB_NAME=proservicesdb
DB_HOST=localhost
DB_PORT=3306
#PORT PROJECT
PORT=3000
#SECRET KEY JWT
JWT_SECRET_KEY='P@s$r^%iFo2P_21-'
#CREDENTIALS EMAIL
EMAIL_HOST=myhostemail
EMAIL_PORT=myport
EMAIL_USER=myemailuser
EMAIL_PASS=myemailpass
#URL FRONTEND
FRONTEND_URL=http://localhost:4200/api/users
```

### Ejecutar 

```sh
$ npm start
```
