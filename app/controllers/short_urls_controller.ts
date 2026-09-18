import type { HttpContext } from '@adonisjs/core/http'
import { encodeUrl, decodeUrl } from '#utils/url_encoder'

export default class ShortUrlsController {
  public async index({ view }: HttpContext) {
    return view.render('pages/home')
  }

  public async create({ request, view }: HttpContext) {
    // 1. Récupérer l'URL soumise dans le formulaire
    const originalUrl = request.input('original_url')

    // 2. Encoder l'URL pour obtenir le code court
    const code = encodeUrl(originalUrl)

    // 3. Construire l'URL raccourcie complète
    const shortUrl = `${request.protocol()}://${request.host()}/${code}`

    // 4. Afficher le résultat (Bloc 4 pour la vue)
    return view.render('pages/result', { shortUrl, code, originalUrl })
  }

  public async redirect({ params, response }: HttpContext) {
    const code = params.code

    const originalUrl = decodeUrl(code)
    
    return response.redirect(originalUrl)
  }
}