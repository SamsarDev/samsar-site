---
title: 'Gobernanza para LLMs: Privacidad Granular en 3 Niveles'
description: 'Cómo diseñar un sistema de enmascaramiento y exclusión de columnas sensibles para proteger PII en aplicaciones analíticas con IA.'
pubDate: 2026-10-15
category: 'samsar-ia'
tags: ['ia', 'gobernanza', 'seguridad', 'pii', 'fastapi']
draft: true
featured: false
series: 'Senda|Insight: Analítica Segura'
---

## Introducción a la gobernanza de datos en aplicaciones de IA

En la primera entrega de esta serie analizamos cómo blindar la ejecución de consultas mediante árboles de sintaxis abstracta (AST). Sin embargo, una arquitectura segura no comienza en la ejecución de la consulta, sino mucho antes: en **qué información del esquema permitimos que la IA conozca**.

Cuando exponemos bases de datos empresariales a modelos de lenguaje, el riesgo de filtración de Información de Identificación Personal (PII) o secretos comerciales es crítico.

## Los 3 Niveles de Privacidad por Columna

En **Senda|Insight**, superamos el modelo binario tradicional (permitido/bloqueado) implementando un esquema de tres niveles configurables desde el Asistente Guiado (Setup Wizard):

### 1. Visible (Pública)
- **Definición:** Columnas que no contienen datos sensibles ni PII (ej. `monto_total`, `fecha_pedido`, `categoria_producto`).
- **Comportamiento:** Se incluyen en el esquema enviado al prompt del LLM y pueden ser proyectadas o agrupadas libremente.

### 2. Enmascarada (Masked / PII Protegida)
- **Definición:** Columnas necesarias para filtros o agregaciones analíticas, pero cuyo valor puntual no debe ser expuesto ni al LLM ni en la interfaz (ej. `email`, `documento_identidad`, `telefono`).
- **Comportamiento:** La IA sabe que existen para poder generar cláusulas como `COUNT(DISTINCT email)` o `WHERE email LIKE '%@empresa.com'`, pero si la consulta proyecta filas individuales, el backend aplica una función de anonimización (hashing o sustitución parcial `j***@empresa.com`) antes de entregar el dataset.

### 3. Bloqueada (Hidden / Prohibida)
- **Definición:** Columnas de confidencialidad absoluta (ej. `password_hash`, `token_sesion`, `salario_base`).
- **Comportamiento:** Son eliminadas en un 100% del esquema que se le envía al modelo de lenguaje. Si el modelo intenta adivinarlas, el validador AST aborta la consulta inmediatamente.

## Implementación del Asistente Guiado

El asistente de configuración (Wizard) desarrollado en Vue 3 inspecciona el catálogo `information_schema` de PostgreSQL y presenta una interfaz interactiva donde el administrador define la política de seguridad tabla por tabla antes de iniciar cualquier análisis.
