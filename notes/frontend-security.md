# Security
Hay que definirlo muy temprano en el proyecto, va muy ligado en cómo funciona la seguridad del frontend y del backend
- La plataforma de seguridad es transversal al sistema; considera Frontend, Backend, Data, 3rd Parties.

## Autenticación
Saber quíen es? Identificar.
Usamos el triangulo de seguridad:
- Algo que se: Pin, password
- Algo que soy: Biometrics (fingerprint, face id, ojos)
- Algo que poseo: Token, Autentication app, correo, etc

Autenticación segura debe usar mínimo 2 elementos del triángulo. Normalmente no se usan 3.

Login suele pedir user and pass, eso me lleva a un estado de verificación donde usamos telefono, email, token, auth app, etc. Esto es Multifactor Authentication. Si valida estas grant access.

En el caso hay que decir si soporta MFA, por qué medio (dispositivo físico, email, auth app)

Normalmente el proceso de autenticación Single app tiene:


|Emisor|Autenticador|Servidor de Credenciales|
|-----|-----------|--------------------|
|Hace login con user y pass| Envía el token al servidor | Tiene bytes cifrados, info de usuario. Claims, tag. Hora. Refresh time. Refresh Token

Cuanto el token regresa al autenticador se crea una sesión. El autenticador regresa al usuario el token y la sesión.

Ya aquí el usuario puede comunicarse con mis recursos (Api, Web, Network Drive, Post shared, etc).
Se le envía el Access token a los recursos y la información se cifra con la llave del token.
Los recursos se comunican con mi autenticador para ver si el token es válido y si no ha expirado.
El autenticador le regresa a mi recurso la llave para desencriptar la información correspondiente al token.
Si logra desencriptar la data es porque ya tiene acceso

Hay que definir si es Single App Autentication o Single Sign On

Para varias apps se usa Single Sign On (si me autentico en gmail, no me tengo que volver a autenticar en calendar/drive)

app 2 hace login, app 1 y 3 pueden entrar directamente con los cookies

App 1 --------------
                    |
App 2 -----------> Authenticator ----> Servidor de auth
                    |
App 3 --------------
         Sin login (me lo salto con el cookie)

#### Sistema con recursos distribuidos
Tengo 3 apps y varias apis, puedo tener un mismo servidor de credenciales pero diferentes autenticadores. Como el token se almacena en el autenticador, si el app accede a otro recurso con autenticador diferente no va a identificar la sesión. Para esto usamos un Storage o Cache de sessions. Entonces todos los autenticadores si no encuentran el token revisan primero el storage o cache y si no existe si van al server.

El protocolo para todo es Auth0, gracias a esto lo podemos integrar mediante distintos proveedores

Según dónde vamos a hostear el app, hay que ver qué servicios de autenticación hay? 

|Authenticator|Credential Server|
|-----|-----------|
|AWS Cognito|AMI (nativo de ellos) / OKTA|
|Azyre MS Entra ID|Auth0 Server|
|GCP|Auth0 Server|
|Auth0|Auth0|
|OKTA|OKTA|

Defino si quiero una autenticación single app con entra o algo escalado también con entra. La misma herramienta la puedo usar si es single app o sso.

Para el session tengo que ver si el servicio de hosting tiene un servicio de sesiones nativo o cache de sesiones. Es probable que nos diga que usemos algo como Redis, Memcached

Tengo que definir si voy a agregar varios métodos de autenticación o si lo dejo con solo uno

Agregar Authenticator server name en el readme

## Authorization
Esto define lo que el usuario puede hacer.
- RBAC = Role Based Access Control
  - ¿cuáles roles? 
  - Role name, descripción
- ACL = Access List
  - Mi Access List es por email, IP address, etc
  - Si tiene esto hay que decir el tipo y el servicio de ACL (provee el cloud)
- PBAC = Policy Based Access Control
  - Un usuario puede entrar solo a 3 dispositivos simultáneos
  - Qué políticas de acceso hay y el nombre del servicio de políticas?

Permiso es muy parecido a claims

Cuando el server de auth me regresa un token, puede venir con los claims. En el credential server puedo definir los claims que se le asignan a un usuario o a un rol.

Hay que definir si es RBAC, ACL o PBAC

Tengo que poner una lista de permisos en el readme

|Código|Descripción|
|-----|-----------|
|UPLOAD-DUA|El usuario puede actualizar la pantalla default del DUA|
|OPEN-FOLDER|Abre una carpeta bla bal bla|


Cuál es el servicio de secure storage para env variables, keys y sensitive data?
- En Azure usar Key Vault
- iOS keychain
- GCP Cloud Key Management Service


