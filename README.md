# API para Clon de Chat

## Descripción
Este proyecto es el backend de un clon funcional de una aplicación de chat, desarrollado con Node.js, Express y MongoDB como Trabajo Final Integrador del curso.

El objetivo principal fue construir una API RESTful que gestione usuarios, chats y mensajes, integrando la lógica del servidor con persistencia de datos en MongoDB.

La API está preparada para conectarse con un frontend (por ejemplo, un clon de chat en React) y permite realizar operaciones CRUD sobre usuarios, chats y mensajes, siguiendo buenas prácticas de organización y manejo de errores.

## Cómo usar

### Opción A:
Ingresar a https://diplofullstack-tp-final-nodejs-pdm.vercel.app/

### Opción B:
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/BrunoBoccasile/diplofullstack_tp_final_nodejs.git
2. Instalar dependencias:
   ```bash
   npm install
3. Configurar variables de entorno
    ```bash 
    PORT=8000
    MONGODB_URI=<tu_uri_mongodb>
4.  Ejecutar el proyecto:
    ```bash 
    npm run dev



## Funcionalidad

### Endpoints de la API

- ROUTE /api/users
    - Endpoints:
        - POST - Crea usuario
        - DELETE - /:id - Elimina usuario
        - GET - Obtiene todos los usuarios
        - GET - /:id - Obtiene un usuario por id
- ROUTE /api/chats
    - Endpoints:
        - POST - Crea chat
        - GET - Obtiene todos los chats
        - GET - /:id - Obtiene un chat por id
- ROUTE /api/messages
    - Endpoints:
        - POST - Crea mensaje
        - GET - Obtiene todos los mensajes por chat id
        - GET - /:id - Obtiene un mensaje por id
- Formato estándar de respuesta
    ```bash 
    {
    "ok": true,
    "message": "Mensaje descriptivo",
    "data": { ... }
    }
### Base de datos (MongoDB)

Colecciones:

users → Información de usuarios

chats → Chats entre usuarios (con índice único compuesto para evitar duplicados)

messages → Mensajes asociados a chats y usuarios

Relaciones:

Cada message tiene chat_id y sender_user_id.

Cada chat tiene dos participantes (user_id_1, user_id_2) normalizados en orden ascendente para evitar duplicados A-B / B-A.

## Buenas prácticas aplicadas

- Código separado en carpetas: routes, controllers, models, repository, helpers.

- Manejo centralizado de errores con middleware personalizado (handleError).

- Validaciones básicas de datos y ObjectId antes de consultar la base.

- Uso de índices únicos compuestos para prevenir duplicados.

- Respuestas consistentes y claras para frontend.

- Preparado para integración con frontend React.

## Integración con frontend

La API está lista para ser consumida por un frontend React o Angular.

- Ejemplo de flujo:

    - Frontend obtiene lista de chats: GET /chats

    - Selecciona un chat y obtiene mensajes: GET /messages/ y chat_id en el body

    - Envía un mensaje: POST /messages

    - El backend valida, guarda en MongoDB y responde con el mensaje guardado

## Créditos
- Autor: Bruno Boccasile
- Curso: NodeJS
