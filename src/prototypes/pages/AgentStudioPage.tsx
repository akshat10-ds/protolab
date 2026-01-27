/**
 * AgentStudioPage
 *
 * Page wrapper for the Agent Studio prototype - showcasing AI agent
 * reasoning steps, actions, and agentic Q&A patterns.
 */

import { PrototypeWrapper } from '../PrototypeWrapper';
import { AgentStudio } from '../agent-studio';

export function AgentStudioPage() {
  return (
    <PrototypeWrapper
      title="Agent Studio"
      description="AI Agent demo: Visible reasoning steps, agent actions, and tool execution feedback for contract analysis."
    >
      <AgentStudio />
    </PrototypeWrapper>
  );
}

export default AgentStudioPage;
