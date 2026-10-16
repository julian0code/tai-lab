package backend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/api/health")
    public HealthResponse healthCheck(){
        return new HealthResponse("200 OK", "TAI Lab Backend");
    }
}