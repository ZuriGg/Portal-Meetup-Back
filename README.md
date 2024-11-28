# MeetUp API

**MeetUp API** es una API RESTful diseñada para gestionar meetups, usuarios y sus interacciones. Proporciona herramientas para la creación, actualización, visualización y eliminación de eventos, junto con funcionalidades avanzadas de autenticación, reservas y notificaciones.

## Tabla de Contenidos

-   [Contribuyentes](#contribuyentes)
-   [Descripción](#descripción)
-   [Características](#características)
-   [Instalación](#instalación)
-   [Base de Datos](#base-de-datos)
-   [Lista de Endpoints](#lista-de-endpoints)
-   [Pruebas con Postman](#pruebas-con-postman)
-   [Extras](#extras)

## Contribuyentes:

1. Sergio Manzano
2. Paula Fernández
3. Jonathan Mendez
4. Diego Iván García

## Descripción

La **MeetUp API** permite la gestión integral de eventos, organizadores y asistentes. A través de ella, los usuarios pueden:

-   Buscar meetups próximos, filtrarlos por categorías y registrarse.
-   Gestionar sus eventos como organizadores.
-   Recibir notificaciones sobre actualizaciones de meetups (próximamente).

### Roles de Usuarios

-   **Invitado**: Puede explorar los meetups disponibles y filtrarlos por categorías.
-   **Usuario Registrado**:
    -   Puede registrarse para asistir a meetups.
    -   Personalizar su perfil y organizar eventos (que serán validados por un administrador).
-   **Administrador**:
    -   Valida los meetups creados por usuarios.
    -   Accede a herramientas avanzadas de administración para gestionar eventos y usuarios.

## Características

-   **Autenticación y Autorización**: Utilización de JSON Web Tokens (JWT) para una seguridad robusta.
-   **CRUD Completo de Meetups**: Crear, listar, actualizar y eliminar meetups.
-   **Gestión de Reservas**: Los usuarios pueden inscribirse y cancelar su asistencia.
-   **Validación Administrativa**: Los administradores validan meetups antes de que se publiquen.
-   **Notificaciones**: Alertas automáticas para los usuarios en caso de actualizaciones o eventos importantes.
-   **Gestión de Usuarios**: Registro, edición de perfil y recuperación de contraseñas.
-   **Escalabilidad**: Arquitectura modular y organizada para futuras ampliaciones.

## Instalación

1. Clonar este repositorio:

    ```bash
     git clone git@github.com:ZuriGg/Portal-Meetup-Back.git
     cd Proyecto-integrador
    ```

2. Instalar las dependencias:

    ```bash
    npm install
    ```

3. Configura las variables de entorno:  
   Crea un archivo `.env` basado en el ejemplo proporcionado (`.env.example`) e incluye las siguientes configuraciones:

    ```plaintext
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
    URL_FRONT=
    ```

4. Para la creación de las tablas de la base de datos:

    ```bash
    npm run initDb
    ```

5. Para la ejecución en modo desarrollo:

    ```bash
    npm run dev
    ```

6. Para la ejecución en producción:

    ```bash
    npm start
    ```

7. La API estará disponible en `http://localhost:<PUERTO>`.

## Base de Datos

La estructura de la base de datos incluye las tablas necesarias para gestionar meetups, usuarios, categorías y reservas.

![tablas de la Base de Datos](src/sprites_readme/image.png)

## Diseño de la Web

https://www.figma.com/proto/RVCmN0c1zJkctI68DpmXjI/Portal-Meetups?node-id=35-101&node-type=canvas&t=

Ejemplo del Home de nuestra página Web

![Ejemplo de home](src/sprites_readme/image-1.png)

## Lista de Endpoints

### **Meetups**

-   **POST** `/meetups`  
    Crear un nuevo meetup.
-   **GET** `/meetups`  
    Listar meetups según filtros.
-   **GET** `/meetups/:meetupId`  
    Detalles de un meetup específico.
-   **PUT** `/meetups/edit/:meetupId`  
    Editar un meetup existente.
-   **DELETE** `/meetups/:meetupId`  
    Eliminar un meetup.
-   **POST** `/meetups/:meetupId/inscription`  
    Inscribirse a un meetup.
-   **DELETE** `/meetups/:meetupId/registration`  
    Cancelar inscripción a un meetup.
-   **GET** `/categories`  
    Obtener las categorías disponibles.

### **Usuarios**

-   **POST** `/users/register`  
    Registrar un nuevo usuario.
-   **GET** `/users/validate/:registrationCode`  
    Validar un usuario mediante código de registro.
-   **POST** `/users/login`  
    Iniciar sesión.
-   **GET** `/users/:userId`  
    Obtener perfil privado de un usuario autenticado.
-   **PUT** `/users/edit/:userId`  
    Editar datos de un usuario.
-   **PUT** `/users/avatar`  
    Subir o cambiar avatar de usuario.
-   **POST** `/users/password/recover`  
    Enviar correo para recuperar contraseña.
-   **PUT** `/users/password`  
    Cambiar contraseña con un código de recuperación.

## Pruebas con Postman

Para facilitar las pruebas de la API, se incluye una colección de Postman:

1. Importa la colección en Postman desde el archivo `portal_meetups.postman_collection.json` ubicado en la raíz del proyecto.
2. Sigue estos pasos en Postman:
    - Ve a **File > Import**.
    - Selecciona el archivo.
    - La colección aparecerá en tu panel con todas las rutas preconfiguradas.

---

## Extras

-   **Gestión de Usuarios Inactivos**:
    -   Los usuarios sin actividad por más de un año recibirán un aviso de caducidad un mes antes de la eliminación automática.
-   **Roles Avanzados**:
    -   Los administradores pueden gestionar usuarios (próximamente funciones de baneo) y eventos desde un panel dedicado.
-   **Validación de Meetups**:
    -   Los meetups organizados por usuarios requieren validación antes de su publicación.
-   **Seguridad Adicional**:
    -   Los usuarios no validados dentro de un mes desde el registro serán eliminados automáticamente.

---

¡Gracias por contribuir y usar la MeetUp API! 💋
