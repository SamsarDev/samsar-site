---
title: 'Entornos Didácticos Reproducibles con Docker y PostgreSQL Dual'
description: 'Estrategias de arquitectura en contenedores para aislar metadatos de aplicación de bases de datos empresariales con datos sintéticos.'
pubDate: 2026-10-16
category: 'samsar-ia'
tags: ['docker', 'postgresql', 'arquitectura', 'devops', 'didactica']
draft: true
featured: false
series: 'Senda|Insight: Analítica Segura'
---

## El reto de la reproducibilidad en la enseñanza de software

Para que un proyecto didáctico tenga éxito entre estudiantes y desarrolladores, el proceso de incorporación (*onboarding*) debe ser inmediato y a prueba de fallos de entorno (*"en mi máquina sí compila"*).

Si un estudiante debe instalar manualmente PostgreSQL, crear usuarios con permisos restringidos, poblar tablas y configurar variables de entorno antes de ver la primera pantalla, la fricción inicial destruye la experiencia de aprendizaje.

## La Arquitectura de PostgreSQL Dual en Docker Compose

En **Senda|Insight**, el archivo `docker-compose.yml` orquesta tres servicios principales:

1. **Frontend:** Servido con Vite / Nginx (SPA en Vue 3).
2. **Backend:** API REST en Python (FastAPI).
3. **PostgreSQL Dual:** Un único motor que gestiona dos bases de datos lógicas aisladas:
   - `senda_insight_meta`: Almacena la configuración de la aplicación, usuarios, auditoría y claves de API cifradas en reposo con AES-256.
   - `sample_enterprise_db`: Precargada con datos sintéticos de negocio (ventas, pedidos, inventario, clientes ficticios con PII para ejercitar el enmascaramiento).

```yaml
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: ${DB_ROOT_PASSWORD}
    volumes:
      - pgdata:/var/lib/postgresql/data
      - ./docker/init-scripts:/docker-entrypoint-initdb.d
    ports:
      - "5432:5432"
```

## Beneficios didácticos

Al clonar el repositorio y ejecutar `docker compose up --build`, el estudiante obtiene en minutos un entorno completo listo para auditar consultas SQL, probar diferentes proveedores de IA (Claude, Antigravity u Ollama) y experimentar sin riesgo de dañar bases de datos reales.
