import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Config from '@ioc:Adonis/Core/Config'
import axios from 'axios'


export default class HotmartApi {
  public async handle({}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    //testar se a token está valida, caso contrario gerar uma nova. 
   let token = Config.get("hotmart.token")

   axios.get("")
    await next()
  }
}


//console.log(`-> ${.method()}: ${request.url()}`)