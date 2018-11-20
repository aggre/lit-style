# lit-style

PostCSS preprocessor for Tagged Templates

[![Build Status](https://travis-ci.org/aggre/lit-style.svg?branch=master)](https://travis-ci.org/aggre/lit-style)

## Installation

```bash
npm i lit-style
```

## Usage

```ts
import { createStyle } from 'lit-style'
import * as postcssPresetEnv from 'postcss-preset-env'

// Create Tagged Templates functions
const style = createStyle({
	plugins: [postcssPresetEnv({ stage: 0 })], // For example, use postcss-preset-env
	build(css) {
		return `<style>${css}</style>`
	}
})

const color = 'green'

// 💅 Gets the result of processing by PostCSS
export const body = async () => style`
    body {
        & a {
            color: ${color};
        }
    }
`
```
