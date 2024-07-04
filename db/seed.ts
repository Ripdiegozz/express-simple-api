import db from './client'
import { faker } from '@faker-js/faker'

db.serialize(() => {
  db.run('DROP TABLE lorem')

  db.run('CREATE TABLE lorem (id INTEGER, name TEXT)')
  const stmt = db.prepare('INSERT INTO lorem VALUES (?, ?)')

  for (let i = 0; i < 600; i++) {
    stmt.run(`${faker.number.int()}`, `${faker.person.firstName()}`)
  }

  stmt.finalize()

  db.each('SELECT id, name FROM lorem', (err, row: any) => {
    console.log(`${row.id}: ${row.name}`)
  })
})

db.close()