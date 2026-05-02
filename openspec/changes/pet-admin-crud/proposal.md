## Why

El panel de administración necesita capacidades completas de gestión de mascotas para permitir a los administradores crear, editar y eliminar registros de mascotas de manera eficiente desde el frontend, conectándose con el backend PHP existente.

## What Changes

- Extender `js/api.js` con métodos `createPet(data)`, `updatePet(id, data)` y `deletePet(id)` usando POST con campo `_method` para compatibilidad PHP
- Crear ruta `#admin` en `js/app.js` que renderice vista de gestión con protección de token
- Implementar tabla/grid simplificado que liste las mascotas existentes
- Crear componente de formulario dinámico (modal) para Crear/Editar mascotas con campos: Nombre, Especie (Select), Raza e Imagen (URL)
- Añadir botones de 'Editar' y 'Eliminar' en la vista admin con confirmación nativa para eliminar
- Refrescar la vista automáticamente tras operaciones exitosas
- Añadir estilos admin en `css/styles.css` para tabla de gestión, botón flotante '+', estados de botones y soporte modo oscuro

## Capabilities

### New Capabilities
- `pet-admin-crud`: Gestión completa CRUD de mascotas en panel administrativo con formulario dual y protección de acceso

### Modified Capabilities

## Impact

- **API**: Nuevos métodos en `js/api.js` para operaciones CRUD de mascotas
- **Routing**: Nueva ruta `#admin` en `js/app.js` con validación de autenticación
- **UI**: Nuevo componente de tabla de gestión y formulario modal dinámico
- **Styles**: Reglas CSS adicionales en `css/styles.css` para vista admin, modo oscuro incluido
- **Dependencies**: Sin nuevas dependencias externas requeridas
