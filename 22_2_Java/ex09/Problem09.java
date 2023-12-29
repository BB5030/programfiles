import java.io.PrintWriter;
import java.io.FileNotFoundException;
import java.util.Scanner;
public class Problem09
{
    public static void main (String [] args)
    {
        String fileName = "largest.txt"; 
        PrintWriter outputStream = null;
        try
        {
            outputStream = new PrintWriter (fileName);
        }
        catch (FileNotFoundException e)
        {
            System.out.println ("Error opening the file " + fileName);
            System.exit (0);
        }
        int largestInt = -2147483648;
        System.out.print ("Enter 7 integers: ");
        Scanner keyboard = new Scanner (System.in);
        outputStream.print ("You entered ");
        for (int i = 0 ; i < 7 ; i++)
        {
            int num = keyboard.nextInt();
            if(i != 6) outputStream.print(num + ", ");
            else outputStream.println(num + ".");
            if(num > largestInt) largestInt = num;
        }
        outputStream.println ("The largest number is " + largestInt + ".");
        outputStream.close ();
    }
}