import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());


import Chance from 'chance';
const chance = new Chance();

const people = [...Array(250).keys()].map(id => {
  return {
    id,
    type: chance.profession(),
    age: chance.age(),
    name: chance.name()
  }
});

app.get('', (req, res) => {
  const q = req.query.q?.toLowerCase() || '';
  const results = people.filter(person => person.type.toLowerCase().includes(q));

  res.send(results);
});

app.listen(4000, () => {
  console.log('Server started on port 4000.');
});
