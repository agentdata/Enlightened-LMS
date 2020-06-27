package com.CoolioCoders.LMS.controllerTests;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import static org.junit.jupiter.api.Assertions.*;

class UserControllerTest {

    // Important variables
    public static String TOKEN;
    public static String testEmail = "julian@gmail.com";
    public static String testId = "5ed6f5bd98efc0682a884248";

    @BeforeAll
    static void initialize()
    {
        TOKEN = getAdminToken();
    }
    
    @Test
    public void testUserRegisteredByEmail()
    {
        String testString = "";

        // Tests should not be empty
        assertTrue(!TOKEN.equals(""));

        try
        {
            URL url = new URL("http://localhost:8080/api/user/email/" + testEmail);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty("authorization", "Bearer " + TOKEN);

            int status = con.getResponseCode();
            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer content = new StringBuffer();
            while((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            con.disconnect();

            testString = content.toString();
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
        finally
        {
            // User should be registered
            assertTrue(!testString.equals(""));
        }
    }
    @Test
    public void testUserRegisteredById()
    {
        String testString = "";

        // Tests should not be empty
        assertTrue(!TOKEN.equals(""));

        try
        {
            URL url = new URL("http://localhost:8080/api/user/id/" + testId);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty("authorization", "Bearer " + TOKEN);

            int status = con.getResponseCode();
            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer content = new StringBuffer();
            while((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            in.close();
            con.disconnect();

            testString = content.toString();
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
        finally
        {
            // User should be registered
            assertTrue(!testString.equals(""));
        }
    }

    public static String getAdminToken()
    {
        String adminToken = "";
        try
        {
            // Set up POST Request
            URL url = new URL("http://localhost:8080/api/auth/login");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("Content-Type", "application/json");

            // Create and embed body of request
            con.setDoOutput(true);
            DataOutputStream out = new DataOutputStream(con.getOutputStream());
            out.writeBytes("{\n");
            out.writeBytes("  \"email\": \"admin@cooliocoders.ddns.net\",\n");
            out.writeBytes("  \"password\" : \"12345\"\n");
            out.writeBytes("}");
            out.flush();
            out.close();

            // Save the response in  a StringBuffer
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
        finally
        {
            System.out.println("TOKEN: " + adminToken);
            return adminToken;
        }
    }
}