import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Notes, { schema } from './model'

const router = new Router()
const { title, note } = schema.tree

/**
 * @api {post} /notes Create notes
 * @apiName CreateNotes
 * @apiGroup Notes
 * @apiParam title Notes's title.
 * @apiParam note Notes's note.
 * @apiSuccess {Object} notes Notes's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Notes not found.
 */
router.post('/',
  body({ title, note }),
  create)

/**
 * @api {get} /notes Retrieve notes
 * @apiName RetrieveNotes
 * @apiGroup Notes
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of notes.
 * @apiSuccess {Object[]} rows List of notes.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /notes/:id Retrieve notes
 * @apiName RetrieveNotes
 * @apiGroup Notes
 * @apiSuccess {Object} notes Notes's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Notes not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /notes/:id Update notes
 * @apiName UpdateNotes
 * @apiGroup Notes
 * @apiParam title Notes's title.
 * @apiParam note Notes's note.
 * @apiSuccess {Object} notes Notes's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Notes not found.
 */
router.put('/:id',
  body({ title, note }),
  update)

/**
 * @api {delete} /notes/:id Delete notes
 * @apiName DeleteNotes
 * @apiGroup Notes
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Notes not found.
 */
router.delete('/:id',
  destroy)

export default router
