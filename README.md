# DUA-Streamliner

## Problem Statement

The preparation process of the Single Customs Declaration (DUA) in Costa Rica is manual, repetitive, and highly dependent on expert knowledge. To complete it correctly, multiple source documents must be interpreted — including commercial invoices, packing lists, certificates of origin, bills of lading, and insurance policies — which are typically provided in heterogeneous formats such as Excel, Word, PDF, and scanned images, often with varying structures.

This documentary diversity requires case-by-case interpretation, increasing the risk of errors, value inconsistencies, missing information, and potential penalties or delays in import and export procedures. Additionally, the time spent on operational tasks limits the customs professional’s ability to focus on strategic validation and regulatory compliance.

The core problem lies in the absence of an intelligent system capable of automatically interpreting heterogeneous commercial documents, extracting relevant information, and reliably mapping it to the official DUA template defined by the Ministry of Finance.



## Authors

- Daniel Pulido  
- Juan Pablo Cambronero


# 1. Frontend Design

## 1.1 Technology stack

- Application Type: SSR Web App
- Web Framework: Reactjs version 19.2
- Web server: NodeJS version 21 with Vite
- Coding Language: TypeScript 5.9.3
- Unit Testing: Jest version 30.2.0 
- Data Validations: Zod 4.3.6
- Code Prettier Framework: Prettier 3.8.1
- Code Style Framework: ESLint 10.0.2
- Integration Testing: Playwright version 1.58.2
- Cloud Service: Azure
- Hosted Services with the Cloud Service: Azure App Service
- Code Repositories Service: Azure DevOps
- Code Automation Tasks Tool: Husky 9.1.7
- CI/CD Pipeline Technology: Azure DevOps Pipelines
- Environments: Development, Stage and Production
- Environment Deployment Tools: Azure Devops Environments
- Observability Framework: Azure Application Insights SDK


## 1.2 UX UI analysis

Incluye los atributos de usabilidad deseables del aplicativo, un diseño preliminar del UX a modo wireframes, y las evidencias de las pruebas de UX con usuarios reales que validan diseño diseño preliminar

### Core Business Process 
Describir paso a paso lo que sucede en cada pantalla en términos de acciones (no hablamos de botones, ni listas ni de ningún componente visual, solo acciones de usuario y el resultado de cada acción)

#### Login
1. User enters username
2. User enters password
3. User enters one-time token
4. User presses Login
5. System validates credentials
6. System validates token
7. If it fails, the system displays an invalid credentials message
8. System logs the login attempt
9. User can retry login
10. If successful, the system creates a session
11. System redirects to Home

#### Home
1. System redirects the user to the Home screen after login
2. System loads the user information
3. System retrieves the list of uploaded files
4. System retrieves recent activity
5. System displays the list of uploaded files
6. System displays the upload date of each file
7. System displays the status of each file
8. System displays the history of generated DUAs

#### Configure the generator
1. User selects the "Generate DUA" option
2. User uploads a folder containing documents
3. System validates file formats
4. System lists detected documents
5. User uploads the DUA template
6. System validates the template
7. System confirms required files
8. User confirms process start
9. User presses Start generation
10. System begins processing
11. System displays a generation started message

#### Progress monitoring
1. System displays file reading progress
2. System updates the processed files counter
3. System indicates the current stage of the process
4. System displays the status of each document
5. System logs detected errors
6. System notifies warnings
7. User can check the process status
8. User can refresh progress

#### Retrieving the result
1. System generates a preliminary DUA document
2. System displays a preview
3. User reviews the document
4. User identifies marked fields
5. User confirms the document
6. User downloads the Word file
7. System logs the download

#### Logout
1. User selects Logout
2. System ends the session
3. System clears the active session
4. System redirects to the login screen
5. System displays a session closed message


### Wireframes
Con esos pasos anteriores le pido a una AI que me genere los screens y los pego aquí con un título, descripción y la imágen empotrada

#### Login Screen
The user can log in into his account using the microsoft authentication screen

![alt text](/media/login.png)

#### Home Screen
![alt text](/media/home.png)

#### Configure Generation
![alt text](/media/configure-generator.png)

#### Generation Progress
![alt text](/media/progress.png)

#### Preview
![alt text](/media/preview.png)

#### Logout
![alt text](/media/logout.png)


### UX Test Results
- Escoger alguna app para ejecutar el UX Test usando esos wireframes
- El test se lo van a aplicar en forma remota compartiendo un URL, a 3 estudiantes o amigos
- Va a generar un reporte de resultados
- Creamos un md table con los resultados

- Evidencias
![Juan mi amigo de bla bla](/media/testjuan.jpg)
![Ana de bla bla](/media/testana.jpg)

- Heatmap
![Dua Streamliner Heatmap](/media/heatmap.jpg)

## 1.3 Component design strategy

Define la técnica y los principios de diseño de componentes del frontend, cómo se logra la reutilización de componentes, cómo se logra centralizar los estilos, el branding, la internacionalización y la responsividad.

## 1.4 Security

Tecnologías, técnicas y classes con su respectiva ubicación en la estructura del proyecto responsables de la autenticación y la autorización de permisos y sesiones. 

## 1.5 Layered design

Diseño y explicación de las diversas capas de la aplicación en el frontend. 

## 1.6  Design patterns

Diseño de classes con su respectiva ubicación en la estructura del proyecto, donde sea necesario aplicar patrones de diseño orientado a objetos, como por ejemplo: seguridad, refrescado de UI, recepción de notificaciones, almacenamiento de estados, llamadas a api, operaciones asíncronas, invalidación de sesiones, programación por eventos, creación de objetos. 

## 1.7 src folder

un folder en /src que contiene el scaffold del proyecto, el cual se genera a partir de toda la especificación de los puntos del 1.1 al 1.6. 

# 2. Backend Design

# 3. Data Design

