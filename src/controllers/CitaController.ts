import {Response, Request} from "express"
import {PrismaClient} from "@prisma/client"

class CitaController{

    private prismaClient:PrismaClient

    constructor(){
        this.prismaClient = new PrismaClient()
    }

    async obtenerCita(req:Request, res:Response){
        const citas = await this.prismaClient.cita.findMany()
        res.json(citas)
    }

    async crearCita(req: Request, res: Response){
        //res.send('Pacientes IPS')
        try{

        const{
            idCita,
            fecha,
            cedulaPaciente,
            tarjetaProfesional,
            Paciente,
            Medico
        } = req.body



        const cita = await this.prismaClient.cita.create(
            {
            data:{
                idCita,
                fecha,
                cedulaPaciente,
                tarjetaProfesional,
                Paciente,
                Medico	
                }
            }
        )

        res.json(cita)
        }catch(e:any){
            res.status(400)
            res.json({eror:e.message})
        }
    }

}

export default CitaController