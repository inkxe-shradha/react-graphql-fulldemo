import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { getAllCategories } from "../../Api";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../../store/slices/userThunk";
import { getLoadingState } from "../../store/slices/userSlice";
import { toast } from "react-toastify";

const initialValues = {
  title: "",
  excerpt: "",
  content: "",
  status: "",
  category: "",
};

const validationSchema = Yup.object().shape({
  title: Yup.string().min(3).required(),
  excerpt: Yup.string().min(3).required(),
  content: Yup.string().notRequired(),
  status: Yup.string()
    .required()
    .matches(/(DRAFT|PUBLIC)/),
  category: Yup.string(),
});
const CreateArticle = () => {
  const [category, setCategory] = React.useState([]);
  const dispatch = useDispatch();
  const loading = useSelector(getLoadingState) === "loading";

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      dispatch(createPost(values)).then((res) => {
        console.log(res.payload);
        toast.success("Post created successfully");
      });
    },
  });
  React.useEffect(() => {
    getAllCategories().then((cat) => {
      setCategory(cat.categories);
    });
  }, []);
  return (
    <div className="card shadow-lg">
      <div className="card-header">
        <h3 className="card-title">Add New Article</h3>
      </div>
      <form noValidate onSubmit={formik.handleSubmit}>
        <div className="card-body">
          <div className="row my-3">
            <div className="col-md-6">
              <div className="form-floating">
                <input
                  type="text"
                  id="title"
                  name="title"
                  className={`form-control ${
                    formik.errors.title && "is-invalid"
                  }`}
                  placeholder="Enter title"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                <label htmlFor="title">
                  Title <span className="text-danger">*</span>
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <div className="form-floating">
                  <input
                    type="text"
                    id="excerpt"
                    name="excerpt"
                    placeholder="Enter excerpt"
                    className={`form-control ${
                      formik.errors.excerpt && "is-invalid"
                    }`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  <label htmlFor="excerpt">
                    Excerpt <span className="text-danger">*</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="row my-3">
            <div className="col-md-6">
              <div className="form-floating">
                <select
                  className={`form-control ${
                    formik.errors.status && "is-invalid"
                  }`}
                  aria-label="status"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="status"
                  id="status"
                >
                  <option selected>Select the Post status</option>
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLIC">Public</option>
                </select>
                <label htmlFor="status">
                  Post status
                  <span className="text-danger"> *</span>
                </label>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-floating">
                <select
                  className={`form-control ${
                    formik.errors.category && "is-invalid"
                  }`}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-label="status"
                  name="category"
                  id="category"
                >
                  <option selected>Select the Category</option>
                  {category.map((ele) => (
                    <option value={ele.id} key={ele.id}>
                      {ele.name}
                    </option>
                  ))}
                </select>
                <label htmlFor="category">
                  Category List
                  <span className="text-danger"> *</span>
                </label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <div className="form-floating">
                <textarea
                  className={`form-control ${
                    formik.errors.content && "is-invalid"
                  }`}
                  placeholder="Describe you content here"
                  id="text-content"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="content"
                  rows={5}
                ></textarea>
                <label htmlFor="text-content">Contents</label>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <button
            type="submit"
            disabled={!formik.isValid || loading}
            className="btn btn-success bg-gradient me-2"
          >
            {loading ? "Saving ..." : "Save"}
          </button>
          <button type="reset" className="btn btn-danger bg-gradient">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateArticle;
