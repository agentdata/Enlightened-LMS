package com.CoolioCoders.LMS.controllerTests;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertTrue;

public class BalanceControllerTest {

    public static String TOKEN = "";
    public final int balance = 5000;
    public static final String email = "julian@gmail.com";
    public static final String password = "1234";

    @BeforeAll
    static void initialize()
    {
        TOKEN = getToken();
    }

    @Test
    public void testBalanceCreation()
    {
        try{
            URL url = new URL("http://localhost:8080/api/balance/new");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("authorization", "Bearer " + TOKEN);
            con.setRequestProperty("Content-Type", "application/json");

            /* Payload support */
            con.setDoOutput(true);
            DataOutputStream out = new DataOutputStream(con.getOutputStream());
            out.writeBytes("{\n");
            out.writeBytes(" \"balance\": " + balance + "\n");
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
            System.out.println("Response status: " + status);
            System.out.println(content.toString());
        }catch(Exception e){assertTrue(false);}

        // No exception, test passes
        assertTrue(true);
    }

    @Test
    public void testBalancePayment()
    {

    }

    public static String getToken()
    {
        String token = "";
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
            out.writeBytes("  \"email\": \"" + email + "\",\n");
            out.writeBytes("  \"password\" : \"" + password + "\"\n");
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
            token = splitString[1].substring(0, splitString[1].length()-2);

        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
        finally
        {
            System.out.println("TOKEN: " + token);
            return token;
        }
    }
}
