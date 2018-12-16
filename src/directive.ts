import { StyleResolver, StyleValues } from './create-style'

type Handler<T> = (cssPromise: Promise<string>) => T

const createCache = () =>
	new WeakMap<[TemplateStringsArray, StyleValues], string>()

export const directive = <T>(resolver: StyleResolver, handler: Handler<T>) => {
	const cache = createCache()
	return async (strings: TemplateStringsArray, ...values: StyleValues) => {
		const key: [TemplateStringsArray, StyleValues] = [strings, values]
		const c = cache.get(key)
		const processed = c
			? Promise.resolve(c)
			: (async unresolve => {
					const resolve = await unresolve
					cache.set(key, resolve)
					return resolve
			  })(resolver(strings, ...values))
		return handler(processed)
	}
}
