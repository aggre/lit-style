import { AcceptedPlugin, Result } from 'postcss'
// tslint:disable-next-line:no-require-imports
import postcss = require('postcss')

type StyleValues = string[]

const createCache = <T>() =>
	new WeakMap<[TemplateStringsArray, StyleValues], T>()

const join = (strings: TemplateStringsArray, values: StyleValues) =>
	strings.reduce(
		(result, current, i) =>
			`${result}${current}${values[i] ? `${values[i]}` : ''}`,
		''
	)

interface Options<T> {
	plugins?: AcceptedPlugin[]
	build(results: Result['css']): T
}

export const createStyle = <T>({ plugins = [], build }: Options<T>) => {
	const transform = async (css: string) =>
		postcss(plugins).process(css, { from: `${Math.random()}` })
	const cache = createCache<T>()
	return async (strings: TemplateStringsArray, ...values: StyleValues) => {
		const key: [TemplateStringsArray, StyleValues] = [strings, values]
		return cache.has(key)
			? (cache.get(key) as T)
			: (processed => {
					const { css } = processed
					const styleTemplate = build(css)
					cache.set(key, styleTemplate)
					return styleTemplate
			  })(await transform(join(strings, values)))
	}
}
