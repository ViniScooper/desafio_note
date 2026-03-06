import { configDotenv } from 'dotenv'
import { app } from './server.js'


configDotenv()
const { PORT_API } = process.env

const port = process.env.PORT_API || 3000

app.listen(port, '0.0.0.0', () => {
  console.log('Servidor rodando na porta:', port, 'no IP 0.0.0.0')
})