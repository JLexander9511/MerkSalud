import { NextResponse } from "next/server";
const client = require('@sendgrid/mail');

client.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req) {
    const { userEmail, userName } = await req.json()
  
    const message = {
        "from": "infomerksalud@gmail.com",
        "template_id": "d-8627cdef767e4cc49bacc7af37a6b83d",
        "subject": "Solicitud de afiliacion recibida!",
        "personalizations": [
            {
              "to": [
                {
                  "email": `${userEmail}`,
                }
              ],
              "subject": "Solicitud de afiliacion recibida!"
            }
          ],
        "dynamic_template_data": {
            "userName": `${userName}`,
            "subject": "Solicitud de afiliacion recibida!"
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



