export type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export type ViewType = 'chat' | 'atomspace' | 'graph';

export type Node = {
  id: string;
  type: string;
  label: string;
};

export type Edge = {
  source: string;
  target: string;
  type: string;
};

export type AtomSpaceData = {
  nodes: Node[];
  edges: Edge[];
};