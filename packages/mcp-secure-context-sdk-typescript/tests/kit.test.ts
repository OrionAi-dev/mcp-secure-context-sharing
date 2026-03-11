import test from 'node:test';
import assert from 'node:assert/strict';

import { callSecureContext, createContextContainer, validateContainer } from '@mcp-secure-context/sdk-typescript';

test('createContextContainer builds a valid task-state container', () => {
  const container = createContextContainer({
    containerType: 'task_state',
    id: 'task-1',
    payload: {
      taskId: 'task-1',
      goal: 'handoff context',
      status: 'in_progress',
    },
    policy: {
      audience: ['agent'],
      allowedActions: ['read'],
    },
    provenance: {
      createdAt: new Date().toISOString(),
      createdBy: 'agent://planner',
    },
  });

  const result = validateContainer(container);
  assert.equal(result.ok, true);
});

test('callSecureContext validates portable containers', async () => {
  const container = createContextContainer({
    containerType: 'user_context',
    id: 'user-1',
    payload: {
      userId: 'user-1',
    },
    policy: {
      audience: ['agent'],
      allowedActions: ['read'],
    },
    provenance: {
      createdAt: new Date().toISOString(),
      createdBy: 'agent://planner',
    },
  });

  const out = await callSecureContext('mcp_secure_context.container.validate', { container });
  assert.equal(out.ok, true);
});
