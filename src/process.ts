import { AcceptedPlugin } from 'postcss'
// tslint:disable-next-line:no-require-imports
import postcss = require('postcss')

export type StyleProcessor = (
	strings: TemplateStringsArray,
	...values: string[]
) => Promise<string>
export type StyleValues = string[]

const join = (strings: TemplateStringsArray, values: StyleValues) =>
	strings.reduce(
		(result, current, i) =>
			`${result}${current}${values[i] ? `${values[i]}` : ''}`,
		''
	)

interface Options {
	plugins?: AcceptedPlugin[]
}

export const process = ({ plugins = [] }: Options = {}): StyleProcessor => {
	const transform = async (css: string) =>
		postcss(plugins).process(css, { from: `${Math.random()}` })
	return async (strings: TemplateStringsArray, ...values: StyleValues) => {
		const processed = await transform(join(strings, values))
		return processed.css
	}
}
