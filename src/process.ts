import { AcceptedPlugin } from 'postcss'
import postcss = require('postcss')

export type StyleProcessor = (
	strings: TemplateStringsArray,
	...values: string[]
) => Promise<string>
export type StyleValues = string[]

const join = (strings: TemplateStringsArray, values: StyleValues): string =>
	strings.reduce(
		(result, current, i) =>
			`${result}${current}${(() => {
				if (values[i] === undefined) {
					return ''
				}

				return `${values[i]}`
			})()}`,
		''
	)

interface Options {
	plugins?: AcceptedPlugin[]
}

export const process = ({ plugins = [] }: Options = {}): StyleProcessor => {
	const transform = async (css: string): Promise<postcss.Result> =>
		postcss(plugins).process(css, { from: `${Math.random()}` })
	return async (strings: TemplateStringsArray, ...values: StyleValues) => {
		const processed = await transform(join(strings, values))
		return processed.css
	}
}
