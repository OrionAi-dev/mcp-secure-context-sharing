[**@mcp-secure-context/core**](../README.md)

***

[@mcp-secure-context/core](../README.md) / VerificationEnvelope

# Interface: VerificationEnvelope

Defined in: packages/mcp-secure-context-core/dist/index.d.ts:38

## Properties

### digest

> **digest**: `string`

Defined in: packages/mcp-secure-context-core/dist/index.d.ts:39

***

### expiresAt?

> `optional` **expiresAt**: `string`

Defined in: packages/mcp-secure-context-core/dist/index.d.ts:47

***

### ext?

> `optional` **ext**: `Record`\<`string`, [`JsonValue`](../type-aliases/JsonValue.md)\>

Defined in: packages/mcp-secure-context-core/dist/index.d.ts:49

***

### issuer?

> `optional` **issuer**: `string`

Defined in: packages/mcp-secure-context-core/dist/index.d.ts:45

***

### revokedAt?

> `optional` **revokedAt**: `string`

Defined in: packages/mcp-secure-context-core/dist/index.d.ts:48

***

### signatures?

> `optional` **signatures**: `object`[]

Defined in: packages/mcp-secure-context-core/dist/index.d.ts:41

#### metadata

> **metadata**: [`SignatureMetadata`](SignatureMetadata.md)

#### value

> **value**: `string`

***

### status

> **status**: [`VerificationStatus`](../type-aliases/VerificationStatus.md)

Defined in: packages/mcp-secure-context-core/dist/index.d.ts:40

***

### verifier?

> `optional` **verifier**: `string`

Defined in: packages/mcp-secure-context-core/dist/index.d.ts:46
