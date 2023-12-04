const brain = require('brain.js');
const util = require('./util');
const fs = require('fs');

console.log('--- Treino WINE RNN -----');

const raw = fs.readFileSync('./datasets/winequality-white.csv','utf8').split('\n');
const cabecalho = util.xcabecalho(raw);
const dadosRNN = util.wine2RNN(raw, cabecalho);
const rnn = new brain.recurrent.RNN();
const numTrainingData = 150;

const trainingData = dadosRNN.
  slice(0, numTrainingData).
  map(obj => ({
    input: obj.slice(0, 11),
    output: obj.slice(-1)
  }));

console.log(trainingData[0]);
console.log('done training', rnn.train(trainingData));
fs.writeFileSync('./wine-neuron-RNN.json', JSON.stringify(nn.toJSON(), null, '  '));
console.log('----- FEITO RNN -----');
