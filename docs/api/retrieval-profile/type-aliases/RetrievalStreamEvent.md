[**@astrospec/retrieval-profile**](../README.md)

***

[@astrospec/retrieval-profile](../README.md) / RetrievalStreamEvent

# Type Alias: RetrievalStreamEvent

> **RetrievalStreamEvent** = \{ `final?`: `boolean`; `kind`: `"status-update"`; `requestId`: `string`; `status`: \{ `message?`: `string`; `state`: `"submitted"` \| `"working"` \| `"input-required"` \| `"completed"` \| `"failed"`; `timestamp`: `string`; \}; \} \| \{ `append?`: `boolean`; `candidate`: [`RetrievalCandidate`](../interfaces/RetrievalCandidate.md); `kind`: `"candidate-update"`; `lastChunk?`: `boolean`; `requestId`: `string`; \} \| \{ `kind`: `"final"`; `requestId`: `string`; `response`: [`RetrievalResponse`](../interfaces/RetrievalResponse.md); \}

Defined in: [src/index.ts:185](https://github.com/OrionAi-dev/mcp-secure-context-sharing/blob/92f51cff7db63cef48b487941969de0da4a8cde4/packages/astrospec-retrieval-profile/src/index.ts#L185)
