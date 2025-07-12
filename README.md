Este proyecto implementa el patrón Controller–Service, dividiendo claramente la lógica de negocio y la capa de presentación. Los controladores (InvoiceController) se encargan de recibir las solicitudes HTTP y delegan el trabajo a los servicios (InvoiceService), donde se concentra la lógica de aplicación.
Esta separación favorece la escalabilidad, facilita el mantenimiento y mejora la claridad del código. Además, se utilizan DTOs (Data Transfer Object) para exponer al frontend únicamente los datos necesarios, evitando acoplamientos innecesarios con las entidades de base de datos.
Este patrón fue elegido por su simplicidad, eficacia en arquitecturas de tipo REST y su alineación natural con el enfoque de ASP.NET.

¿Cómo ejecutar el proyecto?

- Backend (.NET)
1. Clonar repositorio: git clone https://github.com/LuisToroSck/Gestion-facturas-pt.git
2. Acceder a la carpeta backend: cd "Gestion-facturas-pt\gestionfacturas-be"
3. Eliminar app.db: rm migrations (Max/Linux) o del migrations (WIndows)
4. Crear nueva migración: dotnet ef migrations add InitialReset
5. Aplicar migración: dotnet ef database update
6. Restaurar dependencias: dotnet restore
7. Ejecutar la API: dotnet run

- Frontend (React + Vite
1. Acceder a la carpeta frontend: cd "GestionFacturas-fe\gestionfacturas-fe
2. Instalar dependencias: npm install
3. Ejectuar el frontend: npm run dev
  
