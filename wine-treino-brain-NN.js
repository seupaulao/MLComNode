const brain = require('brain.js');
const _ = require('lodash');
const util = require('./util');
const fs = require('fs');

console.log('--- Treino WINE NN -----');

const raw = fs.readFileSync('./datasets/winequality-white.csv','utf8').split('\n');
const cabecalho = util.xcabecalho(raw);

const dadosNN = util.wine2NN(raw, cabecalho);
const nn = new brain.NeuralNetwork();
const numTrainingData = 1500;

const trainingData = dadosNN.
  slice(0, numTrainingData).
  map(obj => ({
    input: _.omit(obj, ['quality']),
    output: _.pick(obj, ['quality'])
  }));

console.log(trainingData[0]);

console.log('done training', nn.train(trainingData));

fs.writeFileSync('./wine-neuron-NN.json', JSON.stringify(nn.toJSON(), null, '  '));

console.log('----- FEITO NN -----');