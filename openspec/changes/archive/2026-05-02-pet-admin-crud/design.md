## Context

El frontend actual (`protectora-mascotas-frontend`) consume una API PHP backend para mostrar mascotas. Existe un sistema de autenticación con token JWT almacenado en localStorage. Actualmente no hay interfaz administrativa para gestionar mascotas desde el frontend.

## Goals / Non-Goals

**Goals:**
- Implementar panel administrativo completo para CRUD de mascotas
- Mantener compatibilidad con backend PHP usando método POST con `_method` override
- Proteger rutas administrativas verificando token de autenticación
- Seguir la estética Premium existente con soporte para modo oscuro

**Non-Goals:**
- No implementar gestión de usuarios administradores
- No cambiar la estructura de la API backend (usar endpoints existentes)
- No implementar paginación en la tabla admin (versión inicial)

## Decisions

### 1. Uso de POST con `_method` para Update/Delete
**Decisión**: Usar POST con campo `_method: 'PUT'` o `_method: 'DELETE'` en el body
**Rationale**: El backend PHP no procesa correctamente PUT/DELETE nativos, requiere esta convención
**Alternativa considerada**: Usar PUT/DELETE nativos → Rechazado por incompatibilidad con backend

### 2. Formulario modal dinámico para Create/Edit
**Decisión**: Un solo componente de formulario que funciona como modal, cambiando comportamiento según modo
**Rationale**: Evita duplicación de código y mantiene UI consistente
**Alternativa considerada**: Formularios separados para crear y editar → Más código duplicado

### 3. Renderizado de tabla en la ruta `#admin`
**Decisión**: Renderizar tabla HTML directamente en el contenedor principal usando innerHTML
**Rationale**: Proyecto actual usa patrón similar para otras vistas, mantiene consistencia
**Alternativa considerada**: Usar framework de templates → Innecesario para este proyecto

### 4. Validación de token en ruta `#admin`
**Decisión**: Verificar existencia de token en localStorage antes de renderizar, redirigir a `#login` si no existe
**Rationale**: Protección básica del panel admin en el frontend
**Alternativa considerada**: Validación con backend → Excede alcance inicial

## Risks / Trade-offs

- **[Risk]** El backend PHP podría no tener endpoints para create/update/delete → **Mitigation**: Verificar endpoints existentes antes de implementar
- **[Risk]** Conflicto con rutas existentes en app.js → **Mitigation**: Revisar código existente antes de añadir `#admin`
- **[Trade-off]** Usar confirm() nativo para eliminar no es tan elegante como modal custom → Aceptado para simplicidad inicial
