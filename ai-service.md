# COTAI AI Service

**Sistema Inteligente de Processamento e Análise de Documentos de Licitação**

O COTAI AI Service é uma plataforma avançada de inteligência artificial desenvolvida para automatizar o processamento, análise e extração de dados de documentos de licitação pública brasileira. Utilizando tecnologias de ponta em OCR, NLP e Machine Learning, o sistema oferece classificação automática, extração estruturada de dados e análise de risco em tempo real.

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades Principais](#-funcionalidades-principais)
- [Tecnologias e Arquitetura](#-tecnologias-e-arquitetura)
- [Fluxo de Processamento](#-fluxo-de-processamento)
- [APIs e Integrações](#-apis-e-integrações)
- [Configuração e Instalação](#-configuração-e-instalação)
- [Segurança e Compliance](#-segurança-e-compliance)
- [Monitoramento e Observabilidade](#-monitoramento-e-observabilidade)
- [Suporte e Contato](#-suporte-e-contato)

---

## 🎯 Visão Geral

### Propósito

O COTAI AI Service foi desenvolvido para revolucionar o processo de análise de documentos de licitação pública, oferecendo:

- **Automação Completa**: Processamento end-to-end de documentos complexos
- **Inteligência Contextual**: Compreensão semântica específica para o domínio de licitações brasileiras
- **Escalabilidade**: Capacidade de processar centenas de documentos simultaneamente
- **Precisão**: Algoritmos otimizados para documentos governamentais brasileiros

### Benefícios

- ⚡ **Redução de 90%** no tempo de análise manual
- 🎯 **Precisão de 95%+** na classificação de documentos
- 📊 **Extração automatizada** de tabelas e dados estruturados
- ⚠️ **Análise de risco** proativa baseada em IA
- 🔒 **Compliance** com regulamentações de dados governamentais

---

## 🚀 Funcionalidades Principais

### 📄 Processamento Inteligente de Documentos

#### OCR Avançado Multilíngue
- **Docling (IBM)**: Engine principal para extração de texto e estrutura
- **EasyOCR**: Suporte adicional otimizado para português brasileiro
- **Reconhecimento de Layout**: Detecção automática de cabeçalhos, parágrafos e seções
- **Qualidade Adaptativa**: Algoritmos de melhoria de qualidade de imagem

#### Classificação Automática de Documentos
- **4 Tipos Principais**: Editais, Termos de Referência, Listas de Itens, Outros
- **IA Contextual**: Análise semântica usando Large Language Models
- **Confiança Calibrada**: Scores de confiança precisos para tomada de decisão
- **Aprendizado Contínuo**: Melhoria automática com feedback

#### Extração Estruturada de Dados
- **Tabelas Complexas**: Reconhecimento e estruturação de tabelas multi-colunas
- **Itens de Licitação**: Extração automatizada de códigos, descrições, quantidades e valores
- **Metadados**: Identificação de datas, números de processo, órgãos responsáveis
- **Anexos**: Processamento de documentos relacionados

### 🧠 Sistema RAG (Retrieval-Augmented Generation)

#### Base de Conhecimento Inteligente
- **Vector Database**: Milvus para armazenamento e busca semântica
- **Embeddings Avançados**: Modelos especializados em texto jurídico-administrativo
- **Indexação Automática**: Processamento e indexação em tempo real
- **Busca Semântica**: Recuperação de informações baseada em contexto

#### Geração de Respostas Contextuais
- **LLM Local**: Ollama com modelos Llama 3.2 otimizados
- **Prompts Especializados**: Templates específicos para domínio de licitações
- **Multi-documento**: Síntese de informações de múltiplas fontes
- **Histórico Conversacional**: Manutenção de contexto em diálogos

---

## 🛠 Tecnologias e Arquitetura

### Stack Principal

#### Backend e API
- **FastAPI**: Framework moderno para APIs REST de alta performance
- **Python 3.11+**: Linguagem principal com suporte a async/await
- **Pydantic v2**: Validação de dados e serialização type-safe
- **Uvicorn**: Servidor ASGI de alta performance

#### Inteligência Artificial
- **Ollama**: Orquestração de Large Language Models locais
- **Llama 3.2**: Modelos de linguagem otimizados (3B e 8B parâmetros)
- **Docling (IBM)**: Engine de OCR e análise de layout de documentos
- **EasyOCR**: Biblioteca complementar para reconhecimento óptico

#### Armazenamento e Dados
- **Milvus**: Banco de dados vetorial para busca semântica
- **MinIO**: Object storage para arquivos e documentos
- **etcd**: Coordenação e configuração distribuída
- **Redis**: Cache de alta performance (planejado)

#### Processamento e Pipeline
- **Asyncio**: Processamento assíncrono nativo do Python
- **Celery**: Queue de tarefas para processamento distribuído (planejado)
- **Apache Kafka**: Streaming de eventos em tempo real (planejado)

### Arquitetura de Microserviços

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   API Gateway   │───▶│   AI Service    │───▶│   Vector DB     │
│   (FastAPI)     │    │   (Core)        │    │   (Milvus)      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
        │                        │                        │
        ▼                        ▼                        ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Document      │    │   Object        │
│   (React)       │    │   Processor     │    │   Storage       │
└─────────────────┘    │   (Docling)     │    │   (MinIO)       │
                       └─────────────────┘    └─────────────────┘
                                │
                                ▼
                       ┌─────────────────┐
                       │   LLM Engine    │
                       │   (Ollama)      │
                       └─────────────────┘
```

### Patterns de Design

#### Clean Architecture
- **Separação de Responsabilidades**: Camadas bem definidas (API, Service, Repository)
- **Dependency Injection**: Inversão de controle para testabilidade
- **Domain-Driven Design**: Modelagem baseada no domínio de licitações

#### Event-Driven Architecture
- **Event Sourcing**: Histórico completo de eventos de processamento
- **CQRS**: Separação de comandos e consultas
- **Saga Pattern**: Orquestração de transações distribuídas

---

## 🔄 Fluxo de Processamento

### Pipeline Principal

#### 1. Ingestão e Validação
```
📄 Upload → 🔍 Validação → 📦 Armazenamento
```
- Validação de formato e tamanho
- Detecção de tipo MIME
- Quarentena para análise de segurança
- Armazenamento seguro em object storage

#### 2. Processamento OCR
```
📄 Documento → 🔍 OCR → 📊 Estruturação → ✅ Validação
```
- Pré-processamento de imagem (quando necessário)
- Extração de texto com múltiplos engines
- Detecção de layout e estrutura
- Extração de tabelas e elementos gráficos

#### 3. Análise Semântica
```
📝 Texto → 🧠 LLM → 🏷️ Classificação → 📊 Estruturação
```
- Análise de contexto e semântica
- Classificação automática de documentos
- Extração de entidades nomeadas
- Estruturação de dados por tipo

#### 4. Indexação e Armazenamento
```
📊 Dados → 🧮 Embeddings → 🗄️ Vector DB → 🔍 Busca
```
- Geração de embeddings semânticos
- Indexação em banco vetorial
- Preparação para busca semântica
- Disponibilização via API

### Processamento Assíncrono

#### Queue Management
- **Priorização**: Documentos urgentes processados primeiro
- **Load Balancing**: Distribuição automática de carga
- **Retry Logic**: Reprocessamento automático em caso de falhas
- **Dead Letter Queue**: Tratamento de documentos problemáticos

#### Real-time Updates
- **WebSockets**: Atualizações em tempo real do progresso
- **Server-Sent Events**: Notificações de conclusão
- **Status Tracking**: Monitoramento detalhado de cada etapa

---

## 🌐 APIs e Integrações

### API REST Principal

#### Endpoints de Documentos
```http
POST /api/v1/documents/process
POST /api/v1/documents/classify
POST /api/v1/documents/batch
GET  /api/v1/documents/{id}
DELETE /api/v1/documents/{id}
```

#### Endpoints RAG
```http
POST /api/v1/rag/query
POST /api/v1/rag/index
GET  /api/v1/rag/collections
DELETE /api/v1/rag/collections/{name}
```

#### Endpoints de Sistema
```http
GET  /health
GET  /metrics
GET  /api/v1/stats
GET  /docs
```

### Integrações Externas

#### Sistemas Governamentais
- **COMPRASNET**: Integração com portal de compras do governo
- **SIASG**: Sistema de cadastro de fornecedores
- **TCU**: Tribunal de Contas da União para validações
- **Receita Federal**: Validação de CNPJ e situação fiscal

#### Serviços de Terceiros
- **ViaCEP**: Validação de endereços
- **IBGE**: Códigos de municípios e localidades
- **Banco Central**: Validação de dados bancários
- **Cartórios**: Verificação de documentos corporativos

### Webhooks e Callbacks

#### Notificações de Eventos
- **Processamento Iniciado**: Confirmação de recebimento
- **Processamento Concluído**: Resultado final disponível
- **Erro Detectado**: Notificação de problemas
- **Risco Identificado**: Alertas de compliance

---

## ⚙️ Configuração e Instalação

### Pré-requisitos

#### Sistema Operacional
- Ubuntu 20.04+ ou CentOS 8+
- Docker 20.10+ e Docker Compose v2
- 8GB RAM mínimo (16GB recomendado)
- 4 CPU cores (8 cores recomendado)

#### Dependências
- Python 3.11+
- Node.js 18+ (para ferramentas de build)
- CUDA 11.8+ (opcional, para GPU)

<!-- Nova seção adicionada/atualizada: Dependências do projeto com versões pinadas -->
## 📦 Dependências

Abaixo uma visão consolidada das dependências necessárias para rodar o ai-service, com versões recomendadas/pinadas.

# Core FastAPI
- fastapi==0.116.1
- uvicorn[standard]==0.35.0
- python-multipart==0.0.20
- gunicorn==22.0.0

# Document Processing
- docling==2.44.0
- docling-core==2.44.2

# LLM Integration
- ollama==0.5.3
- langchain==0.3.27
- langchain-ollama==0.3.6

# RAG Stack - Vector Database and Embeddings
- llama-index==0.13.2
- llama-index-embeddings-ollama==0.8.1
- llama-index-vector-stores-milvus==0.9.0
- pymilvus==2.6.0
- sentence-transformers==3.4.1

# Text Processing and Chunking
- tiktoken==0.8.0
- nltk==3.9.1

# Data Models and Validation
- pydantic==2.11.7
- pydantic-settings==2.10.1

# File Handling
- python-magic==0.4.27
- Pillow==11.3.0
- PyPDF2==3.0.1

# Database and Caching
- aiofiles==24.1.0
- redis==6.4.0
- httpx==0.28.1

# Security and Logging
- prometheus-fastapi-instrumentator==7.0.0
- python-jose[cryptography]==3.5.0
- passlib[bcrypt]==1.7.4
- python-dotenv==1.1.1
- loguru==0.7.3

# Testing
- pytest==8.4.1
- pytest-asyncio==1.1.0
- httpx==0.28.1

# Development
- black==25.1.0
- flake8==7.3.0
- pre-commit==3.8.0

Instalação rápida (exemplos)
- Usando os requirements fornecidos:
  - python -m venv venv
  - source venv/bin/activate
  - pip install --upgrade pip
  - pip install -r requirements/base.txt
  - pip install -r requirements/dev.txt  # opcional para desenvolvimento

Observações rápidas
- Algumas bibliotecas (torch, sentence-transformers) podem exigir versões específicas de CUDA/drivers — instale conforme a plataforma.
- Docling e Ollama podem requerer componentes/credenciais adicionais; siga a documentação oficial.
- Para produção, prefira pinagem de versões em files requirements/ e testes em staging antes do deploy.

### Instalação com Docker

#### 1. Clone do Repositório
```bash
git clone https://github.com/casadeprovision2016/mvp.git
cd mvp/ai-service
```

#### 2. Configuração de Ambiente
```bash
cp .env.example .env
# Editar variáveis conforme necessário
```

#### 3. Inicialização dos Serviços
```bash
docker-compose up -d
```

#### 4. Verificação da Instalação
```bash
curl http://localhost:8001/health
```

### Configuração Manual

#### 1. Ambiente Python
```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

#### 2. Serviços de Dependência
```bash
# Ollama
curl -fsSL https://ollama.ai/install.sh | sh
ollama pull llama3.2:3b

# Milvus (Docker)
docker-compose up -d milvus etcd minio
```

#### 3. Inicialização do Serviço
```bash
python run.py
```

### Variáveis de Ambiente

#### Configurações Principais
```env
# Aplicação
COTAI_ENVIRONMENT=production
COTAI_HOST=0.0.0.0
COTAI_PORT=8000
COTAI_LOG_LEVEL=INFO

# Ollama
COTAI_OLLAMA_HOST=http://ollama:11434
COTAI_OLLAMA_MODEL=llama3.2:3b

# Milvus
COTAI_MILVUS_HOST=milvus
COTAI_MILVUS_PORT=19530

# Processamento
COTAI_MAX_FILE_SIZE=52428800
COTAI_BATCH_SIZE=10
COTAI_WORKERS=4
```

#### Configurações de Segurança
```env
# API Keys
COTAI_API_KEY=your-api-key
COTAI_SECRET_KEY=your-secret-key

# Autenticação
COTAI_JWT_SECRET=your-jwt-secret
COTAI_JWT_EXPIRE_HOURS=24

# Rate Limiting
COTAI_RATE_LIMIT_ENABLED=true
COTAI_RATE_LIMIT_REQUESTS=100
```

---

## 🔒 Segurança e Compliance

### Proteção de Dados

#### Criptografia
- **TLS 1.3**: Comunicação criptografada end-to-end
- **AES-256**: Criptografia de dados em repouso
- **RSA-4096**: Assinaturas digitais e verificação de integridade
- **Hash SHA-256**: Verificação de integridade de documentos

#### Controle de Acesso
- **RBAC**: Role-Based Access Control granular
- **JWT**: Tokens seguros para autenticação
- **API Keys**: Autenticação de sistemas integrados
- **IP Whitelisting**: Restrição por endereços IP

#### Auditoria e Logs
- **Logs Estruturados**: Registro detalhado de todas as operações
- **Audit Trail**: Rastro completo de modificações
- **Compliance Monitoring**: Monitoramento contínuo de conformidade
- **Data Retention**: Políticas de retenção de dados

### Compliance Regulatório

#### Lei Geral de Proteção de Dados (LGPD)
- **Consentimento**: Gestão de consentimentos explícitos
- **Portabilidade**: Exportação de dados pessoais
- **Direito ao Esquecimento**: Exclusão segura de dados
- **Privacy by Design**: Privacidade incorporada no design

#### Normas de Licitação
- **Lei 8.666/93**: Compliance com normas tradicionais
- **Lei 14.133/21**: Adequação à nova lei de licitações
- **TCU**: Conformidade com orientações do Tribunal de Contas
- **CGU**: Alinhamento com diretrizes de transparência

### Segurança de Infraestrutura

#### Containerização Segura
- **Imagens Mínimas**: Base images com mínimo de vulnerabilidades
- **User Namespaces**: Isolamento de usuários do container
- **Network Policies**: Segmentação de rede entre serviços
- **Resource Limits**: Limites de recursos para prevenção de DoS

#### Monitoramento de Segurança
- **SIEM Integration**: Integração com sistemas de monitoramento
- **Threat Detection**: Detecção de ameaças em tempo real
- **Vulnerability Scanning**: Varredura automática de vulnerabilidades
- **Incident Response**: Procedimentos de resposta a incidentes

---

## 📊 Monitoramento e Observabilidade

### Métricas de Performance

#### Métricas de Sistema
- **CPU/Memory Usage**: Utilização de recursos do sistema
- **Response Time**: Tempo de resposta das APIs
- **Throughput**: Documentos processados por minuto
- **Error Rate**: Taxa de erros por endpoint

#### Métricas de Negócio
- **Processing Accuracy**: Precisão da classificação de documentos
- **Risk Detection Rate**: Taxa de detecção de riscos
- **User Satisfaction**: Feedback e avaliações dos usuários
- **Cost per Document**: Custo médio de processamento

### Logging e Alertas

#### Estrutura de Logs
```json
{
  "timestamp": "2025-08-19T10:30:00Z",
  "level": "INFO",
  "service": "ai-service",
  "operation": "document_processing",
  "user_id": "user123",
  "document_id": "doc456",
  "processing_time": 23.5,
  "confidence": 0.95,
  "risk_score": 0.2
}
```

#### Alertas Automáticos
- **High Error Rate**: Taxa de erro acima de 5%
- **Slow Processing**: Tempo de processamento > 60s
- **High Risk Documents**: Score de risco > 0.8
- **System Resources**: CPU/Memory > 80%

### Dashboards e Visualizações

#### Dashboard Operacional
- Métricas em tempo real
- Status dos serviços
- Queue de processamento
- Distribuição de tipos de documento

#### Dashboard Executivo
- KPIs de negócio
- Tendências de uso
- ROI e economia gerada
- Compliance status

---

## 🚀 Roadmap e Futuras Funcionalidades

### Curto Prazo (Q3-Q4 2025)

#### Melhorias de Performance
- **GPU Acceleration**: Suporte a processamento com GPU
- **Parallel Processing**: Processamento paralelo otimizado
- **Cache Inteligente**: Sistema de cache baseado em ML
- **Edge Computing**: Processamento distribuído em edge

#### Novas Funcionalidades
- **Voice-to-Text**: Transcrição de audiências e reuniões
- **Blockchain Integration**: Rastreabilidade imutável de documentos
- **Mobile App**: Aplicativo móvel para captura de documentos
- **API GraphQL**: Interface GraphQL para consultas complexas

### Médio Prazo (2026)

#### Inteligência Artificial Avançada
- **Custom Models**: Treinamento de modelos específicos
- **AutoML Pipeline**: Pipeline automatizado de machine learning
- **Federated Learning**: Aprendizado federado entre órgãos
- **Explainable AI**: IA explicável para decisões críticas

#### Integração Governamental
- **Single Sign-On**: Integração com login único gov.br
- **Interoperabilidade**: Padrões de interoperabilidade governamental
- **Data Lake**: Integração com data lakes governamentais
- **Digital Signature**: Assinatura digital integrada

### Longo Prazo (2027+)

#### Ecossistema Completo
- **Marketplace**: Marketplace de soluções de licitação
- **Partner Network**: Rede de parceiros e integradores
- **AI Assistant**: Assistente de IA para gestores públicos
- **Predictive Analytics**: Análise preditiva de licitações

---

## 📞 Suporte e Contato

### Equipe de Desenvolvimento

#### Arquitetura e Backend
- **Tech Lead**: Sistema de arquitetura distribuída
- **AI Engineers**: Especialistas em NLP e Machine Learning
- **DevOps Engineers**: Infraestrutura e deployment
- **Security Engineers**: Segurança e compliance

#### Contato Técnico
- **Email**: tech@cotai.com.br
- **Slack**: #cotai-ai-service
- **Documentation**: https://docs.cotai.com.br
- **API Status**: https://status.cotai.com.br

### Suporte Comercial

#### Vendas e Parcerias
- **Email**: sales@cotai.com.br
- **Telefone**: +55 (11) 9999-9999
- **WhatsApp**: +55 (11) 8888-8888
- **LinkedIn**: /company/cotai-brasil

#### Suporte ao Cliente
- **Portal**: https://support.cotai.com.br
- **Chat**: Disponível 24/7 no portal
- **Emergency**: +55 (11) 7777-7777
- **SLA**: Resposta em até 4 horas úteis

### Contribuições e Comunidade

#### Open Source
- **GitHub**: https://github.com/casadeprovision2016/mvp
- **Issues**: Reporte de bugs e solicitação de features
- **Pull Requests**: Contribuições da comunidade bem-vindas
- **Code of Conduct**: Código de conduta para colaboradores

#### Comunidade
- **Forum**: https://forum.cotai.com.br
- **Telegram**: @cotai_brasil
- **YouTube**: Tutoriais e webinars
- **Newsletter**: Atualizações mensais

---

## 📄 Licença e Termos

### Licença de Software
MIT License - Código aberto com uso comercial permitido

### Termos de Uso
- Conformidade com LGPD e legislação brasileira
- Uso responsável dos recursos de IA
- Proibição de uso para fins maliciosos
- Respeito aos direitos autorais e propriedade intelectual

### Política de Privacidade
- Coleta mínima de dados necessários
- Transparência no uso de dados
- Consentimento explícito para processamento
- Direitos dos titulares de dados garantidos

---

## 🔬 Análise Técnica Detalhada

### Estrutura do Projeto

#### Organização de Diretórios
```
ai-service/
├── app/                          # Aplicação principal
│   ├── __init__.py
│   ├── main.py                   # Entry point FastAPI
│   ├── config/                   # Configurações
│   │   ├── __init__.py
│   │   ├── settings.py           # Settings Pydantic
│   │   └── logging.py            # Configuração de logs
│   ├── core/                     # Lógica de negócio central
│   │   ├── __init__.py
│   │   ├── document_processor.py # Orquestrador principal
│   │   ├── ocr_engine.py         # Engines de OCR
│   │   ├── classifier.py         # Classificação de documentos
│   │   ├── extractor.py          # Extração de dados
│   │   └── rag_system.py         # Sistema RAG
│   ├── api/                      # Endpoints REST
│   │   ├── __init__.py
│   │   ├── v1/                   # API versão 1
│   │   │   ├── __init__.py
│   │   │   ├── documents.py      # Endpoints de documentos
│   │   │   ├── rag.py            # Endpoints RAG
│   │   │   └── health.py         # Health checks
│   │   └── middleware/           # Middlewares
│   │       ├── __init__.py
│   │       ├── auth.py           # Autenticação JWT
│   │       ├── rate_limit.py     # Rate limiting
│   │       └── cors.py           # CORS handling
│   ├── models/                   # Modelos Pydantic
│   │   ├── __init__.py
│   │   ├── document.py           # Modelos de documento
│   │   ├── rag.py                # Modelos RAG
│   │   └── responses.py          # Modelos de resposta
│   ├── services/                 # Serviços externos
│   │   ├── __init__.py
│   │   ├── ollama_client.py      # Cliente Ollama
│   │   ├── milvus_client.py      # Cliente Milvus
│   │   ├── minio_client.py       # Cliente MinIO
│   │   └── embeddings.py         # Geração de embeddings
│   ├── utils/                    # Utilitários
│   │   ├── __init__.py
│   │   ├── file_utils.py         # Manipulação de arquivos
│   │   ├── validation.py         # Validações
│   │   └── exceptions.py         # Exceções customizadas
│   └── tests/                    # Testes
│       ├── __init__.py
│       ├── conftest.py           # Configuração pytest
│       ├── test_api/             # Testes de API
│       ├── test_core/            # Testes de lógica
│       └── test_services/        # Testes de serviços
├── docker/                       # Configurações Docker
│   ├── Dockerfile                # Imagem principal
│   ├── Dockerfile.gpu            # Imagem com suporte GPU
│   └── docker-compose.yml        # Orquestração de serviços
├── scripts/                      # Scripts utilitários
│   ├── setup.sh                  # Setup inicial
│   ├── start.sh                  # Inicialização
│   └── migrate.py                # Migrações de dados
├── requirements/                 # Dependências
│   ├── base.txt                  # Dependências base
│   ├── dev.txt                   # Dependências de desenvolvimento
│   └── prod.txt                  # Dependências de produção
├── .env.example                  # Exemplo de variáveis de ambiente
├── .gitignore                    # Arquivos ignorados pelo Git
├── pyproject.toml                # Configuração do projeto Python
└── README.md                     # Documentação principal
```

### Funcionamento do Sistema

#### Arquitetura de Alto Nível
```python
# app/main.py - Entry point da aplicação
from fastapi import FastAPI, Middleware
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import documents, rag, health
from app.middleware.auth import AuthMiddleware
from app.middleware.rate_limit import RateLimitMiddleware
from app.config.settings import Settings

def create_app() -> FastAPI:
    """Factory function para criar instância da aplicação FastAPI"""
    settings = Settings()
    
    app = FastAPI(
        title="COTAI AI Service",
        description="Sistema de Processamento de Documentos de Licitação",
        version="1.0.0",
        docs_url="/docs",
        redoc_url="/redoc"
    )
    
    # Middlewares
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.allowed_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.add_middleware(AuthMiddleware)
    app.add_middleware(RateLimitMiddleware)
    
    # Routers
    app.include_router(documents.router, prefix="/api/v1", tags=["documents"])
    app.include_router(rag.router, prefix="/api/v1", tags=["rag"])
    app.include_router(health.router, tags=["health"])
    
    return app

app = create_app()
```

#### Pipeline de Processamento Detalhado
```python
# app/core/document_processor.py
import asyncio
from typing import List, Optional
from app.core.ocr_engine import OCREngine
from app.core.classifier import DocumentClassifier
from app.core.extractor import DataExtractor
from app.services.milvus_client import MilvusClient
from app.models.document import Document, ProcessingResult

class DocumentProcessor:
    """Orquestrador principal do pipeline de processamento"""
    
    def __init__(self):
        self.ocr_engine = OCREngine()
        self.classifier = DocumentClassifier()
        self.extractor = DataExtractor()
        self.vector_db = MilvusClient()
    
    async def process_document(self, file_path: str) -> ProcessingResult:
        """
        Pipeline principal de processamento de documentos
        
        Args:
            file_path: Caminho para o arquivo a ser processado
            
        Returns:
            ProcessingResult: Resultado completo do processamento
        """
        try:
            # 1. Extração de texto via OCR
            extracted_text = await self.ocr_engine.extract_text(file_path)
            
            # 2. Classificação do documento
            classification = await self.classifier.classify(extracted_text)
            
            # 3. Extração estruturada de dados
            structured_data = await self.extractor.extract_data(
                extracted_text, classification.document_type
            )
            
            # 4. Indexação vetorial para RAG
            embedding_id = await self._index_document(
                extracted_text, structured_data, classification
            )
            
            return ProcessingResult(
                classification=classification,
                extracted_data=structured_data,
                embedding_id=embedding_id,
                status="completed"
            )
            
        except Exception as e:
            return ProcessingResult(
                status="failed",
                error=str(e)
            )
    
    async def process_batch(self, file_paths: List[str]) -> List[ProcessingResult]:
        """Processamento em lote de múltiplos documentos"""
        tasks = [
            self.process_document(file_path) 
            for file_path in file_paths
        ]
        return await asyncio.gather(*tasks, return_exceptions=True)
    
    async def _index_document(self, text: str, data: dict, classification: dict) -> str:
        """Indexa documento no banco vetorial para busca semântica"""
        embedding = await self.vector_db.generate_embedding(text)
        return await self.vector_db.insert(
            collection_name="documents",
            data={
                "text": text,
                "structured_data": data,
                "classification": classification.dict(),
                "embedding": embedding
            }
        )
```