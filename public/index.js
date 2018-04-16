const root = document.querySelector('.react-root');
const h = React.createElement;

let allBlogs = [
    { id: '1', title: 'This Is Title 1', body: 'Lorem ipsum Lorem ipsum Lorem ipsum' },
    { id: '2', title: 'Title 2', body: 'Muspi merol Muspi merolMuspi merolMuspi' },
];



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


let EditBlogButton = ({blog, blogBeingEdited}) => 
    <button onClick={() => editBlog(blog, blogBeingEdited)}>Edit Blog</button>;

let DeleteBlogButton = ({blog, removeBlog}) =>
    <button className="big-red" onClick={() => removeBlog(blog)}>Remove Blog</button>;

let BlogRow = ({blog, removeBlog, blogBeingEdited}) =>
    h('div', null, [
        h('h1', null, blog.title),
        h('p', null, blog.body),
        h(DeleteBlogButton, {blog, removeBlog}),
        h(EditBlogButton, blog),
        blogBeingEdited && blog.id === blogBeingEdited.id && h(EditBlogForm, blog)
    ]);
    // <div>
    //     <h1>{blog.title}</h1>
    //     <p>{blog.body}</p>
    //     <DeleteBlogButton 
            // blog={blog} 
            // removeBlog={removeBlog} 
            // />
    //     <EditBlogButton 
            // blog={blog} 
            // editBlog={editBlog} 
            // />
    //     {
    //     blogBeingEdited && blog.id === blogBeingEdited.id && 
    //     <EditBlogForm 
    //     blog={blog} 
    //     blogBeingEdited={blog} 
    //     updateTitle={updateTitle} 
    //     updateBody={updateBody} 
    //     saveBlog={saveBlog} 
    //     />
    //     }
    // </div>

let EditBlogForm = ({blog, blogBeingEdited}) =>
    h('form', null, [
        h('input', { key: 'titleInput', value: blogBeingEdited.title, onChange: (event) => updateTitle(blogBeingEdited, event.target.value) }),
        h('input', { key: 'bodyInput', value: blogBeingEdited.body, onChange: (event) => updateBody(blogBeingEdited, event.target.value) }),
        h('button', { key: 'save', onClick: () => saveBlog(blogBeingEdited) }, 'Save'),
    ]);
    // <form>
    //     <input value={blogBeingEdited.title} onChange={ (event) => updateTitle(blogBeingEdited, event.target.value)}></input>
    //     </form>
let BlogList = ({ blogs, removeBlog, blogBeingEdited, editBlog}) =>
    h('div', { className: 'blog-list' },
        blogs.map(blog => <BlogRow blog={blog} removeBlog={removeBlog} blogBeingEdited={blogBeingEdited} />

        ));

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
        
        let editBlog = (blogToEdit) => {
            let {id} = blogToEdit;
            let editingBlog = Object.assign({}, blogToEdit);
            
        }

        }

        return (
            <div>
                <BlogList 
                    blogs={blogs} 
                    removeBlog={removeBlog} 
                    blogBeingEdited={blogBeingEdited} 
                />
            </div>
        )
    }
}

ReactDOM.render(h(Page, { blogs: allBlogs }, []), root);