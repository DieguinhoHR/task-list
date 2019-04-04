package br.com.tasklist.domains.enums;

public enum Status {
    ABERTO("Aberto"),
    EMEXECUCAO("Em execução"),
    PRONTO("Pronto"),
    CANCELADO("Cancelado");

    private String description;

    Status(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
