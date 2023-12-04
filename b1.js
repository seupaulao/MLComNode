const config = {
    binaryThresh: 0.5,
    hiddenLayers: [3], // array of ints for the sizes of the hidden layers in the network
    activation: 'sigmoid', // supported activation types: ['sigmoid', 'relu', 'leaky-relu', 'tanh'],
    leakyReluAlpha: 0.01, // supported for activation type 'leaky-relu'
};

const config2 = {
    inputSize: 20,
    inputRange: 20,
    hiddenLayers: [20, 20],
    outputSize: 20,
    learningRate: 0.01,
    decayRate: 0.999,
  };

// create a simple feed forward neural network with backpropagation
const net = new brain.NeuralNetwork(config);
const netRNN = new brain.recurrent.RNN(config2);

net.train([
{ input: [0, 0], output: [0] },
{ input: [0, 1], output: [1] },
{ input: [1, 0], output: [1] },
{ input: [1, 1], output: [0] },
]);

const output = net.run([1, 0]); // [0.987]
document.getElementById('saida1').innerHTML = output;

netRNN.train([
    { input: [0, 0], output: [0] },
    { input: [0, 1], output: [1] },
    { input: [1, 0], output: [1] },
    { input: [1, 1], output: [0] },
    ]);
const output1 = netRNN.run([1, 0]); // [0.987]
const output2 = netRNN.run([1, 1]); // [0.987]
const output3 = netRNN.run([0, 1]); // [0.987]
document.getElementById('saida2_1').innerHTML = output1;
document.getElementById('saida2_2').innerHTML = output2;
document.getElementById('saida2_3').innerHTML = output3;
