module.exports = (req, res) => {
  const queryObject = new URLSearchParams(req.query);
  const radius = queryObject.get('radius');

  if (radius === undefined) {
    res.status(400).send('Error: Please provide a radius parameter in your query string.\n');
  } else {
    const area = Math.PI * radius ** 2;
    res.status(200).send(`The area of a circle with radius ${radius} is ${area}.\n`);
  }
};