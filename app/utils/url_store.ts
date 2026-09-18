
const store = new Map<string, string>()

export function saveCode(shortCode: string, longCode: string): void {
  store.set(shortCode, longCode)
}

export function getLongCode(shortCode: string): string | undefined {
  return store.get(shortCode)
}