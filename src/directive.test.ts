import { createStyle } from './create-style'
import { strictEqual } from 'assert'
import { directive } from './directive'

const format = (s: string) => s.replace(/[\s\n]/g, '')

describe('Directive', () => {
	it('Handler', async () => {
		const resolver = createStyle()
		const style = directive(
			resolver,
			async css => `<style>${await css}</style>`
		)
		const result = await style`
            a {
				color: blue;
            }
        `
		strictEqual(
			format(result),
			format(`
            <style>
				a {
					color: blue;
				}
            </style>`)
		)
	})
})
