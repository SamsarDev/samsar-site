# Guía de Contribución para Estudiantes y Colaboradores

¡Te damos la bienvenida a **Samsar | Código, cultura y curiosidad**!

Este proyecto tiene una doble misión: es el sitio web personal de Samuel Sarmientos y, al mismo tiempo, una **plataforma didáctica de aprendizaje real**. Queremos que te sientas libre de experimentar, aprender buenas prácticas y proponer mejoras en un entorno seguro y profesional.

---

## 1. Regla de Oro: Abrí un Issue Primero

Para evitar esfuerzos duplicados o cambios que no encajen con la arquitectura:

1. **No abras Pull Requests sorpresa.**
2. Antes de escribir código, busca si existe un Issue abierto o crea uno nuevo usando las [plantillas de Issues](https://github.com/SamsarDev/samsar-site/issues/new/choose).
3. Espera la confirmación del mantenedor (`@SamsarDev`) para coordinar el alcance de la tarea.

---

## 2. Flujo de Trabajo en Git

1. **Haz un Fork** del repositorio a tu cuenta personal de GitHub.
2. **Clona tu fork** localmente:
   ```bash
   git clone https://github.com/TU-USUARIO/samsar-site.git
   cd samsar-site
   ```
3. **Instala dependencias** utilizando Bun como gestor principal:
   ```bash
   bun install
   ```
4. **Crea una rama descriptiva** partiendo de `main` en inglés y kebab-case:
   - `feat/nombre-de-funcionalidad`
   - `fix/descripcion-del-bug`
   - `docs/mejora-en-documentacion`
5. **Realiza commits atómicos** siguiendo el estándar de [Conventional Commits](https://www.conventionalcommits.org/) en inglés:
   - `feat: add post card component`
   - `fix: correct mobile menu z-index`
   - `docs: clarify bun command in readme`
   *(Nota: Prohibido añadir etiquetas de co-autoría o atribución automática de IA en los mensajes de commit).*

---

## 3. Reglas Técnicas No Negociables

- **TypeScript Estricto:** Prohibido el uso de `any` (usá `unknown` y estrechá tipos).
- **Astro por Defecto:** Todo componente estático es `.astro`. Solo usamos componentes `.vue` en `src/components/islands/` cuando hay estado reactivo real en cliente.
- **Tokens Semánticos:** Nunca pegues valores hexadecimales directos (`#00A86B`) en tus clases o componentes; consumí los tokens semánticos de `src/styles/theme.css` (`var(--accent-primary)`, `var(--bg-surface)`).
- **Cero Dependencias No Autorizadas:** No agregues paquetes npm por tu cuenta sin aprobación previa en el Issue.
- **Accesibilidad:** Todo botón o enlace debe ser operable por teclado con foco visible. Los contrastes deben cumplir con WCAG AA.
- **Zona Protegida:** No edites archivos dentro de `docs/99-reference/` (es histórico).

---

## 4. Verificación Local Antes de Abrir el PR

Antes de enviar tu Pull Request, tu código debe pasar limpiamente estos comandos:

```bash
bun run check
bun run build
```

Ambos deben finalizar con código de salida 0 (sin warnings ni errores de tipo).

---

## 5. Apertura del Pull Request

1. Sube tu rama a tu fork: `git push origin feat/mi-tarea`
2. Abre el Pull Request apuntando a la rama `main` del repositorio oficial.
3. Completa **el 100% de la plantilla del Pull Request** (vincula el Issue y marca el checklist de DoD).
4. El pipeline automático de GitHub Actions validará los tipos, el build estático y el escaneo de seguridad.
5. El mantenedor revisará tu código, te dará retroalimentación constructiva para aprender y aprobará el merge.

¡Gracias por aprender y construir con nosotros!
