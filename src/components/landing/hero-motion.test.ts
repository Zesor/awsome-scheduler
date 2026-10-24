import { test } from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

// A transform left on an ancestor of the live calendar (e.g. an entrance animation with `forwards`)
// becomes the containing block of its fixed drag overlay, and drops land on the wrong day.
test('hero entrance animations leave no transform behind once finished', () => {
  const css = readFileSync('src/components/landing/Hero.module.css', 'utf8')
  for (const sel of ['.w', '.in']) {
    const rule = css.match(new RegExp(`^\\${sel} \\{([^}]*)\\}`, 'm'))?.[1] ?? ''
    assert.match(rule, /animation:[^;]*backwards/, `${sel} must fill backwards`)
    assert.doesNotMatch(rule, /forwards|transform:/, `${sel} must not keep a transform`)
  }
})
