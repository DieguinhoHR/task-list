package br.com.tasklist.services;

import br.com.tasklist.domains.Task;
import br.com.tasklist.repositories.TaskRepository;
import br.com.tasklist.services.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {
    @Autowired
    private TaskRepository taskRepository;

    public List<Task> findAll() {
        return taskRepository.findAll();
    }

    public Task save(Task task) {
        task.setId(null);

        LocalDate date = LocalDate.now(); // gets the current date

        task.setCreatedAt(date);

        return taskRepository.save(task);
    }

    public Task find(Integer id) {
        Optional<Task> obj = taskRepository.findById(id);

        return obj.orElseThrow(() -> new ObjectNotFoundException(
                "Objeto não encontrado! id: " + id + ", Tipo: " + Task.class.getName()));
    }

    public Task update(Integer id, Task task) {
        Task obj = find(id);

        obj.setTitle(task.getTitle());
        obj.setStatus(task.isStatus());
        obj.setDescription(task.getDescription());

        LocalDate date = LocalDate.now(); // gets the current date

        obj.setUpdatedAt(date);

        return taskRepository.save(obj);
    }

    public void delete(Integer id) {
        Task obj = find(id);

        LocalDate date = LocalDate.now(); // gets the current date

        obj.setRemovedAt(date);

        taskRepository.delete(obj);
    }
}
