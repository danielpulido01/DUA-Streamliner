# Diseño de frontend

La forma con la que el usuario interactúa con la tecnología.
Comúnmente se llama frontend solo a web applications y a las móviles mobile.
Para nosotros todo lo que use el usuario es frontend, es la pieza con la que el usuario participa en el "customer journey"
- Un QR en una ventana o poste
- Web app funciona, y en sus manifestaciones: mobile, desktop, tablet, pantalla grande.
- Smartphone, la superficie touch, giros, la posición, si uso uno o dos touch points
- Si hay un pen
- Mouse, teclado, trackballs
- Eye tracking
- Neural links
- Control remoto, un botón, un panel de control físico con botones grandes
- Volante, freno, cámara, sensor
- Sonidos
- Comandos de voz, chat

## Consideraciones para el Technology Stack

### Medio de interacción
- Mobile
  - Experiencia enriquecida en animación, movimiento, manejo del espacio
  - Mucha grabación, video, uso de sensores, giroscopios, gps
  - Hay una dependencia importante con el hardware
  - Movilidad: comodidad y que las personas puedan accionar el sistema "at hand"
  - Costo:
    - Desarrollo nativo iOS y Android, o si bien, es híbrido como por ejemplo ReactNative, Flutter, Kotlin multiplatform. Asume que programo un solo código y con ello genero Android y iOS, siempre se requiere ajuste, no es real que ahora con un 50% del esfuerzo hago 2 plataformas, aproximadamente es un 70% a 80%. Es decir, si un proyecto de iOS dura 7 meses y el mismo app en android se dura 6 meses, entonces usar un híbrido no significa 6.5 meses de trabajo, si no más bien, de 9 a 11 meses.
    - Los desarrolladores, necesito expertos en iOS o Android? Salarios? O será que con AI no hace falta que sea tan mobile expert?
    - Un híbrido me amplía la capacidad de obtener desarrolladores
  - Modo de distribución, aplicaciones certificadas por un store, y tienen un proceso de aprobación
- Web app
  - Extensibilidad del uso, porque al ser web puedo tener más alcance y acceso a las personas
  - Abierto a multi tamaños, experiencia responsive, puedo vivir el sistema en el teléfono, en la compu, en la tablet
  - Sistemas medianamente interactivos
  - Es más accesible conseguir desarrolladores en ciertos lenguajes
  - Tengo tres paradigmas
    - **Static applications**
    - **CSR client side rendering**: Consume recursos del lado del cliente, alivianando la carga de los servidores lo que reduce costo de servidor, me permite atender a muchos más usuarios pero es más inseguro
    - **SSR server side rendering**: los datos y la generación del HTML, se hace del lado del servidor, por ende todo el código JS y CSS corre en el server, gasta más recursos en el server, reduce la cantidad de usuarios que puedo atender simultáneos pero es más seguro.
  - ReactJS, Angular, helpers como Tailwind, Vercel, AI como Lovable, Vercel AI

### Alcance
- Quienes son los user persona, por ejemplo son especialistas de aduana de todo el mundo, por un tema de alcanzar a la mayoría de personas voy por web.
- Disponibilidad de programadores, ej: Rust o Ruby on rails tienen pocos programadores. Justificar por qué lo usaría?

### Soporte a futuro
- Al escoger el lenguaje, el framework, librerías y proveedores considere el soporte técnico y la historia del framework
- Hay suficiente documentación, ayuda, canales para obtener soporte del fabricante, garantías
- Hay que tener en cuenta que tanto podría cambiar el app en el futuro y por cuánto tiempo esperamos que esta tecnología esté activa
- Entender si la AI tiene buen soporte para este lenguaje

### ¿Cómo se construyen los componentes visuales?
- ¿Cómo se interfaza diseño con el desarrollo de los componentes?
- ¿Cómo es que reutilizo los componentes visuales dentro del app?
  - Storybook, Chromatic
- ¿Cómo se mantiene la consistencia de la marca y el estilo dentro del app

### Rendimiento y Cross Platform
- Benchmarks de rendimiento del framework seleccionado
- ¿Cómo controla el responsiveness?
- ¿En qué plataformas, sistemas operativos y browsers puede funcionar?

### Versiones
- Todo debe darse versionado

### Testing
- ¿Cómo se le puede hacer testing automatizado a ese tipo de app en esa tecnología?
  - Jest
  - Component Testing Storybook + Chromatic
  - Cypress + Playwright
- ¿Cómo se le puede hacer test de usabilidad (UX testing)?
  - Fullstory o Hotjar

### Hosting
- Tengo dos opciones:
  - Infraestructura administrada: creo servidores, los instalo y los preparo para hostear mi app. Mayor control de costo y recursos
  - Infraestructura no administrada: serverless, sin servidores. Menor control de costo y recursos
- Depende del control de costos
- Soporte, historia, la plataforma donde voy a hacer el hosting tiene trayectoria? Si no la tiene, qué tan fácil es mover mi sistema a otra plataforma
- La interacción con el backend va a ser dentro del mismo ecosistema o separado? Esto puede implicar costos de transferencia. Por ej: si tengo mi web server, backend y bd en azure, no hay costo por data transfer, pero si tengo web y backend en azure y la bd en mongo atlas, pueden haber costos por data transfer. Todo lo que salga del ecosistema es costo
- Es inevitable pensar en el backend para decidir el hosting del frontend, porque puede tener implicaciones de costo de transferencia, de rendimiento.
- Tolerancia a fallas y disponibilidad. Cuándo se cae un servicio o un server, cuánto es el tiempo de recovery y cuál es el procedimiento?
- Qué ofrece la plataforma de hosting para recovery?
- Una vez que ya se el hosting y la tecnología de desarrollo, defino donde manejo los repositorios de código, la cantidad de repositorios, defino como manejo el CI CD y finalmente defino los ambientes de desarrollo, pruebas, stage y producción y su respectivo deployment.

A nivel de programación considerar:
- Linters (ESLint)
- Prettiers (Prettier)
- Coding AIs (Codex, Claude)
- State Management (redux)
- Code automation tasks (Husky)
- Observability Frameworks ()
- Data validators (Zod)
