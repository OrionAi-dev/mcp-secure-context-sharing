# External Adoption E2E: Secure Context MCP + SDK Fallback

This sample proves the baseline external integration contract:

1. Secure-context MCP validation is the default path.
2. Direct SDK validation is the fallback path.
3. Valid/invalid semantics remain parity-compatible and deterministic.

## Run in this repo (CI/local smoke)

From repository root:

```bash
pnpm install
pnpm exec tsx examples/external/mcp-default-fallback/run.ts
```

Expected final line:

```text
external-e2e-result: ok
```

## External usage shape (npm packages)

```bash
npm i @mcp-secure-context/mcp-adapter @mcp-secure-context/sdk-typescript
```

Use the same payload flow:

1. Validate a context container with `mcp_secure_context.container.validate`.
2. Validate the same container with `@mcp-secure-context/sdk-typescript` fallback.
3. Assert parity for pass/fail and deterministic MCP error code on invalid payloads.
