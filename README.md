# Curso de NestJS: Persistencia de Datos con TypeORM

# 01. Introducción

## Clase 01: ¿Ya terminaste el Curso de NestJS: Programación Modular?

--

## Clase 02: Platzi Store: presentación del proyecto e instalación

Se clona el proyecto nestjs-modular:

```
git clone --branch final-step https://github.com/platzi/nestjs-modular.git nestjs-typeorm
```

Se instalan las dependencias:

```
npm install --legacy-peer-deps
```

_(Utilizar --legacy-peer-deps en caso de que sea necesario)_

Se crean las variables de entorno en la raíz del proyecto:

```
.env
.stag.env
.prod.env
```

Se inicia el servidor en modo desarrollo

```
npm run start:dev
```

# 02. Database

## Clase 03: Cómo instalar Docker para este proyecto

--

## Clase 04: Configuración de PostgresSQL en Docker

Se crea el archivo docker-compose.yml en la raíz del proyecto.

Se levanta el contenedor con el comando:

```
docker compose up -d postgres
```

Para verificar que contenedores estan corriendo, ejecutar el comando:

```
docker-compose ps
```

Para levatar o bajar un contenedor de docker correr el comando:

```
docker-compose up -d <container-name>
docker-compose down -d <container-name>
```

Los contenedores por defecto no tienen un estado, es decir que cada vez que se bajan se pierde la información guardada en ellos.

Para evitar esto, se incorpora el "volumen" en el archivo docker-compose.yml

## Clase 05: Explorando postgres con interfaces gráficas y terminal

Para verificar los logs del contenedor _postgres_ que esta corriendo en docker, ejecutar el comando:

```
docker-compose logs -f postgres
```

Aquí se pueden observar los posibles errores al correr el contenedor.

Para ejecutar comandos en la base de datos que corre el contenedor, ejecutar el comando:

```
docker-compose exec postgres bash
```

Esto levanta una terminal de comandos.

Para conectarse a la base de datos:

```
psql -h localhost -d my_db -U root
```

Para ver que tablas hay creadas:

```
/d+
```

Si corre este comando, significa que ya has ingresado a la base de datos.

Aquí ya se puede correr cualquier comando hacia la base de datos.

Para salir de este entorno:

```
\q
```

Para salir del contenedor:

```
exit
```

Para conectarse a la base de datos por medio de una interfáz gráfica, se incorpora la configuración de pgadmin dentro del archivo _docker-compose.yml_.

Una vez configurado el archivo _docker-compose.yml_, se puede lanzar el entorno web con el comando:

```
docker-compose up -d pgadmin
```

Para verificar que servicios estan corriendo en docker

```
docker-compose ps
```

Para ver la interfaz web, ingresar al puerto donde se está corriendo pgadmin: _localhost:5050_.

Loguear con el usuario y contraseña configurado en el archivo _docker-compose.yml_.

Una vez dentro de pgadmin, es necesario crear el servidor. Para ello, ingresar en la pestaña **Object > Register > Server**.

Colocar un nombre al servidor, por ejemplo _my_db_.

En la pestaña de **Connection** ingresar el **Host name/address: postgres** o la IP donde está corriendo el contenedor.

_Ver video para verificar el IP._

Colocar tambien el **user: root** y **password: 123456**.

## Clase 06: Integración de node-postgres con NestJS

Se utiliza el driver oficial para conectar node y postgres:

_(Utilizar --legacy-peer-deps en caso de que sea necesario)_

```
npm i pg --legacy-peer-deps
```

Como el driver oficial no soporta tipado de TypeScript, instalamos la dependencia para incluir este tipado, en entorno de desarrollo:

```
npm i @types/pg -D --legacy-peer-deps
```

Se importa esta funcionalidad en el archivo _app.module.ts_ (que luego se trasladará hacia el módulo correspondiente _database.module.ts_) y se crea una instancia de la conexión con > new Client.

## Clase 07: Conexión como inyectable y ejecutando un SELECT

Para seguir con la programación modular, se traslada el código de conexión hacia la base de datos hacia su módulo particular, _database.module.ts_.

Como _database.module.ts_ es un módulo global, cualquier _@injectable_ que se coloque aquí dentro podrá ser visto por los demás servicios.

Como _client_ es un objeto, se puede exportar como una variable, por lo tanto se utiliza _useValue_.

Una vez configurado el provider, debe exportarse para que pueda ser utilizado por los demás servicios de la aplicación.

Se genera un nuevo método en _app.service.ts_ para evaluar la conexión con la base de datos.

Se crea un nuevo endpoint en _app.controller.ts_ que hace uso de este método recién creado.

## Clase 08: Usando variables de ambiente

Se crean las variables de ambiente con los archivos:

```
.env
.stag.env
.prod.env
```

Se agrega la validación de datos de postgres mediante Joi en el archivo _app.module.ts_.

Se agrega la configuracion de postgres en el archivo _config.ts_.

Se cambia el _useValue_ utilizado anteriormente para el provider de postgres (en el archivo _database.module.ts_) por _useFactory_, ya que permite realizar conexiones asíncronas e inyectar valores dentro del mismo provider.

Se realiza la conexión dentro del provider _useFactory_ mediante las variables de entorno.

Para utilizar esta conexión y realizar la interacción con la base de datos, se crea un nuevo método dentro del servicio de usuarios, en el archivo _users.service.ts_.

Se crea un nuevo endpoint en el archivo _users.controller.ts_ para acceder a este método recien creado.

# 03. TypeORM

## Clase 09: ¿Qué es un ORM? Instalando y configurando TypeORM Module

## Clase 10: Creando tu primera entidad

## Clase 11: TypeORM: active record vs. repositories

## Clase 12: Crear, actualizar y eliminar

## Clase 13: Cambiar a Mysql demo (opcional)

# 04. Migraciones

## Clase 14: Sync Mode vs. Migraciones en TypeORM

## Clase 15: Configurando migraciones y npm scripts

## Clase 16: Corriendo migraciones

## Clase 17: Modificando una entidad

# 05. Relaciones

## Clase 18: Relaciones uno a uno

## Clase 19: Resolviendo la relación uno a uno en el controlador

## Clase 20: Relaciones uno a muchos

## Clase 21: Resolviendo la relación uno a muchos en el controlador

## Clase 22: Relaciones muchos a muchos

## Clase 23: Resolviendo la relación muchos a muchos en el controlador

## Clase 24: Manipulación de arreglos en relaciones muchos a muchos

## Clase 25: Relaciones muchos a muchos personalizadas

## Clase 26: Resolviendo la relación muchos a muchos personalizada en el controlador

# 6. Consultas

## Clase 27: Paginación

## Clase 28: Filtrando precios con operadores

## Clase 29: Agregando indexadores

## Clase 30: Modificando el naming

## Clase 31: Serializar

# 7. Próximos pasos

## Clase 32: Cómo solucionar una referencia circular entre módulos

## Clase 33: Continúa con el Curso de NestJS: Autenticación con Passport y JWT
