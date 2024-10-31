# MeetUp API

Este proyecto es una API RESTful para gestionar meetups (eventos y reuniones). Permite crear, listar, actualizar y eliminar meetups, gestionar usuarios y administrar las reservas para cada meetup.

## Contribuyentes:

Sergio Manzano
Paula Fernández
Jonathan Mendez
Diego Iván García
Angel Suárez

## Descripción

Esta API facilita la creación y gestión de meetups. Los usuarios pueden buscar eventos próximos, crear nuevos meetups, reservar su lugar y recibir notificaciones de cambios.

## Características

-   Autenticación y Autorización: Utiliza JWT para la autenticación segura de usuarios.
-   CRUD de Meetups: Crear, leer, actualizar y eliminar meetups.
-   Gestión de Usuarios: Registro e inicio de sesión de usuarios, con permisos de administración para la creación de meetups.
-   Reservas: Permite a los usuarios reservar su asistencia a los meetups.
-   Notificaciones: Los usuarios reciben notificaciones al registrarse en un meetup o cuando hay actualizaciones.
-   Escalabilidad: Arquitectura basada en microservicios y separación de responsabilidades.

## Instalación

1- Clonar este repositorio:
git clone git@github.com:ZuriGg/Proyecto-integrador.git
cd Proyecto-integrador

2- Instalar las dependencias:
npm i

3- Crear un archivo .env a partir del .env.example en la raíz del proyecto con las siguientes variables de entorno:
MYSQL_HOST=
MYSQL_USER=
MYSQL_PASS=
MYSQL_DB=
MYSQL_PORT=
PORT=
SECRET=
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=

4- Para la ejecución en modo desarrollo:
npm run dev

5- Para la ejecución en producción:
npm start

6- La API estará disponible en http://localhost:(puerto que configures).

## Base de Datos

![tablas de la Base de Datos](image.png)

## Diseño de la Web

https://www.figma.com/proto/RVCmN0c1zJkctI68DpmXjI/Portal-Meetups?node-id=35-101&node-type=canvas&t=

Ejemplo del Home de nuestra página Web

![Ejemplo de home](image-1.png)

## Lista de Endpoints
