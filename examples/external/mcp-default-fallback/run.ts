import assert from 'node:assert/strict';

import { callSecureContextTool } from '@mcp-secure-context/mcp-adapter';
import { createContextContainer, validateContainer } from '@mcp-secure-context/sdk-typescript';

function print(label: string, value: unknown) {
  process.stdout.write(`${label}: ${JSON.stringify(value)}\n`);
}

async function main() {
  const validContainer = createContextContainer({
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
      purpose: 'handoff',
    },
    provenance: {
      createdAt: new Date().toISOString(),
      createdBy: 'agent://planner',
    },
  });

  const directValid = validateContainer(validContainer);
  const mcpValid = await callSecureContextTool({
    name: 'mcp_secure_context.container.validate',
    arguments: {
      container: validContainer,
    },
  });

  assert.equal(directValid.ok, true, 'direct valid container should pass');
  assert.equal(mcpValid.ok, true, 'mcp valid container should pass');

  const invalidContainer = {
    schema: 'mcp-secure-context.container.v0.1',
    containerType: 'task_state',
    id: '',
    version: '0.1.0',
    payload: {},
    policy: {},
    provenance: {},
  };

  const directInvalid = validateContainer(invalidContainer);
  const mcpInvalid = await callSecureContextTool({
    name: 'mcp_secure_context.container.validate',
    arguments: {
      container: invalidContainer,
    },
  });

  assert.equal(directInvalid.ok, false, 'direct invalid container should fail');
  assert.equal(mcpInvalid.ok, false, 'mcp invalid container should fail');
  if (!mcpInvalid.ok) {
    assert.equal(mcpInvalid.error.code, 'MSC_CONTAINER_INVALID');
  }

  print('valid.direct', directValid);
  print('valid.mcp', mcpValid);
  print('invalid.direct', { ok: directInvalid.ok, errors: directInvalid.errors });
  print('invalid.mcp', mcpInvalid);

  process.stdout.write('external-e2e-result: ok\n');
}

main().catch((err) => {
  process.stderr.write(`external-e2e-result: fail ${String(err)}\n`);
  process.exit(1);
});
