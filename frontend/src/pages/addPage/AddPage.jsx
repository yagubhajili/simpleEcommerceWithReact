import React, { useEffect, useState } from 'react'
import './add.scss'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { deleteById, getAllprod, postData } from '../../service/provider';
import { Helmet } from 'react-helmet';

const AddPage = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {

    getAllprod().then(res => {
      setProducts(res)
      // console.log(res)
    })

  }, [products])



  return (
    <section id='add'>
         <Helmet>
                <title>Add Page</title>
            </Helmet>
      <Formik
        initialValues={{ image: '', name: '', description: '', price: 0 }}
        validationSchema={Yup.object({
          image: Yup.string()
            .max(150, 'Must be 150 characters or less')
            .required('Required'),
          name: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          description: Yup.string().required('Required'),
          price: Yup.number().min(0).required('Required'),

        })}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            postData(values)
            resetForm()
            setSubmitting(false);
          }, 100);
        }}
      >
        <Form>
          <label htmlFor="image">image</label>
          <Field name="image" type="text" />
          <ErrorMessage name="image" component='div' className='error' />

          <label htmlFor="name">name </label>
          <Field name="name" type="text" />
          <ErrorMessage name="name" component='div' className='error' />

          <label htmlFor="description">description </label>
          <Field name="description" type="text" />
          <ErrorMessage name="description" component='div' className='error' />

          <label htmlFor="price">price</label>
          <Field name="price" type="number" />
          <ErrorMessage name="price" component='div' className='error' />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
      <table>
        <thead>
          <th>
            image
          </th>
          <th>
            name
          </th>
          <th>
            description
          </th>
          <th>
            price
          </th>
          <th>
            action
          </th>
        </thead>
        <tbody>
          {products && products.map(product => {
            return (
              <tr key={product._id}>
                <td className='imageHolde'>
                  <img src={product.image} alt="" />
                </td>
                <td>
                  {product.name}
                </td>
                <td>
                  {product.description}
                </td>
                <td>
                  {product.price}
                </td>
                <td>
                  <button onClick={() => {
                    deleteById(product._id)
                  }}>
                    delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}

export default AddPage