---
title: 'Plantilla de Clean Architecture y Minimal APIs'
description: 'Blueprint de código abierto para construcción de APIs de alto rendimiento y arquitectura screaming.'
type: 'open-source'
stack: ['C#', '.NET Core', 'FastEndpoints', 'Docker', 'FluentValidation']
status: 'active'
repo: 'https://github.com/samsar-dev'
demo: 'https://samsar-site.pages.dev/'
featured: true
---

## Propósito Open Source

Plantilla de referencia diseñada para equipos de desarrollo que buscan acelerar la creación de APIs REST y microservicios en .NET Core manteniendo principios rigurosos de Clean Architecture sin la sobrecarga boilerplate de controladores tradicionales.

## Pilares de la Solución

- **Vertical Slice & FastEndpoints:** Organización del código por características de negocio (*REPR pattern: Request-Endpoint-Response*) en lugar de capas técnicas genéricas.
- **Validación Declarativa:** Uso de FluentValidation integrado en el pipeline de ejecución para retornar errores de validación tipados en RFC 7807 (Problem Details).
- **Contenerización y CI/CD:** Dockerfiles multi-stage listos para producción con usuario no privilegiado y soporte de escaneos de seguridad.
