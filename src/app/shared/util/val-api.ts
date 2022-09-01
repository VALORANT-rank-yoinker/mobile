import valApiAgents from '../../../assets/val-api/agents.json';
import valApiTiers from '../../../assets/val-api/competitivetiers.json';

export const getAgentImageByName = (agentName: string) => {
  const agent = valApiAgents.find(
    (a) => a.displayName.toLowerCase() === agentName?.toLowerCase()
  );
  return agent?.displayIcon;
};

export const getTierInfoByTierNumber = (tierNum: number) => {
  const tier = valApiTiers[valApiTiers.length - 1].tiers.find(
    (t) => t.tier === tierNum
  );
  return tier;
};
