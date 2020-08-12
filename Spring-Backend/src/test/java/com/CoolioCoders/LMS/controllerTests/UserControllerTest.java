package com.CoolioCoders.LMS.controllerTests;

import com.CoolioCoders.LMS.models.User;
import com.google.gson.Gson;
import net.minidev.json.JSONArray;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class UserControllerTest {

    // Important variables
    public static String TOKEN;
    public static String ADMIN_TOKEN;

    public static String testEmail = "student@unit.test.com";
    public static String testPassword = "12345";
    public static String testFirstName = "Student";
    public static String testLastName = "UnitTest";
    public static String testId = "5f331c749d98cd15d93dc108";

    public static String testUpdateBio = "hello";
    public static String testUpdateAddress1 = "123 Fake St";
    public static String testUpdateCity = "SLC";
    public static String testUpdateState = "UT";
    public static String testUpdateZip = "84084";
    public static String testUpdatePhone = "801-123-4567";

    @BeforeAll
    static void initialize()
    {
        ADMIN_TOKEN = getAdminToken();
        TOKEN = getToken();
    }

    @Test
    public void testGetUserProfile()
    {

        assertNotEquals("", TOKEN);

        try
        {
            URL url = new URL("http://localhost:8080/api/user/profile");
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

            System.out.println("content: " + content);

            assertEquals(testFirstName, getResponseValue(content, "firstName"));
            assertEquals(testLastName, getResponseValue(content, "lastName"));
            assertEquals(testEmail, getResponseValue(content, "email"));
            assertEquals(testId, getResponseValue(content, "id"));

        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
    }

    @Test
    public void testUpdateUserProfile()
    {

        assertNotEquals("", TOKEN);

        User updatedUser = new User();
        updatedUser.setEmail(testEmail);    //leave as regular email

        updatedUser.setBio(testUpdateBio);
        updatedUser.setAddress1(testUpdateAddress1);
        updatedUser.setCity(testUpdateCity);
        updatedUser.setState(testUpdateState);
        updatedUser.setZip(testUpdateZip);
        updatedUser.setPhone(testUpdatePhone);

        try
        {
            URL url = new URL("http://localhost:8080/api/user/profile");
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("PUT");
            con.setRequestProperty("authorization", "Bearer " + TOKEN);
            con.setRequestProperty("Content-Type", "application/json");

            Gson gson = new Gson();
            System.out.println(gson.toJson(updatedUser));

            con.setDoOutput(true);
            DataOutputStream out = new DataOutputStream(con.getOutputStream());

            out.writeBytes(gson.toJson(updatedUser));

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

            System.out.println("content: " + content);

            assertEquals(testFirstName, getResponseValue(content, "firstName"));
            assertEquals(testLastName, getResponseValue(content, "lastName"));
            assertEquals(testEmail, getResponseValue(content, "email"));
            assertEquals(testId, getResponseValue(content, "id"));

            assertEquals(testUpdateBio, getResponseValue(content, "bio"));
            assertEquals(testUpdateAddress1, getResponseValue(content, "address1"));
            assertEquals(testUpdateCity, getResponseValue(content, "city"));
            assertEquals(testUpdateState, getResponseValue(content, "state"));
            assertEquals(testUpdateZip, getResponseValue(content, "zip"));
            assertEquals(testUpdatePhone, getResponseValue(content, "phone"));

        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
    }

//      NOT WORKING WITH THE ADMIN ACCOUNT
@Test
public void testUserRegisteredByEmail()
{
    String testString = "";

    // Tests should not be empty
    assertTrue(!ADMIN_TOKEN.equals(""));

    try
    {
        URL url = new URL("http://localhost:8080/api/user/email/" + testEmail);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");
        con.setRequestProperty("authorization", "Bearer " + ADMIN_TOKEN);

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
        assertTrue(!ADMIN_TOKEN.equals(""));

        try
        {
            URL url = new URL("http://localhost:8080/api/user/id/" + testId);
            HttpURLConnection con = (HttpURLConnection) url.openConnection();
            con.setRequestMethod("GET");
            con.setRequestProperty("authorization", "Bearer " + ADMIN_TOKEN);

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

    private String getResponseValue(StringBuffer response, String key) {
        String value = null;
        String[] responseSplit = response.toString().split(key + "\":\"");
        value = responseSplit[1].substring(0, responseSplit[1].indexOf("\""));
        return value;
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
            out.writeBytes("  \"email\": \"" + testEmail + "\",\n");
            out.writeBytes("  \"password\" : \"" + testPassword + "\"\n");
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