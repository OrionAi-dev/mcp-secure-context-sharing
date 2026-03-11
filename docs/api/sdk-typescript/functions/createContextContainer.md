[**@mcp-secure-context/sdk-typescript**](../README.md)

***

[@mcp-secure-context/sdk-typescript](../README.md) / createContextContainer

# Function: createContextContainer()

> **createContextContainer**\<`TType`\>(`input`): [`ContextContainer`](../interfaces/ContextContainer.md)\<[`ContextPayloadMap`](../type-aliases/ContextPayloadMap.md)\[`TType`\]\>

Defined in: mcp-secure-context-sdk-typescript/dist/index.d.ts:7

## Type Parameters

### TType

`TType` *extends* [`ContainerType`](../type-aliases/ContainerType.md)

## Parameters

### input

#### containerType

`TType`

#### ext?

`Record`\<`string`, `JsonValue`\>

#### id

`string`

#### payload

[`ContextPayloadMap`](../type-aliases/ContextPayloadMap.md)\[`TType`\]

#### policy

[`PolicyMetadata`](../interfaces/PolicyMetadata.md)

#### provenance

[`ProvenanceEnvelope`](../interfaces/ProvenanceEnvelope.md)

#### verification?

[`VerificationEnvelope`](../interfaces/VerificationEnvelope.md)

#### version?

`string`

## Returns

[`ContextContainer`](../interfaces/ContextContainer.md)\<[`ContextPayloadMap`](../type-aliases/ContextPayloadMap.md)\[`TType`\]\>
