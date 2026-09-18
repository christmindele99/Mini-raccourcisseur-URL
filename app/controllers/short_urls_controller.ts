import type { HttpContext } from '@adonisjs/core/http'
import { nanoid } from 'nanoid'
import { encodeUrl, decodeUrl } from '#utils/url_encoder'
import { saveCode, getLongCode } from '#utils/url_store'

export default class ShortUrlsController {
  public async index({ view }: HttpContext) {
    return view.render('pages/home')
  }

  public async create({ request, view }: HttpContext) {
    const originalUrl = request.input('original_url')

    // 1. Encoder l'URL (comme avant)
    const longCode = encodeUrl(originalUrl)

    // 2. Générer un code court aléatoire
    const shortCode = nanoid(8)

    // 3. Associer le code court au code long en mémoire
    saveCode(shortCode, longCode)

    // 4. Construire le lien court avec le CODE COURT cette fois
    const shortUrl = `${request.protocol()}://${request.host()}/${shortCode}`

    return view.render('pages/result', { shortUrl, code: shortCode, originalUrl })
  }

  public async redirect({ params, response }: HttpContext) {
    const shortCode = params.code

    // 1. Retrouver le code long à partir du code court
    const longCode = getLongCode(shortCode)

    // 2. Si le code court est inconnu (jamais généré, ou serveur redémarré)
    if (!longCode) {
      return response.notFound('Ce lien est introuvable ou a expiré.')
    }

    // 3. Décoder pour retrouver l'URL originale
    const originalUrl = decodeUrl(longCode)

    // 4. Rediriger
    return response.redirect(originalUrl)
  }
}