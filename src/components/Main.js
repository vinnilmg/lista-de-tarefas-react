import React, { Component } from 'react';
import Tarefas from './Tarefas';
import Form from './Form';

import './Main.css';

export default class Main extends Component {
  state = {
    novaTarefa: '',
    tarefas: [],
    index: -1
  };

  componentDidMount() {
    const tarefas = JSON.parse(localStorage.getItem('tarefas'));
    if (!tarefas) return;

    console.log(tarefas);
    this.setState({
      tarefas
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { tarefas } = this.state;

    if (tarefas === prevState.tarefas) return;

    // salva no localStorage
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }

  handleChange = (event) => {
    this.setState({
      novaTarefa: event.target.value
    });
  };

  handleSubmit = (event) => {
    // previne evento de acontecer
    event.preventDefault();

    const { tarefas, index } = this.state;
    let { novaTarefa } = this.state;
    novaTarefa = novaTarefa.trim();

    if (novaTarefa.length < 1) return;

    // verifica se a tarefa já foi cadastrada
    if (tarefas.indexOf(novaTarefa) !== -1) return;

    const novasTarefas = [...tarefas];

    if (index === -1) {
      // inclui a tarefa nova
      this.setState({
        tarefas: [...novasTarefas, novaTarefa],
        novaTarefa: ''
      });
    } else {
      // edita tarefa
      novasTarefas[index] = novaTarefa;

      this.setState({
        tarefas: [...novasTarefas],
        novaTarefa: '',
        index: -1
      });
    }
  };

  handleDelete = (event, index) => {
    const { tarefas } = this.state;
    const novasTarefas = [...tarefas];
    novasTarefas.splice(index, 1);

    this.setState({
      tarefas: novasTarefas
    });
  };

  handleEdit = (event, index) => {
    const { tarefas } = this.state;

    this.setState({
      index,
      novaTarefa: tarefas[index]
    });
  };

  render() {
    const { novaTarefa, tarefas } = this.state;

    return (
      <div className="main">
        <h1>Lista de tarefas</h1>
        <Form
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          novaTarefa={novaTarefa}
        />

        <Tarefas
          handleEdit={this.handleEdit}
          handleDelete={this.handleDelete}
          tarefas={tarefas}
        />
      </div>
    );
  }
}
