import { StyleProcessor, StyleValues } from './process'

type Handler<T> = (cssPromise: Promise<string>) => T

const createCache = (): WeakMap<[TemplateStringsArray, StyleValues], string> =>
	new WeakMap<[TemplateStringsArray, StyleValues], string>()

export const directive = <T>(
	processor: StyleProcessor,
	handler: Handler<T>
): ((strings: TemplateStringsArray, ...values: string[]) => T) => {
	const cache = createCache()
	return (strings: TemplateStringsArray, ...values: StyleValues) => {
		const key: [TemplateStringsArray, StyleValues] = [strings, values]
		const c = cache.get(key)
		const processed = (async () => {
			if (c === undefined) {
				return (async unresolve => {
					const resolve = await unresolve
					cache.set(key, resolve)
					return resolve
				})(processor(strings, ...values))
			}

			return Promise.resolve(c)
		})()
		return handler(processed)
	}
}
