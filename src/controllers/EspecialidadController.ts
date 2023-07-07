import {Response, Request} from "express"
import {PrismaClient} from "@prisma/client"

class EspecialidadController{

    private prismaClient:PrismaClient

    constructor(){
        this.prismaClient = new PrismaClient()
    }

    async obtenerEspecialidad(req:Request, res:Response){
        const especialidades = await this.prismaClient.especialidad.findMany()
        res.json(especialidades)
    }

    async crearEspecialidad(req: Request, res: Response){
        try{

        const{
            idEspecialidad,
            nombre

        } = req.body

        //const fecha = new Date(Fecha)

        const especialidad = await this.prismaClient.especialidad.create(
            {
            data:{
                idEspecialidad,
                nombre
                }
            }
        )

        res.json(especialidad)
        }catch(e:any){
            res.status(400)
            res.json({eror:e.message})
        }
    }

}

export default EspecialidadController