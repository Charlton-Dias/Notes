import request from 'supertest'
import { apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Notes } from '.'

const app = () => express(apiRoot, routes)

let notes

beforeEach(async () => {
  notes = await Notes.create({})
})

test('POST /notes 201', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ title: 'test', note: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.title).toEqual('test')
  expect(body.note).toEqual('test')
})

test('GET /notes 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /notes/:id 200', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${notes.id}`)
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(notes.id)
})

test('GET /notes/:id 404', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})

test('PUT /notes/:id 200', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${notes.id}`)
    .send({ title: 'test', note: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(notes.id)
  expect(body.title).toEqual('test')
  expect(body.note).toEqual('test')
})

test('PUT /notes/:id 404', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ title: 'test', note: 'test' })
  expect(status).toBe(404)
})

test('DELETE /notes/:id 204', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${notes.id}`)
  expect(status).toBe(204)
})

test('DELETE /notes/:id 404', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
  expect(status).toBe(404)
})
