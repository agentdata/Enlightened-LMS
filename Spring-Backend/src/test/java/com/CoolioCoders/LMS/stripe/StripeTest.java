package com.CoolioCoders.LMS.stripe;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;

import javax.net.ssl.HttpsURLConnection;
import javax.swing.*;
import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.URL;

import static org.junit.jupiter.api.Assertions.*;


// @Order() annotation doesn't work, so I added a letter in front of the test
// to force ordered execution
public class StripeTest
{

    // Julian's Stripe account
    static final String KEY = "sk_test_51H4HWYCI6wJm5zzTPyXR3FOFMs2y8r8QkUpeI3o7CXhdUYKqR06m5xCiX0c03MYoiJxXjefDfan1AmFljhpuA54700LF1vfLcj";

    static String paymentIntentId = "";
    static int amount = 1245000; // $12,450.00
    static String currency = "usd";

    String type = "card";
    String card = "4242424242424242";
    int exp_month = 7;
    int exp_year = 2021;
    int cvc = 314;

    String payment_method = "pm_card_visa";

    @Test
    @Order(1)
    void atestPaymentIntent()
    {
        String JsonResponse = "";
        int status = 0;

        try
        {
            URL url = new URL("https://api.stripe.com/v1/payment_intents");
            HttpsURLConnection con = (HttpsURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("authorization", "Bearer " + KEY);
            con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");

            con.setDoOutput(true);
            DataOutputStream out = new DataOutputStream(con.getOutputStream());
            out.writeBytes("amount=" + amount + "&currency=" + currency);
            out.flush();
            out.close();

            status = con.getResponseCode();
            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer content = new StringBuffer();
            while((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            JsonResponse = content.toString();

            in.close();
            con.disconnect();
            System.out.println("Response status: " + status);
            System.out.println(JsonResponse);
        }
        catch(Exception e)
        {
            assertTrue(false);
        }

        String[] keyValueArray = JsonResponse.split("\": \"");
        paymentIntentId = keyValueArray[1].substring(0, keyValueArray[1].length()-11);
        System.out.println(paymentIntentId);
        assertEquals(200, status);

    }

    @Test
    @Order(2)
    void btestPaymentMethod()
    {
        int status = 0;
        String JsonReponse = "";

        try
        {
            URL url = new URL("https://api.stripe.com/v1/payment_methods");
            HttpsURLConnection con = (HttpsURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("authorization", "Bearer " + KEY);
            con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");

            con.setDoOutput(true);
            DataOutputStream out = new DataOutputStream(con.getOutputStream());
            out.writeBytes("type=" + type + "&card[number]=" + card + "&card[exp_month]=" + exp_month + "&card[exp_year]=" + exp_year + "&card[cvc]=" + cvc);
            out.flush();
            out.close();

            status = con.getResponseCode();
            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer content = new StringBuffer();
            while((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            JsonReponse = content.toString();

            in.close();
            con.disconnect();
            System.out.println("Response status: " + status);
            System.out.println(JsonReponse);
        }
        catch(Exception e)
        {
            assertTrue(false);
        }

        assertEquals(200, status);
    }

    @Test
    @Order(3)
    void ctestPaymentConfirm()
    {
        int status = 0;
        String JsonReponse = "";


        try
        {
            URL url = new URL("https://api.stripe.com/v1/payment_intents/" + paymentIntentId + "/confirm");
            HttpsURLConnection con = (HttpsURLConnection) url.openConnection();
            con.setRequestMethod("POST");
            con.setRequestProperty("authorization", "Bearer " + KEY);
            con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");

            con.setDoOutput(true);
            DataOutputStream out = new DataOutputStream(con.getOutputStream());
            out.writeBytes("payment_method=" + payment_method);
            out.flush();
            out.close();

            status = con.getResponseCode();
            BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
            String inputLine;
            StringBuffer content = new StringBuffer();
            while((inputLine = in.readLine()) != null) {
                content.append(inputLine);
            }
            JsonReponse = content.toString();

            in.close();
            con.disconnect();
            System.out.println("Response status: " + status);
            System.out.println(JsonReponse);
        }
        catch(Exception e)
        {
            assertTrue(false);
        }

        assertEquals(200, status);
    }
}
