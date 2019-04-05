package br.com.tasklist.domains;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name="tasks")
public class Task implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @NotEmpty(message = "O campo titulo é obrigatório")
    @Size(min=3,max=100, message = "O campo titulo deve conter no minimo 3 e no máximo 100 caracteres")
    private String title;
    private boolean status;
    private String description;
    @CreatedDate
    @Column(name="created_at")
    private LocalDate createdAt;
    @LastModifiedDate
    @Column(name="updated_at")
    private LocalDate updatedAt;
    @LastModifiedDate
    @Column(name="removed_at")
    private LocalDate removedAt;
    @LastModifiedDate
    @Column(name="conclusion_at")
    private LocalDate conclusionAt;

    public Task() {

    }

    public Task(Integer id,
                String title,
                boolean status,
                String description,
                LocalDate createdAt,
                LocalDate updatedAt,
                LocalDate removedAt,
                LocalDate conclusionAt) {
        this.id = id;
        this.title = title;
        this.status = status;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.removedAt = removedAt;
        this.conclusionAt = conclusionAt;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
    }

    public LocalDate getRemovedAt() {
        return removedAt;
    }

    public void setRemovedAt(LocalDate removedAt) {
        this.removedAt = removedAt;
    }

    public LocalDate getConclusionAt() {
        return conclusionAt;
    }

    public void setConclusionAt(LocalDate conclusionAt) {
        this.conclusionAt = conclusionAt;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Task task = (Task) o;
        return Objects.equals(id, task.id);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id);
    }
}
