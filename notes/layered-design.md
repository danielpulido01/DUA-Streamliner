# Layered Design
Diseño gráfico de las capas de una arquitectura, no hay un standard. \
Pero sí deben estar claros los Dominios de RESPONSABILIDAD de los objetos y la programación en las arquitecturas

## Componentes visuales 
(esto ya se decidió en la sección de component design strategy)

### Components
- atoms
- molecules
- organisms
- templates
- pages

## Hooks
Acciones que se disparan desde los componentes de react

## Business Logic
Procesos, workflows de la aplicación\
Domain Layer

## State Management
¿Cómo memorizo estados?\
Hay que agregarlo en el technology stack, por ejemplo redux 5.0.1, mutex

## API / Data Access Layer
Llamadas externas como mi API backend, AI, etc\
Esto podría llamarse ApiClients, services, etc

## Utils
Lo que no sabemos a donde poner\
Algoritmos, cálculos matemáticos, hash, random, etc

## Data Validation / Schema Layer
Validaciones de input data y data retornada por APIs

## Security
Este se subdivide en:
- Authentication Layer
- Authorization Layer

## Models
Objetos del dominio: Casa, Carro, Usuario, DUA

## Testability / Testing Layer

## Observability
Reportar logs, eventos, todo lo que está sucediendo en la aplicación

## Accesibility
No lo vamos a tomar en cuenta

## Settings
Para extraer valores asegurados o variables de ambiente

## Routing
Hace sentido cuando hay que conectarse a muchas fuentes

## Notification Listeners
Es necesario si hay muchos eventos asíncronos que los usuarios tienen que recibir



# Lo que hay que hacer
Definición de las relaciones y dependencias entre las capas que deseamos en nuestro Frontend, para ello es mejor ir pensando la secuencia:
- El frontend hace render SSR
- Si no hay sesión autenticada, entonces se procede a invocar al Authentication Layer
- Si la autenticación es exitosa, se accede y se hace render del recurso visual en la capa de components 
- Los componentes siguen atomic design: atoms, molecules, organisms, templates, pages y dentro de componentes existe un layer Hooks, que conecta las acciones de los componentes visuales con la capa de serivces
- Services tienen las operaciones de la aplicacion.
- Los services podrían requerir para realizar las tareas de acceder al layer de Utils, ApiClients y Settings
- ApiClients contiene todas las clases que acceden a apis externas
- Settings accede a variables de ambiente en Azure Key Vault cuando se hace render
- ApiClients lee los api keys y urls desde Settings
- Todas las llamadas y retornoes de ApiClients usan classes en Models que son validados por la capa de DataValidation
- Todos los layers pueden acceder a los layers de Models, Utils y StateManagement
- El layer de Notification Service permitirá que otros layers se suscriban a escuchar eventos por medio de callback urls (mejor usar promises/async-await)
- Cuando las llamadas a API son asíncronas siempre se hará por callback usando el notification service layer
- Logs layer ofrece clases para registrar los eventos del sistema que son enviados por medio de ApiClients
- Exception Handling Layer










