const root = document.querySelector('.react-root');
const h = React.createElement;

let allBlogs = [
    { id: '1', title: 'This Is Title 1', body: 'Lorem ipsum Lorem ipsum Lorem ipsum' },
    { id: '2', title: 'Title 2', body: 'Muspi merol Muspi merolMuspi merolMuspi' },
];

// let editBlog = (blogToEdit) => {
//     blogBeingEdited = Object.assign({}, blogToEdit);
//     update();
// };

// let updateTitle = (blogToEdit, title) => {
//     blogToEdit.title = title;
//     update();
// };

// let updateBody = (blogToEdit, body) => {
//     blogToEdit.body = body;
//     update();
// };

// let saveBlog = (blogToEdit) => {
//     let blog = allBlogs.find(blog => blog.id === blogToEdit.id);
//     Object.assign(blog, blogToEdit);
//     blogBeingEdited = null;
//     update();
// };


// let EditBlogButton = (blog) =>
//     h('button', {
//         onClick: () => editBlog(blog)
//     }, 'Edit Blog');

// let EditBlogForm = (blog) =>
//     h('form', null, [
//         h('input', { value: blogBeingEdited.title, onChange: (event) => updateTitle(blogBeingEdited, event.target.value) }),
//         h('input', { value: blogBeingEdited.body, onChange: (event) => updateBody(blogBeingEdited, event.target.value) }),
//         h('button', { onClick: () => saveBlog(blogBeingEdited) }, 'Save'),
//     ]);

let DeleteBlogButton = ({blog, removeBlog}) =>
    h('button', {
        className: 'big-red',
        onClick: () => removeBlog(blog)
    }, 'Remove Blog');

let BlogRow = ({blog, removeBlog}) =>
    h('div', null, [
        h('h1', null, blog.title),
        h('p', null, blog.body),
        h(DeleteBlogButton, {blog, removeBlog}),
        // h(EditBlogButton, blog),
        // blogBeingEdited && blog.id === blogBeingEdited.id && h(EditBlogForm, blog)
    ]);

let BlogList = ({ blogs, removeBlog}) =>
    h('div', { className: 'blog-list' },
        blogs.map(blog => h(BlogRow, {blog, removeBlog}))
    );

class Page extends React.Component {
    constructor(props) {
        super(props); 
        this.state = { 
            blogs: props.blogs, 
            blogBeingEdited: null 
            };
    }

    render() {
        let {blogs, blogBeingEdited} = this.state;

        let removeBlog = (blogToDelete) => {
            let {id} = blogToDelete;
            let prunedBlogs = blogs.filter((a) => id !== a.id)
            console.log(allBlogs)
            this.setState({
                blogs: prunedBlogs
            })
        }

        return h('div', null, [
            h(BlogList, {blogs, removeBlog})
        ])
    }
}

ReactDOM.render(h(Page, { blogs: allBlogs }, []), root);