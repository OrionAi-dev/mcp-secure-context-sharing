import {
  callSecureContextTool,
  type SecureContextMcpResult,
  type SecureContextMcpToolName,
} from '@mcp-secure-context/mcp-adapter';
import {
  type ContextContainer,
  type ContainerType,
  type ContextPayloadMap,
  type PolicyMetadata,
  type ProvenanceEnvelope,
} from '@mcp-secure-context/core';
import { validateContextContainer } from '@mcp-secure-context/openspec';

export type {
  ContextContainer,
  ContainerType,
  ContextPayloadMap,
  KnowledgeObject,
  MemoryReference,
  PolicyMetadata,
  ProvenanceEnvelope,
  TaskState,
  UserContext,
  VerificationEnvelope,
} from '@mcp-secure-context/core';

export type {
  SecureContextMcpError,
  SecureContextMcpErrorCode,
  SecureContextMcpResource,
  SecureContextMcpResult,
  SecureContextMcpToolName,
  SecureContextMcpToolSpec,
} from '@mcp-secure-context/mcp-adapter';

export function createContextContainer<TType extends ContainerType>(input: {
  containerType: TType;
  id: string;
  version?: string;
  payload: ContextPayloadMap[TType];
  policy: PolicyMetadata;
  provenance: ProvenanceEnvelope;
  verification?: ContextContainer<ContextPayloadMap[TType]>['verification'];
  ext?: ContextContainer<ContextPayloadMap[TType]>['ext'];
}): ContextContainer<ContextPayloadMap[TType]> {
  return {
    schema: 'mcp-secure-context.container.v0.1',
    containerType: input.containerType,
    id: input.id,
    version: input.version ?? '0.1.0',
    payload: input.payload,
    policy: input.policy,
    provenance: input.provenance,
    ...(input.verification ? { verification: input.verification } : {}),
    ...(input.ext ? { ext: input.ext } : {}),
  };
}

export function validateContainer(payload: unknown) {
  return validateContextContainer(payload);
}

export async function callSecureContext(
  name: SecureContextMcpToolName,
  args?: unknown,
): Promise<SecureContextMcpResult<unknown>> {
  return callSecureContextTool({ name, arguments: args });
}
