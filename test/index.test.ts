import request from 'supertest'
import App from '../src/App'

describe(
	'GET /',
	()=>{
		var app:App
		beforeAll(
			()=>{
				app=new App()
				app.start()
			}
		)

		afterAll(
			()=>{
				app.close()

			}
		)
        
		test(
			'Debe devolver un mensaje',
			async ()=>{
				const res = await request(app.app).get('/')
                expect (res.statusCode).toEqual(200)
				expect (res.text).toEqual('Bienvenidos a typescript')

			}
		)

	}
)