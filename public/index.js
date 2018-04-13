const root = document.querySelector('.react-root');
const h = React.createElement;

let allBlogs = [
    { id: '1', title: 'This Is Title 1', body: 'Lorem ipsum Lorem ipsum Lorem ipsum' },
    { id: '2', title: 'Title 2', body: 'Muspi merol Muspi merolMuspi merolMuspi' },
];

let blogBeingEdited = null;

let removeBlog = (blogToDelete) => {
    console.log('I would like to delete ' + blogToDelete.title);
    let { id } = blogToDelete;
    allBlogs = allBlogs.filter((blog) => id !== blog.id);
    update();
};

let editBlog = (blogToEdit) => {
    blogBeingEdited = Object.assign({}, blogToEdit);
    update();
};

let updateTitle = (blogToEdit, title) => {
    blogToEdit.title = title;
    update();
};

let updateBody = (blogToEdit, body) => {
    blogToEdit.body = body;
    update();
};

let saveBlog = (blogToEdit) => {
    let blog = allBlogs.find(blog => blog.id === blogToEdit.id);
    Object.assign(blog, blogToEdit);
    blogBeingEdited = null;
    update();
};

let DeleteBlogButton = (blog) =>
    h('button', {
        className: 'big-red',
        onClick: () => removeBlog(blog)
    }, 'Remove Blog');

let EditBlogButton = (blog) =>
    h('button', {
        onClick: () => editBlog(blog)
    }, 'Edit Blog');

let EditBlogForm = (blog) =>
    h('form', null, [
        h('input', { value: blogBeingEdited.title, onChange: (event) => updateTitle(blogBeingEdited, event.target.value) }),
        h('input', { value: blogBeingEdited.body, onChange: (event) => updateBody(blogBeingEdited, event.target.value) }),
        h('button', { onClick: () => saveBlog(blogBeingEdited) }, 'Save'),
    ]);

let BlogRow = (blog) =>
    h('div', null, [
        h('h1', null, blog.title),
        h('p', null, blog.body),
        h(DeleteBlogButton, blog),
        h(EditBlogButton, blog),
        blogBeingEdited && blog.id === blogBeingEdited.id && h(EditBlogForm, blog)
    ]);

let BlogList = ({ blogs }) =>
    h('div', { className: 'blog-list' },
        blogs.map(blog => h(BlogRow, blog))
    );

let Page = ({ blogs }) => h('div', null, [
    h(BlogList, { blogs }),
]);

let update = () => {
    ReactDOM.render(h(Page, { blogs: allBlogs }, []), root);
}

update();