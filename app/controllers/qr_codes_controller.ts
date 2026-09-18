import type { HttpContext } from '@adonisjs/core/http'
import QRCode from 'qrcode'

export default class QrCodesController {
  public async generate({ params, request, response }: HttpContext) {
    // 1. Récupérer le code depuis l'URL
    const code = params.code

    // 2. Reconstruire l'URL courte complète (celle que le QR code doit encoder)
    const shortUrl = `${request.protocol()}://${request.host()}/${code}`

    // 3. Générer le QR code sous forme de buffer PNG
    const qrBuffer = await QRCode.toBuffer(shortUrl, {
      type: 'png',
      width: 300,
    })

    // 4. Définir le type de contenu de la réponse comme une image PNG
    response.header('Content-Type', 'image/png')

    // 5. Renvoyer directement l'image
    return response.send(qrBuffer)
  }
}
