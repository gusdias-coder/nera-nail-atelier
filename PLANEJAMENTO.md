# Planejamento — NÉRA Nail Atelier

## Objetivo

Criar um site demonstrativo para salões especializados em unhas que mostre serviços, inspire confiança visual e transforme a visita em uma conversa de agendamento pelo WhatsApp.

## Público e mensagem

- **Público:** clientes que encontram o salão pelo Instagram, Google ou indicação e querem conhecer o trabalho antes de chamar no WhatsApp.
- **Mensagem central:** escolher um cuidado e iniciar o agendamento deve ser simples e agradável.
- **Tom:** elegante, acolhedor e direto.
- **Marca:** NÉRA é fictícia. As imagens são ilustrativas. Não há avaliações, resultados ou disponibilidade inventados.

## Jornada da visitante

1. Entende a proposta e vê um convite para agendar na primeira tela.
2. Explora quatro serviços e fotos de inspiração.
3. Escolhe um serviço em qualquer cartão ou no formulário.
4. Informa uma data e um período de preferência.
5. Informa nome, WhatsApp e uma observação opcional.
6. Confere o resumo e abre uma mensagem pronta no WhatsApp.
7. O salão confirma disponibilidade, valor e horário por conversa.

## Funil de agendamento

| Etapa | Informação | Regra |
|---|---|---|
| 1 | Serviço | Escolha obrigatória entre quatro opções |
| 2 | Data e período | Data entre hoje e 90 dias; período obrigatório |
| 3 | Contato | Nome e telefone com DDD obrigatórios; observação opcional |
| 4 | Revisão | Resumo editável ao voltar; conversa aberta somente pela ação da visitante |

O site não guarda dados nem consulta uma agenda real. A data é uma preferência, e a interface avisa que o salão precisa confirmar.

## Direção visual

- Vinho profundo, lilás suave e marfim para um posicionamento sofisticado.
- Tipografia editorial para títulos e fonte simples para leitura e controles.
- Fotografias originais geradas para a demonstração, otimizadas em WebP.
- Movimento discreto na entrada das seções, nos botões e na faixa de serviços; respeita a preferência por movimento reduzido.

## Estrutura

1. Abertura com proposta e chamada para agendar.
2. Experiência e diferencial do atendimento.
3. Serviços com atalhos para o funil.
4. Inspiração visual.
5. Ambiente e convite para agendar.
6. Formulário de pré-agendamento em quatro etapas.
7. Perguntas frequentes e chamada final.

## Personalização para cada salão

Antes de apresentar como site definitivo: substituir nome, textos, imagens, serviços, identidade, links e número do WhatsApp. Definir preços ou retirá-los após validação com o salão. Configurar o número em `app.js`, no objeto `CONFIG`, usando DDI, DDD e número, somente dígitos.

## Critérios de aceite

- Layout legível no celular e no computador.
- Todos os botões principais chegam ao agendamento.
- Não é possível avançar com campos obrigatórios vazios.
- Revisão mostra os dados escolhidos e permite voltar.
- Mensagem final contém serviço, preferência de data/período, nome e telefone.
- O site funciona como página estática no GitHub Pages.
