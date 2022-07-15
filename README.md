# Curso de NestJS: Persistencia de Datos con TypeORM

En este archivo se detalla el procedimiento seguido en el curso para crear una API con Nest.js y TypeORM, utilizando bases de datos relacionales (Postgres y MySQL).

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

![alt text](https://raw.githubusercontent.com/typeorm/typeorm/master/resources/logo_big.png)

https://typeorm.io/

ORM: Object Relational Model

Se utiliza typeORM ya que admite TypeScript por defecto

```
npm install --save @nestjs/typeorm typeorm
```

_(Utilizar --legacy-peer-deps en caso de que sea necesario)_

Se realiza la conexión desde el módulo de _database.module.ts_.

La configuración se realiza dentro de los imports ya que es un módulo en sí.

Se debe exportar TypeOrmModule para permitir que sea utilizado por los servicios de la aplicación.

Para verificar que todo funciona bien, correr el servidor en modo producción.

```
npm run start:dev
```

En el caso de que devuelva un error, ejecutar los siguientes comandos

```
npm uninstall rxjs --save
npm install rxjs@7.2.0 --save
```

## Clase 10: Creando tu primera entidad

Se crea la entidad desde el archivo _product.entity.ts_

Para conocer todas las posibilidades que existen para definir un parámetro, se puede acceder a la documentación de TypeORM:

https://typeorm.io/entities

Cada módulo se encarga de administrar una entidad, es por ello que hay que importarlo en el módulo correspondiente. En este caso, en _product.module.ts_.

## Clase 11: TypeORM: active record vs. repositories

- Active record:
  - El modelo tiene todo a cargo.
  - Tiene la responsabilidad de hacer búsquedas y su instancia para salvar, crear o actualizar.

```
const product = new Product();
product.name = "Product 1";
await product.save();
await product.remove();
...
await Product.findOne(1);
```

- Repositories:
  - El modelo tiene como responsabilidad solo a sus atributos.
  - El repository es el que se encarga de las operaciones como salvar, crear o actualizar.

```
const productRepo = connection.getRepository(Product);

const product = new Product();
product.name = "Product 1";

await productRepo.save(product);
await productRepo.remove(product);
await productRepo.findOne(1);
```

**El modelo recomendado para Nest.js es el de repositories.**

Se realiza la implementación en el archivo _product.service.ts_.

Se corrigen los endpoints en el archivo _product.controller.ts_.

Se deben corregir las inconsistencias que se van marcando en consola.

También se configura el módulo de database para que la ejecución sea sincronizada con la base de datos, dentro del archivo _database.module.ts_.

Para ver en detalle la documentación de TypeORM en el llamado a la base de datos, consultar:

https://typeorm.io/#loading-from-the-database

## Clase 12: Crear, actualizar y eliminar

Se escribe el código para crear, actualizar y eliminar en el archivo _product.service.ts_.

Se verifican los endpoints desde _product.controller.ts_, pero generalmente no debería ser necesario actualizarlos.

## Clase 13: Cambiar a Mysql demo (opcional)

1. Se crea un contenedor en docker con una base de datos MySQL y un administrador de bases de datos phpMyAdmin en el archivo _docker-compose.yml_.
2. Se corren ambos contenedores desde la terminal

```
docker-compose up -d mysql
docker-compose up -d phpmyadmin
```

Se agregan las variables de entorno en los archivos _.env_, _.prod.env_ y _.stag.env_.

```
MYSQL_DATABASE=my_db
MYSQL_USER=root
MYSQL_ROOT_PASSWORD=123456
MYSQL_PORT=3306
MYSQL_HOST=localhost
```

Se añade al archivo _config.ts_ la conexion a la base de datos de MySQL.

Una vez añadida la configuración de la nueva base de datos, desde el archivo _database.module.ts_ se puede seleccionar la base de datos a utilizar.

Para que funcione correctamente es necesario instalar el driver de mysql

```
npm i mysql2 --save
```

_(Utilizar --legacy-peer-deps en caso de que sea necesario)_

# 04. Migraciones

## Clase 14: Sync Mode vs. Migraciones en TypeORM

TypeORM migration definition:

> A migration es just a single file with sql queries to **update a database schema and apply new changes** to an existing database.

## Clase 15: Configurando migraciones y npm scripts

Se configuran las migraciones con TypeORM.

https://orkhan.gitbook.io/typeorm/docs/using-cli

https://typeorm.io/using-cli

Se agregan las variables de entorno para realizar la conexión a la base de datos en Postgres desde TypeORM en los archivos _.env_, _.prod.env_ y _.stag.env_.

```
TYPEORM_CONNECTION=postgres
TYPEORM_HOST=localhost
TYPEORM_USERNAME=root
TYPEORM_PASSWORD=123456
TYPEORM_DATABASE=my_db
TYPEORM_PORT=5432
TYPEORM_SYNCHRONIZE=false
TYPEORM_LOGGING=true
TYPEORM_ENTITIES=src/**/*.entity.ts

TYPEORM_MIGRATIONS=src/database/migrations/*.ts
TYPEORM_MIGRATIONS_DIR=src/database/migrations
TYPEORM_MIGRATIONS_TABLE_NAME=migrations
```

Se agregan dos scripts en el archivo _package.json_. El primero para correr TypeORM CLI desde node:

```
"typeorm": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js",
```

Utilizamos la tarea generada anteriormente en un nuevo script para generar las migraciones:

```
"migrations:generate": "npm run typeorm -- migration:generate -n"
```

Esta forma de utilizar las migraciones es válida hasta la versión 0.2.45 de TypeORM, por lo tanto correr los comandos:

```
npm remove typeorm
npm install typeorm@0.2.45 --save
```

_(Utilizar --legacy-peer-deps en caso de que sea necesario)_

## Clase 16: Corriendo migraciones

Para correr las migraciones se genera el script:

```
"migrations:run": "npm run typeorm -- migration:run",
```

Se debe tener en cuenta que al momento de correr migraciones, la propiedad _synchronize_ del archivo _database.module.ts_ debe estar en _false_.

Para ver las migraciones que se han corrido hasta el momento:

```

"migrations:show": "npm run typeorm -- migration:show",
```

Para borrar todo, limpia la base de datos:

```
"migrations:drop": "npm run typeorm -- migration:drop"
```

Para revertir una migración:

```
"migrations:revert": "npm run typeorm -- migration:revert"
```

Para ver más comandos disponibles se puede consultar la documentación oficial:

https://typeorm.io/migrations

## Clase 17: Modificando una entidad

Se importa _CreateDateColumn_ y _UpdateDateColumn_ en el archivo _product.entity.ts_ para generar dos nuevas propiedades a la entidad _Product_.

Para crear una nueva migracion, se corre en consola el comando:

```
npm run migrations:generate -- add-fields
```

Aquí se genera una nueva migración.

Para correr la nueva migración:

```
npm run migrations:run
```

# 05. Relaciones

## Clase 18: Relaciones uno a uno

Se crea la relación de user - customer.

Se modifica la entidad de User desde el archivo _user.entity.ts_.

Se modifica la entidad de Customer desde el archivo _customer.entity.ts_.

Se modifica el servicio de User desde el archivo _user.service.ts_.

Se modifica el servicio de Customer desde el archivo _customer.service.ts_.

Se modifica el módulo de User para agregar la importación de las nuevas entidades, en el archivo _users.module.ts_.

En las relaciones uno a uno, no es determinante en donde se enuncia la relación. Puede que por utilidad sea preferible que se encuentre en una u otra tabla, pero por motivos prácticos es exactamente lo mismo.

En este caso, es preferible que la relación quede del lado de User. Además, esta relación puede ser nula.

TypeORM brinda la posibilidad de que la relación sea bidireccional. De esta forma se puede observar la relación en ambas tablas.

Desde el lado de User, quedará de la siguiente forma:

```
@OneToOne(() => Customer, (customer) => customer.user, { nullable: true })
@JoinColumn()
customer: Customer;
```

Y del lado de Customer:

```
@OneToOne(() => User, (user) => user.customer, { nullable: true })
user: User;
```

Se crea una nueva migración para crear las nuevas tablas.

```
npm run migrations:generate -- create-user-customer
```

Se corren las migraciones:

```
npm run migrations:run
```

## Clase 19: Resolviendo la relación uno a uno en el controlador

Se trabaja en el dto de Users desde el archivo _user.dto.ts_ agregando:

```
@IsOptional()
@IsPositive()
@ApiProperty()
readonly customerId: number;
```

Se modifica el servicio de User desde el archivo _user.service.ts_ para agregar la relación en el momento de crear un nuevo usuario.

Desde _users.service.ts_ se indica que al momento de buscar un usuario se exponga la información del customer relacionado.

## Clase 20: Relaciones uno a muchos

Esta relación se hará desde marcas a productos. Una marca puede tener muchos productos, pero un producto solo puede tener una marca.

La relación la debe cargar el lado débil, es decir, el producto.

Se modifica el archivo de la entidad _product.entity.ts_, incorporándose:

```
@ManyToOne(() => Brand, (brand) => brand.products)
brand: Brand;
```

Aquí no se coloca el decorador @JoinColumn() ya que TypeORM ya sabe que la relación la debe cargar la entidad que posea el decorador @ManyToOne().

TypeORM permite tener relaciones bidireccionales (colocándola de manera explicita de ambos lados), por lo que se modifica el archivo de la entidad _brand.entity.ts_, incorporándose:

```
@OneToMany(() => Product, (product) => product.brand)
products: Product[];
```

Se modifica el archivo de servicios de _brands.service.ts_.

Se debe verificar que todas las entidades se importen correctamente en el archivo _products.module.ts_.

Se crea una nueva migración para impactar los cambios en las tablas.

```
npm run migrations:generate -- create-user-customer
```

Se corren las migraciones:

```
npm run migrations:run
```

## Clase 21: Resolviendo la relación uno a muchos en el controlador

Se modifica el dto de producto desde el archivo _product.dto.ts_ para agregar el nuevo parámetro:

```
@IsPositive()
@IsNotEmpty()
@ApiProperty()
readonly brandId: number;
```

Se modifica el archivo _product.service.ts_ para considerar la nueva variable.

Se modifica el archivo _brand.service.ts_ para considerar la nueva variable.

## Clase 22: Relaciones muchos a muchos

La relación muchos a muchos necesita de una tabla ternaria. TypeORM realiza este trabajo por detrás, quitando la necesidad de crear esta tabla.

Para configurar una relación muchos a muchos, se usa el decorador _@ManyToMany_.

La relación muchos a muchos se coloca de manera bidireccional, es decir en ambas entidades.

Dentro de la entidad de category, en el archivo _category.entity.ts_, se incorpora:

```
@ManyToMany(() => Product, (product) => product.categories)
products: Product[];
```

Dentro de la entidad de product, en el archivo _product.entity.ts_, se incorpora:

```
@ManyToMany(() => Category, (category) => category.products)
@JoinTable()
categories: Category[];
```

El decorador _@JoinTable()_ solo debe estar presente en la tabla que cargue con la relación.

También se modifica el archivo _categories.service.ts_.

Se inporta la entidad en el archivo _products.module.ts_.

## Clase 23: Resolviendo la relación muchos a muchos en el controlador

Se modifica el dto de producto desde el archivo _product.dto.ts_ para agregar el nuevo parámetro:

```
@isArray()
@IsNotEmpty()
@ApiProperty()
readonly categoriesIds: number[];
```

Se modifica el archivo _product.service.ts_ para realizar consultas en productos que muestren los resultados de las categorias a las cuales pertenecen.

Se modifica el archivo _categories.service.ts_ para realizar consultas de las categorías que muestren los productos que contiene.

## Clase 24: Manipulación de arreglos en relaciones muchos a muchos

Se crean dos nuevos endpoints desde _product.controller.ts_.

El primer controller es para eliminar una categoria ya existente en un producto:

```
@Delete(':id/category/:categoryId')
```

El segundo controller es para agregar una nueva categoria en un producto:

```
@Put(':id/category/:categoryId')
```

Ambos controladores requieren solo del parametro incorporado en la url, por lo que no es necesario enviar un body en la petición.

La logica de cada endpoint se genera en el archivo _product.service.ts_:

- Para eliminar una categoria del producto:

```
      removeCategoryByProduct()
```

- Para agregar una categoria del producto:

```
      addCategoryToProduct()
```

## Clase 25: Relaciones muchos a muchos personalizadas

Para crear relaciones muchos a muchos personalizadas, TypeORM indica que es necesario crear la tabla ternaria que manejará esta relación.

La relación muchos a muchos personalizada se realiza entre las entidades de Product y Order, en donde muchos productos pueden pertenecer a muchas ordenes de compra.

Además, se agrega una columna extra para indicar cuantos productos se agregan a una orden de compra.

Se trabaja inicialmente sobre el archivo _order.entity.ts_ para crear todos los parametros de la entidad.

Se agrega una relacion uno a muchos entre Customer y Orders en el archivo _customer.entity.ts_ como se vió anteriormente.

Se crea la entidad ternaria para relacionar orders y products con el nombre de _order-item.entity.ts_.

Se importan ambas nuevas entidades al archivo _users.module.ts_.

## Clase 26: Resolviendo la relación muchos a muchos personalizada en el controlador

Se crea el dto de orders en el archivo _orders.dto.ts_.

Se crean el servicio y el controlador para las ordenes de compra:

```
nest g s users/services/orders --flat
nest g co users/controllers/orders --flat
```

Se crea toda la lógica de CRUD en el servicio de orders en el archivo _orders.service.ts_.

Se crean los endpoints para dicho CRUD desde el archivo _orders.controller.ts_.

Para gestionar los porductos dentro de cada orden, se crea un nuevo dto, el _order-item.dto.ts_.

```
export class CreateOrderItemDto {
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly orderId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly productId: number;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly quantity: number;
}
```

Se crean el servicio y el controlador para las relaciones entre ordenes de compra y productos:

```
nest g s users/services/order-item --flat
nest g co users/controllers/order-item --flat
```

Se crea toda la lógica de CRUD en el servicio de orders en el archivo _order-item.service.ts_.

Se crean los endpoints para dicho CRUD desde el archivo _order-item.controller.ts_.

# 6. Consultas

## Clase 27: Paginación

## Clase 28: Filtrando precios con operadores

## Clase 29: Agregando indexadores

## Clase 30: Modificando el naming

## Clase 31: Serializar

# 7. Próximos pasos

## Clase 32: Cómo solucionar una referencia circular entre módulos

## Clase 33: Continúa con el Curso de NestJS: Autenticación con Passport y JWT
