/* 1.2 - Create a New Path document*/
var express = require('express');
var router = express.Router();
/*Task 3.1 -  require the controller to connect it to the root file*/
var task_controller = require('../controllers/taskController');
/// Task ROUTES ///
/* Task 1.2 - Render the Index File. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express Hands-On'});
  });
  

/*Task 1.3&1.4
  router.get('/simpleTask', function(req, res, next) {
    res.render('simple_task', { task: 'Washing dishes', effort:"30 minutes", deadline:"today"});
  });*/
  
//Task 1.5
  router.get('/simpleTask', task_controller.simple_task);

  
/*Task 3.2 - Create the routes to the functions you find in the controller*/

// GET request for creating a task. NOTE This must come before route for id (i.e. display tasks).
router.get('/create', task_controller.task_create_get);

// POST request for creating Task.
router.post('/create', task_controller.task_create_post);

// GET request to delete task.
router.get('/:id/delete', task_controller.task_delete_get);

// POST request to delete task
router.post('/:id/delete', task_controller.task_delete_post);

//========= Task 3.5 End ======================

// GET request for list of all tasks.
router.get('/taskList', task_controller.task_list);

module.exports = router;
