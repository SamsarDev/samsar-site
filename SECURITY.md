# Política de Seguridad

La seguridad de este repositorio y de los estudiantes que interactúan con él es una prioridad fundamental.

---

## 1. Versiones con Soporte

| Versión | Soportada |
|---|---|
| Rama `main` (producción) | :white_check_mark: |
| Ramas de desarrollo / forks | :x: |

---

## 2. Reporte de Vulnerabilidades

Si descubres una vulnerabilidad de seguridad o un vector de ataque potencial (fuga de credenciales, inyecciones, dependencias comprometidas):

1. **NO abras un Issue público.**
2. Envía un correo directo a: **`samsar.dev@gmail.com`** con el asunto `[SEGURIDAD] Reporte en SamsarSite`.
3. Incluye:
   - Descripción detallada del vector de vulnerabilidad.
   - Pasos para reproducir el fallo de forma segura.
   - Impacto potencial estimado.

Nos comprometemos a acusar recibo en un plazo menor a 48 horas y mantener una comunicación transparente hasta que la mitigación se publique.

---

## 3. Seguridad para Estudiantes

- **Secretos y Claves:** Nunca incluyas archivos `.env`, tokens personales de GitHub ni claves API en commits o pull requests.
- **Auditoría Automatizada:** El repositorio cuenta con escaneo continuo de secretos (TruffleHog) que bloqueará automáticamente cualquier PR con datos sensibles expuestos.
