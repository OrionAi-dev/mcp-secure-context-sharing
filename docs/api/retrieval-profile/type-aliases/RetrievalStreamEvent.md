[**@astrospec/retrieval-profile**](../README.md)

***

[@astrospec/retrieval-profile](../README.md) / RetrievalStreamEvent

# Type Alias: RetrievalStreamEvent

> **RetrievalStreamEvent** = \{ `final?`: `boolean`; `kind`: `"status-update"`; `requestId`: `string`; `status`: \{ `message?`: `string`; `state`: `"submitted"` \| `"working"` \| `"input-required"` \| `"completed"` \| `"failed"`; `timestamp`: `string`; \}; \} \| \{ `append?`: `boolean`; `candidate`: [`RetrievalCandidate`](../interfaces/RetrievalCandidate.md); `kind`: `"candidate-update"`; `lastChunk?`: `boolean`; `requestId`: `string`; \} \| \{ `kind`: `"final"`; `requestId`: `string`; `response`: [`RetrievalResponse`](../interfaces/RetrievalResponse.md); \}

Defined in: [src/index.ts:185](https://github.com/OrionAi-dev/AstroSpec/blob/2f5aa7cd50afa970b2003398852c244f8050f71c/packages/astrospec-retrieval-profile/src/index.ts#L185)
