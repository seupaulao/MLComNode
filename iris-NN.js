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

const nn = new brain.NeuralNetwork();

const trainingData = dados.
  slice(0, 148).
  map(obj => ({
    input: _.omit(obj, ['class']),
    output: util.getClasse(obj)
  }));

  console.log('done training', nn.train(trainingData));

  fs.writeFileSync('./iris-neuron-NN.json', JSON.stringify(nn.toJSON(), null, '  '));



  