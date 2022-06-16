import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;
class Arithmetic {
    public Integer sum(Integer[] arr) {
        Integer ans = 0;
        for(Integer i: arr) {
            ans += i;
        }
        return ans;
    } 
    public String sum(String[] arr) {
        String ans = "";
        for(String s: arr) {
            ans += s;
        }
        return ans;
    }
}

public class Solution {
    
    public static void main(String args[] ) throws Exception {
        Arithmetic arithmetic = new Arithmetic();

        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine();
        String[] values = line.split(" ");

        //check if int array
        try{
            Integer.parseInt(values[0]);

            //System.out.println("Integer array");
            Integer[] ia = new Integer[values.length];
            for (int i=0; i< values.length; i++){
                ia[i] = new Integer(values[i]);
            }
            System.out.println(arithmetic.sum(ia));
        }catch(NumberFormatException nfe){
            //then string array

            //System.out.println("String array");
            System.out.println(arithmetic.sum(values));
        }
    }
}