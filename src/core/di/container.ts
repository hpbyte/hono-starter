import type { Constructor, ModuleClass } from '@core/di'
import { Container } from 'inversify'

export const createContainer = (modules: Constructor[]): Container => {
  const container = new Container({ defaultScope: 'Singleton' })

  for (const module of modules) {
    ;(module as Constructor & ModuleClass).register(container)
  }

  return container
}
