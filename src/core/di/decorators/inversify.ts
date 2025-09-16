import { inject, injectable, multiInject, optional } from 'inversify'
import type {
  BindingScope,
  MultiInjectOptions,
  ServiceIdentifier,
  LazyServiceIdentifier
} from 'inversify'

export const Inject = (serviceIdentifier: ServiceIdentifier | LazyServiceIdentifier) =>
  inject(serviceIdentifier)

export const Injectable = (scope?: BindingScope) => injectable(scope)

export const MultiInject = (
  serviceIdentifier: ServiceIdentifier | LazyServiceIdentifier,
  options?: MultiInjectOptions
) => multiInject(serviceIdentifier, options)

export const Optional = () => optional()
