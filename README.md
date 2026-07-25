# Accesible360 - Frontend

Interfaz web para auditar accesibilidad. Ingresa una URL, obtén resultados en 30 segundos y descarga un reporte PDF.

## 🚀 Stack

- **React 18** | Vite | CSS Puro
- **API:** FastAPI backend (localhost:8000 o staging)
- **Build:** 590ms (optimized)

## ⚙️ Setup Local (5 min)

```bash
# 1. Clonar
git clone https://github.com/yasirag/Accesible360_frontend
cd Accesible360_frontend

# 2. Instalar
npm install

# 3. Variables de entorno (.env.local)
echo "VITE_API_URL=http://localhost:8000/api/v1" > .env.local

# 4. Ejecutar
npm run dev
```

Abierto en: http://localhost:5173

## 📋 Características

### Landing Page
- Entra URL (ej: ejemplo.com)
- Click "Auditar"

### Results Page
- Score 0-100 (rojo/amarillo/verde)
- 3 indicadores: Formularios, Encabezados, Enlaces
- Tabla resumen con número de violaciones

### Detalles de Errores
- Click en card → abre modal overlay
- Muestra: ubicación exacta (ID, Name, URL, HTML)
- Máximo 10 elementos por indicador

### Descargar PDF
- Botón con nombre dinámico: `Auditoria_ejemplo.com_2026-07-25.pdf`
- Incluye: página 1 (resumen) + página 2 (fallos detallados)

### Enviar por Email
- Checkbox "Enviar copia a mi correo"
- Abre modal con validación de email
- POST `/audits/{id}/send-email` → BD

## 🧪 Tests

```bash
npm test

# Resultado: 21 tests pasando ✅
```

## 🚀 Build Producción

```bash
npm run build

# Output: dist/
```

## 🐳 Deploy (Vercel)

1. Conectar repo a Vercel
2. Configurar variable de entorno: `VITE_API_URL=https://api.produccion.com`
3. Deploy automático en push

## 📊 Estructura

src/
├─ pages/ (Landing, AuditReport)
├─ components/
│ ├─ molecules/ (EmailForm, IndicatorCard)
│ └─ organisms/ (EmailModal, IndicatorModal, DownloadPanel)
├─ utils/ (validations, scoring)
└─ styles/ (global.css, componentes.css)


## 🎯 MVP Scope

✅ Landing con input URL  
✅ Auditoría en vivo  
✅ Resultados con 3 indicadores  
✅ Modal con ubicación de errores  
✅ Descarga PDF  
✅ Envío por email

## 👨‍💻 Autor

Arisay - Junior Developer  
Factoría F5 - Internship Program  
Madrid, Julio 2026

---

**¿Quieres contribuir? Pull requests bienvenidos**