package backend;

public record HealthResponse(
    String status,
    String application
){}