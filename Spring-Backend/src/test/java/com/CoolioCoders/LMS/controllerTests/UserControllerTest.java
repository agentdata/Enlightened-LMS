package com.CoolioCoders.LMS.controllerTests;

import com.CoolioCoders.LMS.models.User;
import com.CoolioCoders.LMS.services.LMSUserDetailsService;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.web.client.RestTemplate;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import static org.junit.jupiter.api.Assertions.*;

class UserControllerTest {

    // Important variables for testUserRegistered()
    public static String TOKEN;
    public static String testEmails[] = {"julian@gmail.com", "fakeemail@gmail.com"};

    @BeforeAll
    static void initialize()
    {
        TOKEN = getAdminToken();
    }
    @Test
    public void testUserRegistered()
    {
        // This test is to verify that the student is registered
        assertTrue(TOKEN != "");
    }



    public static String getAdminToken()
    {
        String adminToken = "";
        try
        {
            URL url = new URL("http://localhost:8080/api/auth/login");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "application/json");

            con.setDoOutput(true);
            DataOutputStream out = new DataOutputStream(con.getOutputStream());
            out.writeBytes("{\n");
            out.writeBytes("  \"email\": \"admin@cooliocoders.ddns.net\",\n");
            out.writeBytes("  \"password\" : \"12345\"\n");
            out.writeBytes("}");
            out.flush();
            out.close();

            int status = con.getResponseCode();
            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer content = new StringBuffer();
            while((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            con.disconnect();

            // Extract token
            String splitString[] = content.toString().split("token\":\"");
            adminToken = splitString[1].substring(0, splitString[1].length()-2);

        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
        return adminToken;
    }
}