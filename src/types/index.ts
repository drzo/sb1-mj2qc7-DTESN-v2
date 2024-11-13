export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface AtomSpaceData {
  nodes: Node[];
  edges: Edge[];
}

export interface Node {
  id: string;
  type: string;
  data: Record<string, any>;
}

export interface Edge {
  source: string;
  target: string;
  type: string;
}

export type ViewType = 'chat' | 'atomspace' | 'graph';