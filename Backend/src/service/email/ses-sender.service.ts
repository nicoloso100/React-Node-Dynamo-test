import { SES } from "aws-sdk";
import { SendEmailRequest } from "aws-sdk/clients/ses";

const ses = new SES();

export default class SESService {
  async sendSesMessage(name: string) {
    const params: SendEmailRequest = {
      Source: "nico.las0315@hotmail.com",
      Destination: {
        ToAddresses: ["nicolas.angaritao@unilibrebog.edu.co"],
      },
      Message: {
        Subject: {
          Data: `Correo para ${name}`,
        },
        Body: {
          Text: {
            Data: `Hola ${name}!`,
          },
        },
      },
    };
    console.log(params);
    var result = await ses.sendEmail(params).promise();
    console.log(result);
  }
}
