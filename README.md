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

#### 1.3.4.1 Globals file
The [globals.css](/src/styles/globals.css) file is where the active theme gets applied. Add/modify this file when needing to add/change global/utility selectors (one time use).

#### 1.3.4.2 Tokens file
The [tokens.ts](/src/styles/tokens.ts) file contains the tokens used in other ts files. Add reusable tokens in this file for use in components.

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

#### 1.3.4.3 Theme configuration
1. App root should always be wrapped with `ThemeProvider`.
2. Render `ThemeSwitcher` component in a shared layout (e.g. topbar). This will allow users to switch themes
3. Style components with CSS variables (`var(--color-primary)`) instead of hardcoded values.

Example:

```tsx
import { ThemeProvider } from "../providers/ThemeProvider";
import { ThemeSwitcher } from "../components/primitives/themeSwitcher";

export function App() {
  return (
    <ThemeProvider>
      <ThemeSwitcher />
      {/* routes/components */}
    </ThemeProvider>
  );
}
```

#### 1.3.4.4 Adding a theme
1. Open [theme.ts](/src/styles/theme.ts).
2. Add a new key under `themes` with the same `Theme` shape.
3. The new theme appears automatically in `ThemeSwitcher`.

Example:
```ts
custom: {
  colors: { ...colors, primary: "#0F766E", background: "#ECFEFF" },
  spacing,
  radius,
  typography: { fontFamily: "Inter, sans-serif", headingWeight: 600 },
}
```

#### 1.3.4.5 How to use
1. Create css file for the component, setting values based on the css global variables. Do not use hardcoded colors/spacing.
```css
.btn {
  background: var(--color-primary);
  color: var(--color-text);
  border-radius: var(--radius-md);
  padding: var(--space-md);
}
```
2. Create the component.
```tsx
// src/components/primitives/button.tsx
import "./button.css";

export function Button({ children }: { children: React.ReactNode }) {
  return <button className="btn">{children}</button>;
}
```
3. Theme provider will change the values of the css variables when changing themes.

### 1.3.5 Internationalization Strategy
All text must be externalized. The languageSwitcher primitive is the component that allows users to switch languages, add this component on a header layout.

#### Translation folder
The [i18n](/src/i18n) folder contains a file for each language code used in the application. To add a new language simply create another json file named as the language code in the [i18n](/src/i18n) and add the translations for each text.\

#### How to add new language
1. Create the [es.json](/src/i18n/es.json) file in the [i18n](/src/i18n) folder and add each text with its translation.
```JSON
{
  "login.title": "Login",
  "login.username": "Nombre de usuario",
  "login.password": "Contraseña",
  "login.token": "Token de un solo uso"
}
```

2. Add import and language definition in [config.ts](/src/i18n/config.ts)
```TypeScript
import en from "./en.json";
import es from "./es.json";
//import new languagges

export const SUPPORTED_LANGUAGES = ["en", "es"] as const; // add other languages
export type LanguageCode = (typeof SUPPORTED_LANGUAGES)[number];

const resources = {
  en: { translation: en },
  es: { translation: es },
  //add new language to this const
};
```

3. Add label for the new language in [languageSwitcher.tsx](/src/components/primitives/languageSwitcher.tsx)
```TypeScript
const labels: Record<string, string> = {
  en: "English",
  es: "Español",
  //Add new language
};
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
import { useTranslation } from "react-i18next";

const { t } = useTranslation();

<h1>{t("login.title")}</h1>
```

### 1.3.6 Responsiveness Strategy
Responsiveness must be centralized using breakpoint tokens.

#### 1.3.6.1 Breakpoints
Only source of truth is [globals.css](/src/styles/globals.css).\
To modify the size for the breakpoints, change the following variables in [globals.css](/src/styles/globals.css):

```css
  /*Define breakpoints for responsiveness*/
  --bp-mobile: 480px;
  --bp-tablet: 768px;
  --bp-desktop: 1200px;
```

#### 1.3.6.2 How to use
1. Create css file for the component (e.g. [homePageLayout.css](/src/components/layouts/homePageLayout.css)). Add grid template for the breakpoints defined (do not hardcode breakpoints, use global breakpoint variables).
```css
/* src/components/layouts/homePageLayout.css */
.home-grid {
  display: grid;
  gap: var(--spacing-md);
  grid-template-columns: 1fr; /* mobile */
}

@media (min-width: var(--bp-tablet)) {
  .home-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)); /* tablet */
  }
}

@media (min-width: var(--bp-desktop)) {
  .home-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr)); /* desktop */
  }
}

.card,
.table,
.activity {
  width: 100%;      /* evita fixed widths */
  min-width: 0;     /* evita overflow en grid/flex */
}
```
2. Create the component (e.g. [homePageLayout.tsx](/src/components/layouts/homePageLayout.tsx)).
```tsx
<div className="home-grid">
  <section className="card">t("home.summary-cards")Summary cards</section>
  <section className="table">t("home.uploaded-files-table")</section>
  <section className="activity">t("home.activity-log")</section>
</div>
```

#### 1.3.6.3 Enforcing this
- Do not define breakpoints outside of [globals.css](/src/styles/globals.css).
- PR rule do not accept media (min-width: ...px) outside of [styles](/src/styles)
- CI check (fail build if harcoded media found):
  - rg -n "@media\s*\(min-width:\s*\d+px\)" src --glob "!src/styles/**"
  - rg -n "width:\s*[0-9]+px" src
- Checklist:
  - Use grid/flex
  - No fixed widths
  - Use responsive utils/tokens
  - Tested in mobile/tablet/desktop

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

Soporta MFA, usa correo y contraseña y luego Authenticator App
- Single Sign On
- Azure MS Entra ID
- Auth0 Server
- Authenticator Server Name
- RBAC

**Permission List:**
|Código|Descripción|
|-----|-----------|
|UPLOAD-DUA|El usuario puede actualizar la pantalla default del DUA|
|OPEN-FOLDER|Abre una carpeta bla bal bla|

### 1.4.1 Technologies
- React Router
- Context API
- Zod
- Axios or Fetch wrapper
- HTTP-only secure cookies preferred for session handling

### 1.4.2 Authentication
1. User submits username, password, and one-time token.
2. Frontend validates the form using Zod.
  ```TypeScript
  import { z } from "zod";

  export const loginRequestSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(1),
    oneTimeToken: z.string().min(1),
  });
  
  export type LoginRequest = z.infer<typeof loginRequestSchema>;
  ```
3. Frontend sends credentials to backend via authService.login.
  ```TypeScript
  import { apiClient } from "@/services/apiClient";
  import type { LoginRequest } from "../schemas/loginRequest.schema";
  import type { AuthSession } from "@/security/session/session.types";

  export class AuthService {
    async login(payload: LoginRequest): Promise<AuthSession> {
      return apiClient.post("/auth/login", payload);
    }

    async logout(): Promise<void> {
      await apiClient.post("/auth/logout");
    }

    async getCurrentSession(): Promise<AuthSession> {
      return apiClient.get("/auth/me");
    }
  }

  export const authService = new AuthService();
  ```
4. Backend validates the credentials.
5. Backend creates the session.
6. Backend returns:
   - Secure session cookie
   - Authenticated user profile
   - Permission set or role set
  ```TypeScript
  import { useState } from "react";
  import { authService } from "../services/authService";
  import { loginRequestSchema, type LoginRequest } from "../schemas/loginRequest.schema";
  import { useSession } from "@/security/hooks/useSession";

  export function useLogin() {
    const { setSession } = useSession();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function login(input: LoginRequest) {
      setError(null);
      setIsLoading(true);

      const parsed = loginRequestSchema.safeParse(input);
      if (!parsed.success) {
        setIsLoading(false);
        setError("Invalid login data");
        return false;
      }

      try {
        const session = await authService.login(parsed.data);
        setSession(session);
        return true;
      } catch {
        setError("Invalid credentials");
        return false;
      } finally {
        setIsLoading(false);
      }
    }

    return { login, isLoading, error };
  }
  ```
7. Frontend stores user and permission metadata in memory through SessionProvider.
   Pendiente definir bien esta parte de la session, ya hay archivos con teoría de lo que debería decir, ajustar a ejemplos concretos de código
8. Frontend redirects to the Home screen.

### 1.4.3 Authorization
Expandir en cómo funciona el permission hook\
Developers must never write:
```TypeScript
{hasPermission("dua.generate") && hasPermission("files.upload") && (
  <StartGenerationButton />
)}
```
directly inside pages or components. Instead they should use:
```TypeScript
const { hasPermission } = usePermissions();

{hasPolicy("canGenerateDua") && <StartGenerationButton />}
```

**To add additional roles/permissions:**
1. Add role definition in [roles.ts](/src/policies/roles.ts)
  ```TypeScript
  export const Roles = {
    ADMIN: "admin",
    OPERATOR: "operator",
    REVIEWER: "reviewer",
  } as const;
  ```
2. Add permission definition in [permissions.ts](/src/policies/permissions.ts)
  ```TypeScript
  export const Permissions = {
    DUA_READ: "dua.read",
    DUA_GENERATE: "dua.generate",
    DUA_DOWNLOAD: "dua.download",
    FILES_READ: "files.read",
    FILES_UPLOAD: "files.upload",
    ACTIVITY_READ: "activity.read",
  } as const;
  ```
  and in [session.types.ts](/src/types/session.types.ts)
  ```TypeScript
  export type PermissionCode =
  | "dua.read"
  | "dua.generate"
  | "dua.download"
  | "files.read"
  | "files.upload"
  | "activity.read";
  ```

3. Map policies to permissions in [accessPolicy.ts](/src/policies/accessPolicy.ts)
  ```TypeScript
  import { Permissions } from "./permissions";

  export const accessPolicy = {
    canViewHome: [Permissions.FILES_READ, Permissions.ACTIVITY_READ],
    canGenerateDua: [Permissions.DUA_GENERATE, Permissions.FILES_UPLOAD],
    canDownloadDua: [Permissions.DUA_DOWNLOAD],
  };
  ```

If permissions for an action change, only change the permissions mapped to that policy.

### 1.4.4 Routing Protection
This project has three methods of routing protection, use depending on each routes context

#### 1.4.4.1 Auth Guard
Use this guard to prevent unathenticated access

Example usage:
[AppRouter.tsx](/src/routes/AppRouter.tsx)
```TypeScript
  <AuthGuard>
    <DashboardLayout>
      <HomePage />
    </DashboardLayout>
  </AuthGuard>
```

#### 1.4.4.2 Guest Guard
Use this guard to prevent authenticated users accessing unauthenticated sites

Example usage:
[AppRouter.tsx](/src/routes/AppRouter.tsx)
```TypeScript
  <GuestGuard>
    <LoginPage />
  </GuestGuard>
```

#### 1.4.4.3 Permission Guard
Use this guard when an action requires an access policy to prevent unauthorized accesss

Example usage:
[AppRouter.tsx](/src/routes/AppRouter.tsx)
  ```TypeScript
  <AuthGuard>
    <PermissionGuard required={accessPolicy.canGenerateDua}>
      <ConfigureGeneratorPage />
    </PermissionGuard>
  </AuthGuard>
  ```

### 1.4.5 API Communication

#### Centralized API Client
[apiClient.ts](/src/services/apiClient.ts)

#### HTTP Interceptors
[httpInterceptors.ts](/src/services/httpInterceptors.ts)

### 1.4.6 Secure Storage
Cuál es el servicio de secure storage para env variables, keys y sensitive data?
Azure Key Vault

Agregar ejemplos y cómo es que nos aseguramos de no guardar passwords, tokens, etc
**Allowed storage**
- UI preferences
- selected language
- theme
- non-sensitive temporary UI state

**Forbidden storage**
- access tokens
- refresh tokens
- passwords
- one-time tokens
- raw permission payloads if sensitive

**Preferred storage model:**
- backend session stored in secure, HTTP-only, same-site cookies
- frontend session state kept in memory through SessionProvider

### 1.4.7 Logout
Responsibilities:
- call backend logout endpoint
- clear session provider state
- clear sensitive in-memory data
- redirect to login

[useLogout.ts](/src/hooks/useLogout.ts)

### 1.4.8 Session Expiration
Como es que pasa todo esto
When backend returns 401 Unauthorized:
- interceptor must detect it
- sessionManager clears session state
- user is redirected to login
- user sees a session expired message

### 1.4.9 Screen-Level Security Mapping
Cambiar lo de responsible elements y rules por ejemplos reales de como aseguramos cada cosa en codigo
#### Login screen

Responsible elements:
```
src/features/auth/pages/LoginPage.tsx
src/features/auth/components/LoginForm.tsx
src/features/auth/hooks/useLogin.ts
src/features/auth/services/authService.ts
src/features/auth/schemas/loginRequest.schema.ts
src/security/guards/GuestGuard.tsx
```

#### Home screen

Responsible elements:
```
src/security/guards/AuthGuard.tsx
src/security/hooks/useSession.ts
src/security/hooks/usePermissions.ts
```
Rules:
- requires authenticated session
- must not render data until session is validated

#### Configure Generator screen

Responsible elements:
```
src/security/guards/AuthGuard.tsx
src/security/guards/PermissionGuard.tsx
src/security/policies/accessPolicy.ts
```
```TypeScript
<PermissionGuard required={accessPolicy.canGenerateDua}>
  <ConfigureGeneratorPage />
</PermissionGuard>
```

Rules:
- requires authenticated session
- requires dua.generate and files.upload

#### Progress screen

Responsible elements:
```
src/security/guards/AuthGuard.tsx
src/security/guards/PermissionGuard.tsx
```
Rules:
- requires authenticated session
- requires permission to read generation progress

#### Preview screen

Responsible elements:
```
src/security/guards/AuthGuard.tsx
src/security/guards/PermissionGuard.tsx
```
Rules:
- requires authenticated session
- requires dua.read
- download action requires dua.download

#### Logout flow

Responsible elements:
```
src/features/auth/components/LogoutButton.tsx
src/features/auth/hooks/useLogout.ts
src/features/auth/services/authService.ts
src/security/providers/SessionProvider.tsx 
```

## 1.5 Layered design

The frontend follows a five-layer architecture where each layer has a clear responsibility and well-defined dependency rules. This design ensures separation of concerns, testability, and consistency with the component hierarchy, security model, and project structure already defined.

### 1.5.1 Layer Overview

```
┌─────────────────────────────────────────────────┐
│           1. Presentation Layer                  │
│     (components/, features/, layouts, pages)     │
├─────────────────────────────────────────────────┤
│           2. Application Layer                   │
│         (hooks/, feature-level hooks)            │
├─────────────────────────────────────────────────┤
│  3. Domain-Oriented Frontend Logic Layer         │
│    (schemas/, policies/, domain rules)           │
├─────────────────────────────────────────────────┤
│       4. Service / Integration Layer             │
│          (services/, apiClient)                  │
├─────────────────────────────────────────────────┤
│   5. Cross-cutting Infrastructure Layer          │
│  (security/, styles/, i18n/, utils/, providers/) │
└─────────────────────────────────────────────────┘
```

### 1.5.2 Layer Responsibilities

#### Layer 1 — Presentation Layer

**Responsibility:** Render UI, capture user input, and display application state.

**Mapped folders:**
```
src/components/primitives/    → Button, Input, Modal, ProgressBar
src/components/composites/    → LoginForm, FileUploadArea, FileStatusTable
src/components/layouts/       → AuthLayout, DashboardLayout
src/features/auth/            → LoginPage.tsx
src/features/dashboard/       → HomePage.tsx
src/features/dua-generator/   → ConfigureGeneratorPage.tsx, ProgressPage.tsx, PreviewPage.tsx
```

**Rules:**
- Primitives contain zero business logic; they only accept props and use theme tokens.
- Composites combine primitives and delegate logic to hooks via props or direct hook calls.
- Feature pages compose layouts + composites and connect to the Application Layer through hooks.
- All visible text must use the `t()` function from `react-i18next`.

```TypeScript
// Feature page delegates to hooks — no direct API calls
export function LoginPage() {
  const { t } = useTranslation();
  const { login, isLoading, error } = useLogin();

  return (
    <AuthLayout>
      <h1>{t("login.title")}</h1>
      <LoginForm onSubmit={login} isLoading={isLoading} error={error} />
    </AuthLayout>
  );
}
```

---

#### Layer 2 — Application Layer

**Responsibility:** Orchestrate user flows, manage state transitions, coordinate validation, service calls, and session updates.

**Mapped folders:**
```
src/hooks/                    → useSession, usePermissions (shared hooks)
src/features/auth/hooks/      → useLogin
src/features/dua-generator/hooks/ → useUploadFiles, useGenerationProgress, usePreview
src/features/dashboard/hooks/ → useDashboardData
```

**Rules:**
- Hooks are the only bridge between the Presentation Layer and lower layers.
- Each hook calls domain validation (Layer 3) before calling a service (Layer 4).
- Hooks manage loading, error, and success states.
- Hooks must not contain inline fetch/axios calls — they must go through services.

```TypeScript
// Application hook orchestrating: validation → service → session update
export function useLogin() {
  const { setSession } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(input: LoginRequest) {
    setError(null);
    setIsLoading(true);

    // Layer 3: Domain validation
    const parsed = loginRequestSchema.safeParse(input);
    if (!parsed.success) {
      setIsLoading(false);
      setError("Invalid login data");
      return false;
    }

    try {
      // Layer 4: Service call
      const session = await authService.login(parsed.data);
      // Layer 5: Session management
      setSession(session);
      return true;
    } catch {
      setError("Invalid credentials");
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  return { login, isLoading, error };
}
```

---

#### Layer 3 — Domain-Oriented Frontend Logic Layer

**Responsibility:** Enforce data integrity, permission rules, and domain-specific UI logic before interacting with the backend.

**Mapped folders:**
```
src/schemas/                      → loginRequest.schema.ts
src/features/dua-generator/schemas/ → uploadConfig.schema.ts, templateValidation.schema.ts
src/policies/roles.ts             → Role definitions
src/policies/permissions.ts       → Permission constants
src/policies/accessPolicy.ts      → Role-to-permission mapping
```

**Rules:**
- All user input must be validated with Zod schemas before being sent to a service.
- Permission checks must use the `usePermissions` hook — never direct role string comparisons.
- Domain schemas live alongside the feature they belong to or in `src/schemas/` when shared.

```TypeScript
// Zod schema for DUA generation configuration
import { z } from "zod";

export const uploadConfigSchema = z.object({
  files: z.array(z.instanceof(File)).min(1, "At least one document is required"),
  templateFile: z.instanceof(File),
  generateDate: z.string().datetime(),
});

export type UploadConfig = z.infer<typeof uploadConfigSchema>;
```

```TypeScript
// Permission check in a feature component
const { hasPermission } = usePermissions();

{hasPermission("dua.generate") && (
  <Button onClick={startGeneration}>{t("generator.start")}</Button>
)}
```

---

#### Layer 4 — Service / Integration Layer

**Responsibility:** Encapsulate all HTTP communication with the backend. Provide a single point of configuration for headers, base URL, error handling, and response transformation.

**Mapped folders:**
```
src/services/apiClient.ts         → Centralized HTTP client (fetch/axios wrapper)
src/services/authService.ts       → Authentication endpoints
src/services/generatorService.ts  → DUA generation endpoints
src/services/fileService.ts       → File upload and retrieval endpoints
```

**Rules:**
- All backend communication must go through `apiClient`.
- Services return typed responses — never raw HTTP responses to upper layers.
- Services must not manage UI state (no `useState`, no `setLoading`).
- Error propagation is done via thrown exceptions; hooks (Layer 2) catch and interpret them.

```TypeScript
// Centralized API client
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiClient = {
  async post<T>(path: string, body?: unknown): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return response.json();
  },

  async get<T>(path: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: "GET",
      credentials: "include",
    });
    if (!response.ok) throw new Error(`API error: ${response.status}`);
    return response.json();
  },
};
```

```TypeScript
// Generator service — typed, stateless
import { apiClient } from "./apiClient";

export interface GenerationResult {
  id: string;
  status: "completed" | "failed";
  previewUrl: string;
  downloadUrl: string;
}

export class GeneratorService {
  async startGeneration(configId: string): Promise<{ jobId: string }> {
    return apiClient.post("/generator/start", { configId });
  }

  async getProgress(jobId: string): Promise<{ percentage: number; stage: string }> {
    return apiClient.get(`/generator/progress/${jobId}`);
  }

  async getResult(jobId: string): Promise<GenerationResult> {
    return apiClient.get(`/generator/result/${jobId}`);
  }
}

export const generatorService = new GeneratorService();
```

---

#### Layer 5 — Cross-cutting Infrastructure Layer

**Responsibility:** Provide shared capabilities used by all layers — session management, permission resolution, styling tokens, internationalization, observability, and generic utilities.

**Mapped folders:**
```
src/providers/SessionProvider.tsx  → Session context provider
src/types/session.types.ts        → Session type definitions
src/hooks/useSession.ts           → Session access hook
src/hooks/usePermissions.ts       → Permission resolution hook
src/styles/tokens.ts              → Color, spacing, radius tokens
src/styles/theme.ts               → Theme composition
src/styles/breakpoints.ts         → Responsive breakpoints
src/styles/globals.css            → Global styles
src/i18n/en.json                  → English translations
src/i18n/es.json                  → Spanish translations
src/i18n/config.ts                → react-i18next configuration
src/utils/                        → Shared helpers (formatters, constants)
src/observability/                → Azure Application Insights initialization
```

**Rules:**
- Infrastructure code must be domain-agnostic.
- Session state is provided through React Context (`SessionProvider`) and consumed via `useSession`.
- Observability is initialized at application bootstrap and available globally.
- Style tokens are the single source of truth — no hardcoded values in components.

```TypeScript
// Session provider — wraps the app
import { createContext, useContext, useState, type ReactNode } from "react";
import type { AuthSession } from "../types/session.types";

interface SessionContextValue {
  session: AuthSession | null;
  setSession: (session: AuthSession) => void;
  clearSession: () => void;
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [session, setSessionState] = useState<AuthSession | null>(null);

  function setSession(session: AuthSession) {
    setSessionState(session);
  }

  function clearSession() {
    setSessionState(null);
  }

  return (
    <SessionContext.Provider value={{ session, setSession, clearSession }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSessionContext() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSessionContext must be used within SessionProvider");
  return ctx;
}
```

---

### 1.5.3 Dependency Rules

Each layer may only depend on the layer immediately below it or on the cross-cutting infrastructure layer. No layer may depend on a layer above it.

```
Presentation  →  Application  →  Domain Logic  →  Services
     ↓               ↓               ↓               ↓
     └───────────────────── Infrastructure ──────────────┘
```

| Source Layer | Can depend on |
|---|---|
| Presentation | Application, Infrastructure |
| Application | Domain Logic, Services, Infrastructure |
| Domain Logic | Infrastructure only |
| Services | Infrastructure only |
| Infrastructure | No application layer dependencies |

**Violations to avoid:**
- A primitive component importing a service (not allowed)
- A service calling `useState` or managing UI state (not allowed)
- A feature page calling `fetch` or `apiClient` directly (not allowed)
- A hook comparing `user.role === "admin"` instead of using `usePermissions` (not allowed)

---

### 1.5.4 Layer Mapping to `src/` Folder Structure

```
src/
 ├ components/           → Layer 1: Presentation (primitives, composites, layouts)
 ├ features/             → Layer 1 + 2 + 3: Pages, feature hooks, feature schemas
 │   ├ auth/
 │   │   ├ LoginPage.tsx              → Layer 1
 │   │   ├ hooks/useLogin.ts          → Layer 2
 │   │   └ schemas/loginRequest.schema.ts → Layer 3
 │   ├ dua-generator/
 │   │   ├ ConfigureGeneratorPage.tsx  → Layer 1
 │   │   ├ ProgressPage.tsx           → Layer 1
 │   │   ├ PreviewPage.tsx            → Layer 1
 │   │   ├ hooks/                     → Layer 2
 │   │   └ schemas/                   → Layer 3
 │   └ dashboard/
 │       ├ HomePage.tsx               → Layer 1
 │       └ hooks/                     → Layer 2
 │
 ├ hooks/                → Layer 2 + 5: Shared hooks (useSession, usePermissions)
 ├ schemas/              → Layer 3: Shared validation schemas
 ├ services/             → Layer 4: Shared services and apiClient
 ├ policies/             → Layer 3: Roles, permissions, access policies
 ├ providers/            → Layer 5: SessionProvider, context providers
 ├ types/                → Layer 5: Shared type definitions
 ├ i18n/                 → Layer 5: Translations and config
 ├ styles/               → Layer 5: Tokens, theme, breakpoints, globals
 ├ observability/        → Layer 5: Azure Application Insights setup
 └ utils/                → Layer 5: Shared utilities
```

---

### 1.5.5 Example Flow: Login

Shows how a login request traverses all five layers:

```
User clicks Login
       │
       ▼
┌─ Layer 1: Presentation ─────────────────────────┐
│  LoginPage → LoginForm captures input            │
│  Calls login(input) from useLogin hook           │
└──────────────────────────────────────────────────┘
       │
       ▼
┌─ Layer 2: Application ──────────────────────────┐
│  useLogin hook receives input                    │
│  Calls loginRequestSchema.safeParse(input)       │
└──────────────────────────────────────────────────┘
       │
       ▼
┌─ Layer 3: Domain Logic ─────────────────────────┐
│  Zod schema validates username, password, token  │
│  Returns parsed data or validation error         │
└──────────────────────────────────────────────────┘
       │
       ▼
┌─ Layer 2: Application (continues) ──────────────┐
│  useLogin calls authService.login(parsedData)    │
└──────────────────────────────────────────────────┘
       │
       ▼
┌─ Layer 4: Service ──────────────────────────────┐
│  authService sends POST /auth/login via          │
│  apiClient with credentials: "include"           │
│  Returns AuthSession                             │
└──────────────────────────────────────────────────┘
       │
       ▼
┌─ Layer 5: Infrastructure ───────────────────────┐
│  useLogin calls setSession(session)              │
│  SessionProvider stores user + permissions        │
│  Router redirects to Home                        │
└──────────────────────────────────────────────────┘
```

---

### 1.5.6 Example Flow: DUA Generation

Shows how the DUA generation process traverses all five layers:

```
User uploads files and template, clicks "Start Generation"
       │
       ▼
┌─ Layer 1: Presentation ─────────────────────────┐
│  ConfigureGeneratorPage → FileUploadArea         │
│  Captures files + template                       │
│  Calls startGeneration(config) from hook         │
└──────────────────────────────────────────────────┘
       │
       ▼
┌─ Layer 5: Infrastructure ───────────────────────┐
│  usePermissions checks hasPermission             │
│  ("dua.generate") before allowing action         │
└──────────────────────────────────────────────────┘
       │
       ▼
┌─ Layer 2: Application ──────────────────────────┐
│  useUploadFiles hook receives config             │
│  Calls uploadConfigSchema.safeParse(config)      │
└──────────────────────────────────────────────────┘
       │
       ▼
┌─ Layer 3: Domain Logic ─────────────────────────┐
│  Zod schema validates: files.length >= 1,        │
│  template exists, date is valid                  │
└──────────────────────────────────────────────────┘
       │
       ▼
┌─ Layer 4: Service ──────────────────────────────┐
│  generatorService.startGeneration(configId)      │
│  Returns { jobId }                               │
└──────────────────────────────────────────────────┘
       │
       ▼
┌─ Layer 1: Presentation ─────────────────────────┐
│  Router navigates to ProgressPage                │
│  useGenerationProgress polls for updates         │
│  ProgressBar + file status table update in       │
│  real time                                       │
└──────────────────────────────────────────────────┘
       │
       ▼
┌─ Layer 4: Service ──────────────────────────────┐
│  generatorService.getResult(jobId)               │
│  Returns preview URL and download URL            │
└──────────────────────────────────────────────────┘
       │
       ▼
┌─ Layer 1: Presentation ─────────────────────────┐
│  PreviewPage renders DocumentPreview composite   │
│  User reviews, confirms, and downloads .docx     │
└──────────────────────────────────────────────────┘
```

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

