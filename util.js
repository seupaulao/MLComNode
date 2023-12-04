exports.xcabecalho = (raw) => {
    return raw[0].split(';').map(header => header.replace(/"/g, ''));
}

exports.getClasse = (obj) => {
    if (obj.class == "Iris-setosa") return {'Iris-setosa': 1};
    if (obj.class == "Iris-versicolor") return {'Iris-versicolor': 1};
    if (obj.class == "Iris-virginica") return {'Iris-virginica': 1};
}

exports.wine2NN = (raw, cabecalho) => {
   return raw.
        slice(1).
        map(line => line.split(';').
        reduce((cur, v, i) => {
            if (cabecalho[i].includes('sulfur') || cabecalho[i].includes('sugar')) {
                cur[cabecalho[i]] = parseFloat(v) / 1000;
            } else if (cabecalho[i].includes('alcohol')) {
                cur[cabecalho[i]] = parseFloat(v) / 100;
            } else {
                cur[cabecalho[i]] = parseFloat(v) / 10;
            }
            return cur;
        }, {}));
}

exports.wine2RNN = (raw) => {
    return raw.
         slice(1).
         map(line => line.split(';').
         map(v => {
             if (v > 100) {
                 return parseFloat(v) / 1000;
             } else if (v > 10) {
                 return parseFloat(v) / 100;
            } else {
                 return parseFloat(v) / 10;
            }
         }));
 }