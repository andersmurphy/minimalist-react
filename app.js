'use strict'
// Element helper functions
const element = React.createElement
const proplessElement = type => (...children) => element(type, null, children)
const h1 = proplessElement('h1')
const p = proplessElement('p')

// Helper functions
const comp = (...fns) => seed => fns.reduceRight((acc, fn) => fn(acc), seed)
const map = fn => coll => coll.map(fn)
const reduce = (fn, seed) => coll => coll.reduce(fn, seed)
const concat = (coll, item) => coll.concat(item)
const flatMap = fn => comp(reduce(concat, []), map(fn))

// Components
const App = ({posts}) =>
  flatMap(({title, body}) => [h1(title), p(body)])(posts)

// Render DOM
const render = component => props =>
  ReactDOM.render(
    React.createElement(component, props),
    document.getElementById('content'))

//App
fetch('http://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(posts => render(App)({posts}))
