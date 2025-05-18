# 📚 Proyecto Mis Profesores - Instrucciones de Uso

Este proyecto permite consultar opiniones sobre profesores extraídas de MisProfesores.com. Los estudiantes pueden usar un chatbot para obtener información de manera natural.

Para el funcionamiento de este proyecto se necesita clonar los repositorios:

```bash
https://github.com/421010301/mis_profesores_front
```

```bash
https://github.com/421010301/mis_profesores_api
```

dentor de una carpeta llamada mis_profesores, para que quede la siguiente estructura:


```
mis_profesores/
└── mis_profesores_front
└── mis_profesores_api
```

Despues desde el proyecto de la api, sacar el docker-compose.yml y la carpeta initdb para que quede asi

```
mis_profesores/
├── mis_profesores_api
├── mis_profesores_front
├── docker-compose.yml
└── initdb
```

Para esto tambien se necesinat llenar las variables de ambiente del docker compose y una api key de google genai

* API en `http://localhost:8000`
* Frontend en `http://localhost:3000`
* Base de datos MySQL con datos cargados automáticamente

## 📌 Endpoints clave

| Método | Ruta              | Descripción                         |
| ------ | ----------------- | ----------------------------------- |
| POST   | `/consulta-genai` | Consulta con GenAI                  |
