import { NextResponse } from "next/server";
const client = require('@sendgrid/mail');

client.setApiKey('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');

export async function POST(req) {
    const { userEmail, userName, password, refLink } = await req.json()

    const message = {
        "from": "infomerksalud@gmail.com",
        "template_id": "d-2b00459f88304a9f8bc9b1972d386899",
        "personalizations": [
            {
              "to": [
                {
                  "email": `${userEmail}`,
                }
              ],
              "subject": "Prueba"
            }
          ],
        "dynamic_template_data": {
            "userName": `${userName}`,
            "email": `${userEmail}`,
            "password": `${password}`,
            "refLink": `${refLink}`
          }
    };
    try {
    
      const emailSendRequest = await client.send(message)
      return NextResponse.json({ ok: true, message: 'Email sent to new user' })
     
    } catch (error) {
        return NextResponse.json({ ok: false, message: error.message })
        //return NextResponse.json({ ok: false, message: 'There were an error during send process' })
    }
}



