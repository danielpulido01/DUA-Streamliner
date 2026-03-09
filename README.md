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

### 1.2.1 Core Business Process 

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


### 1.2.2 Wireframes

#### Login Screen
The user can log in into his account using username, password and one-time token

![Login Screen](/media/login.png)

#### Home Screen
Users can view a summary of uploaded files, recent activity, history, etc

![User's Home Screen](/media/home.png)

#### Configure Generation
Users can configure the generation of the DUA with selected files and a DUA template

![DUA Generation Configuration Screen](/media/configure-generator.png)

#### Generation Progress
Shows the progress of the generation based on amount of files processed, current phase, etc

![Progress Screen](/media/progress.png)

#### Preview
Shows a preview of the generated DUA, users can validate and download the docx file

![Document Preview Screen](/media/preview.png)

#### Logout
Shows a message to the user verifying the session is closed

![Logout Screen](/media/logout.png)


### 1.2.3 UX Test Results (PENDIENTE)
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

### 1.3.1 Components
The frontend will follow a layered component architecture to maximize reuse and maintain consistency across the application.

### 1.3.1 Component Hierarchy
For this project we will have 4 layers:
```
src/
 ├ components/
 │   ├ primitives/
 │   ├ composites/
 │   ├ layouts/
 │   └ features/
```

### 1.3.2 Component Categories

#### Primitive Components
Reusable low-level UI components (no business logic)

- Must be pure UI
- No API calls
- No business logic
- Only accept props
- Must support theme tokens

```
Button
Input
PasswordInput
Select
Checkbox
Radio
Modal
Card
Badge
Spinner
ProgressBar
Table
Toast
```

Example usage:
``` TypeScript
<Button variant="primary" size="md" loading>
  Login
</Button>
```

#### Composite Components
Built from primitives

- Combine primitives
- Handle UI logic
- No API calls directly
- Data passed via props

```
LoginForm
FileUploadArea
ProgressTracker
DocumentPreview
FileStatusTable
ActivityList
```

Example:
```
LoginForm
 ├ Input(username)
 ├ PasswordInput
 ├ TokenInput
 └ Button(login)
```

#### Layout Components
Components responsible for page structure and navigation.

- Must not contain business logic
- Responsible only for layout composition

```
MainLayout
AuthLayout
DashboardLayout
Sidebar
Topbar
PageContainer
```

Example:
```
DashboardLayout
 ├ Sidebar
 ├ Topbar
 └ PageContent
```

#### Feature Components
Feature-specific components tied to a business process.

- Can call services
- Manage state
- Compose composites + layouts

```
features/
 ├ auth/
 │   └ LoginPage.tsx
 ├ dua-generator/
 │   ├ ConfigureGeneratorPage.tsx
 │   ├ ProgressPage.tsx
 │   └ PreviewPage.tsx
 └ dashboard/
     └ HomePage.tsx
```

### 1.3.3 Component Reuse Strategy

#### No Duplicated UI
Before creating a new component developers must:
1. Search in components/primitives
2. Search in components/composites
If similar component exists → extend it. How can I extend it? Agregar

#### Props Driven Design
Components must be configurable using props instead of duplication.

```
<Button variant="primary" />
<Button variant="secondary" />
<Button variant="danger" />
```

#### Business logic outside components
All API calls must go through:
Como es que los llaman los componentes? los componentes llaman al hook y el hook al service o cómo es?
```
services/
```
Example:
```
authService.ts
generatorService.ts
```

Components use hooks.
Example:
```
useLogin()
useUploadFiles()
useGenerationProgress()
```

### 1.3.4 Styling and Branding Centralization
All visual styles must be centralized using design tokens.

#### Tokens file
```
src/styles/tokens.ts
```

Example:
```
export const colors = {
  primary: "#0052CC",
  secondary: "#36B37E",
  danger: "#FF5630",
  background: "#F4F5F7",
}

export const spacing = {
  sm: "8px",
  md: "16px",
  lg: "24px",
}

export const radius = {
  sm: "4px",
  md: "8px",
  lg: "12px"
}
```

#### Theme configuration
Cómo hago para cambiar dark/light theme? Cómo agrego nuevo theme?
```
src/styles/theme.ts
```
Example:

export const theme = {
  colors,
  spacing,
  radius,
  typography: {
    fontFamily: "Inter, sans-serif",
    headingWeight: 600
  }
}

#### Styling rules
Developers must:
- Use tokens
- Avoid hardcoded colors
- Avoid inline styles

Example:

Correct
```TypeScript
<Button style={{ background: theme.colors.primary }} />
```
Incorrect
```TypeScript
<Button style={{ background: "#0052CC" }} />
```

### 1.3.5 Internationalization Strategy
All text must be externalized.
Como es que realmente esto funciona en el código? Cómo se cambia de idioma? Cómo agrego un nuevo idioma?

#### Translation folder
```
src/i18n
 ├ en.json
 └ es.json
```

Example:
```JSON
{
  "login.title": "Login",
  "login.username": "Username",
  "login.password": "Password",
  "login.token": "One-time token"
}
```

#### Usage rule
Components must not contain literal text.
Example:

Incorrect
```TypeScript
<h1>Login</h1>
```

Correct
```TypeScript
<h1>{t("login.title")}</h1>
```
#### Translation hook
Developers must use:
```
react-i18next
```

Example:
```TypeScript
const { t } = useTranslation()
```

### 1.3.6 Responsiveness Strategy
Responsiveness must be centralized using breakpoint tokens.

#### Breakpoints
```
styles/breakpoints.ts
```

Example:
```TypeScript
export const breakpoints = {
  mobile: 480,
  tablet: 768,
  desktop: 1200
}
```

#### Responsive rules
Developers must:
- Use flex/grid layouts
- Avoid fixed widths
- Use responsive utilities

Example:
```
grid-template-columns:
1 column mobile
2 columns tablet
3 columns desktop
```

#### Layout example
```
Home Page
 ├ Summary cards
 ├ Uploaded files table
 └ Activity log
```

Responsive behavior:
| Device | Layout |
|--------|--------|
| Mobile | Vertical stack |
| Tablet | 2 column grid |
| Desktop | 3 column grid |

### 1.3.7 Testing Requirements for Components
Each component must include tests.

#### Unit tests
How exactly are these configured and tested?
```
components/primitives/Button/Button.test.tsx
```

Testing rules:
Test:
- Rendering
- Props
- Events
- Edge cases

Example tests:
- Button renders correctly
- Button shows loading state
- Button triggers click handler


#### Integration tests
Using Playwright for flows:

Required flows:
- Login flow
- File upload
- Generation process
- Preview download
- Logout

#### Performance Guidelines
Agregar ejemplos de código de esto
Developers must:
- Use React.memo for heavy components
- Use lazy() for feature modules
- Avoid unnecessary re-renders

Example:
```
lazy load:
generator module
preview module
```

## 1.4 Security

Tecnologías, técnicas y classes con su respectiva ubicación en la estructura del proyecto responsables de la autenticación y la autorización de permisos y sesiones. 

## 1.5 Layered design

Diseño y explicación de las diversas capas de la aplicación en el frontend. 

## 1.6  Design patterns

Diseño de classes con su respectiva ubicación en la estructura del proyecto, donde sea necesario aplicar patrones de diseño orientado a objetos, como por ejemplo: seguridad, refrescado de UI, recepción de notificaciones, almacenamiento de estados, llamadas a api, operaciones asíncronas, invalidación de sesiones, programación por eventos, creación de objetos. 

## 1.7 src folder

un folder en /src que contiene el scaffold del proyecto, el cual se genera a partir de toda la especificación de los puntos del 1.1 al 1.6.
```
src
 ├ components
 │   ├ primitives
 │   │   ├ Button
 │   │   ├ Input
 │   │   ├ Modal
 │   │   └ ProgressBar
 │   │
 │   ├ composites
 │   │   ├ LoginForm
 │   │   ├ FileUploadArea
 │   │   ├ FileStatusTable
 │   │   └ ActivityList
 │   │
 │   └ layouts
 │       ├ AuthLayout
 │       └ DashboardLayout
 │
 ├ features
 │   ├ auth
 │   ├ dua-generator
 │   └ dashboard
 │
 ├ hooks
 │   ├ useAuth
 │   ├ useUpload
 │   └ useProgress
 │
 ├ services
 │   ├ apiClient.ts
 │   ├ authService.ts
 │   └ generatorService.ts
 │
 ├ i18n
 │   ├ en.json
 │   └ es.json
 │
 ├ styles
 │   ├ theme.ts
 │   ├ tokens.ts
 │   └ globals.css
 │
 └ utils
```

# 2. Backend Design

# 3. Data Design

