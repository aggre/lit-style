import { StyleProcessor, StyleValues } from './process'

type Handler<T> = (cssPromise: Promise<string>) => T

const createCache = () =>
	new WeakMap<[TemplateStringsArray, StyleValues], string>()

export const directive = <T>(
	processor: StyleProcessor,
	handler: Handler<T>
) => {
	const cache = createCache()
	return (strings: TemplateStringsArray, ...values: StyleValues) => {
		const key: [TemplateStringsArray, StyleValues] = [strings, values]
		const c = cache.get(key)
		const processed = c
			? Promise.resolve(c)
			: (async unresolve => {
					const resolve = await unresolve
					cache.set(key, resolve)
					return resolve
			  })(processor(strings, ...values))
		return handler(processed)
	}
}
