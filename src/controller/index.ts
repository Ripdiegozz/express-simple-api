import { Request, Response } from "express";
import db from "../../db/client";
import { faker } from "@faker-js/faker";

export const createLorem = (req: Request, res: Response) => {
  const { person } = req.body;

  console.log(person);

  if (!person.id)
    return res.status(400).json("A valid person must be provided!");

  const stmt = db.prepare("INSERT INTO lorem VALUES (?, ?)");

  const personToSave = {
    id: faker.number.int({
      min: 1,
    }),
    name: person.name,
  };

  stmt.run(personToSave.id, person.name);

  return res.status(201).json(personToSave);
};

export const getAllLorem = (req: Request, res: Response) => {
  db.all(`SELECT * FROM lorem`, (err, rows) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.json(rows);
  });
};

export const getLoremById = (req: Request, res: Response) => {
  const id = req.params.id;
  
  db.get(`SELECT * FROM lorem WHERE id = ?`, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    
    res.json(row);
  });
};

export const getLoremByName = (req: Request, res: Response) => {
  const name = req.params.name;
  db.all(
    `SELECT * FROM lorem WHERE name LIKE ?`,
    [`%${name}%`],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json(rows);
    }
  );
};

export const updateLoremById = (req: Request, res: Response) => {
  const { person } = req.body;

  console.log(person);

  if (!person.id)
    return res.status(400).json("A valid person must be provided!");
  else
    db.all(
      `UPDATE lorem SET name = ? WHERE id = ?`,
      [person.name, person.id],
      (err) => {
        if (err) return res.status(500).json({ message: err.message });

        return res.json(`Person edited correctly: ${JSON.stringify(person)}`);
      }
    );
};

export const deleteLoremById = (req: Request, res: Response) => {
  const { id } = req.params;

  console.log(id);

  if (!id) return res.status(400).json("An ID must be provided!");
  
  else
    db.all(`DELETE FROM lorem WHERE id = ?`, [id], (err) => {
      if (err) return res.status(500).json({ message: err.message });

      return res.json(`Person deleted correctly with id: ${id}`);
    });
};
