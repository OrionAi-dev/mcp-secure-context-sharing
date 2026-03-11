import type { ContextContainer } from '@mcp-secure-context/core';
import { digestContextContainer, validateContextContainer } from '@mcp-secure-context/openspec';

export const SECURE_CONTEXT_MCP_TOOL_NAMES = [
  'mcp_secure_context.container.validate',
  'mcp_secure_context.container.verify',
  'mcp_secure_context.container.share',
] as const;

export type SecureContextMcpToolName = (typeof SECURE_CONTEXT_MCP_TOOL_NAMES)[number];

export const SECURE_CONTEXT_MCP_ERROR_CODES = [
  'MSC_INVALID_INPUT',
  'MSC_CONTAINER_INVALID',
  'MSC_POLICY_VIOLATION',
  'MSC_NOT_FOUND',
] as const;

export type SecureContextMcpErrorCode = (typeof SECURE_CONTEXT_MCP_ERROR_CODES)[number];

export type SecureContextMcpError = {
  code: SecureContextMcpErrorCode;
  message: string;
  details?: unknown;
};

export type SecureContextMcpResult<T> =
  | { ok: true; result: T }
  | { ok: false; error: SecureContextMcpError };

export type SecureContextMcpResource = {
  uri: string;
  mimeType: 'application/json';
  text: string;
  annotations?: {
    audience?: readonly string[];
    priority?: number;
    lastModified?: string;
  };
};

export type SecureContextMcpToolCall = {
  name: SecureContextMcpToolName;
  arguments?: unknown;
};

export type SecureContextMcpToolSpec = {
  name: SecureContextMcpToolName;
  description: string;
};

export type SecureContextMcpServer = {
  listTools(): SecureContextMcpToolSpec[];
  callTool(input: SecureContextMcpToolCall): Promise<SecureContextMcpResult<unknown>>;
  setContainer(container: ContextContainer): void;
  readResource(uri: string): SecureContextMcpResult<SecureContextMcpResource>;
};

function secureFail(code: SecureContextMcpErrorCode, message: string, details?: unknown): SecureContextMcpResult<never> {
  return { ok: false, error: { code, message, details } };
}

function secureSuccess<T>(result: T): SecureContextMcpResult<T> {
  return { ok: true, result };
}

function asObject(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function asContainer(value: unknown): ContextContainer | null {
  const result = validateContextContainer(value);
  return result.ok ? result.value : null;
}

function encodeResource(
  resource: unknown,
  uri: string,
  annotations?: SecureContextMcpResource['annotations'],
): SecureContextMcpResource {
  return {
    uri,
    mimeType: 'application/json',
    text: JSON.stringify(resource, null, 2),
    annotations,
  };
}

function containerUri(container: ContextContainer): string {
  return `mcp-secure-context://containers/${encodeURIComponent(container.containerType)}/${encodeURIComponent(container.id)}`;
}

function parseContainerUri(uri: string): { containerType: string; id: string } | null {
  const match = /^mcp-secure-context:\/\/containers\/([^/]+)\/([^/]+)$/.exec(uri);
  if (!match) return null;
  return {
    containerType: decodeURIComponent(match[1]),
    id: decodeURIComponent(match[2]),
  };
}

export function serializeContextContainerResource(container: ContextContainer): SecureContextMcpResource {
  return encodeResource(container, containerUri(container), {
    audience: container.policy.audience,
    priority: 0.9,
    lastModified: container.provenance.createdAt,
  });
}

export async function callSecureContextTool(input: SecureContextMcpToolCall): Promise<SecureContextMcpResult<unknown>> {
  const args = asObject(input.arguments) ?? {};
  const container = args.container;

  if (!SECURE_CONTEXT_MCP_TOOL_NAMES.includes(input.name)) {
    return secureFail('MSC_INVALID_INPUT', `unknown tool name: ${input.name}`);
  }

  const validation = validateContextContainer(container);
  if (!validation.ok) {
    return secureFail('MSC_CONTAINER_INVALID', 'context container validation failed', {
      errors: validation.errors,
    });
  }

  if (input.name === 'mcp_secure_context.container.validate') {
    return secureSuccess({
      containerId: validation.value.id,
      containerType: validation.value.containerType,
      valid: true,
    });
  }

  if (input.name === 'mcp_secure_context.container.verify') {
    return secureSuccess({
      containerId: validation.value.id,
      digest: digestContextContainer(validation.value),
      verification: validation.value.verification ?? null,
    });
  }

  return secureSuccess({
    containerId: validation.value.id,
    uri: containerUri(validation.value),
    audience: validation.value.policy.audience,
    expiresAt: validation.value.policy.expiresAt ?? null,
  });
}

export function createSecureContextMcpServer(initial?: { containers?: ContextContainer[] }): SecureContextMcpServer {
  const containers = new Map<string, ContextContainer>();

  for (const container of initial?.containers ?? []) {
    const validated = asContainer(container);
    if (validated) {
      containers.set(containerUri(validated), validated);
    }
  }

  const toolSpecs: SecureContextMcpToolSpec[] = [
    {
      name: 'mcp_secure_context.container.validate',
      description: 'Validate a portable context container against the OpenSpec schema.',
    },
    {
      name: 'mcp_secure_context.container.verify',
      description: 'Compute a stable digest and surface verification metadata for a context container.',
    },
    {
      name: 'mcp_secure_context.container.share',
      description: 'Return the sharable resource metadata for a validated context container.',
    },
  ];

  return {
    listTools() {
      return toolSpecs;
    },
    async callTool(input) {
      return callSecureContextTool(input);
    },
    setContainer(container) {
      const validated = asContainer(container);
      if (!validated) {
        throw new Error('invalid context container');
      }
      containers.set(containerUri(validated), validated);
    },
    readResource(uri) {
      const parsed = parseContainerUri(uri);
      if (!parsed) {
        return secureFail('MSC_NOT_FOUND', `unknown resource uri: ${uri}`);
      }
      const container = containers.get(uri);
      if (!container || container.containerType !== parsed.containerType || container.id !== parsed.id) {
        return secureFail('MSC_NOT_FOUND', `context container not found: ${uri}`);
      }
      return secureSuccess(serializeContextContainerResource(container));
    },
  };
}
