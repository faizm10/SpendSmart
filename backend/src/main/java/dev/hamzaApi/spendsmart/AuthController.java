package dev.hamzaApi.spendsmart;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Base64;
import java.util.HashMap;

@RestController
public class AuthController {

    @Value("${spring.security.oauth2.resourceserver.jwt.clientId}")
    private String clientId;

    @Value("${spring.security.oauth2.resourceserver.jwt.clientSecret}")
    private String clientSecret;

    @Value("${auth.cognitoUri}")
    private String cognitoUri;

    private static final ObjectMapper JSON_MAPPER = new ObjectMapper();

    @GetMapping("/auth/url")
    public ResponseEntity<UrlDto> auth() {
        String url = cognitoUri +
                "/oauth2/authorize?" +
                "response_type=code" +
                "&client_id=" + clientId +
                "&redirect_uri=https://staging.d26wj79u2xignv.amplifyapp.com" +
                "&scope=email+openid+profile";
        return ResponseEntity.ok(new UrlDto(url));
    }
    @GetMapping("/auth/logout")
    public ResponseEntity<String> logout() {
        String logoutUrl = cognitoUri + "/logout?"
                + "client_id=" + clientId
                + "&logout_uri=https://staging.d26wj79u2xignv.amplifyapp.com";

        return ResponseEntity.ok(logoutUrl);
    }
    @GetMapping("/auth/callback")
    public ResponseEntity<TokenDto> callback(@RequestParam("code") String code) {
        try {

            String urlStr = cognitoUri + "/oauth2/token?"
                    + "grant_type=authorization_code" +
                    "&client_id=" + clientId +
                    "&code=" + code +
                    "&redirect_uri=https://staging.d26wj79u2xignv.amplifyapp.com";

            String authenticationInfo = clientId + ":" + clientSecret;
            String basicAuthenticationInfo = Base64.getEncoder().encodeToString(authenticationInfo.getBytes());

            HttpRequest request;
            try {
                request = HttpRequest.newBuilder(new URI(urlStr))
                        .header("Content-type", "application/x-www-form-urlencoded")
                        .header("Authorization", "Basic " + basicAuthenticationInfo)
                        .POST(HttpRequest.BodyPublishers.noBody())
                        .build();
            } catch (URISyntaxException e) {
                throw new RuntimeException("Unable to build Cognito URL");
            }
            // Send request
            HttpClient client = HttpClient.newHttpClient();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
// Check response status
            if (response.statusCode() != 200) {

                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new TokenDto("Authentication failed: " + response.body()));
            }

            // Parse JSON response
            CognitoTokenResponseDto token = JSON_MAPPER.readValue(response.body(), CognitoTokenResponseDto.class);

            return ResponseEntity.ok(new TokenDto( token.id_token()));

        } catch (IOException | InterruptedException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new TokenDto("Error connecting to Cognito"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new TokenDto("Unexpected error: " + e.getMessage()));
        }
    }
}
