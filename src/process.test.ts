import * as postcssPresetEnv from 'postcss-preset-env'
import { process } from './process'
import { strictEqual } from 'assert'

const format = (s: string) => s.replace(/[\s\n]/g, '')

describe('Writ css with Tagged Templates', () => {
	it('Use variables', async () => {
		const style = process()
		const color = 'green'
		const result = await style`
            body {
                color: ${color};
            }
        `
		strictEqual(
			format(result),
			format(`
				body {
					color: green;
				}
			`)
		)
	})

	it('Transform with plug-in', async () => {
		const style = process({
			plugins: [postcssPresetEnv({ stage: 0 })]
		})
		const color = 'green'
		const result = await style`
            body {
				& a {
					color: ${color};
				}
            }
        `
		strictEqual(
			format(result),
			format(`
				body a {
					color: green;
				}
			`)
		)
	})

	it('Transform async template', async () => {
		const style = process({
			plugins: [postcssPresetEnv({ stage: 0 })]
		})
		const color = 'green'
		const result = await style`
            body {
				& a {
					color: ${color};
				}
            }
        `
		strictEqual(
			format(result),
			format(`
				body a {
					color: green;
				}
			`)
		)
	})
})
