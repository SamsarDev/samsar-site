---
title: 'Experiencias Gamificadas 3D para Plataforma Educativa'
description: 'Módulos interactivos en 3D bajo enfoque Mobile-First para más de 50,000 estudiantes activos.'
type: 'game'
stack: ['Three.js', 'JavaScript', 'Vue.js', '.NET MVC', 'WebGL']
status: 'completed'
featured: false
---

## Desafío Pedagógico

Diseño e implementación de experiencias pedagógicas interactivas para una plataforma de aprendizaje escolar en Centroamérica. El reto radicaba en renderizar entornos tridimensionales fluidos en dispositivos móviles de gama baja y media utilizados por estudiantes.

## Decisiones Técnicas

- **Renderizado 3D con Three.js:** Optimización de mallas poligonales, iluminación precalculada (*baked lights*) y limitación estricta de llamadas de dibujado (*draw calls*) para asegurar 60 FPS en WebGL.
- **Integración con Vue.js:** Enlace bidireccional entre la escena gráfica y la interfaz reactiva de usuario (puntuaciones, retroalimentación formativa y temporizadores).
- **Enfoque Mobile-First:** Controles táctiles responsivos con detección de gestos intuitivos adaptados a niños y jóvenes.

## Métricas y Adopción

Más de 50,000 estudiantes utilizaron las actividades interactivas, registrando un aumento del 35% en el tiempo de retención voluntaria en las sesiones de práctica.
