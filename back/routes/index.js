import express from 'express';

const connection = require('./conf.js');

const router = express.Router();

// 1 - GET all tasks via route '/'
router.get('/', (req, res) => {
  connection.query('SELECT * from tasks', (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération des tâches', err);
    } else {
      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  });
});

// 2 - GET all tasks with only name, targetDate and isDone status, via route '/light'
router.get('/light', (req, res) => {
  connection.query('SELECT name, targetDate, isDone from tasks', (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération des tâches', err);
    } else {
      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  });
});

// 3 - GET tasks that start with 'send', via route '/filter/send'
router.get('/filter/send', (req, res) => {
  connection.query('SELECT * FROM tasks WHERE name LIKE "send%" ', (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération des tâches', err);
    } else {
      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  });
});


// 4 - GET tasks that contains 'wcs', via route '/filter/wcs'
router.get('/filter/wcs', (req, res) => {
  connection.query('SELECT * FROM tasks WHERE name LIKE "%wcs%" ', (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération des tâches', err);
    } else {
      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  });
});

// 5 - GET tasks that have targetDate superior to 2018:11:24, via route '/planned/recent'
router.get('/planned/recent', (req, res) => {
  connection.query('SELECT * FROM tasks WHERE targetDate > 20181124 ', (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération des tâches', err);
    } else {
      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  });
});

// 6 - GET tasks by ascending/descending order, via route '/sort/ASC' and '/sort-status/DESC'
router.get('/sort-status/:order', (req, res) => {
  const order = req.params.order;
  connection.query(`SELECT * FROM tasks ORDER BY isDone ${order}`, (err, results) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de la récupération des tâches', err);
    } else {
      // Si tout s'est bien passé, on envoie le résultat de la requête SQL en tant que JSON.
      res.json(results);
    }
  });
});

// 7 - POST new tasks via route '/newtask'
router.post('/newtask', (req, res) => {
  const formData = req.body;
  connection.query('INSERT INTO tasks SET ?', formData, (err) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      res.status(500).send('Erreur lors de l\'ajout de la tâche');
      console.log(err);
    } else {
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});

// 8 - EDIT tasks with PUT via route '/edit/:taskID'
router.put('/edit/:id', (req, res) => {
  const taskId = req.params.id;
  const formData = req.body;
  connection.query('UPDATE tasks SET ? WHERE id = ?', [formData, taskId], (err) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send('Erreur lors de la modification de la tâche');
    } else {
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});

// 9 - EDIT tasks and reverse boolean isDone status with PUT, via route '/reverse-status'
router.put('/reverse-status', (req, res) => {
  connection.query('UPDATE tasks SET `isDone` = NOT`isDone`', (err) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send('Erreur lors de la modification de la tâche');
    } else {
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});

// 10 - DELETE all tasks with isDone status equal to false, via route '/delete/false'
router.delete('/delete/false', (req, res) => {
  connection.query('DELETE FROM tasks WHERE isDone = 0', (err) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send('Erreur lors de la suppression de la tâche');
    } else {
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});

// 11 - DELETE a task, via route '/delete/:taskId'
router.delete('/delete/:id', (req, res) => {
  const taskId = req.params.id;
  connection.query('DELETE FROM tasks WHERE id = ?', [taskId], (err) => {
    if (err) {
      // Si une erreur est survenue, alors on informe l'utilisateur de l'erreur
      console.log(err);
      res.status(500).send('Erreur lors de la suppression de la tâche');
    } else {
      // Si tout s'est bien passé, on envoie un statut "ok".
      res.sendStatus(200);
    }
  });
});

export default router;
