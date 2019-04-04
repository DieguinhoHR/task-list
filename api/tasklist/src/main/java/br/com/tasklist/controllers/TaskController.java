package br.com.tasklist.controllers;

import br.com.tasklist.domains.Task;
import br.com.tasklist.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/api")
public class TaskController {
    @Autowired
    private TaskService taskService;

    @RequestMapping(value="/tasks", method=RequestMethod.GET)
    public ResponseEntity<List<Task>> findAll() {
        List<Task> tasks = taskService.findAll();

        return ResponseEntity.ok().body(tasks);
    }

    @RequestMapping(value="/tasks", method=RequestMethod.POST)
    public ResponseEntity<Task> insert(@Valid @RequestBody Task task) {
        Task obj = taskService.save(task);

        URI uri = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(obj.getId())
                .toUri();

        return ResponseEntity.created(uri).body(obj);
    }

    @RequestMapping(value="/tasks/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Task> update(@Valid @RequestBody Task task, @PathVariable Integer id) {
        task = taskService.update(id, task);

        return ResponseEntity.ok().body(task);
    }

    @RequestMapping(value="/tasks/{id}", method=RequestMethod.DELETE)
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        taskService.delete(id);

        return ResponseEntity.noContent().build();
    }


}
