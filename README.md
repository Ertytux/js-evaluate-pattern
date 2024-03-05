# js-evaluate-pattern

> Evaluates an analysis pattern contained in a logistic graph in json format and returns the evaluation of processing node events as json.

## Install
If you will use from you project

```bash
npm install --save git+https://github.com/Ertytux/js-evaluate-pattern.git
```
 or clone 

 ```bash
git clone https://github.com/Ertytux/js-evaluate-pattern.git
cd js-evaluate-pattern
npm install
```

## Usage

### Input description

The estrada is in a json file that stores a list of nodes and a list of links, see the data file data.json as an example. Each node has the following structure:

```javascript
{
    "type": "input",
    "id": "Indicator1",
    "label": "",
    "description": "criminal in area",
    "value": 0.4,
    "opvalue": 0
}

```
Valid values for type are "input","output", any other value is interpreted as "processing". Input nodes not have link in, and output nodes not have link out. The id must be unique for every node, since is used as key search. Label and description can have any value. Value only have means for input nodes, in other nodes types is set to 0 by default. Opvalue only have mean on process and output nodes and it is a parameter used as offset in the evaluation function.

Each link in the list of links have the following structure:

```javascript
{
    "source": "Indicator1",
    "target": "Event1",
    "weight": 0.8
}

```
Source is the id of input node and target is the id of the output node. Weight is a parameter used by output node to compute the evaluation function.

### Evaluation function
By default in this version the logistic function[^1][^2] is used:

$$X=opvalue + \sum values_{in}*weight_in$$, 

$$result = \frac{1}{1+e^{-X}}$$

The compute are realized over process and output nodes recursively avoiding overevaluation. 

### Output description
It is the same node array in json format with the values acording to the inputs and the graph structure.

## Run 
You can run as file load as:

```bash
npm run exec
```
wich ask you the json input file

also you can run as service as:

```bash
npm run server
```

for test you can execute in a terminal
```bash
sh test.sh yourJsonFilePath.json
```
or using curl:

```bash
curl -X POST -H "Content-Type: application/json" -d @"yourJsonFilePath" "http://localhost:3000/api/paterneval"
```
[^1]: https://lme.tf.fau.de/lecture-notes/lecture-notes-pr/lecture-notes-in-pattern-recognition-episode-5-the-logistic-function/
[^2]: Issa, H., & Kogan, A. (2014). A predictive ordered logistic regression model as a tool for quality review of control risk assessments. Journal of Information Systems, 28(2), 209-229.

## License

MIT © [Ertytux](https://github.com/Ertytux)
