import {Router, Request, Response} from 'express'
import EspecialidadController from '../controllers/EspecialidadController'
class EspecialidadRouter{
    router:Router
    especialidadController:EspecialidadController
    constructor(){

        this.router= Router()
        this.especialidadController = new EspecialidadController()
        this.routes()

        
    }

    private routes():void{
        this.router.get(
			'/especialidades',
                (req:Request, res:Response)=>{
                    this.especialidadController.obtenerEspecialidad(req,res)
            } 
		)
  
		this.router.post(
			'/crear_especialidad',
            (req:Request, res:Response)=>{
                this.especialidadController.crearEspecialidad(req,res)
            }
		)
    }
}

export default EspecialidadRouter