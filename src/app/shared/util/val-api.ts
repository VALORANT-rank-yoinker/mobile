import valApiAgents from '../../../assets/val-api/agents.json';

export const getAgentImageByName = (agentName: string) => {
  const agent = valApiAgents.find(
    (a) => a.displayName.toLowerCase() === agentName?.toLowerCase()
  );
  return agent?.displayIcon;
};
