import test from 'node:test';
import assert from 'node:assert/strict';

import {
  SECURE_CONTEXT_MCP_ERROR_CODES,
  SECURE_CONTEXT_MCP_TOOL_NAMES,
  callSecureContextTool,
  createSecureContextMcpServer,
  serializeContextContainerResource,
} from '../src/index.js';
import type { ContextContainer } from '@mcp-secure-context/core';

function makeContainer(): ContextContainer {
  return {
    schema: 'mcp-secure-context.container.v0.1',
    containerType: 'task_state',
    id: 'task-1',
    version: '0.1.0',
    payload: {
      taskId: 'task-1',
      goal: 'handoff',
      status: 'in_progress',
    },
    policy: {
      audience: ['agent'],
      allowedActions: ['read'],
      expiresAt: '2026-03-12T00:00:00.000Z',
    },
    provenance: {
      createdAt: '2026-03-11T00:00:00.000Z',
      createdBy: 'agent://planner',
    },
  };
}

test('exports secure context MCP tool names and error codes', () => {
  assert.deepEqual(SECURE_CONTEXT_MCP_TOOL_NAMES, [
    'mcp_secure_context.container.validate',
    'mcp_secure_context.container.verify',
    'mcp_secure_context.container.share',
  ]);

  assert.ok(SECURE_CONTEXT_MCP_ERROR_CODES.includes('MSC_INVALID_INPUT'));
  assert.ok(SECURE_CONTEXT_MCP_ERROR_CODES.includes('MSC_CONTAINER_INVALID'));
  assert.ok(SECURE_CONTEXT_MCP_ERROR_CODES.includes('MSC_POLICY_VIOLATION'));
  assert.ok(SECURE_CONTEXT_MCP_ERROR_CODES.includes('MSC_NOT_FOUND'));
});

test('validate tool accepts a valid portable context container', async () => {
  const out = await callSecureContextTool({
    name: 'mcp_secure_context.container.validate',
    arguments: { container: makeContainer() },
  });

  assert.equal(out.ok, true);
  if (out.ok) {
    const result = out.result as { containerId: string; containerType: string; valid: boolean };
    assert.equal(result.containerId, 'task-1');
    assert.equal(result.containerType, 'task_state');
    assert.equal(result.valid, true);
  }
});

test('verify tool returns a digest for a valid container', async () => {
  const out = await callSecureContextTool({
    name: 'mcp_secure_context.container.verify',
    arguments: { container: makeContainer() },
  });

  assert.equal(out.ok, true);
  if (out.ok) {
    const result = out.result as { containerId: string; digest: string };
    assert.equal(result.containerId, 'task-1');
    assert.equal(typeof result.digest, 'string');
    assert.ok(result.digest.length > 10);
  }
});

test('share tool returns sharable metadata for a validated container', async () => {
  const out = await callSecureContextTool({
    name: 'mcp_secure_context.container.share',
    arguments: { container: makeContainer() },
  });

  assert.equal(out.ok, true);
  if (out.ok) {
    const result = out.result as { containerId: string; uri: string };
    assert.equal(result.containerId, 'task-1');
    assert.ok(String(result.uri).startsWith('mcp-secure-context://containers/task_state/task-1'));
  }
});

test('tool rejects invalid containers', async () => {
  const out = await callSecureContextTool({
    name: 'mcp_secure_context.container.validate',
    arguments: { container: { bad: true } },
  });

  assert.equal(out.ok, false);
  if (!out.ok) {
    assert.equal(out.error.code, 'MSC_CONTAINER_INVALID');
  }
});

test('server reads previously registered container resources', () => {
  const container = makeContainer();
  const server = createSecureContextMcpServer({ containers: [container] });
  const resource = serializeContextContainerResource(container);

  const read = server.readResource(resource.uri);
  assert.equal(read.ok, true);
  if (read.ok) {
    assert.equal(read.result.uri, resource.uri);
    assert.equal(read.result.mimeType, 'application/json');
  }
});

test('server returns not found for unknown resources', () => {
  const server = createSecureContextMcpServer();
  const read = server.readResource('mcp-secure-context://containers/task_state/missing');
  assert.equal(read.ok, false);
  if (!read.ok) {
    assert.equal(read.error.code, 'MSC_NOT_FOUND');
  }
});
