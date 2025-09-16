import { TOKENS } from '@core/di/tokens'
import type { Container } from 'inversify'
import 'reflect-metadata'

export const MODULE_METADATA = Symbol('Module')

export type Constructor<T = {}> = new (...args: any[]) => T

export interface ModuleOptions {
  providers?: Constructor[]
  controllers?: Constructor[]
  backgroundJobs?: Constructor[]
}

export interface ModuleClass {
  register(container: Container): void
}

export function Module(options: ModuleOptions) {
  return function <T extends Constructor>(constructor: T): T & ModuleClass {
    Reflect.defineMetadata(MODULE_METADATA, options, constructor)

    const moduleConstructor = constructor as T & ModuleClass

    moduleConstructor.register = function (container: Container) {
      if (options.providers) {
        options.providers.forEach((provider) => {
          if (!container.isBound(provider)) {
            container.bind(provider).toSelf()
          }
        })
      }

      if (options.controllers) {
        options.controllers.forEach((controller) => {
          if (!container.isBound(controller)) {
            container.bind(controller).toSelf()
            container
              .bind(TOKENS.HttpController)
              .toDynamicValue((context) => context.get(controller))
          }
        })
      }

      if (options.backgroundJobs) {
        options.backgroundJobs.forEach((job) => {
          if (!container.isBound(job)) {
            container.bind(job).toSelf()
            container.bind(TOKENS.BackgroundJob).toDynamicValue((context) => context.get(job))
          }
        })
      }
    }

    return moduleConstructor
  }
}
