import { AppBar, Box, Button, TextField, Typography, Container, Link, Toolbar, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';
import http from "../../http";
import IRestaurante from "../../interfaces/IRestaurante";

const PaginaBaseAdmin = () => {
  const [nomeRestaurante, setNomeRestaurante] = useState('');

  const parametros = useParams();
  useEffect(() => {
    if (parametros.id) {
      http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
        .then(resposta => setNomeRestaurante(resposta.data.nome))
        .catch(err => console.log(err));
    }
  }, [parametros]);
  const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();

    if (parametros.id) {
      http.put(`restaurantes/${parametros.id}/`, {
        nome: nomeRestaurante
      })
        .then(() => alert(`${nomeRestaurante} atualizado com sucesso`))
        .catch(error => console.log(error));
    } else {
      http.post('restaurantes/', {
        nome: nomeRestaurante
      })
        .then(() => alert(`${nomeRestaurante} cadastrado com sucesso`))
        .catch(error => console.log(error));
    }
  }

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6">
              Administração
            </Typography>
            <Box sx={{ display: 'flex', flexGrow: 1 }}>
              <Link component={RouterLink} to='/admin/restaurantes/'>
                <Button sx={{ my: 2, color: 'white' }}>
                  Restaurantes
                </Button>
              </Link>
              <Link component={RouterLink} to='/admin/restaurantes/novo/'>
                <Button sx={{ my: 2, color: 'white' }}>
                  Novo Restaurante
                </Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Box>
        <Container maxWidth="lg" sx={{ marginTop: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Outlet />
          </Paper>
        </Container>
      </Box>
    </>
  );
}

export default PaginaBaseAdmin;