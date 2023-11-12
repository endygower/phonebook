import { Link } from 'react-router-dom'
import { useModal } from '~/common/modal/ModalProvider'
import { useDeleteContactMutation, ContactFragment } from '~/generated/graphql'

import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import StarOutlineRoundedIcon from '@mui/icons-material/StarOutlineRounded'
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded'
import {
  css,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from '@mui/material'
import { useFavoriteAction, useFavorite } from '../contexts/favorite'
import { useToast } from '~/common/toast/ToastProvider'

interface Props {
  contact: ContactFragment
}

export default function ContactCard(props: Props) {
  const { contact } = props
  const fullname = `${contact.first_name} ${contact.last_name}`

  const toast = useToast()

  const favorite = useFavorite()
  const isFavorite = favorite.set.has(contact.id)

  const { showConfirmationModal, closeModal } = useModal()

  const [deleteContact, { loading }] = useDeleteContactMutation({
    variables: { id: contact.id },
    update(cache, { data }) {
      if (!data?.delete_contact_by_pk) return

      cache.evict({ id: cache.identify(data.delete_contact_by_pk) })
      cache.gc()
    },
  })

  function deleteContactConfirm() {
    showConfirmationModal({
      content: 'Are you sure want to delete the contact?',
      onConfirm: () => {
        deleteContact()
        closeModal()
      },
    })
  }

  const action = useFavoriteAction()

  function addToFavorite() {
    action.add(contact.id)
    toast(`${fullname} is added to favorite`)
  }

  function removeFromFavorite() {
    action.remove(contact.id)
    toast(`${fullname} is removed from favorite`)
  }

  return (
    <Card css={styles.root}>
      <CardContent>
        <Typography fontWeight={700}>{fullname}</Typography>
        <Typography variant="body2">
          {contact.phones.map((phone) => phone.number).join(', ')}
        </Typography>
      </CardContent>

      <CardActions css={styles.actions}>
        {!isFavorite && (
          <IconButton
            aria-label={`Add ${fullname} to favorite`}
            color="warning"
            disabled={loading}
            onClick={addToFavorite}
          >
            <StarOutlineRoundedIcon />
          </IconButton>
        )}
        {isFavorite && (
          <IconButton
            aria-label={`Remove ${fullname} from favorite`}
            color="warning"
            disabled={loading}
            onClick={removeFromFavorite}
          >
            <StarRateRoundedIcon />
          </IconButton>
        )}

        <IconButton
          component={Link}
          to={`/edit/${contact.id}`}
          aria-label={`Edit ${fullname}`}
          color="primary"
          disabled={loading}
        >
          <EditRoundedIcon />
        </IconButton>

        <IconButton
          aria-label={`Delete ${fullname}`}
          color="error"
          disabled={loading}
          onClick={() => deleteContactConfirm()}
        >
          <DeleteRoundedIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}

const styles = {
  root: css({
    display: 'flex',
    justifyContent: 'space-between',
  }),
  actions: css({
    justifyContent: 'flex-end',
  }),
}
