import java.util.Scanner;

public class Problem2 {
	public static void main (String [] args)
    {
        Scanner keyboard = new Scanner (System.in);
        
        int num1, num2, num3;
        
        System.out.print ("Input the first number: ");
        num1 = keyboard.nextInt();
        System.out.print ("Input the second number: ");
        num2 = keyboard.nextInt();
        System.out.print ("Input the third number: ");
        num3 = keyboard.nextInt();
        
        if(num1 > num2 && num2 > num3)
        	System.out.print("Decreasing");
        else if(num1 < num2 && num2 < num3)
        	System.out.print("Increasing");
        else
        	System.out.print("Neither increasing or decreasing");
       
    }
}

