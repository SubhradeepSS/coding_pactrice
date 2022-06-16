// 4 test case not passing
/* 
One of the ip testcase not passing in ip.txt file
*/

import java.io.*;
import java.math.*;
import java.security.*;
import java.text.*;
import java.util.*;
import java.util.concurrent.*;
import java.util.regex.*;



class Result {

    /*
     * Complete the 'decryptMessage' function below.
     *
     * The function is expected to return a STRING.
     * The function accepts STRING encryptedMessage as parameter.
     */

    public static String decryptWord(String word) {
        // System.out.println(word);
        String ans = "";
        int n = word.length();
        
        if(n <= 1){
            return word;
        }
        
        for(int i=1; i<n; i++) {
            char curr = word.charAt(i);
            char prev = word.charAt(i-1);
            if(Character.isDigit(curr)) {
                int q = Character.getNumericValue(curr);
                while(q-- > 0) {
                    ans += prev;
                }
                i++;
            }
            else {
                ans += prev;
            }
        }
        
        return Character.isDigit(word.charAt(n-1)) ? ans : ans + word.charAt(n-1);
    }
    public static String decryptMessage(String encryptedMessage) {
        String[] words = encryptedMessage.split(" ");
        String ans = "";
        for(String word: words) {
            String dec = decryptWord(word);
            ans = (dec.equals(" ") ? "" : dec) + " " + ans;
        }
        // System.out.print(encryptedMessage);
        return ans;
    }

}

public class Solution {
    public static void main(String[] args) throws IOException {
        BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bufferedWriter = new BufferedWriter(new FileWriter(System.getenv("OUTPUT_PATH")));

        String encryptedMessage = bufferedReader.readLine();

        String result = Result.decryptMessage(encryptedMessage);

        bufferedWriter.write(result);
        bufferedWriter.newLine();

        bufferedReader.close();
        bufferedWriter.close();
    }
}
