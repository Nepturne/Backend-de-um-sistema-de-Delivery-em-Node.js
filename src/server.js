import app from './app';
const port = process.env.PORT || 3333;

import './database';

app.listen(port, function(error) {
  if (!error) {
    console.log('Servidor iniciado na porta ' + port);
  } else {
    console.log('Algum erro ao iniciar o servidor!');
  }
});
