
export function encodeUrl(url:string): string {
    const base64 = Buffer.from(url).toString('base64')

    return base64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

export function decodeUrl(code: string): string {
  let base64 = code.replace(/-/g, '+').replace(/_/g, '/')

  while (base64.length % 4 !== 0) {
    base64 += '='
  }

  return Buffer.from(base64, 'base64').toString('utf-8')
}