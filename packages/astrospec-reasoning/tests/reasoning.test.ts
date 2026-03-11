import test from 'node:test';
import assert from 'node:assert/strict';

import {
  ASTROSPEC_REASONING_CONTRACT_KINDS,
  validateReasoningContract,
  validateReasoningGraph,
  validateReasoningResult,
  validateReasoningTask,
  validateReasoningWorkflowContract,
} from '../src/index.js';

const task = {
  taskId: 'task_1',
  prompt: 'How should a legal evidence system organize call logs and filings?',
  graph: {
    graphId: 'graph_1',
    roles: [
      { roleId: 'abstraction_star', title: 'Abstraction Star' },
      { roleId: 'legal_star', title: 'Legal Star' },
      { roleId: 'skeptic_star', title: 'Skeptic Star' },
    ],
    edges: [
      { from: 'abstraction_star', to: 'legal_star', relation: 'informs' },
      { from: 'legal_star', to: 'skeptic_star', relation: 'supports' },
    ],
    phases: ['abstraction', 'analysis', 'review'],
  },
  mode: 'event-horizon',
};

const result = {
  taskId: 'task_1',
  status: 'completed',
  summary: 'Claim linkage and procedural dependency tracking survive skeptical review.',
  outputs: [{ artifactId: 'artifact_1', kind: 'evidence-graph' }],
};

test('exports deterministic reasoning contract kinds', () => {
  assert.ok(ASTROSPEC_REASONING_CONTRACT_KINDS.includes('reasoning-task'));
  assert.ok(ASTROSPEC_REASONING_CONTRACT_KINDS.includes('reasoning-workflow-contract'));
});

test('valid reasoning task and result pass', () => {
  assert.equal(validateReasoningTask(task).ok, true);
  assert.equal(validateReasoningResult(result).ok, true);
  assert.equal(validateReasoningContract('reasoning-task', task).ok, true);
});

test('graph rejects duplicate role ids and unknown edge targets', () => {
  const badGraph = {
    graphId: 'graph_bad',
    roles: [
      { roleId: 'legal_star', title: 'Legal Star' },
      { roleId: 'legal_star', title: 'Duplicate Legal Star' },
    ],
    edges: [{ from: 'legal_star', to: 'missing_star', relation: 'supports' }],
  };

  const validation = validateReasoningGraph(badGraph);
  assert.equal(validation.ok, false);
  assert.ok(validation.issues.some((issue) => issue.path === '/roles/1/roleId'));
  assert.ok(validation.issues.some((issue) => issue.path === '/edges/0/to'));
});

test('workflow validates task graph role membership', () => {
  const workflow = {
    workflowId: 'workflow_1',
    task,
    roles: [{ roleId: 'abstraction_star', title: 'Abstraction Star' }],
    phases: ['abstraction'],
  };

  const validation = validateReasoningWorkflowContract(workflow);
  assert.equal(validation.ok, false);
  assert.ok(validation.issues.some((issue) => issue.path === '/task/graph/roles/1/roleId'));
});
