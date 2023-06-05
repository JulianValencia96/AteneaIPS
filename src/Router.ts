import swaggerUi from 'swagger-ui-express'
import { swaggerSpec } from './swagger.conf' //desestructurar objeto

import express,{Application, Request, Response} from 'express'
class App{

    //Atributos
    public app:any
    private server:any
    /**
         * 
         * Metodo constructor
         * 
         * @author Julian Valencia
         */
    constructor(){
    /**
     * Express -> libreria de ecosistema de Node
     * 
     * @author Julian Valencia
     */
        this.app=express()
        this.app.use(express.json())
        this.app.use(
            "/api-docs",
            swaggerUi.serve,
            swaggerUi.setup(swaggerSpec)
        )
        this.routes()

    }

    private routes():void{
        this.app.get(
            "/",
            (req:Request, res:Response)=>{
                res.send("Bienvenidos a Typescript");
            }
        )

        this.app.post(
            "/paciente",
            (req:Request, res:Response)=>{
                res.send("Pacientes");
            }
        )
    }


public start():void{
    this.server=this.app.listen(
        3000,
        ()=>{console.log("Puerto 3000 en ejecucion");}
    )
}

public close():void{
    this.server.close();
}

}

export default App