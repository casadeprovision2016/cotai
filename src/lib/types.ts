
// Common types for the CotAI application

// User type
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
}

// Bid types
export enum BidStatus {
  Draft = 'draft',
  InProgress = 'in-progress',
  Review = 'review',
  Submitted = 'submitted',
  Won = 'won',
  Lost = 'lost',
  Canceled = 'canceled'
}

export interface Bid {
  id: string;
  title: string;
  description: string;
  bidNumber: string; // Reference number for the bid
  organization: string; // Organization issuing the bid
  deadline: Date;
  budget: {
    estimatedValue: number;
    currency: string;
  };
  status: BidStatus;
  assignedTo: string[]; // Array of user IDs
  createdAt: Date;
  updatedAt: Date;
  documents?: string[]; // Array of document IDs
  tags?: string[];
}

// Document types
export enum DocumentType {
  BidAnnouncement = 'bid-announcement',
  TechnicalSpecification = 'technical-specification',
  FinancialProposal = 'financial-proposal',
  Contract = 'contract',
  Other = 'other'
}

export interface Document {
  id: string;
  name: string;
  type: DocumentType;
  fileUrl: string;
  fileType: 'pdf' | 'docx' | 'xlsx' | 'other';
  parsed: boolean;
  parsedData?: Record<string, any>;
  uploadedAt: Date;
  uploadedBy: string; // User ID
}

// Message types
export interface Message {
  id: string;
  bidId?: string; // Optional, if related to a specific bid
  sender: string; // User ID
  recipients: string[]; // Array of user IDs
  subject: string;
  content: string;
  read: boolean;
  createdAt: Date;
  attachments?: string[]; // Array of document IDs
}

// Calendar event types
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  allDay: boolean;
  bidId?: string; // Optional, if related to a specific bid
  attendees?: string[]; // Array of user IDs
  location?: string;
  color?: string;
}

// Mock data for initial development
export const mockBids: Bid[] = [
  {
    id: "bid-1",
    title: "Sistema de Gestão Hospitalar",
    description: "Licitação para implementação de sistema integrado de gestão hospitalar.",
    bidNumber: "PREG-2023-001",
    organization: "Hospital Municipal de São Paulo",
    deadline: new Date(2023, 5, 15),
    budget: {
      estimatedValue: 500000,
      currency: "BRL"
    },
    status: BidStatus.InProgress,
    assignedTo: ["user-1", "user-2"],
    createdAt: new Date(2023, 3, 10),
    updatedAt: new Date(2023, 3, 10),
    tags: ["saúde", "software", "alta prioridade"]
  },
  {
    id: "bid-2",
    title: "Fornecimento de Equipamentos de TI",
    description: "Aquisição de computadores e periféricos para escolas municipais.",
    bidNumber: "PREG-2023-015",
    organization: "Secretaria de Educação - Belo Horizonte",
    deadline: new Date(2023, 6, 20),
    budget: {
      estimatedValue: 350000,
      currency: "BRL"
    },
    status: BidStatus.Draft,
    assignedTo: ["user-3"],
    createdAt: new Date(2023, 4, 5),
    updatedAt: new Date(2023, 4, 7),
    tags: ["educação", "hardware", "média prioridade"]
  },
  {
    id: "bid-3",
    title: "Serviços de Consultoria em Segurança",
    description: "Consultoria especializada em segurança cibernética para órgãos públicos.",
    bidNumber: "PREG-2023-022",
    organization: "Ministério da Defesa",
    deadline: new Date(2023, 7, 10),
    budget: {
      estimatedValue: 800000,
      currency: "BRL"
    },
    status: BidStatus.Review,
    assignedTo: ["user-1", "user-4"],
    createdAt: new Date(2023, 5, 1),
    updatedAt: new Date(2023, 5, 12),
    tags: ["segurança", "consultoria", "alta prioridade"]
  },
  {
    id: "bid-4",
    title: "Manutenção de Infraestrutura de Rede",
    description: "Serviços de manutenção preventiva e corretiva para rede de dados municipal.",
    bidNumber: "PREG-2023-030",
    organization: "Prefeitura de Curitiba",
    deadline: new Date(2023, 5, 30),
    budget: {
      estimatedValue: 250000,
      currency: "BRL"
    },
    status: BidStatus.Submitted,
    assignedTo: ["user-2"],
    createdAt: new Date(2023, 4, 15),
    updatedAt: new Date(2023, 5, 10),
    tags: ["infraestrutura", "rede", "média prioridade"]
  },
  {
    id: "bid-5",
    title: "Software de Gestão Tributária",
    description: "Sistema para otimização da arrecadação tributária municipal.",
    bidNumber: "PREG-2023-045",
    organization: "Secretaria da Fazenda - Salvador",
    deadline: new Date(2023, 8, 5),
    budget: {
      estimatedValue: 600000,
      currency: "BRL"
    },
    status: BidStatus.Draft,
    assignedTo: ["user-3", "user-4"],
    createdAt: new Date(2023, 5, 20),
    updatedAt: new Date(2023, 5, 20),
    tags: ["finanças", "software", "alta prioridade"]
  }
];

export const mockEvents: CalendarEvent[] = [
  {
    id: "event-1",
    title: "Prazo Final: Sistema de Gestão Hospitalar",
    description: "Entrega da proposta para licitação PREG-2023-001",
    startDate: new Date(2023, 5, 15, 17, 0),
    endDate: new Date(2023, 5, 15, 17, 0),
    allDay: true,
    bidId: "bid-1",
    color: "#f87171", // Red for deadlines
  },
  {
    id: "event-2",
    title: "Visita Técnica - Hosp. Municipal",
    description: "Visita técnica para reconhecimento do ambiente",
    startDate: new Date(2023, 4, 28, 10, 0),
    endDate: new Date(2023, 4, 28, 12, 0),
    allDay: false,
    bidId: "bid-1",
    location: "Hospital Municipal de São Paulo",
    color: "#60a5fa", // Blue for meetings
  },
  {
    id: "event-3",
    title: "Reunião de Alinhamento - Equipe",
    description: "Discussão sobre estratégia para licitação de TI",
    startDate: new Date(2023, 5, 10, 14, 0),
    endDate: new Date(2023, 5, 10, 16, 0),
    allDay: false,
    bidId: "bid-2",
    attendees: ["user-1", "user-3", "user-4"],
    location: "Sala de Reuniões - Virtual",
    color: "#34d399", // Green for internal meetings
  }
];

export const mockMessages: Message[] = [
  {
    id: "msg-1",
    bidId: "bid-1",
    sender: "user-2",
    recipients: ["user-1"],
    subject: "Dúvidas sobre especificação técnica",
    content: "Olá, preciso de esclarecimentos sobre os requisitos de integração com sistemas legados mencionados na página 15 do edital. Podemos agendar uma call?",
    read: false,
    createdAt: new Date(2023, 4, 25, 14, 30)
  },
  {
    id: "msg-2",
    sender: "user-3",
    recipients: ["user-1", "user-2", "user-4"],
    subject: "Atualização sobre cronograma de entregas",
    content: "Caros, conforme alinhado na reunião de ontem, atualizei o cronograma de entregas para os próximos 30 dias. Por favor, verifiquem e aprovem até amanhã.",
    read: true,
    createdAt: new Date(2023, 5, 2, 9, 15)
  },
  {
    id: "msg-3",
    bidId: "bid-2",
    sender: "user-4",
    recipients: ["user-3"],
    subject: "Fornecedores para equipamentos de TI",
    content: "Consegui contato com três fornecedores que podem nos ajudar com preços competitivos para a licitação de equipamentos. Vou enviar as cotações ainda hoje.",
    read: true,
    createdAt: new Date(2023, 5, 5, 11, 45)
  }
];

export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Ana Silva",
    email: "ana.silva@empresa.com",
    role: "admin",
    avatar: "https://i.pravatar.cc/150?img=1"
  },
  {
    id: "user-2",
    name: "Carlos Mendes",
    email: "carlos.mendes@empresa.com",
    role: "user",
    avatar: "https://i.pravatar.cc/150?img=2"
  },
  {
    id: "user-3",
    name: "Juliana Costa",
    email: "juliana.costa@empresa.com",
    role: "user",
    avatar: "https://i.pravatar.cc/150?img=3"
  },
  {
    id: "user-4",
    name: "Roberto Alves",
    email: "roberto.alves@empresa.com",
    role: "user",
    avatar: "https://i.pravatar.cc/150?img=4"
  }
];
