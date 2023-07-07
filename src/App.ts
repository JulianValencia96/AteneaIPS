import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { serve, setup } from 'swagger-ui-express'
import { swaggerSpec } from './swagger.conf'
import express, { Application, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import PacienteRouter from './routes/Paciente.routes'
import MedicoRouter from './routes/Medico.routes'
import CitaRouter from './routes/Cita.routes'
import FormularioRouter from './routes/Formulario.routes'
import EspecialidadRouter from './routes/Especialidad.routes'
class App {
	public app: Application
	private server: any
	private prismaClient:PrismaClient

	constructor() {
		this.app = express()
		this.app.use(express.json())
		this.app.use(cors())
		this.app.use('/api-docs', 
			swaggerUi.serve, 
			swaggerUi.setup(swaggerSpec)
		)

		this.prismaClient = new PrismaClient()
		this.routes()


	}

	


	private routes(): void {

		this.app.get(
            "/",
            (req:Request, res:Response)=>{
                res.send("Bienvenidos a typescript")
            }
        )
        this.app.post(
            "/paciente",
            (req:Request, res:Response)=>{
                res.send("Bienvenidos a typescript")
            }
        )

		this.app.post(
            "/cita",
            (req:Request, res:Response)=>{
                res.send("Bienvenidos a typescript")
            }
        )
    
    

		const pacienteRouter = new PacienteRouter()
		const medicoRouter = new MedicoRouter()
		const citaRouter = new CitaRouter()
		const especialidadRouter = new EspecialidadRouter()
		
		this.app.use('/', pacienteRouter.router)
		this.app.use('/', medicoRouter.router)
		this.app.use('/', citaRouter.router)
		this.app.use('/', especialidadRouter.router)
		this.app.use('/', FormularioRouter)
		
		
		
	}

	configurarCORS(req: any, res: { header: (arg0: string, arg1: string) => void }, next: () => void) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST");
        res.header("Access-Control-Allow-Headers", "Content-Type");
        next();
      }



	public start(): void {
		this.server = this.app.listen(3002, () => {
			console.log('Puerto 3002 en ejecución')
		})
	}

	public close(): void {
		this.server.close()
	}
}

export default App