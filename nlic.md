# Manual das APIs de Consulta PNCP — Portal Nacional de Contratações Públicas

## Sumário
- 1. Objetivo
- 2. Protocolo de Comunicação
- 3. Acesso ao PNCP
  - 3.1 Endereços de Acesso
- 4. Recomendações Iniciais
  - 4.1 Composição do Número de Controle PNCP
  - 4.2 Dados de retorno padronizados
- 5. Tabelas de Domínio
  - 5.1 Instrumento Convocatório
  - 5.2 Modalidade de Contratação
  - 5.3 Modo de Disputa
  - 5.4 Critério de Julgamento
  - 5.5 Situação da Contratação
  - 5.6 Situação do Item da Contratação
  - 5.7 Tipo de Benefício
  - 5.8 Situação do Resultado do Item
  - 5.9 Tipo de Contrato
  - 5.10 Tipo de Termo de Contrato
  - 5.11 Categoria do Processo
  - 5.12 Tipo de Documento
  - 5.13 Natureza Jurídica
  - 5.14 Porte da Empresa
  - 5.15 Amparo Legal
  - 5.16 Categoria do Item do PCA
  - 5.17 Identificador de Usuário
- 6. Catálogo de Serviços (APIs)
  - 6.1 Itens de PCA por Ano, idUsuario e Classificação Superior
  - 6.2 Itens de PCA por Ano e Classificação Superior
  - 6.3 Consultar Contratações por Data de Publicação
  - 6.4 Consultar Contratações com Período de Recebimento de Propostas em Aberto
  - 6.5 Consultar Atas de Registro de Preço por Período de Vigência
  - 6.6 Consultar Contratos por Data de Publicação
- 7. Suporte
- 8. Glossário

---

## 1. Objetivo
Documento com orientações para consultas via API aos registros de PCA, contratações, atas de registro de preços e contratos, conforme a Lei nº 14.133/2021.

## 2. Protocolo de Comunicação
As consultas são REST sobre HTTP/1.1. Payloads e respostas usam JSON.

## 3. Acesso ao PNCP

### 3.1 Endereços de Acesso
- Ambiente Produtivo:
  - Portal: https://pncp.gov.br
  - Documentação técnica: https://pncp.gov.br/api/consulta/swagger-ui/index.html
  - Serviços (BASE_URL): https://pncp.gov.br/api/consulta

Observação: nas chamadas abaixo `${BASE_URL}` representa a URL base dos serviços PNCP.

## 4. Recomendações Iniciais

### 4.1 Composição do Número de Controle PNCP
O PNCP gera um identificador (Número de Controle) usado para rastrear transações. Exemplos de máscaras:

- PCA: 99999999999999-0-999999/9999  
  - CNPJ (14 dígitos) + dígito "0" + sequencial (6 dígitos) + ano (4 dígitos)
- Contratação: 99999999999999-1-999999/9999  
  - CNPJ + dígito "1" + sequencial + ano
- Ata: <NúmeroControleContratação>-999999 (sequencial da ata)
- Contrato: 99999999999999-2-999999/9999  
  - CNPJ + dígito "2" + sequencial + ano

Sequencial: 6 dígitos, reiniciado anualmente.

### 4.2 Dados de retorno padronizados
As APIs paginadas retornam meta com totalRegistros, totalPaginas, numeroPagina, paginasRestantes e campo data (vetor). Isso permite consumo eficiente e paginação incremental.

Dados de retorno comuns:
- data: vetor com registros
- totalRegistros: inteiro
- totalPaginas: inteiro
- numeroPagina: inteiro
- paginasRestantes: inteiro
- empty: booleano (data vazio)

---

## 5. Tabelas de Domínio
As tabelas abaixo apresentam códigos usados em filtros e respostas. Mantêm-se os códigos e rótulos oficiais.

### 5.1 Instrumento Convocatório
- 1 Edital
- 2 Aviso de Contratação Direta
- 3 Ato que autoriza a Contratação Direta

### 5.2 Modalidade de Contratação
- 1 Leilão - Eletrônico
- 2 Diálogo Competitivo
- 3 Concurso
- 4 Concorrência - Eletrônica
- 5 Concorrência - Presencial
- 6 Pregão - Eletrônico
- 7 Pregão - Presencial
- 8 Dispensa de Licitação
- 9 Inexigibilidade
- 10 Manifestação de Interesse
- 11 Pré-qualificação
- 12 Credenciamento
- 13 Leilão - Presencial

### 5.3 Modo de Disputa
- 1 Aberto
- 2 Fechado
- 3 Aberto-Fechado
- 4 Dispensa Com Disputa
- 5 Não se aplica
- 6 Fechado-Aberto

### 5.4 Critério de Julgamento
- 1 Menor preço
- 2 Maior desconto
- 4 Técnica e preço
- 5 Maior lance
- 6 Maior retorno econômico
- 7 Não se aplica
- 8 Melhor técnica
- 9 Conteúdo artístico

### 5.5 Situação da Contratação
- 1 Divulgada no PNCP
- 2 Revogada
- 3 Anulada
- 4 Suspensa

### 5.6 Situação do Item da Contratação
- 1 Em Andamento
- 2 Homologado
- 3 Anulado/Revogado/Cancelado
- 4 Deserto
- 5 Fracassado

### 5.7 Tipo de Benefício
- 1 Participação exclusiva para ME/EPP
- 2 Subcontratação para ME/EPP
- 3 Cota reservada para ME/EPP
- 4 Sem benefício
- 5 Não se aplica

### 5.8 Situação do Resultado do Item
- 1 Informado
- 2 Cancelado

### 5.9 Tipo de Contrato
- 1 Contrato (termo inicial)
- 2 Comodato
- 3 Arrendamento
- 4 Concessão
- 5 Termo de Adesão
- 6 Convênio
- 7 Empenho
- 8 Outros
- 9 TED
- 10 ACT
- 11 Termo de Compromisso
- 12 Carta Contrato

### 5.10 Tipo de Termo de Contrato
- 1 Termo de Rescisão
- 2 Termo Aditivo
- 3 Termo de Apostilamento

### 5.11 Categoria do Processo
- 1 Cessão
- 2 Compras
- 3 Informática (TIC)
- 4 Internacional
- 5 Locação Imóveis
- 6 Mão de Obra
- 7 Obras
- 8 Serviços
- 9 Serviços de Engenharia
- 10 Serviços de Saúde
- 11 Alienação de bens móveis/imóveis

### 5.12 Tipo de Documento
Tipos relacionados a contratações, atas e contratos (códigos 1..18; 16 = outros). (Lista completa no documento original)

### 5.13 Natureza Jurídica
(Lista extensa de códigos; manter conforme PNCP — ex.: 0000 não informada, 1015 Órgão Público Executivo Federal, ... 8885 não informada)

### 5.14 Porte da Empresa
- 1 ME
- 2 EPP
- 3 Demais
- 4 Não se aplica (pessoa física)
- 5 Não informado

### 5.15 Amparo Legal
(Lista de códigos e referências a artigos da Lei 14.133/2021 e outras normas — mantendo correspondência numérica original)

### 5.16 Categoria do Item do PCA
- 1 Material
- 2 Serviço
- 3 Obras
- 4 Serviços de Engenharia
- 5 Soluções de TIC
- 6 Locação de Imóveis
- 7 Alienação/Concessão/Permissão
- 8 Obras e Serviços de Engenharia

### 5.17 Identificador de Usuário
Algumas APIs aceitam idUsuario (identificador do portal integrado). Consulte os portais integrados: https://www.gov.br/pncp/pt-br/portais-integrados

---

## 6. Catálogo de Serviços (APIs)

### 6.1 Consultar Itens de PCA por Ano, idUsuario e Classificação Superior
- Endpoint: GET /v1/pca/usuario
- Parâmetros (query): anoPca (int, required), idUsuario (int, required), codigoClassificacaoSuperior (string), pagina (int, required), tamanhoPagina (int, optional, <=500)

Exemplo cURL:
```bash
curl -X GET \
"${BASE_URL}/v1/pca/usuario?anoPca=2023&idUsuario=3&codigoClassificacaoSuperior=979&pagina=1" \
-H 'accept: */*'
```

Retorno: lista de PCAs com meta e lista de itens (campos: numeroItem, categoriaItemPcaNome, descricaoItem, valorUnitario, dataInclusao, dataAtualizacao, etc.)

Códigos HTTP esperados: 200, 204, 400, 422, 500.

### 6.2 Consultar Itens de PCA por Ano e Classificação Superior
- Endpoint: GET /v1/pca/
- Parâmetros: anoPca (int), codigoClassificacaoSuperior (string), pagina, tamanhoPagina (<=500)

Retorno: idem 6.1.

### 6.3 Consultar Contratações por Data de Publicação
- Endpoint: GET /v1/contratacoes/publicacao
- Parâmetros obrigatórios: dataInicial (AAAAMMDD), dataFinal (AAAAMMDD), codigoModalidadeContratacao (int), pagina (int)
- Parâmetros opcionais: codigoModoDisputa, uf, codigoMunicipioIbge, cnpj, codigoUnidadeAdministrativa, idUsuario, tamanhoPagina (<=500; padrão 50)

Exemplo cURL:
```bash
curl -X GET \
"${BASE_URL}/v1/contratacoes/publicacao?dataInicial=20230801&dataFinal=20230802&codigoModalidadeContratacao=8&uf=DF&codigoMunicipiolbge=5300108&cnpj=00059311000126&codigoUnidadeAdministrativa=194035&idUsuario=3&pagina=1" \
-H 'accept: */*'
```

Retorno (campos principais):
- numeroControlePNCP, numeroCompra, anoCompra, processo
- tipoInstrumentoConvocatorioId / Nome
- modalidadeId / modalidadeNome
- modoDisputaId / modoDisputaNome
- situacaoCompraId / situacaoCompraNome
- objetoCompra, informacaoComplementar
- srp (boolean)
- amparoLegal (codigo, nome, descricao)
- valorTotalEstimado, valorTotalHomologado
- dataAberturaProposta, dataEncerramentoProposta, dataPublicacaoPncp, dataInclusao, dataAtualizacao
- sequencialCompra
- orgaoEntidade {cnpj, razaosocial, poderId, esferaId}
- unidadeOrgao {codigoUnidade, nomeUnidade, codigoIbge, municipioNome, ufSigla, ufNome}
- orgaoSubRogado (opcional), unidadeSubRogada (opcional)
- usuarioNome, linkSistemaOrigem, justificativaPresencial

Códigos HTTP: 200, 204, 400, 422, 500.

### 6.4 Consultar Contratações com Período de Recebimento de Propostas em Aberto
- Endpoint: GET /v1/contratacoes/proposta
- Parâmetros obrigatórios: dataFinal (AAAAMMDD), codigoModalidadeContratacao, pagina
- Demais filtros opcionais semelhantes ao item 6.3

Exemplo cURL:
```bash
curl -X GET "${BASE_URL}/v1/contratacoes/proposta?dataFinal=20230831&codigoModalidadeContratacao=8&pagina=1" -H 'accept: */*'
```

Retorno: mesmo esquema de campos do item 6.3.

Observação: o PNCP disponibiliza vários serviços adicionais (consultar contratação específica, documentos, itens, resultados, histórico, imagens, etc.). Consulte o Manual de Integração PNCP no site oficial.

### 6.5 Consultar Atas de Registro de Preço por Período de Vigência
- Endpoint: GET /v1/atas
- Parâmetros: dataInicial (AAAAMMDD), dataFinal (AAAAMMDD), idUsuario, cnpj, codigoUnidadeAdministrativa, pagina, tamanhoPagina (<=500)

Exemplo cURL:
```bash
curl -X GET "${BASE_URL}/v1/atas?dataInicial=20230701&dataFinal=20230831&pagina=1" -H 'accept: */*'
```

Retorno: lista de atas com campos como numeroControlePNCPAta, numeroControlePNCPCompra, numeroAtaRegistroPreco, anoAta, vigenciaInicio, vigenciaFim, dataPublicacaoPncp, objetoContratacao, cnpjOrgao, nomeOrgao, usuario.

Códigos HTTP: 200, 204, 400, 422, 500.

### 6.6 Consultar Contratos por Data de Publicação
- Endpoint: GET /v1/contratos
- Parâmetros: dataInicial, dataFinal, pagina, tamanhoPagina (<=500), cnpjOrgao, idUsuario, codigoUnidadeAdministrativa (opcionais)

Exemplo cURL:
```bash
curl -X GET "${BASE_URL}/v1/contratos?dataInicial=20230801&dataFinal=20230831&pagina=1" -H 'accept: */*'
```

Retorno: dados do contrato incluindo numeroControlePNCP, numeroContratoEmpenho, anoContrato, sequencialContrato, tipoContrato, categoriaProcesso, objetoContrato, orgaoEntidade, unidadeOrgao, niFornecedor, nomeRazaoSocialFornecedor, valores (valorInicial, valorGlobal, valorAcumulado), vigência e metadados.

Códigos HTTP: 200, 204, 400, 422, 500.

---

## 7. Suporte
Problemas de integração: Central de Atendimento do Ministério da Gestão e da Inovação em Serviços Públicos — https://portaldeservicos.economia.gov.br ou telefone 0800 978 9001.

## 8. Glossário
- API: Application Programming Interface.
- CNBS: Catálogo Nacional de Bens e Serviços.
- CNPJ: Cadastro Nacional da Pessoa Jurídica.
- HTTP: Hypertext Transfer Protocol.
- JSON: JavaScript Object Notation.
- ME/EPP: Microempresa / Empresa de Pequeno Porte.
- PDM: Padrão Descritivo de Material.
- PCA: Plano de Contratações Anual (Lei 14.133/2021).
- PNCP: Portal Nacional de Contratações Públicas.
- REST: Representational State Transfer.
- SWAGGER: Ferramenta para documentação de APIs.
- TIC: Tecnologia da Informação e Comunicação.
- URL: Uniform Resource Locator.
- USUÁRIO: pessoa ou sistema que utiliza o serviço.

Observação final: este documento reorganiza e padroniza a apresentação das APIs PNCP mantendo todos os campos, códigos e exemplos essenciais para integração. Consulte a documentação oficial do PNCP para detalhes adicionais e atualizações.