# DUA-Streamliner

## Problem Statement

The preparation process of the Single Customs Declaration (DUA) in Costa Rica is manual, repetitive, and highly dependent on expert knowledge. To complete it correctly, multiple source documents must be interpreted — including commercial invoices, packing lists, certificates of origin, bills of lading, and insurance policies — which are typically provided in heterogeneous formats such as Excel, Word, PDF, and scanned images, often with varying structures.

This documentary diversity requires case-by-case interpretation, increasing the risk of errors, value inconsistencies, missing information, and potential penalties or delays in import and export procedures. Additionally, the time spent on operational tasks limits the customs professional’s ability to focus on strategic validation and regulatory compliance.

The core problem lies in the absence of an intelligent system capable of automatically interpreting heterogeneous commercial documents, extracting relevant information, and reliably mapping it to the official DUA template defined by the Ministry of Finance.

## Authors

- Daniel Pulido  
- Juan Pablo Cambronero

## Frontend Design 

### 1.1 Technology stack 

- Application type: Web App
- Web Framework: ReactJS v19.2
- NodeJS: v21
- TypeScript v5.9.2
- Unit Testing: Jest v30.2.0
- Zod 4.3.6 to data validation
- Prettier 3.8.1 
- ESlint 10.0.2
- Integration Testing: Playwright 1.58.2
- Hosted by Azure App Service
- Code repositories by Azure Repos
- Automated code tasks by Husky 9.1.7
- CI / CD by Azure DevOps Pipelines
- Cloud Services: Azure Cloud Services
- Environments: development, stage and production
- Environment deployments con Azure DevOps Environments 
- Observability by Azure Application Insights SDK

Tecnología de frontend, de seguridad, librerías de terceros, frameworks, hosting; todos con su respectiva versión 

### 1.2 UX UI analysis

Incluye los atributos de usabilidad deseables del aplicativo, un diseño preliminar del UX a modo wireframes, y las evidencias de las pruebas de UX con usuarios reales que validan diseño diseño preliminar

### 1.3 Component design strategy 

Define la técnica y los principios de diseño de componentes del frontend, cómo se logra la reutilización de componentes, cómo se logra centralizar los estilos, el branding, la internacionalización y la responsividad.

### 1.4 Security
 
Tecnologías, técnicas y classes con su respectiva ubicación en la estructura del proyecto responsables de la autenticación y la autorización de permisos y sesiones. 

### 1.5 Layered design

 diseño y explicación de las diversas capas de la aplicación en el frontend. 

### 1.6  Design patterns

Diseño de classes con su respectiva ubicación en la estructura del proyecto, donde sea necesario aplicar patrones de diseño orientado a objetos, como por ejemplo: seguridad, refrescado de UI, recepción de notificaciones, almacenamiento de estados, llamadas a api, operaciones asíncronas, invalidación de sesiones, programación por eventos, creación de objetos. 

### 1.7 un folder en /src que contiene el scaffold del proyecto, el cual se genera a partir de toda la especificación de los puntos del 1.1 al 1.6. 