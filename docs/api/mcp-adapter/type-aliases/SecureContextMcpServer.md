[**@mcp-secure-context/mcp-adapter**](../README.md)

***

[@mcp-secure-context/mcp-adapter](../README.md) / SecureContextMcpServer

# Type Alias: SecureContextMcpServer

> **SecureContextMcpServer** = `object`

Defined in: index.d.ts:144

## Methods

### callTool()

> **callTool**(`input`): `Promise`\<[`SecureContextMcpResult`](SecureContextMcpResult.md)\<`unknown`\>\>

Defined in: index.d.ts:146

#### Parameters

##### input

[`SecureContextMcpToolCall`](SecureContextMcpToolCall.md)

#### Returns

`Promise`\<[`SecureContextMcpResult`](SecureContextMcpResult.md)\<`unknown`\>\>

***

### listTools()

> **listTools**(): [`SecureContextMcpToolSpec`](SecureContextMcpToolSpec.md)[]

Defined in: index.d.ts:145

#### Returns

[`SecureContextMcpToolSpec`](SecureContextMcpToolSpec.md)[]

***

### readResource()

> **readResource**(`uri`): [`SecureContextMcpResult`](SecureContextMcpResult.md)\<[`SecureContextMcpResource`](SecureContextMcpResource.md)\>

Defined in: index.d.ts:148

#### Parameters

##### uri

`string`

#### Returns

[`SecureContextMcpResult`](SecureContextMcpResult.md)\<[`SecureContextMcpResource`](SecureContextMcpResource.md)\>

***

### setContainer()

> **setContainer**(`container`): `void`

Defined in: index.d.ts:147

#### Parameters

##### container

`ContextContainer`

#### Returns

`void`
