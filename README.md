# NÉRA Nail Atelier

Site demonstrativo para estúdios de unhas. Reúne serviços, inspirações e um funil de pré-agendamento que prepara uma mensagem para o WhatsApp.

## Abrir o projeto

Abra `index.html` no navegador ou publique esta pasta em um serviço de páginas estáticas, como o GitHub Pages. Não há instalação nem banco de dados.

## Configurar para um salão

1. Em `app.js`, altere `CONFIG.salonName` e `CONFIG.salonWhatsApp`. O número deve conter DDI, DDD e telefone, somente dígitos. Exemplo de formato: `5511999999999` (número fictício). Quando o campo está vazio, o WhatsApp abre com a mensagem pronta, mas sem destinatário.
2. Troque nome, descrição, serviços e perguntas no `index.html`.
3. Substitua as imagens em `assets/` por fotos autorizadas do salão e revise os textos alternativos.
4. Atualize cores e fontes no início de `styles.css`.
5. Confira o fluxo de agendamento em celular e computador antes de publicar.

O formulário não envia nem salva dados. O horário e o valor precisam ser confirmados diretamente pelo salão.

## Estrutura

- `index.html`: conteúdo da página e formulário.
- `styles.css`: identidade visual, animações e layout responsivo.
- `app.js`: navegação, validação e mensagem de WhatsApp.
- `assets/`: imagens ilustrativas e ícone.
- `PLANEJAMENTO.md`: público, jornada, funil e critérios de aceite.

## Créditos

Marca fictícia e fotografias ilustrativas criadas para este projeto. Este modelo não representa um salão real.
