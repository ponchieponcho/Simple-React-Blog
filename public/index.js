const h = React.createElement

let root = document.querySelector('.react-root')

let blogs = [
    {id:'1',title:'Hello World!', author: 'Aaron Gross', body:'LoremipsumLoremipsumLoremipsumLoremipsumLoremipsumLoremipsumLoremipsumLoremipsum'},
    {id:'2',title:'Goodbye World!', author: 'Liam Ast', body:'LoremipsumLoremipsumLoremipsumLoremipsumLoremipsumLoremipsumLoremipsumLoremipsum'},
    {id:'3',title:'Oh hey World!', author: 'Megan Koleff', body:'LoremipsumLoremipsumLoremipsumLoremipsumLoremipsumLoremipsumLoremipsumLoremipsum'}
]

let removeBlog = (blogToDelete) => {
    console.log(`Deleting ${blogToDelete.title}`)
    let {id} = blogToDelete;
    blogs = blogs.filter((blog) => id !== blog.id)
    Update();
}

let DeleteBlogButton = (whichBlog) => {
    return h('button', {
        className: 'delete-btn',
        onClick: () => removeBlog(whichBlog)
    }, 'Remove Blog')
}

let BlogRow = (blog) => {
   return h('div', {className:'blogrow-container'}, [
            h('h1', null, blog.title),
            h('p',null, blog.author),
            h('p',null, blog.body),
            h(DeleteBlogButton, blog)]
    )}

let BlogList = ({blogs}) => {
    return h('div', {className:'bloglist-container'}, blogs.map(post => h(BlogRow, post)))
 }
 
let Page = () => h(BlogList, {blogs:blogs}, [])

let Update = () => {
    return ReactDOM.render(h(Page, {blogs: blogs}, []), root)
}

Update();