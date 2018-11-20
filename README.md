# lit-style

PostCSS preprocessor for Tagged Templates

## Installation

```bash
npm i lit-style
```

## Usage

```ts
import { createStyle } from 'lit-style'
import * as postcssPresetEnv from 'postcss-preset-env'

// Create function Tagged Templates
const style = createStyle({
	plugins: [postcssPresetEnv({ stage: 0 })], // For example use postcss-preset-env
	build(css) {
		return `<style>${css}</style>`
	}
})

const color = 'green'

// 💅 Can use the result processed by PostCSS
export const body = async () => style`
    body {
        & a {
            color: ${color};
        }
    }
`
```
