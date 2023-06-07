const { Formik } = formik;
  const schema = yup.object().shape({

    subject_id: yup.string().required('Please select subject'),
    time: yup.string().required(),
    year: yup.string().required('Please select year'),

  });
// validate select
<Formik
validationSchema={schema}
onSubmit={console.log}
initialValues={{
  year: '',
  subject_id:'',
  time:'',

}}
>
{({ handleSubmit, handleChange, values, touched, errors }) => (
  <Form noValidate onSubmit={handleSubmit}>
      {/* input form */}

          <Row className="mb-1 ml-5 pl-5 pb-2 col-md-12  w-100" fluid style={{width:'200px'}}>
              <Form.Group as={Col} md="8" controlId="validationFormik01">
              <Form.Label>Time</Form.Label>
              <Form.Control
                  type="text"
                  name="time"
                  value={formData.time} onChange={handleInputChange}
                  isValid={touched.tme && !errors.time}
                  isInvalid={!!errors.time}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>

              </Form.Group>

          </Row>
          <Row className="mb-1 ml-5 pl-5 pb-2 col-md-12  w-100" fluid style={{width:'200px'}}></Row>
          <Form.Group as={Col} md="8" controlId="validationFormik01">
          <Field name="subject_id"value={formData.subject_id} onChange={handleInputChange}  >
          {({ field }) => (
              <div>
              <Form.Select {...field}>
                  <option value="">Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
              </Form.Select>
              <ErrorMessage name="subject_id" />
              </div>
          )}
          </Field>
          </Form.Group>
   <Row/>
          <Row className="mb-1 ml-5 pl-5 pb-2 col-md-12  w-100" fluid style={{width:'200px'}}></Row>
          <Form.Group as={Col} md="8" controlId="validationFormik01">
          <Field name="year"value={formData.year} onChange={handleInputChange} >
          {({ field }) => (
              <div>
              <Form.Select {...field}>
                  <option value="">Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
              </Form.Select>
              <ErrorMessage name="year" />
              </div>
          )}
          </Field>
          </Form.Group>
   <Row/>
    <Button type="submit" className="btn-success ml-5 ">Submit form</Button>
  </Form>
)}
</Formik>