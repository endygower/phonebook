import AddRoundedIcon from '@mui/icons-material/AddRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded'
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded'
import { css, Button, IconButton, TextField } from '@mui/material'

import Header from './components/Header'

import { Field, Form } from 'react-final-form'
import {
  useContactsLazyQuery,
  useCreateContactMutation,
  usePhoneLazyQuery,
} from '~/generated/graphql'

import arrayMutators from 'final-form-arrays'
import { FieldArray } from 'react-final-form-arrays'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

function nameValidator(label: string) {
  return function validator(value: string) {
    if (!value) return `${label} is required`
    if (!/^[a-z]+$/i.test(value)) return `${label} must be alphabet`

    return
  }
}

function phoneValidator(label: string) {
  return function validator(value: string) {
    if (!value) return `${label} is required`
    if (!/^[0-9]$/i.test(value)) return `${label} must be numeric`
    if (value.length < 10 || value.length > 12)
      return `${label} length must be between 10 and 12`

    return
  }
}

function phonesValidator(values: string[]) {
  if (!values.length) return 'At least 1 phone number is required'

  return
}

interface FormValues {
  firstName: string
  lastName: string
  phones: string[]
}

const initialValues: FormValues = {
  firstName: '',
  lastName: '',
  phones: [''],
}

export function Component() {
  const navigate = useNavigate()
  const [createContact] = useCreateContactMutation()
  const [findPhone] = usePhoneLazyQuery()
  const [findContacts] = useContactsLazyQuery()

  async function submitForm(values: FormValues) {
    // Find duplicate name in db
    const { data: existingContact } = await findContacts({
      variables: {
        where: {
          first_name: { _eq: values.firstName },
          last_name: { _eq: values.lastName },
        },
      },
    })

    if ((existingContact?.contact || []).length > 0) {
      return {
        firstName: 'This name is already used',
        lastName: 'This name is already used',
      }
    }

    // Find duplicate phone number by user input
    const unique = new Set(values.phones)
    if (unique.size !== values.phones.length) {
      const seen: Record<string, true> = {}
      const phones: string[] = []
      for (let i = 0; i < values.phones.length; i++) {
        const element = values.phones[i]

        phones.push(
          seen[element]
            ? 'This number is inputed more than once. Please check again.'
            : ''
        )

        seen[element] = true
      }

      return { phones }
    }

    // Find duplicate number in db
    const { data: phoneData } = await findPhone({
      variables: {
        where: { number: { _in: values.phones } },
      },
    })

    if (phoneData?.phone.length) {
      const seen = new Map(
        phoneData.phone.map((phone) => [
          phone.number,
          `This phone number is already used by ${phone.contact?.first_name} ${phone.contact?.last_name}`,
        ])
      )

      return { phones: values.phones.map((phone) => seen.get(phone) ?? '') }
    }

    const { data } = await createContact({
      variables: {
        first_name: values.firstName.trim(),
        last_name: values.lastName.trim(),
        phones: values.phones.map((phone) => ({ number: phone })),
      },
      onCompleted(error, clientOptions) {
        console.log(error, clientOptions)
      },
    })

    if (data) navigate('/')
  }

  return (
    <Form
      initialValues={initialValues}
      onSubmit={submitForm}
      mutators={{ ...arrayMutators }}
      render={({ handleSubmit, form }) => (
        <form onSubmit={handleSubmit} css={styles.root}>
          <Header />
          <div css={styles.content}>
            <section css={styles.section}>
              <PersonOutlineRoundedIcon css={styles.icon} />
              <div css={styles.grid}>
                <Field
                  name="firstName"
                  validate={nameValidator('First name')}
                  render={({ input, meta }) => (
                    <TextField
                      {...input}
                      label="First name"
                      variant="outlined"
                      size="small"
                      error={meta.touched && meta.invalid}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                />
                <div />

                <Field
                  name="lastName"
                  validate={nameValidator('Last name')}
                  render={({ input, meta }) => (
                    <TextField
                      {...input}
                      label="Last name"
                      variant="outlined"
                      size="small"
                      error={meta.touched && meta.invalid}
                      helperText={meta.touched && meta.error}
                    />
                  )}
                />
                <div />
              </div>
            </section>

            <section css={styles.section}>
              <PhoneRoundedIcon css={styles.icon} />
              <div css={styles.grid}>
                <FieldArray
                  validate={phonesValidator}
                  name="phones"
                  render={({ fields }) =>
                    fields.map((name, index) => (
                      <Fragment key={name}>
                        <Field
                          name={name}
                          validate={phoneValidator('Phone')}
                          render={({ input, meta }) => (
                            <TextField
                              {...input}
                              label="Phone"
                              variant="outlined"
                              size="small"
                              error={meta.touched && meta.invalid}
                              helperText={
                                meta.touched && (meta.error || meta.submitError)
                              }
                            />
                          )}
                        />
                        <IconButton
                          aria-label="Remove phone"
                          onClick={() => fields.remove(index)}
                          css={[
                            styles.remove,
                            fields.length === 1 && styles.removeHidden,
                          ]}
                          disabled={fields.length === 1}
                        >
                          <CloseRoundedIcon />
                        </IconButton>
                      </Fragment>
                    ))
                  }
                />

                <Button
                  type="button"
                  startIcon={<AddRoundedIcon />}
                  onClick={() => form.mutators.push('phones', '')}
                >
                  Add phone
                </Button>
              </div>
            </section>
          </div>
          <div css={styles.action}>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </div>
        </form>
      )}
    />
  )
}

const styles = {
  root: css({
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  }),
  content: css({
    flex: 1,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
  }),
  action: css({
    display: 'flex',
    flexDirection: 'column',
    padding: 16,
    marginTop: 'auto',
    position: 'sticky',
    bottom: 0,
    background: '#fff',
    zIndex: 1,
  }),

  section: css({
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  }),
  grid: css({
    flex: 1,
    display: 'grid',
    gridTemplateColumns: '1fr 40px',
    rowGap: 16,
  }),
  icon: css({
    marginTop: 8,
  }),
  remove: css({
    alignSelf: 'flex-start',
  }),
  removeHidden: css({
    visibility: 'hidden',
  }),
}
