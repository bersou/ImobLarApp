import property1 from "@/assets/property-1.png";
import property2 from "@/assets/property-2.png";
import property3 from "@/assets/property-3.png";
import property4 from "@/assets/property-4.png";
import property5 from "@/assets/property-5.png";
import property6 from "@/assets/property-6.png";
import agent1 from "@/assets/agent-1.jpg";
import agent2 from "@/assets/agent-2.jpg";

export interface Agent {
  id: string;
  name: string;
  photo: string;
  phone: string;
  whatsapp: string;
  email: string;
  creci: string;
  rating: number;
  totalSales: number;
  specialties: string[];
}

export interface Property {
  id: string;
  title: string;
  type: "apartamento" | "casa" | "cobertura" | "terreno" | "comercial";
  status: "venda" | "aluguel" | "vendido" | "alugado";
  price: number;
  pricePerMeter?: number;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  features: {
    bedrooms: number;
    bathrooms: number;
    suites: number;
    parkingSpaces: number;
    area: number;
    totalArea?: number;
  };
  amenities: string[];
  description: string;
  images: string[];
  agent: Agent;
  isPremium: boolean;
  isNew: boolean;
  createdAt: string;
}

export const agents: Agent[] = [
  {
    id: "1",
    name: "Ana Carolina Silva",
    photo: agent1,
    phone: "(51) 99876-5432",
    whatsapp: "5551998765432",
    email: "ana.silva@imobiliaria.com.br",
    creci: "45678-F",
    rating: 4.9,
    totalSales: 127,
    specialties: ["Apartamentos de Luxo", "Coberturas", "Alto Padrão"],
  },
  {
    id: "2",
    name: "Ricardo Mendes",
    photo: agent2,
    phone: "(51) 99123-4567",
    whatsapp: "5551991234567",
    email: "ricardo.mendes@imobiliaria.com.br",
    creci: "56789-F",
    rating: 4.8,
    totalSales: 98,
    specialties: ["Casas", "Condomínios Fechados", "Litoral Gaúcho"],
  },
];

export const properties: Property[] = [
  {
    id: "1",
    title: "Apartamento de Luxo no Moinhos de Vento",
    type: "apartamento",
    status: "venda",
    price: 2450000,
    pricePerMeter: 13611,
    address: {
      street: "Rua Mostardeiro, 500",
      neighborhood: "Moinhos de Vento",
      city: "Porto Alegre",
      state: "RS",
      zipCode: "90430-000",
    },
    features: {
      bedrooms: 4,
      bathrooms: 5,
      suites: 3,
      parkingSpaces: 4,
      area: 280,
      totalArea: 320,
    },
    amenities: [
      "Piscina Privativa",
      "Academia",
      "Churrasqueira",
      "Varanda Gourmet",
      "Automação",
      "Ar Condicionado Central",
      "Closet",
      "Vista para o Parcão",
    ],
    description:
      "Apartamento excepcional no coração do Moinhos de Vento, o bairro mais nobre de Porto Alegre. Acabamentos de altíssimo padrão, ampla sala de estar com pé direito duplo, cozinha gourmet integrada, suíte master com closet e banheiro em mármore. Vista privilegiada para o Parque Moinhos de Vento (Parcão).",
    images: [property1, property5, property6],
    agent: agents[0],
    isPremium: true,
    isNew: true,
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Casa de Praia com Piscina em Xangri-lá",
    type: "casa",
    status: "venda",
    price: 2800000,
    pricePerMeter: 9333,
    address: {
      street: "Av. Paraguassú, 350",
      neighborhood: "Centro",
      city: "Xangri-lá",
      state: "RS",
      zipCode: "95588-000",
    },
    features: {
      bedrooms: 5,
      bathrooms: 6,
      suites: 4,
      parkingSpaces: 6,
      area: 400,
      totalArea: 1000,
    },
    amenities: [
      "Piscina com Deck",
      "Jardim Tropical",
      "Área Gourmet",
      "Sauna",
      "Home Theater",
      "Dependência Completa",
      "Segurança 24h",
      "A 300m da Praia",
    ],
    description:
      "Casa espetacular no litoral gaúcho, a poucos passos da praia de Xangri-lá. Arquitetura contemporânea com amplos espaços integrados, piscina com deck de madeira e paisagismo tropical. Perfeita para quem busca qualidade de vida no litoral norte do RS.",
    images: [property2, property3, property1],
    agent: agents[1],
    isPremium: true,
    isNew: false,
    createdAt: "2024-01-10",
  },
  {
    id: "3",
    title: "Cobertura Duplex com Vista para o Guaíba",
    type: "cobertura",
    status: "venda",
    price: 4500000,
    pricePerMeter: 15000,
    address: {
      street: "Av. Padre Cacique, 1200",
      neighborhood: "Bela Vista",
      city: "Porto Alegre",
      state: "RS",
      zipCode: "90810-240",
    },
    features: {
      bedrooms: 4,
      bathrooms: 6,
      suites: 4,
      parkingSpaces: 5,
      area: 380,
      totalArea: 480,
    },
    amenities: [
      "Terraço Panorâmico",
      "Piscina Aquecida",
      "Spa Privativo",
      "Adega Climatizada",
      "Elevador Privativo",
      "Sistema de Som Integrado",
      "Lareira",
      "Vista para o Guaíba",
    ],
    description:
      "Cobertura duplex única no bairro Bela Vista, com vista privilegiada para o pôr do sol no Rio Guaíba. Terraço com 100m² de área externa, piscina aquecida e espaço gourmet completo. Acabamentos assinados por renomados arquitetos gaúchos. O ápice do luxo porto-alegrense.",
    images: [property3, property5, property6],
    agent: agents[0],
    isPremium: true,
    isNew: true,
    createdAt: "2024-01-18",
  },
  {
    id: "4",
    title: "Casa em Condomínio Fechado em Canoas",
    type: "casa",
    status: "venda",
    price: 1450000,
    pricePerMeter: 4833,
    address: {
      street: "Rua das Araucárias, 120",
      neighborhood: "Marechal Rondon",
      city: "Canoas",
      state: "RS",
      zipCode: "92020-000",
    },
    features: {
      bedrooms: 4,
      bathrooms: 4,
      suites: 2,
      parkingSpaces: 4,
      area: 320,
      totalArea: 700,
    },
    amenities: [
      "Condomínio Fechado",
      "Quadra de Tênis",
      "Piscina",
      "Churrasqueira",
      "Escritório Home Office",
      "Quintal Amplo",
      "Portaria 24h",
      "Playground",
    ],
    description:
      "Excelente residência em um dos condomínios mais seguros da região metropolitana de Porto Alegre. Projeto arquitetônico moderno com ambientes amplos e integrados. Quintal espaçoso com piscina e área de lazer completa. Ideal para famílias que buscam segurança, conforto e fácil acesso à capital.",
    images: [property4, property1, property6],
    agent: agents[1],
    isPremium: false,
    isNew: false,
    createdAt: "2024-01-05",
  },
  {
    id: "5",
    title: "Apartamento Moderno na Cidade Baixa",
    type: "apartamento",
    status: "aluguel",
    price: 4500,
    address: {
      street: "Rua da República, 750",
      neighborhood: "Cidade Baixa",
      city: "Porto Alegre",
      state: "RS",
      zipCode: "90050-320",
    },
    features: {
      bedrooms: 2,
      bathrooms: 2,
      suites: 1,
      parkingSpaces: 1,
      area: 85,
    },
    amenities: [
      "Mobiliado",
      "Academia",
      "Rooftop",
      "Coworking",
      "Pet Friendly",
      "Lavanderia",
      "Portaria 24h",
      "Próximo ao Parque Farroupilha",
    ],
    description:
      "Apartamento completamente mobiliado e decorado no estilo industrial, no coração boêmio de Porto Alegre. Cidade Baixa oferece a melhor vida noturna e cultural da cidade. Condomínio moderno com infraestrutura completa de lazer e serviços. A poucos passos do Parque da Redenção.",
    images: [property5, property1, property6],
    agent: agents[0],
    isPremium: false,
    isNew: true,
    createdAt: "2024-01-20",
  },
  {
    id: "6",
    title: "Apartamento Garden com Área Externa em Novo Hamburgo",
    type: "apartamento",
    status: "venda",
    price: 850000,
    pricePerMeter: 6071,
    address: {
      street: "Av. Dr. Maurício Cardoso, 800",
      neighborhood: "Centro",
      city: "Novo Hamburgo",
      state: "RS",
      zipCode: "93510-250",
    },
    features: {
      bedrooms: 3,
      bathrooms: 3,
      suites: 1,
      parkingSpaces: 2,
      area: 140,
      totalArea: 200,
    },
    amenities: [
      "Jardim Privativo",
      "Churrasqueira",
      "Depósito",
      "Academia",
      "Salão de Festas",
      "Bicicletário",
      "Gerador",
      "Reuso de Água",
    ],
    description:
      "Garden exclusivo com 60m² de área externa privativa no Vale dos Sinos. Apartamento reformado com acabamentos premium, cozinha com ilha e sala ampla integrada. Localização estratégica na principal avenida de Novo Hamburgo, próximo a shoppings, restaurantes e fácil acesso a Porto Alegre pela BR-116.",
    images: [property6, property5, property1],
    agent: agents[1],
    isPremium: false,
    isNew: false,
    createdAt: "2024-01-08",
  },
  {
    id: "7",
    title: "Terreno em Condomínio Fechado em Gravataí",
    type: "terreno",
    status: "venda",
    price: 380000,
    pricePerMeter: 380,
    address: {
      street: "Estrada do Morro Santana, s/n",
      neighborhood: "Morro Santana",
      city: "Gravataí",
      state: "RS",
      zipCode: "94100-000",
    },
    features: {
      bedrooms: 0,
      bathrooms: 0,
      suites: 0,
      parkingSpaces: 0,
      area: 1000,
      totalArea: 1000,
    },
    amenities: [
      "Condomínio Fechado",
      "Portaria 24h",
      "Área Verde",
      "Infraestrutura Completa",
      "Água e Luz",
      "Ruas Pavimentadas",
      "Playground",
      "Salão de Festas",
    ],
    description:
      "Excelente terreno plano em condomínio fechado de alto padrão. Localização privilegiada com vista para a mata nativa. Infraestrutura completa com ruas asfaltadas, rede de água e energia elétrica. Projeto aprovado para construção. Ideal para quem busca tranquilidade e segurança.",
    images: [property4, property3, property2],
    agent: agents[0],
    isPremium: false,
    isNew: true,
    createdAt: "2024-01-22",
  },
  {
    id: "8",
    title: "Sala Comercial no Centro Histórico de Porto Alegre",
    type: "comercial",
    status: "aluguel",
    price: 3500,
    address: {
      street: "Rua dos Andradas, 1500",
      neighborhood: "Centro Histórico",
      city: "Porto Alegre",
      state: "RS",
      zipCode: "90020-006",
    },
    features: {
      bedrooms: 0,
      bathrooms: 2,
      suites: 0,
      parkingSpaces: 2,
      area: 120,
      totalArea: 120,
    },
    amenities: [
      "Ar Condicionado",
      "Recepção",
      "Sala de Reuniões",
      "Copa",
      "Internet Fibra",
      "Elevador",
      "Segurança 24h",
      "Próximo ao Mercado Público",
    ],
    description:
      "Sala comercial ampla e moderna no coração de Porto Alegre. Ideal para escritórios, consultórios ou coworking. Reformada recentemente com acabamentos de primeira linha. Localização estratégica próximo ao Mercado Público e principais pontos de transporte.",
    images: [property5, property6, property1],
    agent: agents[1],
    isPremium: true,
    isNew: false,
    createdAt: "2024-01-12",
  },
  {
    id: "9",
    title: "Apartamento Compacto para Investimento em Petrópolis",
    type: "apartamento",
    status: "venda",
    price: 420000,
    pricePerMeter: 8400,
    address: {
      street: "Rua Ramiro Barcelos, 2000",
      neighborhood: "Petrópolis",
      city: "Porto Alegre",
      state: "RS",
      zipCode: "90035-003",
    },
    features: {
      bedrooms: 1,
      bathrooms: 1,
      suites: 1,
      parkingSpaces: 1,
      area: 50,
      totalArea: 50,
    },
    amenities: [
      "Academia",
      "Lavanderia",
      "Portaria 24h",
      "Próximo UFRGS",
      "Próximo Hospitais",
      "Mobiliado",
      "Pet Friendly",
      "Bicicletário",
    ],
    description:
      "Apartamento compacto ideal para investimento ou moradia em uma das melhores localizações de Porto Alegre. Próximo à UFRGS e hospitais. Completamente mobiliado e pronto para morar. Alto potencial de locação.",
    images: [property1, property2, property5],
    agent: agents[0],
    isPremium: false,
    isNew: true,
    createdAt: "2024-01-25",
  },
  {
    id: "10",
    title: "Casa de Alto Padrão no Jardim Europa",
    type: "casa",
    status: "venda",
    price: 3200000,
    pricePerMeter: 8000,
    address: {
      street: "Rua Comendador Caminha, 300",
      neighborhood: "Jardim Europa",
      city: "Porto Alegre",
      state: "RS",
      zipCode: "91330-060",
    },
    features: {
      bedrooms: 5,
      bathrooms: 6,
      suites: 3,
      parkingSpaces: 4,
      area: 400,
      totalArea: 800,
    },
    amenities: [
      "Piscina Aquecida",
      "Jardim Paisagístico",
      "Home Theater",
      "Adega",
      "Escritório",
      "Dependência de Empregada",
      "Churrasqueira Gourmet",
      "Sistema de Automação",
    ],
    description:
      "Residência de luxo no exclusivo bairro Jardim Europa. Arquitetura contemporânea com amplos espaços e integração total entre os ambientes. Acabamentos importados e paisagismo assinado. Ideal para famílias que buscam o melhor de Porto Alegre.",
    images: [property2, property4, property6],
    agent: agents[1],
    isPremium: true,
    isNew: false,
    createdAt: "2024-01-14",
  },
  {
    id: "11",
    title: "Loft Industrial na Zona Norte",
    type: "apartamento",
    status: "aluguel",
    price: 2800,
    address: {
      street: "Rua Voluntários da Pátria, 800",
      neighborhood: "Floresta",
      city: "Porto Alegre",
      state: "RS",
      zipCode: "90230-010",
    },
    features: {
      bedrooms: 1,
      bathrooms: 1,
      suites: 0,
      parkingSpaces: 1,
      area: 65,
      totalArea: 65,
    },
    amenities: [
      "Pé Direito Duplo",
      "Mezanino",
      "Estilo Industrial",
      "Tijolos Aparentes",
      "Iluminação Natural",
      "Pet Friendly",
      "Próximo ao 4º Distrito",
      "Área em Valorização",
    ],
    description:
      "Loft único no coração do 4º Distrito, a região que mais valoriza em Porto Alegre. Design industrial com tijolos aparentes, pé direito duplo e mezanino. Perfeito para profissionais criativos e jovens que buscam um estilo de vida diferenciado.",
    images: [property3, property5, property1],
    agent: agents[0],
    isPremium: false,
    isNew: true,
    createdAt: "2024-01-28",
  },
  {
    id: "12",
    title: "Cobertura Linear com Terraço em Torres",
    type: "cobertura",
    status: "venda",
    price: 1850000,
    pricePerMeter: 7708,
    address: {
      street: "Av. Beira Mar, 1200",
      neighborhood: "Praia Grande",
      city: "Torres",
      state: "RS",
      zipCode: "95560-000",
    },
    features: {
      bedrooms: 3,
      bathrooms: 4,
      suites: 2,
      parkingSpaces: 3,
      area: 240,
      totalArea: 300,
    },
    amenities: [
      "Vista para o Mar",
      "Terraço com Piscina",
      "Churrasqueira",
      "Elevador Privativo",
      "Ar Condicionado Central",
      "Perto da Praia",
      "Condomínio com Infraestrutura",
      "Garagem Coberta",
    ],
    description:
      "Cobertura linear espetacular com vista panorâmica para o mar de Torres. Terraço de 60m² com piscina privativa e espaço gourmet. A poucos passos da Praia Grande. Perfeita para quem busca qualidade de vida no litoral gaúcho.",
    images: [property6, property3, property2],
    agent: agents[1],
    isPremium: true,
    isNew: false,
    createdAt: "2024-01-16",
  },
];

export const getPropertyById = (id: string): Property | undefined => {
  return properties.find((p) => p.id === id);
};

export const getAgentById = (id: string): Agent | undefined => {
  return agents.find((a) => a.id === id);
};

export const formatPrice = (price: number, isRent = false): string => {
  const formatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);

  return isRent ? `${formatted}/mês` : formatted;
};

export const getPropertyTypeLabel = (type: Property["type"]): string => {
  const labels: Record<Property["type"], string> = {
    apartamento: "Apartamento",
    casa: "Casa",
    cobertura: "Cobertura",
    terreno: "Terreno",
    comercial: "Comercial",
  };
  return labels[type];
};

export const getStatusLabel = (status: Property["status"]): string => {
  const labels: Record<Property["status"], string> = {
    venda: "Venda",
    aluguel: "Aluguel",
    vendido: "Vendido",
    alugado: "Alugado",
  };
  return labels[status];
};
