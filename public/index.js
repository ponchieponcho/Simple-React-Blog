const h = React.createElement

let root = document.querySelector('.react-root')

let blogs = [
    {id:'1', title:'Hello World!', author: 'Aaron Gross', date:'Sep 10th',time:'4:23pm', body:'LoremipsumLoremipsumLoremipsumLoremipsumLoremipsumLoremipsumLoremipsumLoremipsum'},
    {id:'2', title:'Goodbye World!', author: 'Liam Ast', date:'Sep 11th',time:'5:40pm', body:'LoremipsumLoremipsumLoremipsumLoremipsumLoremipsumLoremipsumLoremipsumLoremipsum'},
    {id:'3', title:'Oh hey World!', author: 'Megan Koleff', date:'Nov 5',time:'7:00am', body:'LoremipsumLoremipsumLoremipsumLoremipsumLoremipsumLoremipsumLoremipsumLoremipsum'}
]

let MakeTitle = ({title}) => h('h1', null, `${title}`)
let MakeAuthor = ({author}) => h('p', null, `${author}`)
let MakeDate = ({date}) => h('p', null, `${date}`)
let MakeTime = ({time}) => h('p', null, `${time}`)
let MakeBody = ({body}) => h('p', null, `${body}`)

let wrapper = h('div', {className:'blog-wrapper'}, [
    h(MakeTitle, {title:blogs[0].title}, []),
    h(MakeAuthor, {author:blogs[0].author}, []),
    h(MakeDate, {date:blogs[0].date}, []),
    h(MakeTime, {time:blogs[0].time}, []),
    h(MakeBody, {body:blogs[0].body}, [])
])

let map1 = blogs.map( x => x)
let container = h('div', {className:'blog-container'}, wrapper)

let render = () => {
    ReactDOM.render(container, root);
}

render();