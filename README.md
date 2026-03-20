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

- Application Type: SPA Web App
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


### 1.2.3 UX Test Results

A usability test was conducted using Maze to validate the proposed wireframes of the DUA Streamliner system. The test was shared remotely via URL with 3 participants.

#### Test Objective
Evaluate user ability to:
- Log in successfully
- Generate a DUA
- Configure DUA generator correctly
- Review the generated document
- Log out of the system

#### Tasks Executed

| Task | Description |
|------|------------|
| Task 1 — Login | User attempts to log into the system |
| Task 2 — Generate DUA | User initiates the DUA generation process |
| Task 3 — Configure Generator | User uploads files and configures generation |
| Task 4 — Review Document | User analyzes and validates generated DUA |
| Task 5 — Logout | User ends the session |

#### Participants
- Lazaro Gonzalez (Student)
- Jimena Sanchez (Student)
- Juan Diego Arce (Student)
- Josue Venegas (Student)

#### Key Metrics (Maze)

#### Overall Performance

| Metric | Value | Interpretation |
|--------|------|----------------|
| Completion Rate | 100% | All users successfully completed all tasks, indicating a clear and understandable flow |
| Success Rate | 100% | No task failures occurred |
| Average Time on Task | 5.8 seconds | Tasks were completed quickly, suggesting high efficiency |
| Misclick Rate | 6.7% | Low overall error rate, with minor friction concentrated in login |

#### Task-Level Performance

| Task | Avg Time (s) | Success Rate | Misclick Rate | Interpretation |
|------|-------------|--------------|---------------|----------------|
| Login | 14.2 | 100% | 33.3% | Higher friction; users hesitated or misclicked during authentication |
| Generate DUA | 3.0 | 100% | 0% | Very clear action, no confusion |
| Configure Generator | 4.3 | 100% | 0% | Process understood without errors |
| Review Document | 4.5 | 100% | 0% | Validation step intuitive |
| Logout | 3.1 | 100% | 0% | Simple and direct interaction |

#### Findings

- All participants successfully completed every task, indicating a clear and understandable user flow.
- The login task showed a higher misclick rate (33.3%), suggesting minor usability friction in the authentication interface.
- All other tasks showed 0% misclick rate, indicating strong clarity in navigation and actions.
- The DUA generation and configuration process was completed quickly and without errors.
- The review and logout flows were intuitive and required minimal effort.

#### Observations

- Users understood the system flow from login to document generation without guidance.
- The interface provided clear feedback during each step of the process.
- The login screen may require slight improvements in input clarity or button visibility.

#### Evidence

The following screenshot from Maze shows the registered participants and their test execution status:

<img src="/media/participants.png" width="400"/>

#### Task 1 — Login

Users attempted to authenticate using their credentials.

**Maze Evidence**

<img src="/media/task1-login.png" width="500"/>

**Heatmap**

<img src="/media/task1-heatmap.jpg" width="400"/>

#### Task 2 — Generate DUA

Users initiated the DUA generation process from the main interface.

**Maze Evidence**

<img src="/media/task2-generate.png" width="500"/>

**Heatmap**

<img src="/media/task2-heatmap.jpg" width="400"/>

#### Task 3 — Configure Generator

Users uploaded files and configured the generation process.

**Maze Evidence**

<img src="/media/task3-configure.png" width="500"/>

**Heatmap**

<img src="/media/task3-heatmap.jpg" width="400"/>

#### Task 4 — Review Document

Users reviewed the generated DUA and validated its correctness.

**Maze Evidence**

<img src="/media/task4-review.png" width="500"/>

**Heatmap**

<img src="/media/task4-heatmap.jpg" width="400"/>

#### Task 5 — Logout

Users ended their session through the logout action.

**Maze Evidence**

<img src="/media/task5-logout.png" width="500"/>

**Heatmap**

<img src="/media/task5-heatmap.jpg" width="400"/>


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

- Coordinate business logic through hooks, which interact with services
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
3. Frontend sends credentials to backend via [authService.ts](src/services/authService.ts).
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
  
  [useLogin.ts](src/hooks/useLogin.ts)
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

#### 1.4.3.1 Roles
Roles are found in [roles.ts](src/policies/roles.ts)

| Code     | Description                                                                                                                |
| -------- | -------------------------------------------------------------------------------------------------------------------------- |
| admin    | Full access to the platform, including user, role, permission, audit, and system administration                            |
| operator | Can upload files, configure the generator, start DUA generation, monitor progress, preview results, and download documents |
| reviewer | Can review generated DUAs, preview documents, confirm them, and download results                                           |
| viewer   | Can access Home, view files, view activity, and monitor process status, but cannot generate or confirm DUAs                |

#### 1.4.3.2 Permissions
Permissions are found in [permissions.ts](src/policies/permissions.ts)

**Permission Catalog**
| Code                   | Description                                                        |
| ---------------------- | ------------------------------------------------------------------ |
| auth.login             | User can authenticate using username, password, and one-time token |
| auth.logout            | User can terminate the active session                              |
| session.read           | User can access the Home screen through an active session          |
| user.profile.read      | User can view their user information on the Home screen            |
| files.read             | User can view uploaded files and their metadata                    |
| files.upload           | User can upload folders or documents used for DUA generation       |
| files.delete           | User can delete uploaded files                                     |
| activity.read          | User can view recent activity related to their processes           |
| dua.template.upload    | User can upload a DUA template used for document generation        |
| dua.template.validate  | System validates uploaded templates before generation              |
| dua.generate           | User can start the DUA generation process                          |
| dua.preview            | User can preview the generated DUA before confirming               |
| dua.confirm            | User can confirm the generated DUA document                        |
| dua.download           | User can download the generated DUA document                       |
| generation.read        | User can monitor the progress of a generation process              |
| generation.refresh     | User can refresh the generation progress                           |
| generation.errors.read | User can view warnings and errors generated during processing      |

**Admin Permissions**
| Code                   | Description                                   |
| ---------------------- | --------------------------------------------- |
| users.read             | Admin can view the list of users              |
| users.create           | Admin can create new users                    |
| users.update           | Admin can update user information             |
| users.delete           | Admin can delete users                        |
| roles.read             | Admin can view system roles                   |
| roles.create           | Admin can create roles                        |
| roles.update           | Admin can modify roles                        |
| roles.delete           | Admin can delete roles                        |
| permissions.read       | Admin can view permission definitions         |
| permissions.assign     | Admin can assign permissions to roles         |
| generation.cancel      | Admin can cancel an active generation process |
| activity.audit.read    | Admin can view the complete system audit log  |
| system.settings.update | Admin can modify system configuration         |


#### 1.4.3.3 Role-Permission Mapping
Role to permissions mapping is found in [rolePermissions.ts](src/policies/rolePermissions.ts)

| Role     | Permissions                                                                                                                                                                                                                                         |
| -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| admin    | All permissions                                                                                                                                                                                                                                     |
| operator | auth.login, auth.logout, session.read, user.profile.read, files.read, files.upload, activity.read, dua.template.upload, dua.template.validate, dua.generate, generation.read, generation.refresh, generation.errors.read, dua.preview, dua.download |
| reviewer | auth.login, auth.logout, session.read, user.profile.read, files.read, activity.read, dua.preview, dua.confirm, dua.download, generation.read, generation.refresh, generation.errors.read                                                            |
| viewer   | auth.login, auth.logout, session.read, user.profile.read, files.read, activity.read, generation.read                                                                                                                                                |


#### 1.4.3.4 Access Policies
Access Policies are found in [accessPolicy.ts](src/policies/accessPolicy.ts)

| Policy                  | Required Permissions                                       | Description                                           |
| ----------------------- | ---------------------------------------------------------- | ----------------------------------------------------- |
| canViewHome             | session.read, user.profile.read, files.read, activity.read | Allows access to the Home screen and its main widgets |
| canGenerateDua          | dua.generate, files.upload, dua.template.upload            | Allows starting the DUA generation flow               |
| canMonitorGeneration    | generation.read                                            | Allows viewing generation progress                    |
| canRefreshGeneration    | generation.refresh                                         | Allows refreshing process status                      |
| canViewGenerationErrors | generation.errors.read                                     | Allows viewing warnings and processing errors         |
| canPreviewDua           | dua.preview                                                | Allows previewing the generated DUA                   |
| canConfirmDua           | dua.confirm                                                | Allows confirming the generated DUA                   |
| canDownloadDua          | dua.download                                               | Allows downloading the generated DUA file             |
| canManageUsers          | users.read, users.create, users.update, users.delete       | Allows user administration                            |
| canManageRoles          | roles.read, roles.create, roles.update, roles.delete       | Allows role administration                            |
| canAssignPermissions    | permissions.read, permissions.assign                       | Allows permission assignment to roles                 |
| canReadAuditLog         | activity.audit.read                                        | Allows access to full audit logs                      |
| canManageSystemSettings | system.settings.update                                     | Allows changing platform settings                     |
| canCancelGeneration     | generation.cancel                                          | Allows canceling active generation processes          |


#### 1.4.3.5 Routing Protection
This project has three methods of routing protection, use depending on each routes context.

**[AuthGuard.tsx](src/auth/guards/AuthGuard.tsx)**

Use this guard to prevent unauthenticated access to specific routes.

Example usage:
[AppRouter.tsx](/src/routes/AppRouter.tsx)
```TypeScript
  <AuthGuard>
    <DashboardLayout>
      <HomePage />
    </DashboardLayout>
  </AuthGuard>
```

**[GuestGuard.tsx](src/auth/guards/GuestGuard.tsx)**

Use this guard to prevent authenticated users accessing unauthenticated sites.

Example usage:
[AppRouter.tsx](/src/routes/AppRouter.tsx)
```TypeScript
  <GuestGuard>
    <LoginPage />
  </GuestGuard>
```

**[PolicyGuard.tsx](src/auth/guards/PolicyGuard.tsx)**

Use this guard when an entire route, page, or protected section requires a specific set of permissions defined by an access policy.

Example usage:
[AppRouter.tsx](/src/routes/AppRouter.tsx)
  ```TypeScript
  <AuthGuard>
    <PolicyGuard required={accessPolicy.canGenerateDua}>
      <ConfigureGeneratorPage />
    </PolicyGuard>
  </AuthGuard>
  ```

#### 1.4.3.6 Usage
Expandir en cómo funciona el permission hook\
Developers must never write:
```TypeScript
if (user.role === "admin")
```
directly inside pages or components. Instead they should use:
```TypeScript
const { hasAccess } = usePolicies();

{hasAccess("canGenerateDua") && <StartGenerationButton />}
```
Policies centralize business access rules so that permission changes are made in one place only.

Use permissions directly only inside:
- policy definitions
- low-level authorization utilities
- backend authorization logic

**When to use policy hooks vs guards**

Use `PolicyGuard` when the entire route, page, or major protected section must be blocked for unauthorized users.

Example:
```TypeScript
<AuthGuard>
  <PolicyGuard required={accessPolicy.canGenerateDua}>
    <ConfigureGeneratorPage />
  </PolicyGuard>
</AuthGuard>
```

Use `usePolicies()` inside components to control smaller UI behaviors such as:
- showing or hiding buttons
- rendering optional sections
- displaying access explanations
- detecting partial access

Example:
```TypeScript
const { hasAccess } = usePolicies();
const { hasPermission } = usePermissions();

{hasAccess("canGenerateDua") && <StartGenerationButton />}
```

**hasAccess**

Use `hasAccess` when the user must have all permissions required by the policy.

This is the default method for most actions.

Example:
```ts
const { hasAccess } = usePolicies();

return (
  <>
    {hasAccess("canGenerateDua") && <StartGenerationButton />}
  </>
);
```
Use `hasAccess` for:
- action buttons
- form submission actions
- protected widgets
- feature visibility that requires full access

**hasSomeAccess**

Use `hasSomeAccess` when a screen or component can still provide value with partial access.

This is useful when a section contains multiple sub-features and you want to render the container if the user can access at least one of them.

Example:
```ts
const { hasSomeAccess, hasAccess } = usePolicies();

return (
  <>
    {hasSomeAccess("canViewHome") && (
      <HomePanel>
        {hasAccess("canViewHome") ? (
          <FullHomeContent />
        ) : (
          <LimitedHomeContent />
        )}
      </HomePanel>
    )}
  </>
);
```

Use `hasSomeAccess` for:
- dashboards with partial widgets
- grouped action menus
- sections that degrade gracefully
- navigation groups where at least one item is available

Do not use `hasSomeAccess` for:
- destructive actions
- form submissions
- secure business operations
- anything that requires full authorization

**getMissingPermissions(policyName)**

Use `getMissingPermissions` when the UI needs to explain why access is denied or when debugging authorization.

Example:
```ts
const { hasAccess, getMissingPermissions } = usePolicies();

if (!hasAccess("canManageUsers")) {
  return (
    <AccessDeniedMessage
      missingPermissions={getMissingPermissions("canManageUsers")}
    />
  );
}
```

Use `getMissingPermissions` for:
- admin/debug pages
- support troubleshooting
- access denied messages
- logs and diagnostics

Do not expose raw permission codes to end users unless that is intentional for admin or internal tools.

For normal users, prefer friendly messages like:
- "You do not have access to generate DUAs."
- "Contact an administrator if you need this action enabled."
{hasPermission("dua.generate") && <StartGenerationButton />}
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

Permissions should be added in the backend as well in order for this to work

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

#### 1.4.4.1 Guest Guard
Use this guard to prevent authenticated users accessing unauthenticated sites

Example usage:
[AppRouter.tsx](/src/routes/AppRouter.tsx)
```TypeScript
  <GuestGuard>
    <LoginPage />
  </GuestGuard>
```

#### 1.4.4.1 Permission Guard
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

### 1.4.6 Storage Rules
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

The frontend follows a five-layer architecture where each layer has a distinct responsibility and interactions flow strictly downward through hooks and services. This keeps the codebase maintainable and testable.

**Architecture diagram:**

```
  +------------------------------------------+
  |  Presentation Layer                      |
  |  Components, Pages, Features             |
  +--------+-------------------------------+
           | calls
           V
  +------------------------------------------+
  |  Application Layer                       |
  |  Hooks (useLogin, usePermissions, etc.)  |
  +--------+-------------------------------+
           | validates with
           V
  +------------------------------------------+
  |  Domain Logic Layer                      |
  |  Zod Schemas, Policies, Permissions     |
  +--------+-------------------------------+
           | calls
           V
  +------------------------------------------+
  |  Services Layer                          |
  |  apiClient, authService, etc.           |
  +--------+-------------------------------+
           | HTTP/REST
           V
       Backend / External APIs


  Infrastructure Layer (Session, i18n, Styles, Utils)
  Shared context across all layers above
```

**Layer 1 — Presentation:** UI components (primitives, composites, layouts, feature pages) render data and capture user input. They never call services or APIs directly. Routing orchestration (AppRouter) and route guards (AuthGuard, GuestGuard, PermissionGuard) protect navigation based on authentication and permissions.

**Layer 2 — Application:** Hooks orchestrate logic by coordinating validation, service calls, and state updates. Each hook flows: validate input → call service → update infrastructure (session, permissions).

**Layer 3 — Domain Logic:** Zod schemas validate all user input. Permission checks happen via `usePermissions()` hook, never with direct role comparisons. Policies and constants define permissions and roles.

**Layer 4 — Services:** `apiClient` and typed service classes (`authService`, `generatorService`) handle all backend communication. HTTP interceptors (`httpInterceptors.ts`) manage cross-cutting concerns like automatic session validation and 401 redirects. Services are stateless — they return data or throw errors.

**Layer 5 — Infrastructure:** Shared across all layers—`SessionProvider` (session state), design tokens (colors, spacing), i18n (translations), observability (Azure Insights), and utilities.

**Folder mapping:**

| Folder | Layers | Purpose |
|--------|--------|---------|
| `src/components/` | Layer 1 | Primitives, composites, layouts |
| `src/auth/guards/` | Layer 1 | Routing guards (AuthGuard, GuestGuard, PermissionGuard) |
| `src/features/` | Layer 1, 2, 3 | Feature pages, hooks, schemas |
| `src/hooks/` | Layer 2, 5 | Shared hooks (useSession, usePermissions) |
| `src/services/` | Layer 4 | apiClient, authService, generatorService |
| `src/policies/` | Layer 3 | Roles, permissions, access policies |
| `src/schemas/` | Layer 3 | Zod validation schemas |
| `src/providers/` | Layer 5 | SessionProvider, context |
| `src/i18n/` | Layer 5 | Translations, react-i18next config |
| `src/styles/` | Layer 5 | Tokens, theme, breakpoints, globals |
| `src/types/` | Layer 5 | Session types, shared interfaces |
| `src/utils/` | Layer 5 | Helpers, formatters, constants |

**Dependency rules:**

- Presentation can only call Application (hooks) and Infrastructure.
- Application can call Domain Logic, Services, and Infrastructure.
- Domain Logic can only use Infrastructure.
- Services can only use Infrastructure.
- **No layer may call upward.**

Violations: primitive components importing services, services calling `useState`, feature pages calling `fetch` directly, hooks comparing `user.role === "admin"` instead of using `usePermissions()`.

**Example: Login flow**

User submits credentials → `LoginForm` calls `useLogin()` hook → hook validates with `loginRequestSchema` → calls `authService.login()` → `apiClient` sends request with secure cookies → backend returns session → hook calls `setSession()` → `SessionProvider` stores user + permissions → router redirects to Home.

**Example: DUA generation flow**

User uploads files → `ConfigureGeneratorPage` calls `useUploadFiles()` hook → hook checks `hasPermission("dua.generate")` via infrastructure → validates with `uploadConfigSchema` → calls `generatorService.startGeneration()` → `apiClient` sends multipart upload → returns job ID → router navigates to `ProgressPage` → `useGenerationProgress()` polls for updates → when done, retrieves preview via service → `PreviewPage` renders result.

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

