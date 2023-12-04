const brain = require('brain.js');
const _ = require('lodash');
const fs = require('fs');
const util = require('./util.js');

const raw = fs.readFileSync('./datasets/iris.data','utf8').split('\n');
const cabecalho = ['sepal_length', 'sepal_width', 'petal_length', 'petal_width', 'class'];

const dados = raw.
        slice(1).
        map(line => line.split(',').
        reduce((cur, v, i) => {
                if (!cabecalho[i].includes('class')) {
                    cur[cabecalho[i]] = parseFloat(v) / 10;
                } else {
                  cur[cabecalho[i]] = v; 
                }
            return cur;
        }, {}));

const net = new brain.NeuralNetwork();
net.fromJSON(JSON.parse(fs.readFileSync('./iris-neuron-NN.json', 'utf8')));

for (let i = 0; i < 50; ++i) {
    const p = Math.floor(Math.random() * 150);
    const entrada = _.omit(dados[p], ['class'])
    const resultado = net.run(entrada);
    console.log(i, p, entrada, dados[p].class, resultado);
  }