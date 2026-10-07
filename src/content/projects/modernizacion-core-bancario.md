---
title: 'Modernización Core Bancario con .NET Core y Apache Kafka'
description: 'Migración de arquitectura SOAP legacy a microservicios mediante patrón Strangler Fig y Clean Architecture.'
type: 'professional'
stack: ['.NET Core', 'C#', 'Apache Kafka', 'Clean Architecture', 'Azure SQL', 'Docker']
status: 'completed'
postSlug: 'samsar-dev/guia-clean-architecture-frontend'
featured: true
---

## Contexto del Proyecto

Modernización de la plataforma transaccional de un grupo bancario regional. El sistema original dependía de servicios monolíticos SOAP con tiempos de respuesta de hasta 20 segundos y alto riesgo de contención de base de datos durante horas pico.

## Solución Arquitectónica

- **Patrón Strangler Fig:** Descomposición gradual del monolito redirigiendo tráfico de transferencias hacia un nuevo stack de microservicios sin interrumpir la operación continua.
- **Arquitectura Basada en Eventos (EDA):** Ingesta y distribución asíncrona mediante Apache Kafka en Azure, garantizando consistencia eventual y desacoplamiento de servicios terceros.
- **Clean Architecture & Minimal APIs:** Modelado de dominio puro aislado de adaptadores de infraestructura y persistencia en SQL Server y Oracle.

## Impacto de Ingeniería

- **Latencia:** Reducción del tiempo de respuesta transaccional en un 75% (de 20s a menos de 5s).
- **Resiliencia:** Tolerancia a fallos ante caídas intermitentes de pasarelas bancarias externas gracias a colas de reintentos con backoff exponencial.
