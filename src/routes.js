import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import SessionAdmController from './app/controllers/SessionAdmController';
import AtivadorController from './app/controllers/AtivadorController';
import PedidosController from './app/controllers/PedidosController';
import CaixaUnesController from './app/controllers/CaixaUnesController';
import EntradasController from './app/controllers/EntradasController';
import EntradasAvulsasController from './app/controllers/EntradasAvulsasController';
import SaidasController from './app/controllers/SaidasController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

//---------------------------------------------------------------------------------------------------------------------
//-> Rotas para ativar ou desativar pedidos:
//Rota para criar o único registro na coluna ativador com um id ,o campo true , e o timestamps
routes.post('/ativadorcreate', AtivadorController.create);

//Rota para retornar para o frontend o estado do check para mostrar na tela se está true ou false:
routes.get('/ativadorreturn', AtivadorController.return);

//Rota para verificar se foi alterado o campo para true ou false dependendo da requisição:
routes.get('/ativadorcount', AtivadorController.indexCountAtivo);

//Rota para ativar pedidos marcar o campo como true e mostrar no app a página de selecionar açaí:
routes.put('/ativadortrue', AtivadorController.ativar);

//Rota para desativar pedidos marcar o campo como fasle e mostrar no app a página não estamos funcionando:
routes.put('/ativadorfalse', AtivadorController.desativar);
//---------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------------------------------
// ROTA IMPORTANTE PARA OS PEDIDOS
// Criar Pedidos:
routes.post('/users/:id_user/pedidos', PedidosController.store);
// Deletar Pedido:
routes.post('/:id_pedido/deletarpedido', PedidosController.deletePedido);
// Retornar Nº de Pedidos:
routes.get('/pedidos/counter', PedidosController.counter);
// Retornar pedidos faturados:
routes.get('/pedidos/faturados', PedidosController.faturados);
// Achar Pedido:
routes.get('/pedidos/:id_pedido/find', PedidosController.findOne);
//---------------------------------------------------------------------------------------------------------------------

//---------------------------------------------------------------------------------------------------------------------
// ROTA IMPORTANTE PARA O Caixa:
routes.post('/caixa/new', CaixaUnesController.create);
routes.get('/caixa/return', CaixaUnesController.return);
routes.put('/atualizacao/:id_caixa/:valor_de_entrada/caixa', CaixaUnesController.updater);

routes.put(
  '/entradas/:id_caixa/:id_pedido/:data_hora_pedido/:quem_fez_entrada/:titulo_entrada/:valor_de_entrada/entrada',
  EntradasController.sumFaturar
);
routes.get('/entradas/:id_caixa/return', EntradasController.returnentradas);

routes.put('/avulsas/:id_caixa/:data_hora_avulsa/:quem_fez_avulsa/:titulo_avulsa/:motivo_avulsa/:valor_de_avulsa/avulsas', EntradasAvulsasController.avulsa);
routes.get('/avulsas/:id_caixa/return', EntradasAvulsasController.returnavulsas);

routes.put('/saidas/:id_caixa/:data_hora_saida/:quem_fez_saida/:titulo_saida/:motivo_saida/:valor_de_saida/saidas', SaidasController.dif);
routes.get('/saidas/:id_caixa/return', SaidasController.returnsaidas);
//---------------------------------------------------------------------------------------------------------------------

routes.get('/useradm/counter', UserController.indexCount);

// Padrão Kelvin
//---------------------------------------------------------------------------------------------------------------------
routes.post('/users', UserController.store);
//---------------------------------------------------------------------------------------------------------------------
routes.get('/returnuser', UserController.returnUser);

routes.post('/sessionsadm', SessionAdmController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.put('/users', UserController.update);

export default routes;
