import java.util.ArrayList;
import java.util.Scanner;
import java.io.File;
import java.io.FileNotFoundException;
public class Problem10
{
    public static void main (String [] args)
    {
        ArrayList<Double> Numbers = new ArrayList<Double>();
        String filename = "numbers.txt";
        Scanner inputStream = null;
        
        try 
        {
        	inputStream = new Scanner(new File(filename));
        }
        catch(FileNotFoundException e)
        {
        	System.out.println("Error!!");
        	System.exit (0);
        }

        while (inputStream.hasNextDouble())
        {
            double number = inputStream.nextDouble();
            Numbers.add(number);
        }
        
        double largestNum = -2147483648;
        int size = Numbers.size();

        for (int i = 0 ; i < size ; i++) {
        	if(largestNum < Numbers.get(i)) {
        		largestNum = Numbers.get(i);
        	}
        }
        System.out.println("The largest number is " + largestNum + ".");
        inputStream.close();
    }
}