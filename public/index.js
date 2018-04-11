const h = React.createElement

let root = document.querySelector('.react-root')

let blogs = [
    {title:'Hello World!', author: 'Aaron Gross', body:'LoremipsumLoremipsumLoremipsumLoremipsumLoremipsumLoremipsumLoremipsumLoremipsum'},
    {title:'Goodbye World!', author: 'Liam Ast', body:'LoremipsumLoremipsumLoremipsumLoremipsumLoremipsumLoremipsumLoremipsumLoremipsum'},
    {title:'Oh hey World!', author: 'Megan Koleff', body:'LoremipsumLoremipsumLoremipsumLoremipsumLoremipsumLoremipsumLoremipsumLoremipsum'}
]

let BlogRow = ({title, author, body}) => {
   return h('div', {className:'blogrow-container'}, [
            h('h1', null, title),
            h('p',null, author),
            h('p',null, body)]
    )}

let BlogList = ({blogs}) => {
    return h('div', {className:'bloglist-container'}, blogs.map(post => h(BlogRow, post)))
 }
 
let Page = () => h(BlogList, {blogs:blogs}, [])

ReactDOM.render(h(Page, {blogs: blogs}, []), root)