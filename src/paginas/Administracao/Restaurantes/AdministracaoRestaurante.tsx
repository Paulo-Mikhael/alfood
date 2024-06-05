import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Button } from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  useEffect(() => {
    axios.get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/')
      .then(resposta => setRestaurantes(resposta.data))
  }, []);
  const excluirRestaurante = (restauranteAhSerExcluido: IRestaurante) => {
    axios.delete(`http://localhost:8000/api/v2/restaurantes/${restauranteAhSerExcluido.id}/`)
      .then(() => {
        const novaLista = restaurantes.filter(restaurante => restaurante.id !== restauranteAhSerExcluido.id);
        setRestaurantes(novaLista);
        console.log('deletado');
      })
      .catch(err => console.log(err))

      console.log('esperando deleção');
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Nome
            </TableCell>
            <TableCell>
              Editar
            </TableCell>
            <TableCell>
              Excluir
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map(restaurante =>
            <TableRow key={restaurante.id}>
              <TableCell>
                {restaurante.nome}
              </TableCell>
              <TableCell>
                [ <Link to={`/admin/restaurantes/${restaurante.id}`}>Editar</Link> ]
              </TableCell>
              <TableCell>
                <Button variant="outlined" color="error" onClick={() => excluirRestaurante(restaurante)}>
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AdministracaoRestaurantes;