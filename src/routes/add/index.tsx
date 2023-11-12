import { useNavigate } from 'react-router-dom'
import { ContactForm, FormValues } from '~/common/contact-form'
import { useCreateContactMutation } from '~/generated/graphql'

import Header from './components/Header'

const initialValues: FormValues = {
  firstName: '',
  lastName: '',
  phones: [''],
}

export function Component() {
  const navigate = useNavigate()
  const [createContact] = useCreateContactMutation()

  async function submitForm(values: FormValues) {
    const { data } = await createContact({
      variables: {
        first_name: values.firstName.trim(),
        last_name: values.lastName.trim(),
        phones: values.phones.map((phone) => ({ number: phone })),
      },
    })

    if (data) navigate('/')
  }

  return (
    <ContactForm
      initialValues={initialValues}
      onSubmit={submitForm}
      header={<Header />}
    />
  )
}
