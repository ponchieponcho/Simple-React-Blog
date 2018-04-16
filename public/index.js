const root = document.querySelector('.react-root');

let DeleteBlogButton = ({ blog, removeBlog }) =>
    <button
        onClick={() => removeBlog(blog)}
    >
        Remove Blog
    </button>;

let EditBlogButton = ({ blog, editBlog }) =>
    <button
        onClick={() => editBlog(blog)}
    >
        Edit Blog
    </button>;

let ReloadBlogButton = ({ blog, reloadBlog }) =>
    <button
        onClick={() => reloadBlog(blog)}
    >
        Refresh Blog
    </button>;

let FilterByIdButton = ({ blogs, filterBlog, filter, updateFilter}) =>
    <div>
          <button
        onClick={() => filterBlog(blogs, filter) }
    >
        Filter By Id
    </button>
    <input value={filter} onChange = {(event) => updateFilter(event.target.value)}/>
    </div>
    

let EditBlogForm = ({ blog, blogBeingEdited, updateTitle, updateBody, saveBlog }) =>
    <form>
        <input key="1" value={blogBeingEdited.title} onChange={(event) => updateTitle(blogBeingEdited, event.target.value)} />
        <input key="2" value={blogBeingEdited.body} onChange={(event) => updateBody(blogBeingEdited, event.target.value) } />
        <button key="3" onClick={() => saveBlog(blogBeingEdited) }>Save</button>
    </form>

let BlogRow = ({ blog, blogBeingEdited, removeBlog, editBlog, updateTitle, updateBody, saveBlog }) =>
    <div>
        <h1>{blog.title}</h1>
        <DeleteBlogButton blog={blog} removeBlog={removeBlog} />
        <EditBlogButton blog={blog} editBlog={editBlog} />
        {
            blogBeingEdited && blog.id === blogBeingEdited.id &&
                <EditBlogForm
                    blog={blog}
                    blogBeingEdited={blogBeingEdited}
                    updateTitle={updateTitle}
                    updateBody={updateBody}
                    saveBlog={saveBlog}
                />
        }
        <p>{blog.body}</p>
    </div>

let BlogList = ({
    blogs,
    blogBeingEdited,
    removeBlog,
    editBlog,
    updateTitle,
    updateBody,
    saveBlog
}) =>
    <div className="blog-list">
        {
            blogs.map(blog => <BlogRow key={blog.id} blog={blog} blogBeingEdited={blogBeingEdited} removeBlog={removeBlog} editBlog={editBlog} updateTitle={updateTitle} updateBody={updateBody} saveBlog={saveBlog} />)
        }
    </div>

class BlogListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogs: [],
            blogBeingEdited: null,
            filter: ""
        };
    }

    componentDidMount() {
       this.fetchData();
   }

    fetchData() {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then((res) => {
            return res.json();
        })
        .then((array)=> {
            return array.slice(0, 6)
        })
        .then(blogs=> {
            this.setState({blogs})
        })
    }

    render() {
        let { blogs, blogBeingEdited, filter } = this.state;

        let removeBlog = (blogToDelete) => {
            let { id } = blogToDelete;
            let prunedBlogs = this.state.blogs.filter((blog) => id !== blog.id);
            this.setState({
                blogs: prunedBlogs
            });
        };

        let editBlog = (blogToEdit) => {
            this.setState({
                blogBeingEdited: Object.assign({}, blogToEdit)
            });
        };

        let reloadBlog = (blogToReload) => {
            this.fetchData();
        }

        let updateTitle = (blogToEdit, title) => {
            this.setState({
                blogBeingEdited: Object.assign({}, blogToEdit, { title })
            });
        };

        let updateBody = (blogToEdit, body) => {
            this.setState({
                blogBeingEdited: Object.assign({}, blogToEdit, { body })
            });
        };

        let updateFilter = (filter) => {
            this.setState({
                filter: filter
            });
        };

        let saveBlog = (blogToEdit) => {
            let blogs = this.state.blogs.slice();
            let blog = blogs.find(blog => blog.id === blogToEdit.id);
            Object.assign(blog, blogToEdit);
            this.setState({
                blogs,
                blogBeingEdited: null
            });
        };

        let filterBlog = (blogs, filterId) => {
            let filteredBlogs = blogs.filter(blog => parseInt(filterId) === blog.id);
            this.setState({
                blogs: filteredBlogs
            });

        }

        return (
            
            <div>
                <ReloadBlogButton reloadBlog={reloadBlog} />
                <FilterByIdButton filterBlog={filterBlog} blogs={blogs} filter={filter} updateFilter={updateFilter}/>
                <BlogList
                    blogs={blogs}
                    blogBeingEdited={blogBeingEdited}
                    removeBlog={removeBlog}
                    editBlog={editBlog}
                    updateTitle={updateTitle}
                    updateBody={updateBody}
                    saveBlog={saveBlog}
                />
            </div>
        )
    }
}

ReactDOM.render(<BlogListPage />, root);
