import { process } from './process'
import { strictEqual } from 'assert'
import { directive } from './directive'

const format = (s: string): string => s.replace(/[\s\n]/g, '')

describe('Directive', () => {
	it('Handler', async () => {
		const resolver = process()
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
