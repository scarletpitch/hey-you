import express from 'express'
import cors from 'cors'
import path from 'path'
import { appConfig } from './config'

const app = express()
const PORT = process.env.PORT ?? 3001

app.use(cors())
app.use(express.json())

// ── API ──────────────────────────────────────────────────────────────────────

app.get('/api/config', (_req, res) => {
  res.json(appConfig)
})

// ── Static: serve photos & music from client/public ─────────────────────────

const publicDir = path.join(__dirname, '../../client/public')
app.use(express.static(publicDir))

// ── Production: serve the Vite build ────────────────────────────────────────

const clientBuild = path.join(__dirname, '../public')
app.use(express.static(clientBuild))

app.get('*', (_req, res) => {
  res.sendFile(path.join(clientBuild, 'index.html'))
})

// ── Start ────────────────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`\n  hey-you server running → http://localhost:${PORT}\n`)
})
