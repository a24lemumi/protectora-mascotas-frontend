## 1. API Extension

- [x] 1.1 Add `createPet(data)` method to `js/api.js` that sends POST request with pet data
- [x] 1.2 Add `updatePet(id, data)` method to `js/api.js` using POST with `_method: 'PUT'`
- [x] 1.3 Add `deletePet(id)` method to `js/api.js` using POST with `_method: 'DELETE'`

## 2. Admin Route and Protection

- [x] 2.1 Add `#admin` route to `js/app.js` router
- [x] 2.2 Implement token check in `#admin` route - redirect to `#login` if no token
- [x] 2.3 Create function to render admin view with pet management interface
- [x] 3.1 Create function to fetch and display pets in table/grid format
- [x] 3.2 Render pet table with columns: Nombre, Especie, Raza, Imagen, Acciones
- [x] 3.3 Add Edit and Delete buttons for each row in the table
- [x] 4.1 Create dynamic modal form component with fields: Nombre, Especie (Select), Raza, Imagen (URL)
- [x] 4.2 Implement form mode detection (create vs edit)
- [x] 4.3 Preload form data when editing existing pet
- [x] 4.4 Handle form submission for create mode - call `createPet(data)`
- [x] 4.5 Handle form submission for edit mode - call `updatePet(id, data)`
- [x] 5.1 Implement delete button click handler with native `confirm()` dialog
- [x] 5.2 Call `deletePet(id)` only after user confirms deletion
- [x] 6.1 Refresh admin view automatically after successful create operation
- [x] 6.2 Refresh admin view automatically after successful update operation
- [x] 6.3 Refresh admin view automatically after successful delete operation

## 7. Admin Styles (CSS)

- [x] 7.1 Add CSS rules for admin table styling in `css/styles.css`
- [x] 7.2 Add floating '+' create button with appropriate styling
- [x] 7.3 Style Edit and Delete button states
- [x] 7.4 Ensure all admin elements support dark mode
- [x] 7.5 Maintain Premium aesthetic across all admin components
