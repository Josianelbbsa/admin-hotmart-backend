import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import  Config  from '@ioc:Adonis/Core/Config'
import axios from 'axios'
import { promises as fs } from 'fs'

export default class HotmartController {

    public async getToken() {
        let get_token: any = fs.readFile('./config/hotmart.json', 'utf8')
        get_token = JSON.parse(await get_token) as Array<any>
        return get_token.token
    }

    public async generateToken() {

        const client_id = process.env.HOTMART_CLIENT_ID
        const client_secret = process.env.HOTMART_CLIENT_SECRET
        let new_token: string = ""

        axios.post(`https://api-sec-vlc.hotmart.com/security/oauth/token?grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`, {}, {
            headers: {
                "Authorization": process.env.HOTMART_CLIENT_TOKEN!
            }
        }).then(async (response) => {
            new_token = response.data.access_token
            if (new_token) {
                let get_token: any = fs.readFile('./config/hotmart.json', 'utf8')
                get_token = JSON.parse(await get_token) as Array<any>
                get_token.token = new_token

                Config.set(`app.hotmart`,new_token)

                fs.writeFile('./config/hotmart.json', JSON.stringify(get_token))
                console.log("♥️ Token gerada com sucesso!")
            } else {
                console.log("🤔 mas gente, cadê a token?")
            }

        }).catch((reason) => {
            console.log(reason)
        })


    }

    public async index(ctx: HttpContextContract) {

       await axios.get=({"",
        headers:{
            "Authorization": process.env.HOTMART_CLIENT_TOKEN
        }
    }).then((response) => {
        console.log(response.data)
    })
     }
    }