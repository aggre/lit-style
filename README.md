# lit-style

PostCSS preprocessor for Tagged Templates

[![Build Status](https://travis-ci.org/aggre/lit-style.svg?branch=master)](https://travis-ci.org/aggre/lit-style)

## Installation

```bash
npm i lit-style
```

## Usage

```ts
import { process } from 'lit-style'
import * as postcssPresetEnv from 'postcss-preset-env'

// Create Tagged Templates functions
const style = process({
	plugins: [postcssPresetEnv({ stage: 0 })] // For example, use postcss-preset-env
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

/* This results:
body a {
    color: green;
}
*/
```

Controls return value type with `directive`

```ts
import { process, directive } from 'lit-style'
import * as postcssPresetEnv from 'postcss-preset-env'

const processor = process({
	plugins: [postcssPresetEnv({ stage: 0 })]
})

const style = directive(processor, async css => `<style>${await css}</style>`)

const color = 'green'

export const body = async () => style`
    body {
        & a {
            color: ${color};
        }
    }
`

/* 💅 This beautifully results:
<style>
    body a {
        color: green;
    }
</style>
*/
```
