export const TOKENS = {
  HttpController: Symbol.for('HttpController'),
  BackgroundJob: Symbol.for('BackgroundJob')
} as const

export type TokenKeys = keyof typeof TOKENS
export type Token<K extends TokenKeys> = (typeof TOKENS)[K]
