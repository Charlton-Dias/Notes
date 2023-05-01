import { Notes } from '.'

let notes

beforeEach(async () => {
  notes = await Notes.create({ title: 'test', note: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = notes.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(notes.id)
    expect(view.title).toBe(notes.title)
    expect(view.note).toBe(notes.note)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = notes.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(notes.id)
    expect(view.title).toBe(notes.title)
    expect(view.note).toBe(notes.note)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
