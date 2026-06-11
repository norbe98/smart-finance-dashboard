import express from 'express'
import cors from 'cors'
import { authRouter } from './routes/auth.routes.js'
import { dataBaseRouter } from './routes/database.routes.js'

const app = express()
const PORT = 3000

app.use(express.json())
app.use(cors())
app.use("/api/auth", authRouter)
app.use("/api", dataBaseRouter)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})