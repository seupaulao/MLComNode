const brain = require('brain.js');
const _ = require('lodash');
const util = require('./util');
const fs = require('fs');

const raw = fs.readFileSync('./winequality-white.csv','utf8').split('\n');
const cabecalho = util.xcabecalho(raw);
const data = util.wine2NN(raw, cabecalho);

const numTrainingData = 1500;
const net = new brain.NeuralNetwork();
net.fromJSON(JSON.parse(fs.readFileSync('./wine-neuron-NN.json', 'utf8')));

let error = 0;
for (let i = 0; i < 50; ++i) {
  const { quality } = net.run(_.omit(data[numTrainingData + i], ['quality']));
  error += Math.abs(quality - data[numTrainingData + i].quality);
  console.log(i, quality, data[numTrainingData + i].quality);
}
console.log('Average error', error / 50);
