// import { REGEX } from '../const/regexp'
import { ResultProps } from './types'
import { PostProps } from '../models/post.model'

function create(body: PostProps): ResultProps {
  let valid = true
  let msg: string[] = []
  if (!body.title || (body.title && body.title?.trim().length === 0)) {
    valid = false
    msg.push('Class level')
  }
  if (!body.type || (body.type && body.type?.trim().length === 0)) {
    valid = false
    msg.push('Creator Id')
  }
  if (!body.content || (body.content && body.content?.trim().length === 0)) {
    valid = false
    msg.push('Creator Id')
  }

  return { valid, msg }
}

export const PostValidator = {
  create,
}
