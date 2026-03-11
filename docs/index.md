# AstroSpec Docs

AstroSpec is a vendor-neutral contract standard for humans, LLMs, agents, tools, and runtimes.

It should be understood as:

- a contract language
- a schema and validation layer
- a protocol and interoperability layer
- a profile registry for domain-specific contracts
- a neutral standard surface for retrieval and evidence exchange

## Start Here

If you are new to AstroSpec, read in this order:

1. [Overview](astrospec/spec-overview.md)
2. [Protocol](astrospec/protocol.md)
3. [Retrieval Profile](astrospec/retrieval-profile.md)
4. [Reasoning Profile](astrospec/reasoning-profile.md)
5. [Graph Memory Profile](astrospec/graph-memory-profile.md)
6. [Starburst Profile](astrospec/starburst-profile.md)
7. [Runtime Interfaces](astrospec/runtime-interfaces.md)
8. [Evidence and Provenance](astrospec/evidence-provenance.md)
9. [MCP Profile](astrospec/mcp-profile.md)
10. [Governance Charter](governance/charter.md)

## Documentation Map

- **Overview**: [spec-overview](astrospec/spec-overview.md)
- **Protocol**: [protocol](astrospec/protocol.md)
- **Core API**: [api](astrospec/api.md), [typescript](astrospec/typescript.md), [verification](astrospec/verification.md)
- **Retrieval profile**: [retrieval-profile](astrospec/retrieval-profile.md), [retrieval examples](astrospec/retrieval-examples.md)
- **Reasoning profiles**: [reasoning-profile](astrospec/reasoning-profile.md), [graph-memory-profile](astrospec/graph-memory-profile.md), [starburst-profile](astrospec/starburst-profile.md), [runtime-interfaces](astrospec/runtime-interfaces.md), [discovery-bundle](astrospec/discovery-bundle.md), [discovery-examples](astrospec/discovery-examples.md), [discovery-conformance](astrospec/discovery-conformance.md)
- **Interop**: [mcp-profile](astrospec/mcp-profile.md)
- **Governance**: [charter](governance/charter.md), [compatibility-policy](governance/compatibility-policy.md), [profile-registry-policy](governance/profile-registry-policy.md), [change-control](governance/change-control.md), [release-policy](governance/release-policy.md)
- **Release**: [release guide](astrospec/release.md)
- **Migrations**: [OpenSpec to AstroSpec](migrations/openspec-to-astrospec.md), [MindScript to AstroSpec](migrations/mindscript-to-astrospec.md), [OrionAI scope to AstroSpec](astrospec/migration-orionai-to-astrospec-scope.md)
- **Integrations**: [BDD adapters](integrations/bdd/@software/README.md)
- **API reference**: generated under `docs/api/`

## Package Roles

- `@astrospec/schema`: canonical core schemas
- `@astrospec/runtime`: validation, locking, diffing, verification
- `@astrospec/mcp-profile`: canonical MCP mapping
- `@astrospec/retrieval-profile`: retrieval and evidence profile contracts
- `@astrospec/reasoning`: portable reasoning task and workflow contracts
- `@astrospec/graph-memory`: portable discovery memory and structural retrieval contracts
- `@astrospec/starburst-profile`: portable discovery profile contracts
- `@astrospec/runtime-interfaces`: neutral runtime adapter interfaces
- `@astrospec/kit`: small DX layer
- `@astrospec/cli`: contract tooling
- `@astrospec/discovery-bundle`: high-level discovery bundle
- `@astrospec/agent-contracts`: specialized downstream bundle

## How to Adopt

Use AstroSpec in layers:

1. start with core schemas and runtime validation
2. add the retrieval profile if the system exchanges evidence, citations, memory, or graph assertions
3. add the reasoning and discovery profiles if the system exchanges structured reasoning tasks, structural memory, or analogical discovery outputs
4. add runtime interfaces or MCP mappings only when tool/runtime transport interoperability is needed
5. keep product-specific semantics in downstream extensions rather than extending AstroSpec core casually

## Legacy Surface

Historical naming should only appear in migration material, changelog history, or archived notes.
