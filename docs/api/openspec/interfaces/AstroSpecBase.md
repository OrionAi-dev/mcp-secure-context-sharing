[**@mcp-secure-context/openspec**](../README.md)

***

[@mcp-secure-context/openspec](../README.md) / AstroSpecBase

# Interface: AstroSpecBase\<F\>

Defined in: packages/mcp-secure-context-openspec/dist/index.d.ts:117

## Extended by

- [`AstroSpecContext`](AstroSpecContext.md)
- [`AstroSpecTurn`](AstroSpecTurn.md)

## Type Parameters

### F

`F` *extends* `Record`\<`string`, [`SpecField`](../type-aliases/SpecField.md)\> = `Record`\<`string`, [`SpecField`](../type-aliases/SpecField.md)\>

## Properties

### acceptanceCriteria

> **acceptanceCriteria**: [`AcceptanceCriteria`](../type-aliases/AcceptanceCriteria.md)

Defined in: packages/mcp-secure-context-openspec/dist/index.d.ts:122

***

### fields

> **fields**: `F`

Defined in: packages/mcp-secure-context-openspec/dist/index.d.ts:121

***

### id

> **id**: `string`

Defined in: packages/mcp-secure-context-openspec/dist/index.d.ts:119

***

### intent

> **intent**: `string`

Defined in: packages/mcp-secure-context-openspec/dist/index.d.ts:120

***

### kind

> **kind**: `"context"` \| `"turn"`

Defined in: packages/mcp-secure-context-openspec/dist/index.d.ts:118

***

### lockedAt

> **lockedAt**: [`ISODateTime`](../type-aliases/ISODateTime.md)

Defined in: packages/mcp-secure-context-openspec/dist/index.d.ts:124

***

### meta?

> `optional` **meta**: `Record`\<`string`, [`JsonValue`](../type-aliases/JsonValue.md)\>

Defined in: packages/mcp-secure-context-openspec/dist/index.d.ts:127

***

### provenance?

> `optional` **provenance**: [`Provenance`](../type-aliases/Provenance.md)

Defined in: packages/mcp-secure-context-openspec/dist/index.d.ts:123

***

### signature?

> `optional` **signature**: `string`

Defined in: packages/mcp-secure-context-openspec/dist/index.d.ts:126

***

### version?

> `optional` **version**: `string`

Defined in: packages/mcp-secure-context-openspec/dist/index.d.ts:125
