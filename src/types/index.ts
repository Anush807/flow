export type IntegrationInput = Record<string, unknown>;

export type IntegrationOutput = {
  outputPayload: Record<string, unknown>;
};

export type IntegrationHandler = (input: IntegrationInput) => Promise<IntegrationOutput>;