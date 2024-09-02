# Aplicación Web de Rolling Health

Bienvenidos al repositorio de la Aplicación Web de Rolling Health. Este proyecto se enfoca en la interfaz de usuario para la gestión de pacientes, turnos, y personal médico de las distintas sucursales en la Argentina.

## Tabla de Contenido
* [Descripción](#descripción)
* [Características](#características)
* [Tecnologías utilizadas](#tecnologías-utilizadas)
* [Capturas de Pantalla](#capturas-de-pantalla)
* [Comenzando](#comenzando)
  * [Requisitos Previos](#requisitos-previos)
  * [Instalación](#instalación)
  * [Ejecutar la Aplicación](#ejecutar-la-aplicación)
* [Link de Deploy](#link-de-deploy)
* [Como Contribuir](#como-contribuir)
* [Autores](#autores)

### Descripción
Este repositorio contiene el frontend de la Aplicación Web de Rolling Health. La interfaz está diseñada para ser intuitiva y accesible, permitiendo a los usuarios gestionar eficientemente la información de los pacientes y las operaciones del centro médico.

### Características
* **Interfaz de Usuario Intuitiva:** Fácil navegación para pacientes y personal médico.
* **Programación de Citas:** Flujo sencillo para reservar y cancelar citas.
* **Gestión de Usuarios:** Manejo de roles y permisos de acceso.
* **Integración con Backend:** Comunicación eficiente con el backend a través de API RESTful.

### Tecnologías utilizadas
* **Framework:** [React.js](https://react.dev/)
* **Gestión de Estado:** [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)
* **Cliente API:** [Axios](https://axios-http.com/es/docs/intro)
* **Estilos:** [Tailwind](https://tailwindcss.com/)
* **Manejo de rutas:** [React Router-Dom](https://reactrouter.com/en/main)
* **Verificación de Formularios:** [React Hook-Form](https://react-hook-form.com/)
* **Visualización de datos en Historial de Paciente:** [React Chart.js](https://www.chartjs.org/docs/master/)
* **Calendarios de la aplicación:** [Date-fns](https://date-fns.org/)
* **Mensajes de alerta:** [React Hot Toast](https://react-hot-toast.com/)
* **Iconos:** [React Icons](https://react-icons.github.io/react-icons/)
* **Spinners de carga:** [React Spinners](https://www.davidhu.io/react-spinners/)

### Capturas de Pantalla
A continuación, algunas imágenes de la aplicación web:
1. #### Home Page
![Home Page](https://github.com/user-attachments/assets/478cf055-b5ad-415b-8a8c-2a3080af7f1b)

2. #### Centros de Salud
![Centros de Salud](https://github.com/user-attachments/assets/b1fc41ab-3ef4-4cf9-9870-caa4bf8be762)

3. #### Staff Médico
![Staff Médico](https://github.com/user-attachments/assets/b9da48f4-b5d5-4b6e-a5df-f7e40fa05e11)

4. #### Login
![Login](https://github.com/user-attachments/assets/37e4f7c5-eeb9-4b42-ba16-304a8fc55ac9)

5. #### Registro
![Registro](https://github.com/user-attachments/assets/b39f53af-829a-47fa-94c1-ddbaffb110f1)

6. #### Portal del Paciente (Turnos pendientes)
![Portal del Paciente (Turnos pendientes)](https://github.com/user-attachments/assets/efe161d6-65ad-4963-87ca-fe3bb772160e)

7. #### Portal del Paciente (Sacar nuevo turno)
![Portal del Paciente (Sacar nuevo turno)](https://github.com/user-attachments/assets/4c458cef-008b-418e-8444-a78a01dd87e1)

8. #### Portal del Paciente (Historial)
![Portal del Paciente (Historial)](https://github.com/user-attachments/assets/865e121a-2f36-4329-806c-28eb3ff79437)

9. #### Dashboard del Médico
![Dashboard del Médico](https://github.com/user-attachments/assets/5af322be-da01-436a-8bd1-961af500effa)

10. #### Dashboard del Administrador
![Dashboard del Administrador](https://github.com/user-attachments/assets/8812d447-6521-4ed4-b435-e5043a435374)

### Comenzando
#### Requisitos Previos
Antes de comenzar, asegúrate de tener instalados los siguientes requisitos:
* Node.js (v14 o superior)
* npm

#### Instalación
1. ##### Clona el Repositorio
`git clone https://github.com/fagomezomil/rollinghealth.git`

2. ##### Instala las dependencias
`npm install`

#### Ejecutar la Aplicación
1. ##### Inicia el servidor de desarrollo
`npm run dev`

2. ##### Accede a la aplicación:
Abre tu navegador y ve a `http://localhost:5173`.

### Link de Deploy:
* [Netlify](https://rollinghealth.netlify.app/)

### Como Contribuir
¡Tu contribución es bienvenida! Debes seguir estos pasos:
1. Haz un fork del repositorio
2. Crea una nueva rama (`git checkout -b feature/TuCaracterística`)
3. Realiza tus aportes.
4. Haz commit de tus cambios (`git commit -m 'Agregar una característica'`)
5. Haz push a la rama (`git push origin feature/TuCaracterística`)
6. Abre un Pull Request

### Autores
* Federico Alvarez: [GitHub](https://github.com/fagomezomil)
* Mariana Cervantes: [GitHub](https://github.com/MitaCervantes)
* Marcelo Frías: [GitHub](https://github.com/marcfry)
* Lucas Capdevila: [GitHub](https://github.com/lucasecapdevila)