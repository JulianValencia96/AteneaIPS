import swaggerUi from 'swagger-ui-express'
import { serve, setup } from 'swagger-ui-express'
import { swaggerSpec } from './swagger.conf'
import express, { Application, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import PacienteRouter from './routes/Paciente.routes'
import MedicoRouter from './routes/Medico.routes'
import FormularioRouter from './routes/Formulario.routes'
class App {
	public app: Application
	private server: any
	private prismaClient:PrismaClient

	constructor() {
		this.app = express()
		this.app.use(express.json())
		this.app.use('/api-docs', 
			swaggerUi.serve, 
			swaggerUi.setup(swaggerSpec)
		)

		this.prismaClient = new PrismaClient()
		this.routes()


	}

	private routes(): void {
		const pacienteRouter = new PacienteRouter()
		const medicoRouter = new MedicoRouter()
		
		this.app.use('/', pacienteRouter.router)
		this.app.use('/', medicoRouter.router)
		this.app.use('/', FormularioRouter)
		
		
	}
	

	public start(): void {
		this.server = this.app.listen(3000, () => {
			console.log('Puerto 3000 en ejecución')
		})
	}

	public close(): void {
		this.server.close()
	}
}

export default App