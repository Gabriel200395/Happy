back-End: com typeScript 

1: npm install typeScript 

2: npm install @types/express 

3: npx tsc -- init  = [para gerar o arquivo tsconfig]
:ele mudou de es5 para es2017 para pegar as versão mais atualizada.

4: npm i ts-node-dev = [para roda a nossa aplicacao com typeScript]; 

5:"start": "ts-node-dev --transpile-only  --ignore-watch node_modules src/server.ts"
= e para ignorar o erro de codigo [ --transpile-only ], ignorar node modules= [--ignore-watch node_modules]


Configirando o banco de dados da aplicação 


1: npm i typeorm sqlite 3 instalando o banco  

2: criou um arquivo ormconfig para conectar com o banco de dados
depois criou um arquivo connection no meu database para conectar com o banco

3: obs caso nao criou com yarn

npm run typeorm migration:create -- -n create_images;

https://discord.com/channels/747891188492664934/747891188941717655/765547811134898207 

4: criar tabela no banco de dados

npm run typeorm migration:run = [para criar a a tabela no banco de acordo com migration]; 
npm run typeorm migration:revert  = [desfaz todas as alterações no banco]

5: "strictPropertyInitialization": false = [para mapear a classe do meu model]

6: para habilitar um nova api do decorations na minha classe 

/* Experimental Options */
     "experimentalDecorators": true,        
     "emitDecoratorMetadata": true,         
 
7: no meu arquivo ormConfig: tenho que criar: "entities" = [para saber da onde esta vindo essa entidade]  

-------------------------- 

15/10/2020 


1- Ele fez o relacionamento nos meus models de acordo com entidades. 

2 - depois ele criou o campo de imagens no post,  mais antes disso ele afirmou que meu campo de imagens vai ser um array, com isso ele fez o post..  trazendo  os dados path da minha imgem. 

3 - depois passou  relations:['trazer os dados da images na hora lista e verifcar cada id']

4 - depois ele criou a views para controlar o estado dos meus dados no banco, depois ele retornou no meu
controller tanto para lispara listar quando para trazer o detallhe de cada post.
 
6 - depois ele criou um na minha views uma images_views para fazer o controle de acordo com path da minha imagem. 

7- depois  ele mostrou essa imagem vindo da api no browser:
 [app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))]


8 - criou um handle erro para lidar com as execessões da minha aplicacao de erros da aplicacao. 

9 - depois no meu controller ele criou metado de validacao dos meus campos com yup, depois ele passou como resposta
para ele vericar cada erro. 

10-  depois no handle ele criou um condicao de erro para validar cada erro.


obs: ele mostrar os tambem com npm ['express-async-errors'] =  mostrar o erro

















configuracao de erro 

npm i express-async-errors# backend
# backend
