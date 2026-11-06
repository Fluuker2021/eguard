# eGuard

Plataforma de supervisión industrial · Americorp

Sitio estático. La consola y el modelo 3D se publican cifrados (AES-GCM 256, clave derivada con PBKDF2-SHA256 de 250 000 iteraciones a partir del usuario y la contraseña); solo se descifran en el navegador tras iniciar sesión.

## Contenido

| Archivo | Función |
|---|---|
| `index.html` | Pantalla de acceso + consola eGuard cifrada |
| `p3d.enc.txt` | Modelo 3D del chancado primario, cifrado |
| `.nojekyll` | Indica a GitHub Pages que sirva los archivos tal cual |
| `robots.txt` | Evita la indexación en buscadores |
| `favicon.ico`, `apple-touch-icon.png` | Ícono de Americorp |
| `vendor/` | Librerías propias del sitio: three.js 0.160.0, SheetJS 0.18.5, jsPDF 2.5.1 |

## Publicar en GitHub Pages

1. En github.com: **New repository** → nombre `eguard` → **Create repository**.
2. **Add file → Upload files** → arrastra todo el contenido de esta carpeta (incluido `.nojekyll`) → **Commit changes**.
3. **Settings → Pages** → *Source*: **Deploy from a branch** → *Branch*: `main` / `(root)` → **Save**.
4. En 1–2 minutos el sitio queda en `https://<tu-usuario>.github.io/eguard/`.

Para actualizar, vuelve a subir `index.html` y `p3d.enc.txt` generados por la nueva revisión.
