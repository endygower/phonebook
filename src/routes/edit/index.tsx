import { useNavigate, useParams } from 'react-router-dom'
import { ContactForm, FormValues } from '~/common/contact-form'
import { useContactQuery, useEditContactMutation } from '~/generated/graphql'

import Header from './components/Header'
import { Typography } from '@mui/material'
import { useMemo } from 'react'

const defaultInitialValues: FormValues = {
  firstName: '',
  lastName: '',
  phones: [''],
}

export function Component() {
  const navigate = useNavigate()
  const params = useParams<'id'>()
  const contactId = Number(params.id) ?? 0
  const { loading, data } = useContactQuery({
    variables: { id: contactId },
  })

  const initialValues = useMemo(() => {
    if (!data?.contact_by_pk) return defaultInitialValues

    const contact = data.contact_by_pk

    return {
      firstName: contact.first_name,
      lastName: contact.last_name,
      phones: contact.phones.map((phone) => phone.number),
    }
  }, [data])

  const [editContact] = useEditContactMutation()

  async function submitForm(values: FormValues) {
    const { data } = await editContact({
      variables: {
        id: contactId,
        contact: {
          first_name: values.firstName.trim(),
          last_name: values.lastName.trim(),
        },
        delete_phones: {
          number: { _in: initialValues.phones },
        },
        add_phones: values.phones.map((phone) => ({
          contact_id: contactId,
          number: phone,
        })),
      },
    })

    if (data) navigate('/')
  }

  if (loading) return <Typography>loading...</Typography>
  if (!data) return <Typography>No data...</Typography>

  return (
    <ContactForm
      initialValues={initialValues}
      onSubmit={submitForm}
      header={<Header />}
      contactId={contactId}
    />
  )
}
